import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookInfo({ userState }) {
  // temp, need get actual cover image from api

  return (
    <div className="details__bookInfo flex">
      <img src={`http://covers.openlibrary.org/b/id/${userState.selectedBook.cover}.jpg`} alt="book cover" />

      <span>{userState.selectedBook.title}</span>
      <span>{userState.selectedBook.author}</span>
      <span>{userState.selectedBook.condition}</span>
      <span>{userState.selectedBook.borrower}</span>
    </div>
  );
}

export default BookInfo;
