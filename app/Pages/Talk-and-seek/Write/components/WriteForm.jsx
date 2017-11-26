import React from 'react'
import PropTypes from 'prop-types'
import Write from 'material-ui/svg-icons/editor/mode-edit'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'
import {blue500} from 'material-ui/styles/colors'

import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
const WriteForm = ({information, onChange, onSubmit, isValid, errors, handleUpdateInput, handleNewRequest}) => (
  <section className={styles.container}>
    <h4 className={styles.titleSection}> Write to me <CommunicationChatBubble color={blue500} /></h4>
    <div>
      <form action='/' onSubmit={onSubmit} method='post'>
        <TextField
          id='first_name'
          name='first_name'
          onChange={onChange}
          errorText={errors}
          value={information.key}
          hintText='First Name'
            />
        <AutoComplete
          hintText="Type 'r', case insensitive"
          searchText={information.key}
          onUpdateInput={handleUpdateInput}
          onNewRequest={handleNewRequest}
          dataSource={information.keys}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus
        />
        <FloatingActionButton
          type='submit'
          disabled={isValid}>
          <Write />
        </FloatingActionButton>
      </form>
    </div>
  </section>
)
WriteForm.contextTypes = {
  insertCss: PropTypes.func
}
WriteForm.propTypes = {
  onResult: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired
}
export default withStyles(styles)(WriteForm)
