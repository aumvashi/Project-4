const express = require("express");

const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById
} = require("../controllers/book-controller");

// Data import
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
// const { route } = require("./users");

// Local Router
const router = express.Router();

const { UserModel, BookModel } = require("../models/index");

/*
    Route: /
    Method: GET
    Desc: Get all books
    Access: Public
    Parameters: None
*/

router.get("/", getAllBooks);

/*
    Route: /:id
    Method: GET
    Desc: Get Books By Id
    Access: Public
    Parameters: None
*/

router.get("/:id", getSingleBookById);

/*
    Route: /books/issued
    Method: GET
    Desc: Get All Issued Books
    Access: Public
    Parameters: None
*/

router.get("/issued/user", getAllIssuedBooks);

/*
    Route: /
    Method: POST
    Desc: Add Book
    Access: Public
    Parameters: None
*/

router.post("/", addNewBook);
/*
    Route: /:id
    Method: PUT
    Desc: Update Book By Id
    Access: Public
    Parameters: Id
*/

router.put("/:id", updateBookById);

/*
    Route: /:id
    Method: PUT
    Desc: Update Book By Id
    Access: Public
    Parameters: Id
*/

// Default Export
module.exports = router;
