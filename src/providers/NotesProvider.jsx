import { createContext, useContext, useState, useEffect } from 'react'
import { getAllNotes, reorderNotes } from '../services/notes.services'
import { useSession } from './SessionProvider'

const NotesContext = createContext()

const NotesProvider = ({ children }) => {
  const session = useSession()
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getAllNotes(session)
      .then(setNotes)
  }, [])

  const refreshNotes = () => {
    getAllNotes(session)
      .then(setNotes)
  }

  useEffect(() => {
    reorderNotes(session, notes)
  }, [notes])

  return (
    <NotesContext.Provider value={{ notes, setNotes, refreshNotes }}>
      {children}
    </NotesContext.Provider>
  )
}

const useNotes = () => useContext(NotesContext).notes
const useSetNotes = () => useContext(NotesContext).setNotes
const useRefreshNotes = () => useContext(NotesContext).refreshNotes

export { useNotes, useSetNotes, useRefreshNotes }
export default NotesProvider
