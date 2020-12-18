/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({setUserState}) {
  const [searchValue, setSearchValue] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState();
  const [showResults, setShowResults] = useState(false);

  function makeOptions(data) {
    const _results = data.map((item) => {
      return { title: item.title, author: item.author_name[0], image: item.cover_i };
    });
    const options = data.map((el) => {
      return (
        <option key={el.cover_i} value={el.cover_i}>
          {`${el.title} ${el.author_name[0]} `}
        </option>
      );
    });
    setResults(_results);
    setSelectOptions(options);
    setSelected(_results[0].image);
  }

  function addBook(e) {
    e.preventDefault();
    setShowResults(false);

    let requestObject;
    Object.keys(results).forEach((el) => {
      if (results[el].image == selected) {
        requestObject = {
          title: results[el].title,
          author: results[el].author,
          image: results[el].image,
          borrower: 'none',
          condition: 'New'
        };
      }
    });
    const options = {
      method: 'POST',
      url: 'http://localhost:8080/api/book',
      data: requestObject,
    };

    axios
      .request(options)
      .then(function (response) {
        setUserState((state) => ({...state,  books: [...state.books, requestObject] }));
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log('123', options);
  }

  function search(e) {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { title: searchValue },
    };
    axios
      .request(options)
      .then(function (res) {
        setShowResults(true);
        makeOptions(res.data.docs.slice(0, 5));
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function handleSelectChange(e) {
    setSelected(e.target.value);
  }

  return (
    <form onSubmit={(e) => search(e)} className="library__searchBar flex">
      {showResults ? (
        <>
          <select
            name="searchResults"
            className="searchBar__select"
            onChange={(e) => {
              handleSelectChange(e);
            }}>
            {selectOptions}
          </select>
          <input
            type="button"
            value="add"
            className="searchBar__add"
            onClick={(e) => {
              addBook(e);
            }}
          />
        </>
      ) : (
        <>
          <input
            type="text"
            name="search"
            className="searchBar__input"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <input type="submit" value="Search" className="searchBar__button" />
        </>
      )}
    </form>
  );
}

export default SearchBar;
