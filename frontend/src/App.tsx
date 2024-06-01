import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Header, Section } from './components';
import { Home, Login, Me, Signin } from './pages';

const App: React.FC = function() {
  return (
    <Router>
      <main>
        <Header />
        <Section>
          <Routes>
            <Route path='/' element={<Home /> } />
            <Route path='/me' element={<Me /> } />
            <Route path='/login' element={<Login /> } />
            <Route path='/signin' element={<Signin /> } />
          </Routes>
        </Section>
        <ToastContainer />
      </main>
    </Router>
  );
}

export default App;
