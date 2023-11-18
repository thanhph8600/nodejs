const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const multer = require('multer')
const db = require('../db')
const fs = require('fs')
router.use(bodyParser.urlencoded())

const session = require('express-session');
const flash = require('express-flash');

const app = express();

// Set up sessions
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

// Set up flash messages
app.use(flash());

const client = require('./client/client.router')
const admin = require('./admin/admin.router')
router.use('/admin', admin)
router.use('/',client)



module.exports = router
