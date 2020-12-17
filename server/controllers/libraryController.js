const { library } = require("webpack");
const db = require("../models/db");

const fetchLibrary = `SELECT * FROM libraries l INNER JOIN users u ON u._id = l.user_id INNER JOIN books b ON b._id = l.book_id WHERE u._id = $1`;

const addBook = `INSERT INTO books(title, author) VALUES ($1, $2);`;
const addToLibrary = `INSERT INTO libraries(user_id, book_id, borrower, condition) VALUES ($1, $2, $3, $4);`;
const deleteBook = `DELETE FROM libraries WHERE user_id = $1 AND book_id = $2`;
const updateBorrower = `UPDATE libraries SET borrower = $1 WHERE user_id = $2 AND book_id = $3`;
const updateCondition = `UPDATE libraries SET condition = $1 WHERE user_id = $2 AND book_id = $3`;

const libraryController = {};

libraryController.addLibrary = (req, res, next) => {
  console.log("beginning new library entry");
  const { borrower, condition } = req.body;
  const { user_id } = req.cookie;
  console.log("these are cookies", req.cookie);
  const { _id } = res.locals.book;
  console.log(_id);
  const params = [user_id, _id, borrower, condition];
  db.query(addToLibrary, params)
    .then((data) => {
      console.log(data.rows);
      console.log("added new library entry!");
      return next();
    })
    .catch((e) => {
      return next(e);
    });
};

libraryController.getLibrary = (req, res, next) => {
  console.log("in get Library");
  const { user_id } = req.body;
  console.log(req.body);
  const params = [user_id];
  db.query(fetchLibrary, params)
    .then((data) => {
      res.locals.library = data.rows;
      console.log(data.rows);
      console.log("got new library!");
      return next();
    })
    .catch((e) => {
      return next(e);
    });
};

libraryController.deleteFromLibrary = (req, res, next) => {
  console.log("preparing to delete book");
  const { book_id } = req.body;
  const user_id = req.cookie.user_id;
  console.log(`the user id is: ${user_id}`, `the book id is: ${book_id}`);
  const params = [user_id, book_id];
  db.query(deleteBook, params)
    .then((data) => {
      console.log(data);
      console.log("deleted book");
      return next();
    })
    .catch((e) => {
      return next(e);
    });
};

libraryController.changeBorrower = (req, res, next) => {
  console.log("preparing to change borrower");
  const { borrower, book_id } = req.body;
  const user_id = req.cookie.user_id;
  const params = [borrower, user_id, book_id];
  db.query(updateBorrower, params)
    .then((data) => {
      console.log(data);
      console.log("updated borrower");
      return next();
    })
    .catch((e) => {
      return next(e);
    });
};

libraryController.changeCondition = (req, res, next) => {
  console.log("preparing to change condition");
  const { condition, book_id } = req.body;
  const user_id = req.cookie.user_id;
  const params = [condition, user_id, book_id];
  db.query(updateCondition, params)
    .then((data) => {
      console.log("This is change condition data: ", data);
      console.log("updated condition");
      return next();
    })
    .catch((e) => {
      return next(e);
    });
};

module.exports = libraryController;
