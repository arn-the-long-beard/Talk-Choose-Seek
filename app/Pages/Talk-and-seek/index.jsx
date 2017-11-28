import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'
import PropTypes from 'prop-types'
import Talk from './Talk/Talk'
import Seek from './Seek/Seek'

import TCSStepConnector from './components/TCSStepConnector'

class TalkAndChooseAndSeek extends React.Component {
  constructor (props) {
    super(props)

    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
  }

  getStepContent (stepIndex) {
    const {key, api} = this.props.stepper
    switch (stepIndex) {
      case 0:
        return (
          <Talk validate={this.props.actions.ValidateKey} inValidate={this.props.actions.inValidateKey} start={false} />
        )

      case 1:
        return (
          <Talk validate={this.props.actions.ValidateApi} inValidate={this.props.actions.inValidateApi} start />
        )

      case 2:
        return (
          <Seek validate={this.props.actions.ValidateResults} keySearch={key} api={api} />
        )
    }
  }

  handleNext (e) {
    e.preventDefault()
    this.props.actions.nextStep()
  }

  handlePrev (e) {
    e.preventDefault()
    this.props.actions.prevStep()
  }

  render () {
    const {stepIndex, steps} = this.props.stepper

    return (
      <TCSStepConnector stepIndex={stepIndex}
        getStepContent={this.getStepContent}
        handleNext={this.handleNext}
        handlePrev={this.handlePrev}
        steps={steps}
      />
    )
  }
}

TalkAndChooseAndSeek.contextTypes = {
  router: PropTypes.object.isRequired
}
TalkAndChooseAndSeek.propTypes = {
  stepper: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  const { stepper } = state.talkAndChooseAndSeek

  return {
    stepper
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TalkAndChooseAndSeek)
