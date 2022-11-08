import { createContext, useContext, useState, useEffect } from 'react'

const SessionContext = createContext()

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    const session = localStorage.getItem('session')
    setSession(session)
  }, [])

  const changeSession = (token) => {
    if (token) {
      localStorage.setItem('session', token)
      setSession(token)
    }

    if (!token) {
      localStorage.removeItem('session')
      setSession(null)
    }
  }

  return (
    <SessionContext.Provider value={{ session, changeSession }}>
      {children}
    </SessionContext.Provider>
  )
}

const useSession = () => useContext(SessionContext).session
const SetSession = () => useContext(SessionContext).changeSession

export { useSession, SetSession }
export default SessionProvider
