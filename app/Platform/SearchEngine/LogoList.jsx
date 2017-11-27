import React from 'react'
import ecosiaLogo from './logos/ecosialogo.png'
import wikipediaLogo from './logos/wikipedialogo.jpeg'
import PropTypes from 'prop-types'
import styles from './styles/styles.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
const LogoList = () => (<div className={styles.container}>
  <ul className={styles.list}>
    <li className={styles.li}> <a target='_blank' rel='noopener noreferrer' href='https://www.ecosia.org' > <img className={styles.img} src={ecosiaLogo} alt='Ecosia' /></a></li>
    <li className={styles.li}> <a target='_blank' rel='noopener noreferrer' href='https://www.wikipedia.org' > <img className={styles.img} src={wikipediaLogo} alt='Wikipedia' /></a></li>
  </ul>

</div>)

LogoList.contextTypes = {
  insertCss: PropTypes.func
}

export default withStyles(styles)(LogoList)
