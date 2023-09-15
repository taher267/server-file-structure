const express = require('express'),
  { rateLimit } = require('express-rate-limit');
const middlewires = [
  express.json(),
  require('morgan')('dev'),
  rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 100,
  }),
];
module.exports = (app) => {
  app.use(middlewires);
};
