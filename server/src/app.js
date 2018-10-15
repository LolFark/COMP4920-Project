const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
app.use(morgan('combined')); // level of logging
app.use(bodyParser.json());
app.use(cors());

// DB connection
mongoose.connect('mongodb://user:testing1@ds151382.mlab.com:51382/communicourse', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.once('open', () => { console.log('DB connected'); });

app.get('/', (req, res) => res.send('Hello World!'));

// Use router
require('./routes')(app);

// Hosting port for server
app.listen(process.env.PORT || 8081);
