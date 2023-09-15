const express = require('express');
const applyMiddleware = require('./middleware');
const routes = require('./routes');
// express app
const app = express();
app.use((req, _res, next) => {
  req.user = {
    _id: '65037297a8e9459d07e91dc8',
    name: 'Clayton Jacobson',
  };
  next();
});
applyMiddleware(app);
app.use(routes);
app.get('/health', (req, res) => {
  res.status(200).json({
    health: 'OK',
    user: req.user,
  });
});
app.get('/', (req, res) => {
  res.status(200).json({
    ...req.headers,
  });
});

app.use((err, _, res, _nxt) => {
  const status = err?.status || 500,
    message = err.message,
    errors = err.errors;
  res.status(status).json({ message, errors });
});

module.exports = app;
