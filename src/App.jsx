import { useSession } from './providers/SessionProvider'
import { Auth, Notes } from './pages'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NotesProvider from './providers/NotesProvider'

function App () {
  const session = useSession()
  return session ? <NotesProvider><Notes/></NotesProvider> : <Auth />
}

export default App
