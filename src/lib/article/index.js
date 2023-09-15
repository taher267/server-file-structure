const Article = require('../../model/Article');
const User = require('../../model/User');
const defaults = require('../../config/defaults');
const fineAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
  const skip = limit * page - limit;
  const filter = {};
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }
  const articles = await Article.find(filter)
    .populate({ path: 'author', select: 'name' })
    .sort(sortStr)
    .skip(skip)
    .limit(limit)
    // .select('body')
    .exec();
  console.log(skip);
  return articles;
};

const count = ({ search = '' }) => {
  const filter = {};
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }
  return Article.count(filter);
};

/**
 * Create a new article
 * @param {*} param0
 * @returns
 */
const create = async ({
  title,
  body = '',
  cover = '',
  status = 'draft',
  author,
}) => {
  if (!title || !author) {
    const error = new Error('Invalid parameters');
    error.status = 400;
    throw error;
  }

  const article = new Article({
    title,
    body,
    cover,
    status,
    author: author._id,
  });

  await article.save();
  return {
    ...article._doc,
    // id: article.id,
  };
};
module.exports = { fineAll, count, create };
