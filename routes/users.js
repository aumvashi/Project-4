const express = require("express");

const {
  getAllUser,
  getSingleUserById,
  deleteUser,
  updateUserData,
} = require("../controllers/user-controller");

const { users } = require("../data/users.json");

const router = express.Router();

const { UserModel, BookModel } = require("../models/index");

/*
    Route: /
    Method: GET
    Desc: Get all users
    Access: Public
    Parameters: None
*/

router.get("/", getAllUser);

/*
    Route: /:id
    Method: GET
    Desc: Get Users By Id
    Access: Public
    Parameters: id
*/

router.get("/:id", getSingleUserById);

/*
    Route: /
    Method: POST
    Desc: Add New User
    Access: Public
    Parameters: None
*/

router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);

  if (user) {
    res.status(404).json({
      success: false,
      message: "ID Already Exixts...",
    });
  }
  users.push({
    id,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "User Added Successfully...",
    data: users,
  });
});

/*
    Route: /:id
    Method: PUT
    Desc: Updating User by ID
    Access: Public
    Parameters: ID
*/

router.put("/:id", updateUserData);

/*
    Route: /:id
    Method: DELETE
    Desc: Deleting User by ID
    Access: Public
    Parameters: ID
*/

router.delete("/:id", deleteUser);

/*
    Route: /subscription-details/:id
    Method: GET
    Desc: Get All User Subscription Details
    Access: Public
    Parameters: ID
*/

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      // current Date
      date = new Date();
    } else {
      // getting date on a basis of data variable
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionDate - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 100
          : 50
        : 0,
  };

  res.status(200).json({
    success: true,
    message: "Subscription Details : ",
    data: data,
  });
});
module.exports = router;
