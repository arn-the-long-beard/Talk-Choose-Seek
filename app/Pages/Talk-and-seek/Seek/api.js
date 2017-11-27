
import request from 'superagent'
import ServerAddress from '../../../Server/ServerAddress'

const url = () => { return ServerAddress.getServerUrl() }
class Api {
  static seek (key, maxResults, api) {
    return new Promise((resolve, reject) => {
      try {
        return request.post(url() + '/api/data')
      .set({'Content-Type': 'application/json'})
      // .set({ 'Access-Control-Allow-Origin': true })
      .type('form')
      .send({info: {key, maxResults, api}})
      .then((res, err) => {
        if (err) {
          console.error(err)
          return reject(err)
        }
        if (res) {
          return resolve(res.body)
        }
      }).catch((e) => {
        console.error(e)
        return reject(e)
      })
      } catch (e) {
        return reject(e)
      }
    })
  }
}

export default Api
