import { Helmet } from 'react-helmet'
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../../styles/styles.scss'

const TCSStepConnector = ({stepIndex, getStepContent, handleNext, handlePrev, steps}) => (
  <div className={styles.Stepbar}>
    <Helmet>
      <title>Talk and Choose and Seek</title>
      <meta name='description' content='Talk to the platform what you want, where, and then seek' /></Helmet>
    <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>
      <Step>
        <StepLabel>Tell me what is your subject ?</StepLabel>
      </Step>
      <Step>
        <StepLabel>Where do you want me to search?</StepLabel>
      </Step>
      <Step>
        <StepLabel>Here is what you can seek</StepLabel>
      </Step>
    </Stepper>

    {getStepContent(stepIndex)}

    <div className={styles.buttonBar}>
      <FlatButton
        label='Back'
        disabled={stepIndex === 0}
        onClick={handlePrev}
      />
      <RaisedButton
        label={stepIndex === 2 ? 'Finish' : 'Next'}
        primary
        disabled={!steps[stepIndex].valide}
        onClick={handleNext}
      />
    </div>
  </div>
)
TCSStepConnector.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(TCSStepConnector)
