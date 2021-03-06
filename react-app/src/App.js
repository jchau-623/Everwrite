import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/index'
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import NotesPage from './components/NotesPage';
import Footer from './components/Footer';
import NotebooksPage from './components/NotebooksPage';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage/ErrorPage';
// import SingleNotebookPage from './components/SingleNotebook';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(({ session }) => session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user && <NavBar />}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/notes' exact={true}>
          <NotesPage />
        </ProtectedRoute>
        <ProtectedRoute path='/notebooks' exact={true}>
          <NotebooksPage />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/:name' exact={true} >
          <SingleNotebookPage  />
        </ProtectedRoute> */}
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
