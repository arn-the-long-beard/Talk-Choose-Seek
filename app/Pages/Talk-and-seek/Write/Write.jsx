
import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'

import WriteForm from './components/WriteForm'

class Talk extends Component {
  constructor (props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.handleNewRequestt = this.handleNewRequest.bind(this)
  }
  onChange (event) {
    event.preventDefault()
    const field = event.target.name
    // const info = this.props.personalInformation.content
    // info[field] = event.target.value
    this.props.actions.write(event.target.value, field)
  }

  onSubmit (event) {
    event.preventDefault()
    this.props.actions.update()
  }
 // information, onChange, onSubmit, isValid, errors,handleUpdateInput,handleNewRequest

  handleUpdateInput (searchText) {
    this.props.actions.choose(searchText)
  }

  handleNewRequest () {
    this.props.actions.invalidate()
  }

  /**
   * This method will be executed after initial rendering.

   /**
   * Render the component.
   */
  render () {
    return (< WriteForm information={this.props.write.content}
      onChange={this.onChange}
      onSubmit={this.onSubmit}
      isValid={this.props.write.isValid}
      errors={this.props.write.errors}
      handleUpdateInput={this.handleUpdateInput}
      handleNewRequest={this.handleNewRequest}
    />)
  }
}
Talk.contextTypes = {
  router: PropTypes.object.isRequired
}
Talk.propTypes = {
  talk: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  const { talk } = state.talkAndChooseAndSeek

  return {
    talk
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Talk)
