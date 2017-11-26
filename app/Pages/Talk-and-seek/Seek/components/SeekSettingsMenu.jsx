
import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

// const SeekSettings = ({maxResults, onChange}) => (
//   <div >
//     <span className={styles.label}> Maximum : {maxResults} results <select className={styles.menu} onChange={onChange} value={maxResults}>
//       <option value={5}>Very Few</option>
//       <option value={10}>Few</option>
//       <option value={20}>Many</option>
//       <option value={40}>A lot</option>
//     </select> </span>
//   </div>
// )

const SeekSettings = ({maxResults, onChange}) => (
  <SelectField id='range' key='range'
    name='range' value={maxResults} onChange={onChange}>
    <MenuItem id='veryfew' key='veryfew' value={5} label='5' primaryText='Very Few' />
    <MenuItem id='few' key='few' value={10} label='10' primaryText='Few' />
    <MenuItem id='many' key='many' value={20} label='20' primaryText='Many' />
    <MenuItem id='alott' key='alot' value={40} label='40' primaryText='A lot' />
  </SelectField>
)
SeekSettings.contextTypes = {

  insertCss: PropTypes.func
}
SeekSettings.prototype = {
  onChange: PropTypes.func.isRequired,
  maxResults: PropTypes.number.isRequired
}
export default withStyles(styles)(SeekSettings)
