import React, { Component } from 'react'
import '../style/App.css'
import MenuBar from './menu-bar'
import PageList from './Page-list'
import PageTitle from './Page-title'
import Page from './Page'
import TextNote from './text-note'
import ImageNote from './image-note'

class App extends Component {
  constructor() {
    super()

    this.state = {
      pages: [],
      activePage: null
    }
  }

  nextId = () => {
    this.uniqueId = this.uniqueId++ || 0
    return this.uniqueId++
  }

  addPage = () => {
    this.pageId = this.pageId || 1
    const newPageId = this.pageId++
    const pages = [
      ...this.state.pages,
      {
        id: newPageId,
        title: `Page ${newPageId}`,
        txtNotes: [],
        imgNotes: [],
        sketchNotes: []
      }
    ]
    const activePage = pages[pages.length - 1]
    this.setState({ pages, activePage })
  }

  deletePage = id => {
    if (this.state.pages.length === 1) return
    const pages = [...this.state.pages].filter(page => page.id !== id)
    const activePage = pages[pages.length - 1]
    this.setState({ pages, activePage })
  }

  flipPage = id => {
    this.state.pages.forEach(page => {
      if (page.id === id) {
        const activePage = page
        this.setState({ activePage })
      }
    })
  }

  onTitleChange = (newTitle, id) => {
    const activePage = this.state.activePage
    activePage.title = newTitle
    this.setState({ activePage })
  }

  findTxtNote = id => {
    let txtNote
    const txtNotes = [...this.state.activePage.txtNotes]
    txtNotes.forEach(note => {
      if (note.id === id) {
        txtNote = note
      }
    })
    return txtNote
  }

  onAddTxtNote = () => {
    const activePage = this.state.activePage
    const txtNotes = [
      ...activePage.txtNotes,
      {
        id: this.nextId(),
        note: 'Drag to move or Double Click to edit note',
        editing: false,
        color: '#db3e00',
        position: { x: 160, y: 30 }
      }
    ]
    activePage.txtNotes = txtNotes
    this.setState({ activePage })
  }

  onTxtNoteDrag = (e, position, id) => {
    const activePage = this.state.activePage
    const txtNote = this.findTxtNote(id)
    const { x, y } = position
    txtNote.position.x = x
    txtNote.position.y = y
    this.setState({ activePage })
  }

  onTxtNoteToggle = id => {
    const activePage = this.state.activePage
    const txtNote = this.findTxtNote(id)
    const currentEditState = txtNote.editing
    txtNote.editing = !currentEditState
    this.setState({ activePage })
  }

  onTxtNoteSave = (newText, id) => {
    const activePage = this.state.activePage
    const txtNote = this.findTxtNote(id)
    txtNote.note = newText
    this.setState({ activePage })
  }

  onTxtNoteRemove = id => {
    const activePage = this.state.activePage
    const txtNotes = activePage.txtNotes.filter(note => note.id !== id)
    activePage.txtNotes = txtNotes
    this.setState({ activePage })
  }

  onColorChange = (color, id) => {
    const activePage = this.state.activePage
    const txtNote = this.findTxtNote(id)
    txtNote.color = color //Maybe can use CSS-in-JS here
    this.setState({ activePage })
  }

  findImgNote = id => {
    let imgNote
    const imgNotes = [...this.state.activePage.imgNotes]
    imgNotes.forEach(note => {
      if (note.id === id) {
        imgNote = note
      }
    })
    return imgNote
  }

  onAddImgNote = () => {
    const activePage = this.state.activePage
    const imgNotes = [
      ...activePage.imgNotes,
      {
        id: this.nextId(),
        src: '',
        editing: true,
        imgWidth: null,
        imgHeight: null,
        position: {
          x: 160,
          y: 30
        }
      }
    ]
    activePage.imgNotes = imgNotes
    this.setState({ activePage })
  }

  onImgNoteDrag = (e, position, id) => {
    const activePage = this.state.activePage
    const imgNote = this.findImgNote()
    const { x, y } = position
    imgNote.position.x = x
    imgNote.position.y = y
    this.setState({ activePage })
  }

  onImgNoteToggle = id => {
    const activePage = this.state.activePage
    const imgNote = this.findImgNote(id)
    const currentEditState = imgNote.editing
    imgNote.editing = !currentEditState
    this.setState({ activePage })
  }

  onImgNoteSave = (src, id, imgWidth, imgHeight) => {
    const activePage = this.state.activePage
    const imgNote = this.findImgNote(id)
    imgNote.src = src
    imgNote.imgWidth = imgWidth + 'px'
    imgNote.imgHeight = imgHeight + 'px'
    this.setState({ activePage })
  }

  onImgNoteRemove = id => {
    const activePage = this.state.activePage
    const imgNotes = activePage.imgNotes.filter(note => note.id !== id)
    activePage.imgNotes = imgNotes
    this.setState({ activePage })
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="pageListContainer">
            <PageList
              pages={this.state.pages}
              activePage={this.state.activePage}
              changePage={this.flipPage}
            />
          </div>

          <div className="menuContainer">
            <MenuBar
              activePage={this.state.activePage}
              addPage={this.addPage}
              deletePage={this.deletePage}
              onAddTxtNote={this.onAddTxtNote}
              onAddImgNote={this.onAddImgNote}
            />
          </div>

          <div className="pageTitle">
            <PageTitle
              activePage={this.state.activePage}
              onTitleChange={this.onTitleChange}
            />
          </div>
        </div>

        <div className="pageContainer" style={{ height: '100vh' }}>
          <Page
            activePage={this.state.activePage}
            onTxtNoteDrag={this.onTxtNoteDrag}
            onTxtNoteToggle={this.onTxtNoteToggle}
            onTxtNoteSave={this.onTxtNoteSave}
            onTxtNoteRemove={this.onTxtNoteRemove}
            onColorChange={this.onColorChange}
            onImgNoteDrag={this.onImgNoteDrag}
            onImgNoteToggle={this.onImgNoteToggle}
            onImgNoteSave={this.onImgNoteSave}
            onImgNoteRemove={this.onImgNoteRemove}
          />
        </div>
      </div>
    )
  }
}

export default App
