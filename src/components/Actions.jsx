import { Button, Container } from 'react-bootstrap'

export default function Actions ({
  handleLogout,
  handleShow
}) {
  return (
    <Container className='p-3 d-flex flex-column ' style={{ width: '30%' }} align="center">
      <Button
        className='mb-2'
        size='sm'
        variant='secondary'
        onClick={handleLogout}
      >Logout</Button>
      <Button
        size='sm'
        onClick={handleShow}
      >Create</Button>
    </Container>
  )
}
