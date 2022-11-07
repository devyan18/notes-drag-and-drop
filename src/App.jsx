import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from './providers/SessionProvider';
import { Auth, Notes } from './pages';

function App () {
  const session = useSession();

  return (
    <>
      {
        session
          ? <Notes/>
          : <Auth />
      }
    </>
  );
}

export default App;
