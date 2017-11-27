const express = require('express')
const router = new express.Router()
const wiki = require('wikijs').default
const request = require('superagent')
const parse5 = require('parse5')

router.post('', (req, res) => {
  if (!req.body.info.api) {
    return res.status(409).json({
      success: false,
      err: 'Platform not selected',
      message: 'Please say the name of the platform you want to seek in'
    })
  }
  switch (req.body.info.api) {
    case 'wikipedia':
    case 'Wikipedia':
      {
        return askWikipedia(req, res)
      }
    case 'Ecosia':
    case 'ecosia':
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

// const IfAlreadySaved = (items, title, link) => {
//   items.forEach((item) => {
//     if (item.title === title && item.link === link) {
//       return true
//     }
//   })
//   return false
// }
const AlreadySaved = (items, title, link) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].title === title && items[i].link === link) {
      return true
    }
  }
  return false
}

const checkNode = (node, array) => {
  if (node.childNodes) {
    node.childNodes.forEach((i) => {
      if (node.attrs) {
        node.attrs.forEach((at) => {
          if (at.name === 'class' && at.value === 'result js-result card-mobile') {
            if (node.childNodes) {
              try {
                let json = { title: (node.childNodes[1].childNodes[1].childNodes[0].value + node.childNodes[1].childNodes[2].value).trim(),
                  link: node.childNodes[1].attrs[1].value.trim(),
                  intro: node.childNodes[5].childNodes[2].value.trim()}

                if (AlreadySaved(array, json.title, json.link)) {

                } else {
                  console.log(array.lastIndexOf(json))
                  array.push(json)
                }
              } catch (e) {
                console.log(e)
              }
            }
          }
        })
      }
      checkNode(i, array)
    })
  }
}

const askEcosia = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      return request
    .get('https://www.ecosia.org/search?')
        .query({q: req.body.info.key})
        .accept('application/json')
    .end((err, response) => {
      if (err) {
        return reject(err)
      }

      const array = []
      const document = parse5.parse(response.text)
      checkNode(document, array)
// Serializes a document.
      return resolve({
        success: true,
        type: 'html',
        items: array,
        message: 'we have found a page with the results'
      })
    })
    } catch (e) {
      reject(e)
    }
  }).then((result) => {
    return res.status(200).json(result)
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
      type: 'json',
      message: 'we have found ' + data.results.length + ' articles, please reformulate your request'
    })
  }
}
const resolveIfRequestsCompleted = (items, data, resolve) => {
  if (items.length === data.results.length) {
    return resolve({
      success: true,
      items: items,
      type: 'json',
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
