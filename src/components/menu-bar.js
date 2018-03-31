import React, { Component } from 'react'

const MenuBar = props => {
  return (
    <div className="menu">
      <ul>
        <li onClick={props.addPage}> + Page </li>
        <li onClick={() => props.deletePage(props.activePage.id)}> - Page </li>
        <li onClick={() => props.onAddTxtNote('text')}> + Text </li>
        <li onClick={() => props.onAddImgNote('image')}> + Image </li>
      </ul>
    </div>
  )
}

export default MenuBar
