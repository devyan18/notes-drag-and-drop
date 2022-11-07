import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {
  DndContext,
  closestCenter
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { createNote, deleteNote, getAllNotes, reorderNotes } from '../../services/notes.services';
import { SetSession, useSession } from '../../providers/SessionProvider';
import NoteItem from '../../components/NoteItem';
import useModal from '../../hooks/useModal';
import Modal from '../../components/Modal';
import Form from 'react-bootstrap/Form';

const Notes = () => {
  const session = useSession();
  const changeSession = SetSession();

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const { show, handleClose, handleShow } = useModal();

  useEffect(() => {
    getAllNotes(session)
      .then(setNotes);
  }, []);

  const handleLogout = () => {
    changeSession(null);
  };

  useEffect(() => {
    reorderNotes(session, notes.map(note => note._id));
  }, [notes]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id.sort !== over.id.sort) {
      setNotes((items) => {
        const oldIndex = items.findIndex((item) => item.sort === active.id.sort);
        const newIndex = items.findIndex((item) => item.sort === over.id.sort);
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems;
      });
    }
  };

  const handleCreateNewNote = (session, content) => {
    createNote(session, content).then(() => {
      getAllNotes(session)
        .then((notes) => {
          setNotes(notes);
          handleClose();
          setContent('');
        });
    });
  };

  const handleDeleteNote = (id) => {
    deleteNote(session, id)
      .then(() => {
        setNotes(notes.filter(note => note._id !== id));
      });
  };

  return (
		<Container className="mt-3">
			<Modal
				title="Create Note"
				show={show}
				handleClose={handleClose}
				onAccept={() => {
				  handleCreateNewNote(session, content);
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

			<div className="d-flex flex-row">
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
							{notes.map((note, index) => <NoteItem key={note._id} id={note} sort={index} onDeleteNote={handleDeleteNote}/>)}
						</SortableContext>
					</Container>
				</DndContext>
				<Container className='p-3' style={{ width: '20%' }} align="center">
					<Button
						className='mb-2'
						as='input'
						size='sm'
						variant='secondary'
						onClick={handleLogout}
						value='Logout'
					/>
					<Button
						size='sm'
						as="input"
						value="Create Note"
						onClick={handleShow}
					/>
				</Container>

			</div>
		</Container>
  );
};

export default Notes;
