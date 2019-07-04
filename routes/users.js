const express = require('express');
const router = express.Router();
const dbModule = require('../db');
const models = dbModule.models;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const { User } = models;





const authenticateUser = (req, res, next ) => {
  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  if (credentials) {
    // retrieve the user from the data store by their email Address 
    // (i.e. the user's "key" from the Authorization header).
    User.findOne({
        where : {
          emailAddress : credentials.name
        }
      }).then(user => {
          // if user is found compare password "key" 
        if (user) {
          const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
          // if authenricate store user in the variable
          // so any middleware functions that follow this middleware function
          // will have access to the user's information.
          if (authenticated) {
            console.log(`Authentication successful for email Address: ${user.emailAddress}`);
             users = user;
            //  console.log(users);
             next();
          } else {
            console.log(`Authentication failure for user with email Address: ${user.emailAddress}`);
            res.status(401).json({ message: 'Access Denied' });
          } 
        } else {
          console.log( `User not found with email Address: ${credentials.name}`);
          res.status(401).json({ message: 'Access Denied' });
        }   
      })
    } else {
      console.log('Auth header not found');
      res.status(401).json({ message: 'Access Denied' });
    }
}
 


//Returns the currently authenticated user
router.get('/',  authenticateUser, (req, res) => {
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