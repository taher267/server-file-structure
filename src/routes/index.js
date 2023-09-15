const router = require('express').Router();
const { controllers: articleController } = require('../api/v1/article');
const base = `/api/v1/articles`;
// Article routes
router
  .route(base)
  .get(articleController.findAllItems)
  .post(articleController.createItem);
module.exports = router;
