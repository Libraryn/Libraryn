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

  const options = {
    method: 'GET',
    url: 'http://localhost:8080/api/',
  };
  useEffect(() => {
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
<<<<<<< HEAD
      <Sidebar />
      <Library />
      <Details />
=======
      <Details userState={userState} />
      <Library setUserState={setUserState} userState={userState} />
      <Sidebar setUserState={setUserState} />
>>>>>>> 67674d3d8271a7b586715807100201ebc2fb3f15
    </div>
  );
}

export default App;
