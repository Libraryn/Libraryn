import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Details from './containers/Details';
import Library from './containers/Library';
import Sidebar from './containers/Sidebar';
import Login from './containers/Login';

function App() {
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    login: '',
    books: [],
    selectedBook: '',
  });

  function LOGIN() {
    setUserState((state) => ({
      ...state,
      isLoggedIn: true,
    }));
  }

  function UPDATE() {
    const options = { method: 'GET', url: 'http://localhost:8080/api/getlibrary' };
    axios
      .request(options)
      .then(function (res) {
        setUserState((state) => ({ ...state, books: res.data }));
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    console.log(userState.login)
    const options = {
      method: 'GET',
      url: 'http://localhost:8080/api/',
    };
    axios
      .request(options)
      .then(function (response) {
        LOGIN();

        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  if (userState.isLoggedIn === false) {
    return <Login LOGIN={LOGIN} />;
  }

  return (
    <div className="grid-container">
      <Details userState={userState} />
      <Library setUserState={setUserState} userState={userState} UPDATE={UPDATE} />
      <Sidebar setUserState={setUserState} />
    </div>
  );
}

export default App;
