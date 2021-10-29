require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { join } = require('path');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const PORT = process.env.PORT || 3001;

const { json, urlencoded } = express;

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));

app.use(function (req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err) {
        return next();
      }
      User.findOne({
        id: decoded.id,
      }).then((user) => {
        req.user = user;
        return next();
      });
    });
  } else {
    return next();
  }
});

// require api routes here after I create them
app.use('/auth', require('./routes/auth/index'));
app.use('/api', require('./routes/api/index'));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongodb db connection established');
});

app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
