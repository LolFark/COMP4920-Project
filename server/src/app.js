"use strict"
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
app.use(morgan('combined')) // level of logging
app.use(bodyParser.json())
app.use(cors())

// DB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:testing1@ds151382.mlab.com:51382/communicourse', { useNewUrlParser: true } )
var db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error"
));
db.once("open", function(callback) {
  console.log("DB connected");
});

// Add new course
app.post('/course', (req, res) => {
  var code = req.body.code;
  var name = req.body.name;
  var faculty = req.body.faculty;
  var co_reqs = req.body.co_reqs;
  var pre_reqs = req.body.pre_reqs;
  var exclusions = req.body.exclusions;
  var handbook_URL = req.body.hURL;
  var new_course = new Course({
    code: code,
    name: name,
    faculty: faculty,
    co_reqs: co_reqs,
    pre_reqs: pre_reqs,
    exclusions: exclusions,
    handbook_URL: handbook_URL,
  })

  new_course.save(function (error) {
    if (error) {
      console.log(error);
    }
    console.log(code + " added");
    res.send({
      success: true,
      message: "Course " + code + " added"
    })
  })
});

app.get('/comments', (req,res) => {
  Comment.find({}, 'user course content', function(error, courses) {
    if (error) {
      console.error(error);
    }
    res.send({
      comments: comments
    })
  })
})

app.get('/', (req, res) => res.send('Hello World!'))

// Use router 
require('./routes') (app)

// Hosting port for server
app.listen(process.env.PORT || 8081)

