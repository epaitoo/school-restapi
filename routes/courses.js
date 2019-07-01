// const express = require('express');
// const router = express.Router();
// const dbModule = require('../db');
// const models = dbModule.models;

// const { Course } = models;

// // Returns a list of courses (including the user that owns each course)
// router.get('/');

// // - Returns a the course (including the user that owns the course) for the provided course ID
// router.get('/:id')

// // - Creates a course and sets the Location header to the URI for the course
// router.post('/', (req, res) => {
//   const course = req.body

//   Course.create({
//     title: course.title,
//     description: course.description,
//     estimatedTime: course.estimatedTime,
//     materialsNeeded: course.materialsNeeded
//   }).then(() => {
//     res.status(201).end()
//   })

// });

// // Updates a course and returns no content
// router.put('/:id')

// // Deletes a course and returns no content
// router.delete('/:id')







// module.exports = router