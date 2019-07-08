const express = require('express');
const router = express.Router();
const dbModule = require('../db');
const models = dbModule.models;
const bcryptjs = require('bcryptjs');

const authenticateUser = require('../authenticate');

const { User } = models;



// router.get('/', (req, res) => {
//   User.findAll().then((user) => {
//     res.json(user);
//   })
 
// });



//Returns the currently authenticated user
router.get('/', authenticateUser,  (req, res) => {
  const user = users;
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress
    })
 
});

// create a new user
router.post('/', (req, res, next) => {
  const user = req.body
  // hash the password if provided
  if (user.password) {
    user.password = bcryptjs.hashSync(user.password);
  }
  console.log(user);

  User.create(user).then(() => {
    res.location('/');
    res.status(201).end()
    
    
  }).catch((err) => {
    if (err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
      res.status(400).json({error: err})
    } else {
      throw err;
    }
  })
  .catch((err) => {
    return next(err);
  })   
})




module.exports = router