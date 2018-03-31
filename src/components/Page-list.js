import React, { Component } from 'react'

class PageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.activePage && nextProps) {
      if (
        JSON.stringify(this.props.activePage.id) !==
        JSON.stringify(nextProps.activePage.id)
      ) {
        this.setState({ value: nextProps.activePage.id })
      }
    }
  }

  eachPage = page => {
    return (
      <option key={page.id} value={page.id}>
        {page.title}
      </option>
    )
  }

  handleChange = event => {
    let value = parseInt(event.target.value)
    this.props.changePage(value)
    this.setState({ value })
  }

  render() {
    return (
      <div className="pageList">
        <form>
          <label>
            Current Page
            <select value={this.state.value} onChange={this.handleChange}>
              {this.props.pages.map(this.eachPage, this)}
            </select>
          </label>
        </form>
      </div>
    )
  }
}

export default PageList
