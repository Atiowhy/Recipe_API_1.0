const {
  getRecipe,
  getRecipeAll,
  getRecipeCount,
  getRecipeById,
  postRecipe,
  putRecipe,
  deleteRecipe,
  GetRecipeByUsesr,
} = require('../model/ModelRecipe');

const RecipeController = {
  getDataDetail: async (req, res, next) => {
    const { search, searchBy, limit } = req.query;

    let page = req.query.page || 1;
    let limiter = limit || 5;

    data = {
      search: search || '',
      searchBy: searchBy || 'title',
      offset: (page - 1) * limiter,
      limit: limit || 5,
    };
    let dataRecipe = await getRecipe(data);
    let dataRecipeCount = await getRecipeCount(data);

    let pagination = {
      totalPage: Math.ceil(dataRecipeCount.rows[0].count / limiter),
      totalData: parseInt(dataRecipeCount.rows[0].count),
      pageNow: parseInt(page),
    };

    console.log('dataRecipe');
    console.log(dataRecipe);
    console.log('total data');
    console.log(dataRecipeCount.rows[0].count);
    if (dataRecipe) {
      res.status(200).json({
        status: 200,
        message: 'get data recipe success',
        data: dataRecipe.rows,
        pagination,
      });
    }
  },

  getData: async (req, res, next) => {
    let dataRecipe = await getRecipeAll(); //ambil data dari controller
    console.log('Data Recipe: ');
    console.log(dataRecipe);
    if (dataRecipe) {
      res.status(200).json({
        status: 200,
        message: 'get data recipe success',
        data: dataRecipe.rows,
      }); //panggil data
    }
  },
  getDataById: async (req, res, next) => {
    const { id } = req.params; //inisialisasi id

    //validasi
    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: 'id wrong' });
    }

    //ubah id ke int
    let dataRecipeId = await getRecipeById(parseInt(id));
    console.log('data Recipe: ');
    console.log(dataRecipeId);

    //lakukan validasi
    if (!dataRecipeId.rows[0]) {
      return res
        .status(200)
        .json({ status: 200, message: 'get data recipe not found', data: [] });
    }
    return res.status(200).json({
      status: 200,
      message: 'get data recipe success',
      data: dataRecipeId.rows[0],
    });
  },

  getUsersRecipe: async (req, res, next) => {
    const { users_id } = req.params;
    try {
      if (!users_id) {
        return res.status(404).json({ status: 404, message: 'ID NOT FOUND!' });
      }
      let dataRecipeUsers = await GetRecipeByUsesr(users_id);
      console.log('data: ');
      console.log(dataRecipeUsers);

      if (!dataRecipeUsers.rows[0]) {
        return res
          .status(404)
          .json({ status: 404, message: 'DATA RECIPE NOT FOUND!' });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: 'GET DATA RECIPE SUCCESS!',
          data: dataRecipeUsers.rows,
        });
    } catch (error) {}
  },
  postData: async (req, res, next) => {
    const { title, ingridients, category_id } = req.body; //inisialisasi data
    console.log('pos data'); //tampilkan data
    console.log(title, ingridients, category_id); //tampilkan data

    let users_id = req.payload.id;
    console.log('payload');
    console.log(req.payload);

    if (!title || !ingridients || !category_id) {
      return res
        .status(404)
        .json({ message: 'input title, ingridients, category required !' });
    } //validation
    let data = {
      title: title,
      ingridients: ingridients,
      category_id: parseInt(category_id),
      users_id,
    }; //untuk memasukkan ke database
    console.log('data: ');
    console.log(data);
    let result = postRecipe(data); //result dipanggil dari model
    console.log(result);

    return res.status(200).json({ message: 'post data success', data }); //tampilkan status berhasil jika data masuk
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const { title, ingridients, category_id } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: 'id wrong!' });
    }
    let dataRecipeId = await getRecipeById(parseInt(id));
    let users_id = req.payload.id;
    if (users_id !== dataRecipeId.rows[0].users_id) {
      return res
        .status(404)
        .json({ status: 404, message: 'THIS RICIPE IS NOT YOURS' });
    }

    console.log('put data');
    console.log(dataRecipeId.rows[0]);

    let data = {
      title: title || dataRecipeId.rows[0].title,
      ingridients: ingridients || dataRecipeId.rows[0].ingridients,
      category_id: category_id || dataRecipeId.rows[0].category_id,
    };

    let result = putRecipe(data, id);
    console.log(result);

    return res
      .status(200)
      .json({ status: 200, message: 'update data recipe success!', data });
  },

  deleteData: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(404).json({ message: 'id wrong' });
      }
      let dataRecipeId = await getRecipeById(parseInt(id));
      let users_id = req.payload.id;
      if (users_id !== dataRecipeId.rows[0].users_id) {
        return res
          .status(404)
          .json({ status: 404, message: 'THIS RICIPE IS NOT YOURS' });
      }

      let result = await deleteRecipe(parseInt(id));
      console.log(result);
      if (result.rowCount == 0) {
        throw new Error('delete data failed');
      }
      return res.status(200).json({
        status: 200,
        message: 'delete data recipe success',
        data: result.rows[0],
      });
    } catch (err) {
      return res.status(404).json({ status: 404, message: err.message });
    }
  },
};

module.exports = RecipeController;
