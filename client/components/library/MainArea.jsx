/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainArea({ setUserState, userState, UPDATE }) {
  const [selected, setSelected] = useState();
  const [updateBorrower, setUpdateBorrower] = useState('');
  const [borrower, setBorrower] = useState();
  const [updateCondition, setUpdateCondition] = useState('');
  const [condition, setCondition] = useState();
  const refreshImage =
    'https://w7.pngwing.com/pngs/632/264/png-transparent-computer-icons-synchronization-encapsulated-postscript-icon-design-update-button-angle-text-logo-thumbnail.png';
  const checkImage =
    'https://w7.pngwing.com/pngs/5/658/png-transparent-check-mark-icon-design-icon-black-checkmark-text-noun-project-symbol-thumbnail.png';
  const trashImage =
    'https://w7.pngwing.com/pngs/178/524/png-transparent-computer-icons-black-and-white-trash-icon-white-text-rectangle-thumbnail.png';
  useEffect(() => {
    const options = { method: 'GET', url: 'http://localhost:8080/api/getlibrary' };
    axios
      .request(options)
      .then(function (res) {
        setUserState((state) => ({ ...state, books: res.data }));
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  function changeBorrower() {
    setUpdateBorrower('');
    const options = {
      method: 'POST',
      url: 'http://localhost:8080/api/borrower',
      data: {
        book_id: userState.selectedBook.book_id,
        borrower,
      },
    };

    axios
      .request(options)
      .then(function (res) {
        UPDATE();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function deleteBook(book) {
    const options = {
      method: 'DELETE',
      url: 'http://localhost:8080/api/delete',
      data: {
        book_id: book,
      },
    };
    axios
      .request(options)
      .then(function (res) {
        UPDATE();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function changeCondition() {
    setUpdateCondition('');
    const options = {
      method: 'POST',
      url: 'http://localhost:8080/api/condition',
      data: {
        book_id: userState.selectedBook.book_id,
        condition,
      },
    };
    console.log(options);
    axios
      .request(options)
      .then(function (res) {
        UPDATE();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const list = userState.books.map((row) => {
    console.log(userState.books);
    return (
      <li
        key={row.title}
        id={row.title}
        className={`${selected === `${row.title}` ? 'listItem flex selected' : 'listItem flex'}`}
        onClick={() => {
          setSelected(row.title);
          setUserState((prevState) => ({
            ...prevState,
            selectedBook: {
              title: row.title,
              author: row.author,
              borrower: row.borrower,
              condition: row.condition,
              image: row.image,
              book_id: row.book_id,
            },
          }));
        }}>
        <span className="listItem__title">
          <input
            className="listItem__delete"
            type="image"
            src={trashImage}
            onClick={() => {
              deleteBook(row.book_id);
            }}
          />
          {row.title}
        </span>
        <span className="listItem__author">{row.author}</span>
        <div className="borrower flex">
          {updateBorrower == row.title ? (
            <>
              <input
                name="borrow__select"
                className="name"
                id={`select__${row.image}`}
                onChange={(e) => {
                  setBorrower(e.target.value);
                }}
              />

              <input type="image" src={checkImage} onClick={() => changeBorrower()} />
            </>
          ) : (
            <>
              <span>{row.borrower}</span>
              <input type="image" src={refreshImage} onClick={() => setUpdateBorrower(row.title)} />
            </>
          )}
        </div>
        <div className="condition flex">
          {updateCondition == row.title ? (
            <>
              <input
                name="condition__select"
                className="name"
                id={`select__${row.image}`}
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
              />

              <input
                className="image"
                type="image"
                src={checkImage}
                onClick={() => changeCondition()}
              />
            </>
          ) : (
            <>
              <span>{row.condition}</span>
              <input
                className="image"
                type="image"
                src={refreshImage}
                onClick={() => setUpdateCondition(row.title)}
              />
            </>
          )}
        </div>
      </li>
    );
  });

  return (
    <div className="library__mainArea flex">
      <ul className="flex">
        <li key="default" id="default" className="listItem header flex">
          <span>Title</span>
          <span>Author</span>
          <span>Borrower</span>
          <span>Condition</span>
        </li>
        {list || null}
      </ul>
    </div>
  );
}

export default MainArea;
