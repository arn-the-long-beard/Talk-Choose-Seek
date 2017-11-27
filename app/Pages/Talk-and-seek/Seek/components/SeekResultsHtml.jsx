import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../../../styles/styles.scss'
import { List, ListItem } from 'material-ui/List'

const ResultsHtmlList = ({results}) => (
  <List className={styles.list} >
    {results.map(function (item) {
      return (
        <ListItem disabled key={item.link} ><div>
          <h4 className={styles.titleResult}>{item.title}</h4>
          <br />
          <a target='_blank' rel='noopener noreferrer' href={item.link} ><span>{item.link}</span></a>
          <br />
        </div>
          <p className={styles.result}>{item.intro}</p>
        </ListItem>
      )
    })}
  </List>)

ResultsHtmlList.propTypes = {
  results: PropTypes.array.isRequired
}

ResultsHtmlList.contextTypes = {
  insertCss: PropTypes.func
}

export default withStyles(styles)(ResultsHtmlList)
