import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { StaticRouter } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Template from './template'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import configureStore from './app/store/configureStore'
import Root from './app/Root'

import {promisesCollecteur} from './server/store/promisesCollecteur'
import initReactFastclick from 'react-fastclick'
import { checkCookie, preparePreload } from './server/store/setPreloadStore'
initReactFastclick()
export default function serverRenderer ({ clientStats, serverStats }) {
  return (req, res, next) => {
    // cookie.plugToRequest(req, res)

// TODO no client rendering if no cookie maybe
    console.log('URL REQUEST IS ' + req.method + ' --' + req.url)
    const muiTheme = getMuiTheme({userAgent: req.headers['user-agent']})
    const css = []
    const context = {
      insertCss: (styles) => css.push(styles._getCss()),
      status: 0

    }
    const helmet = Helmet.renderStatic()
    let store = null
    let preload = null

    checkCookie(req, (err, cookie) => {
      if (err) {
        return res.status(409).json({
          success: false,
          message: 'error server rendering',
          err: err
        })
      }
      if (cookie) {
        preload = preparePreload(cookie)
        console.log('cookie load ')
        console.log(cookie)
      }
      // console.log('environnement')
      // console.log(process.env.NODE_ENV)
      console.log('preload ')
      console.log(preload)
      if (preload) {
        preload.host = { server: req.headers.host }
        store = configureStore(preload)
      } else {
        store = configureStore()
      }
      console.log('PreState ')
      console.log(store.getState())
      // let store = configureStore()
      let html = ReactDOMServer.renderToString(<MuiThemeProvider muiTheme={muiTheme}><Root store={store} Router={StaticRouter} location={req.url} context={context} /></MuiThemeProvider>)
      console.log('Server rendering')
      //  console.log(req.headers)
      let finalState = store.getState()
// TODO make it a middleware maybe
      finalState.host = { server: req.headers.host }
      promisesCollecteur(finalState, promises => {
        if (promises.length === 0) {
          console.log('there is no promise')
          render(res, context, css, html, helmet, finalState)
        } else {
          // It was in case I try to reload the state by server sendering ( F5) but not time to implement for the assignement
          console.log('there are few promises to solve')
          try {
            Promise.all(promises)
              .then(() => {
                html = ReactDOMServer.renderToString(<MuiThemeProvider muiTheme={muiTheme}><Root store={store}
                  Router={StaticRouter}
                  location={req.url}
                  context={context} /></MuiThemeProvider>)
                console.log('Server rendering Number 2')
                finalState = store.getState()

                render(res, context, css, html, helmet, finalState)
              })
              .catch((e) => {
                // handle errors here
                throw new Error('Error server side' + e.message)
              })
          } catch (e) {
            throw new Error('Error server side' + e.message)
          }
        }
      })
    })
  }
// TODO make it a middleware maybe
  function render (res, context, css, html, helmet, finalState) {
    finalState = JSON.stringify(finalState)
    if (context.status === 404) {
      res.status(404).send(Template({css, html, helmet, finalState}))
    } else {
      res.status(200).send(Template({css, html, helmet, finalState}))
    }
  }
}
