const { getDataCategory } = require('../model/Category');

const CategoryController = {
  getData: async (req, res, next) => {
    let data = await getDataCategory();
    if (data) {
      return res.status(200).json({
        status: 200,
        message: 'GET DATA CATEGORY SUCCESS',
        data: data.rows,
      });
    }
    return res.status(404).json({ status: 404, message: 'DATA NOT FOUND!' });
  },
};

module.exports = CategoryController;
