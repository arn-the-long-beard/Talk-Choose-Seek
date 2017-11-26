import request from 'superagent'
import Auth from '../../../../Auth/auth'
import ServerAddress from '../../../../Server/ServerAddres'
const url = () => { return ServerAddress.getServerUrl() }
class Api {
  static save (info) {
    return request.post(url() + '/api/admin/myprofile/personalinformation')
      .set({'Authorization': 'Bearer ' + Auth.getToken()})
      .set({'Content-Type': 'application/json'})
      .type('form')
      .send({personal_information: info})
      .then((res, err) => {
        if (err) {
          console.log(err)
        }
        console.log(res.status)
        if (res) {
          return res.body
        }
      })
  }
}

export default Api
