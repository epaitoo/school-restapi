const express = require('express');
const router = express.Router();
const dbModule = require('../db');
const models = dbModule.models;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const { User } = models;




const authenticateUser = (req, res, next) => {
  let message = null;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  if (credentials) {
    // compare emailAddress property to the user credentials name property:
    
    // find a user from the Users Model
    const user = User.findOne().then((data) => {
      if (data) {
        const users = [];
        users.push(data);
        //Get a user by their email Addres (i.e. the user's "key"
        users.find(u => u.emailAddress === credentials.name);
      }
    })

    // If a user was successfully retrieved from the data store
    // Use the bcryptjs npm package to compare the user's password
    // (from the Authorization header) to the user's password
    if (user) {
      const authenticated = bcryptjs
        .compareSync(credentials.pass, user.password);

          // If the passwords match store the retrieved user object on the request object
          // so any middleware functions that follow this middleware function will have access to the user's information.
        if (authenticated) {
          console.log(`Authentication successful for email Address: ${user.emailAddress}`);
          req.currentUser = user;
        } else {
          message = `Authentication failure for user with email Address: ${user.emailAddress}`;
        }
    } else {
      message = `User not found : ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }

  // If user authentication failed...
  if (message) {
    console.warn(message);
    // Return a response with a 401 Unauthorized HTTP status code.
    res.status(401).json({ message: 'Access Denied' });

  } else {
    // Or if user authentication succeeded...
    // Call the next() method.
    next();
  }
}



//Returns the currently authenticated user
router.get('/', authenticateUser, (req, res) => {
  const user = req.currentUser;
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  
});

// create a new user
router.post('/', (req, res, next) => {
  const user = req.body
  User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    password: user.password
  }).then(() => {
    // Hash the new user's password.
    user.password = bcryptjs.hashSync(req.body.password);
    res.status(201).end()
  }).catch((err) => {
    res.status(400);
    return next(err);
  })   
})







module.exports = router