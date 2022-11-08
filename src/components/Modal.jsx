import Button from 'react-bootstrap/Button'
import { Modal as BtsModal } from 'react-bootstrap'

export default function Modal ({
  title,
  children,
  handleClose,
  onAccept,
  show
}) {
  return (
      <BtsModal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <BtsModal.Header closeButton>
          <BtsModal.Title>{title}</BtsModal.Title>
        </BtsModal.Header>
        <BtsModal.Body>
          {children}
        </BtsModal.Body>
        <BtsModal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={onAccept}>Accept</Button>
        </BtsModal.Footer>
      </BtsModal>
  )
}
