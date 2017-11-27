import React from 'react'
import PropTypes from 'prop-types'
import MiniLoader from './../../../../components/Spinner/miniLoader'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../../../styles/styles.scss'
import Search from 'material-ui/svg-icons/action/search'
import ResultsListJson from './SeekResultsJson'
import ResultsListHtml from './SeekResultsHtml'
import SeekSettingsMenu from './SeekSettingsMenu'
import {blue500} from 'material-ui/styles/colors'

// Todo when using external link, lost the reduxe state
const ResultsSection = ({keySearch, api, results, update, message, isRequesting, maxResults, onChange, contentType}) => (

  <section className={styles.container}>
    <div><h4 className={styles.titleSection}> Seek for {keySearch} into {api} <Search color={blue500} /> {isRequesting &&
    <MiniLoader />}</h4></div>
    <SeekSettingsMenu maxResults={maxResults} onChange={onChange} />
    <br />
    {update &&
    <div className={styles.label}>
              Last update { parseInt(((new Date(Date.now()) - new Date(update)) / 1000), 10)} seconds ago.
    {' '}
    </div>}
    { message && <div className={styles.label}> {message} </div> }
    {contentType === 'html' ? <ResultsListHtml results={results} /> : <ResultsListJson results={results} />}
  </section>)

ResultsSection.propTypes = {
  results: PropTypes.array.isRequired,
  isRequesting: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  maxResults: PropTypes.number.isRequired
}

ResultsSection.contextTypes = {
  insertCss: PropTypes.func
}

export default withStyles(styles)(ResultsSection)
