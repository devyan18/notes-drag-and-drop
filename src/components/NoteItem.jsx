import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function NoteItem (props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} >
      <Card className='m-3 flex-row align-center' >
        <Card.Body {...listeners}>{`${props.sort}: ${props.id.content}`}</Card.Body>
        <Button
          data-no-dnd="true"
          className='float-end'
          variant='danger'
          size='sm'
          type='button'
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            props.onDeleteNote(props.id._id)
          }}
        >Delete</Button>
      </Card>
    </div>
  )
}
