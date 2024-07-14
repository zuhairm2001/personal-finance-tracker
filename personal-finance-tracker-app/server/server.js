const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');
const connect = require('./config/database.cjs');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./build'));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Personal Finance Tracker API!' });
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
connect().then(() => {
  // Start the server only after successful database connection
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
  });
}).catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1);
});
