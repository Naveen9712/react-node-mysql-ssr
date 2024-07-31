const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('../dist/server.bundle.js').default;

const app = express();
const port = 3000;

// Setup MySQL connection
const sequelize = new Sequelize('mydb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = require('./models/user')(sequelize, DataTypes);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Routes
app.get('/', (req, res) => {
  const appString = ReactDOMServer.renderToString(React.createElement(App));
  res.render('index', { app: appString });
});

app.post('/submit', async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.create({ name, email });
    res.json({ success: true, message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
