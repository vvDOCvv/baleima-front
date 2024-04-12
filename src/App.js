import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppRouter from './utils/AppRouter';
import './index.scss';

function App() {
  const [isLogged, setIsLogged] = useState(() => {
    const storedIsLogged = localStorage.getItem('isLogged');
    return storedIsLogged ? JSON.parse(storedIsLogged) : false;
  });

  useEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
  }, [isLogged]);

  return (
    <BrowserRouter>
        <AppRouter isLogged={isLogged} setIsLogged={setIsLogged}/>
    </BrowserRouter>
  );
}

export default App;
