const express = require('express')
const router = new express.Router()
const wiki = require('wikijs').default
const request = require('superagent')

router.post('', (req, res) => {
  if (!req.body.info.api) {
    return res.status(409).json({
      success: false,
      err: 'Platform not selected',
      message: 'Please say the name of the platform you want to seek in'
    })
  }
  switch (req.body.info.api) {
    case 'Wikipedia':
      {
        return askWikipedia(req, res)
      }
    case 'Ecosia':
      {
        return askEcosia(req, res)
      }
    default:
      {
        return res.status(409).json({
          success: false,
          err: 'Platform not available',
          message: 'we did not find the platform you are asking for, please choose one in the list'
        })
      }
  }
})

const askEcosia = (req, res) => {
  request
    .get('https://www.ecosia.org/search?')
    .query({ q: req.body.info.key }) // query string
    .end((err, response) => {
      if (err) {
        return res.status(409).json(err)
      }
      return res.status(200).json(response.body)
    })
}

const askWikipedia = (req, res) => {
  return wiki().search(req.body.info.key, req.body.info.maxResults).then((data) => {
    console.log(data.results)
    let items = []
    return new Promise((resolve, reject) => {
      try {
        data.results.map(function (item) {
          requestContent(item, (resultItem) => {
            items.push(resultItem)
            rejectIfRequestInvalid(items, data, reject)
            resolveIfRequestsCompleted(items, data, resolve)
          })
        })
      } catch (e) {
        reject(e)
      }
    }).then((result) => {
      console.log(result)
      return res.status(200).json(result)
    })
  })
}

const requestContent = (item, next) => {
  wiki().page(item).then((dataItem) => {
    dataItem.content().then((text) => {
      let intro = ''
      try { intro = text.substr(0, 250) } catch (e) {}
      return next({raw: dataItem.raw, intro: intro})
    })
  })
}
const rejectIfRequestInvalid = (items, data, reject) => {
  if (data.results.length === 0) {
    return reject({
      success: false,
      message: 'we have found ' + data.results.length + ' articles, please reformulate your request'
    })
  }
}
const resolveIfRequestsCompleted = (items, data, resolve) => {
  if (items.length === data.results.length) {
    return resolve({
      success: true,
      items: items,
      message: 'we have found ' + data.results.length + ' articles'
    })
  }
}

module.exports = router
//
// const requestContent = (item, next) => {
//   wiki().page(item).then((dataItem) => {
//     dataItem.content().then((text) => {
//       let intro = ''
//       try { intro = text.substr(0, 250) } catch (e) {}
//       return next({raw: dataItem.raw, intro: intro})
//     })
//   })
// }
// const rejectIfRequestInvalid = (items, data, res) => {
//   if (data.items.length === 0) {
//     return res.status(409).json({
//       success: false,
//       err: new Error('wrong request'),
//       message: 'we have found ' + data.items.length + ' articles, please reformulate your request'
//     })
//   }
// }
// const resolveIfRequestsCompleted = (items, data, res) => {
//   if (items.length === data.items.length) {
//     return res.status(200).json({
//       success: true,
//       message: 'we have found ' + data.items.length + ' articles',
//       items: items
//     })
//   }
// }
//
// module.exports = router
