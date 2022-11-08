import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Container } from 'react-bootstrap'
import { useNotes, useSetNotes } from '../providers/NotesProvider'
import { useSession } from '../providers/SessionProvider'
import { deleteNote } from '../services/notes.services'
import NoteItem from './NoteItem'

export default function NoteList () {
  const notes = useNotes()
  const setNotes = useSetNotes()
  const session = useSession()

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id.sort !== over.id.sort) {
      setNotes((items) => {
        const oldIndex = items.findIndex((item) => item.sort === active.id.sort)
        const newIndex = items.findIndex((item) => item.sort === over.id.sort)
        const newItems = arrayMove(items, oldIndex, newIndex)
        return newItems
      })
    }
  }

  const handleDeleteNote = (noteId) => {
    deleteNote(session, noteId)
      .then(() => {
        setNotes(notes.filter(note => note._id !== noteId))
      })
  }
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Container className='p-3' style={{ width: '100%' }} align="center">
        <h2>My Notes With Drag and Drop</h2>
        <SortableContext
          items={notes}
          strategy={verticalListSortingStrategy}
        >
          {notes.map((note, index) => (
            <NoteItem
              key={note._id}
              id={note}
              sort={index}
              onDeleteNote={handleDeleteNote}
            />
          ))}
        </SortableContext>
      </Container>
    </DndContext>
  )
}
