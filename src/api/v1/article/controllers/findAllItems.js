const articleService = require('../../../../lib/article');
const defaults = require('../../../../config/defaults');
const { query } = require('../../../../utils');
module.exports = async (req, res, nxt) => {
  try {
    let {
      page = defaults.page,
      limit = defaults.limit,
      sort_type: sortType = defaults.sortType,
      sort_by = defaults.sortBy,
      search = defaults.search,
    } = req.query;
    page = Number(page);
    limit = Number(limit);
    const articles = await articleService.fineAll({
      page,
      limit,
      sortBy: sort_by,
      sortType,
      search,
    });

    const transformed = query.getTransformdItems({
      items: articles,
      path: '/articles',
      selection: [
        '_id',
        'title',
        'body',
        'cover',
        'author',
        'updatedAt',
        'createdAt',
      ],
    });

    const totalItems = await articleService.count({ search });
    const pagination = query.getPagination({ totalItems, page, limit });
    // HATEOAS Links
    const links = query.getHATEOASForAllItems({
      url: req.url,
      page,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
    });
    res.json({
      data: transformed,
      pagination,
      links,
    });
  } catch (e) {
    console.log(e);
    nxt(e);
  }
};
