const defaults = require('../config/defaults');
// const { generateQueryString } = require('./qs');

const getTransformdItems = ({ items = [], selection = [], path = '/' }) => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw new Error(`Invalid selection!`);
  }
  if (!selection.length) {
    return items.map((item) => ({ ...item, link: `${path}/${item._id}` }));
  }

  return items.map((item) => {
    const result = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item._id}`;
    return result;
  });
};

const getPagination = ({
  totalItems = defaults.totalItems,
  limit = defaults.limit,
  page = defaults.page,
}) => {
  const totalPage = Math.ceil(totalItems / limit);
  const pagination = {
    page,
    limit,
    totalItems,
    totalPage,
  };
  if (page < totalPage) {
    pagination.next = page + 1;
  }
  if (page > 1) pagination.prev = page - 1;
  return pagination;
};

const getHATEOASForAllItems = ({
  url = '/',
  path = '',
  query = {},
  hasNext = false,
  hasPrev = false,
  page = 1,
}) => {
  // page = Number(page);
  const links = {
    self: url,
  };
  if (hasNext) {
    const queryStr = new URLSearchParams({
      ...query,
      page: page + 1,
    }).toString();

    links.next = `${path}?${queryStr}`;
  }
  if (hasPrev) {
    const queryStr = new URLSearchParams({ ...query, page: page - 1 });
    links.prev = `${path}?${queryStr}`;
  }
  return links;
};

module.exports = { getTransformdItems, getPagination, getHATEOASForAllItems };
