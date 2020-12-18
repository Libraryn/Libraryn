import React, { useState, useEffect } from 'react';

import SearchBar from '../components/library/SearchBar';
import MainArea from '../components/library/MainArea';

function Library({ setUserState, userState, UPDATE }) {
  return (
    <main className="library__container">
      <SearchBar setUserState={setUserState} />
      <MainArea setUserState={setUserState} userState={userState} UPDATE={UPDATE} />
    </main>
  );
}

export default Library;
