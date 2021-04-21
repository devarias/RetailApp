import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from './components/Spinner';
import MainPage from './components/MainPage';
import './App.css';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className='container spin'>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return loginWithRedirect();
  }

  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
