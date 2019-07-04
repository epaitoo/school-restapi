const express = require('express');
const router = express.Router();
const dbModule = require('../db');
const models = dbModule.models;

const { Course, User } = models;

// Returns a list of courses (including the user that owns each course)
router.get('/', (req, res) => {
  Course.findAll({
    include : [
      {
        model : User,
        as: 'User',
      }
    ]
  }).then((course) => {
    res.json(course);
  });
});

// - Returns a the course (including the user that owns the course) for the provided course ID
router.get('/:id', (req, res) => {
  Course.findByPk(req.params.id)
    .then((course) => {
      res.json(course)
    })
})

// - Creates a course and sets the Location header to the URI for the course
router.post('/', (req, res) => {
  const course = req.body

  Course.create({
    title: course.title,
    description: course.description,
    estimatedTime: course.estimatedTime,
    materialsNeeded: course.materialsNeeded,
    UserId: User.id
  }).then(() => {
    res.status(201).end()
  }).catch((err) => {
    err.status = 400;
    return next(err);
  }) 

});

// Updates a course and returns no content
router.put('/:id', (req, res) => {
  Course.findByPk(req.params.id)
    .then((course) => {
      if (course) {
        return course.update(req.body)
      } else {
        res.status(404).json({message: "Course not found"});
      }
  }).then(() => {
    res.status(204).end()
  }).catch((err) => {
    err.status = 400;
    return next(err);
  }) 
    
})

// Deletes a course and returns no content
router.delete('/:id', () => {
  Course.findByPk(req.params.id)
    .then((course) => {
      if (course) {
        return course.destroy();
      } else {
        res.status(404).json({message: "Course not found"});
      }
    }).then(() => {
      res.status(204).end()
    }).catch((err) => {
      return next(err);
    })
})







module.exports = router