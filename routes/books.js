const express = require("express");

const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
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

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No Data To Add Book",
    });
  }

  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "Id Already Exists",
    });
  }
  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Book Added Sucessfully",
    data: allBooks,
  });
});

/*
    Route: /:id
    Method: PUT
    Desc: Update Book By Id
    Access: Public
    Parameters: Id
*/

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found...",
    });
  }

  const updateData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }

    return each;
  });

  return res.status(200).json({
    success: true,
    message: "Updated Book By Their Id",
    data: updateData,
  });
});

/*
    Route: /:id
    Method: PUT
    Desc: Update Book By Id
    Access: Public
    Parameters: Id
*/

// Default Export
module.exports = router;
