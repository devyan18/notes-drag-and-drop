import CreateNoteModal from '../../components/CreateNoteModal'
import { SetSession } from '../../providers/SessionProvider'
import Container from 'react-bootstrap/Container'
import useModal from '../../hooks/useModal'
import NoteList from '../../components/NoteList'
import Actions from '../../components/Actions'

const Notes = () => {
  const changeSession = SetSession()

  const { show, handleClose, handleShow } = useModal()

  const handleLogout = () => {
    changeSession(null)
  }

  return (
    <Container className="mt-3">
      <CreateNoteModal handleClose={handleClose} show={show} />
      <div className="d-flex flex-row">
        <NoteList />
        <Actions
          handleLogout={handleLogout}
          handleShow={handleShow}
        />
      </div>
    </Container>
  )
}

export default Notes
