import React, { Component } from 'react'

class PageTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editing: false }
  }

  componentDidUpdate = () => {
    if (this.state.editing) {
      this.refs.newTitle.focus()
      this.refs.newTitle.select()
    }
  }

  _handleKeyPress = e => {
    e.key === 'Enter' ? this.save() : null
  }

  edit = () => {
    this.setState({ editing: true })
  }

  save = () => {
    this.props.onTitleChange(this.refs.newTitle.value, this.props.activePage.id)
    this.setState({ editing: false })
  }

  editMode = () => {
    return (
      <div className="pageTitleEdit">
        <input
          ref="newTitle"
          defaultValue={this.props.activePage.title}
          onKeyPress={this._handleKeyPress}
          onBlur={this.save}
        />
      </div>
    )
  }

  displayMode = () => {
    return (
      <div className="pageTitleDisplay" onClick={() => this.edit()}>
        <p title="Click to edit">{this.props.activePage.title}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="pageTitle">
        {!this.props.activePage ? (
          <div className="noPage">Add a page</div>
        ) : this.state.editing ? (
          this.editMode()
        ) : (
          this.displayMode()
        )}
      </div>
    )
  }
}

export default PageTitle
