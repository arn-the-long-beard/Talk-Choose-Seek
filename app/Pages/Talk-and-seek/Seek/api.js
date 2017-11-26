
import request from 'superagent'
import ServerAddress from '../../../Server/ServerAddress'

const url = () => { return ServerAddress.getServerUrl() }
class Api {
  static seek (key, maxResults, api) {
    return request.post(url() + '/api/data')
      .set({'Content-Type': 'application/json'})
      .type('form')
      .send({info: {key, maxResults, api}})
      .then((res, err) => {
        if (res) {
          return res.body
        }
      })
    // }
  }
}

export default Api