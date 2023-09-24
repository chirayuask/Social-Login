import './App.css';
import LoginModal from './Components/Auth/LoginModal';
import { useState } from 'react';

function App() {
  const [signInModal, setSignInModal] = useState(true);
  return (
    <LoginModal signInModal={signInModal} setSignInModal={setSignInModal} />
  );
}

export default App;
