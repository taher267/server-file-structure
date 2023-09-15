const articleService = require('../../../../lib/article');
module.exports = async (req, res, nxt) => {
  try {
    const { title, body, cover, status } = req.body;
    const author = req.user;
    const article = await articleService.create({
      title,
      body,
      cover,
      status,
      author,
    });
    const response = {
      code: 201,
      message: `Article has been created, Successfully!`,
      data: article,
      links: {
        self: `/articles/${article._id}`,
        author: `/articles/${author._id}/author`,
        comments: `/articles/${author._id}/comments`,
      },
    };
    res.status(201).json(response);
  } catch (e) {
    nxt(e);
  }
};
