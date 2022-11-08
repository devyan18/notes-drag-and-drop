import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSession } from '../providers/SessionProvider'
import { createNote } from '../services/notes.services'
import Modal from './Modal'

export default function CreateNoteModal ({ handleClose, show }) {
  const session = useSession()
  const [content, setContent] = useState()

  const handleCreateNewNote = (session, content) => {
    createNote(session, content).then(() => {
      handleClose()
    })
  }

  return (
    <Modal
      title="Create Note"
      show={show}
      handleClose={handleClose}
      onAccept={() => {
        handleCreateNewNote(session, content)
      }}
    >
      <Form.Control
        onChange={e => setContent(e.target.value)}
        value={content}
        as="textarea"
        placeholder="Write your note here"
        style={{ height: '100px' }}
      />
    </Modal>
  )
}
