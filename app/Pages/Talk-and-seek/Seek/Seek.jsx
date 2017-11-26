import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'
import SeekResultsList from './components/SeekSection'
import StateSaver from '../../../store/stateSaver'

class Seek extends Component {
  /**
   * Class constructor.
   */
  constructor (props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    if (this.props.seek.preloaded) {
      this.props.actions.checkIfNeedAskAsync(this.props.keySearch, this.props.api)
    }
  }
  // componentWillUpdate(nextProps, nextState){
  //   if (nextProps.api !== this.props.api || nextProps.keySearch !== this.props.keySearch) {
  //     this.props.actions.invalidate()
  //   }
  // }
  // componentWillReceiveProps (nextProps) {
  //
  //   this.props.actions.checkIfNeedToAsk(this.props.keySearch, this.props.api)
  // }

  componentDidMount () {
    this.props.actions.checkIfNeedToAsk(this.props.keySearch, this.props.api)
    console.log(StateSaver.getState())
  }

  onChange (event) {
    event.preventDefault()
    this.props.actions.updateMaxResults(event.target.value)
  }

  componentWillUnmount () {
    // this.props.actions.invalidate()
    // this.props.actions.invalidate()
  }
  /**
   * Render the component.
   */
  render () {
    return (
      <SeekResultsList results={this.props.seek.items}
        keySearch={this.props.keySearch}
        api={this.props.api}
        update={this.props.seek.lastUpdated}
        message={this.props.seek.message}
        isRequesting={this.props.seek.isRequesting}
        maxResults={this.props.seek.maxResults}
        onChange={this.onChange}
      />)
  }
}

Seek.contextTypes = {
  router: PropTypes.object.isRequired
}

Seek.propTypes = {
  seek: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  const { seek } = state.talkAndChooseAndSeek

  return {
    seek
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Seek)
