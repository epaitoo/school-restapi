const express = require('express');
const router = express.Router();
const dbModule = require('../db');
const models = dbModule.models;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const { User } = models;



const authenticateUser = (req, res, next) => {
  // let message = null;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  if (credentials) {

    User.findOne({
      where : {
        emailAddress : credentials.name
      }
    })
      .then((user) => {
        if (user) {
          
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
          if (authenticated) {
            req.currentUser = user;
            console.log(`Authentication successful for email Address: ${user.emailAddress}`);
          } else {
            console.log(`Authentication failure for user with email Address: ${user.emailAddress}`);
          }
        } else {
          console.log(`User not found : ${credentials.name}`);
        }

      });
  } else {
    console.log('Auth header not found');
  }

 next();
}
 


//Returns the currently authenticated user
router.get('/', authenticateUser, (req, res) => {

});

// create a new user
router.post('/', (req, res, next) => {
  const user = req.body
  // Hash the new user's password.
  user.password = bcryptjs.hashSync(user.password);
  User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    password: user.password
  }).then(() => {
    res.status(201).end()
    
  }).catch((err) => {
    err.status = 400;
    return next(err);
  })   
})







module.exports = router