const {
  getRecipe,
  getRecipeCount,
  getRecipeById,
  postRecipe,
  putRecipe,
  deleteRecipeById,
  GetRecipeByUsers,
  getDataSearch,
  getDataFilter,
  searchData,
  getDataRecipeCount,
} = require('../model/ModelRecipe');

const cloudinary = require('../config/photo');
const RecipeController = {
  // getRecipes: async (req, res) => {
  //   try {
  //     const page = Number(req.query.page) || 1;
  //     const limit = Number(req.query.limit) || 2;
  //     const offset = (page - 1) * limit;
  //     const sortBY = req.query.sortBY || 'id';
  //     const searchBY = req.query.searchBY || 'title';
  //     const sort = req.query.sort || '';
  //     const searchParam = req.query.search ? req.query.search : '';
  //     const result = await recipeModel.searchData(
  //       limit,
  //       offset,
  //       searchParam,
  //       sortBY,
  //       sort,
  //       searchBY
  //     );

  //     const dataRecipeCount = await recipeModel.coutData();

  //     const pagination = {
  //       totalPage: Math.ceil(dataRecipeCount.rows[0].count / limit),
  //       totalData: parseInt(dataRecipeCount.rows[0].count),
  //       pageNow: parseInt(page),
  //     };

  //     if (result.rows.length === 0) {
  //       return res
  //         .status(404)
  //         .json({ message: 'Result not found', pagination });
  //     }

  //     res.status(200).json({
  //       message: 'Get recipes sucessfully',
  //       data: result.rows,
  //       pagination,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Get recipes pagination failed', error });
  //   }
  // },

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
    let dataRecipe = await getRecipe(); //ambil data dari controller
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
    try {
      const { sort, sortBy, page, limit } = req.query;
      const { id } = req.payload;
      let pagination = page || 1;
      let limiter = limit || 5;

      let data = {
        offset: (pagination - 1) * limiter,
        limit: limit || 5,
        sort: sort || 'ASC',
        sortBy: sortBy || 'title',
        id: id,
      };
      console.log('payload', req.payload);

      let filter = await GetRecipeByUsers(data);
      if (filter) {
        res.status(200).json({
          status: 200,
          message: 'Get Recipe By Users Success!',
          data: filter.rows,
        });
      }
      // if (!users_id) {
      //   return res.status(404).json({ status: 404, message: 'ID NOT FOUND!' });
      // }
      // let dataRecipeUsers = await GetRecipeByUsers(users_id);
      // console.log('data: ');
      // console.log(dataRecipeUsers);

      // if (!dataRecipeUsers.rows[0]) {
      //   return res
      //     .status(404)
      //     .json({ status: 404, message: 'DATA RECIPE NOT FOUND!' });
      // }
      // return res.status(200).json({
      //   status: 200,
      //   message: 'GET DATA RECIPE SUCCESS!',
      //   data: dataRecipeUsers.rows,
      // });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  postData: async (req, res, next) => {
    try {
      const { title, ingredients, category_id, image } = req.body; //inisialisasi data
      console.log('post file');
      console.log(req.file);
      console.log('pos data'); //tampilkan data
      console.log(title, ingredients, category_id, image); //tampilkan data

      if (!req.isFileValid) {
        return res.status(404).json({ message: req.isFileValidMessage });
      }

      const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: 'recipe',
      });
      if (!ImageCloud) {
        return res.status(404).json({ message: 'Upload Photo Failed' });
      }
      console.log(ImageCloud);

      let users_id = req.payload.id;
      console.log('payload');
      console.log(req.payload);

      if (!title || !ingredients || !category_id) {
        return res
          .status(404)
          .json({ message: 'input title, ingredients, category required !' });
      } //validation
      let data = {
        title: title,
        ingredients: ingredients,
        category_id: parseInt(category_id),
        users_id,
        image: ImageCloud.secure_url,
      }; //untuk memasukkan ke database
      console.log('data: ');
      console.log(data);
      let result = postRecipe(data); //result dipanggil dari model
      console.log(result);

      return res.status(200).json({ message: 'Add Recipe Success', data }); //tampilkan status berhasil jika data masuk
    } catch (err) {
      console.error(err.message);
    }
  },

  putData: async (req, res, next) => {
    const { id } = req.params;
    const { title, ingredients, category_id } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: 'id wrong!' });
    }

    let dataRecipeId = await getRecipeById(parseInt(id));
    if (!dataRecipeId || !dataRecipeId.rows || dataRecipeId.rows.length === 0) {
      return res.status(404).json({ status: 404, message: 'Recipe not found' });
    }
    let users_id = req.payload.id;
    // console.log(users_id);
    //photo cheker
    if (!req.file) {
      if (users_id !== dataRecipeId.rows[0].users_id) {
        return res
          .status(404)
          .json({ status: 404, message: 'THIS RICIPE IS NOT YOURS' });
      }

      console.log('put data');
      console.log(dataRecipeId.rows[0]);

      let data = {
        title: title || dataRecipeId.rows[0].title,
        ingredients: ingredients || dataRecipeId.rows[0].ingredients,
        category_id: category_id || dataRecipeId.rows[0].category_id,
        image: dataRecipeId.rows[0].image,
      };

      let result = putRecipe(data, id);
      console.log(result);
      return res
        .status(200)
        .json({ status: 200, message: 'update data recipe success!', data });
    } else {
      if (!req.isFileValid) {
        return res.status(404).json({ message: req.isFileValidMessage });
      }
      const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: 'recipe',
      });
      if (!ImageCloud) {
        return res.status(404).json({ message: 'Upload Photo Failed' });
      }
      console.log(ImageCloud);

      if (users_id !== dataRecipeId.rows[0].users_id) {
        return res
          .status(404)
          .json({ status: 404, message: 'THIS RICIPE IS NOT YOURS' });
      }

      console.log('put data');
      console.log(dataRecipeId.rows[0]);

      let data = {
        title: title || dataRecipeId.rows[0].title,
        ingredients: ingredients || dataRecipeId.rows[0].ingredients,
        category_id: category_id || dataRecipeId.rows[0].category_id,
        image: ImageCloud.secure_url,
      };

      let result = putRecipe(data, id);
      console.log(result);
      return res
        .status(200)
        .json({ status: 200, message: 'update data recipe success!', data });
    }
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

      let result = await deleteRecipeById(parseInt(id));
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
  getSearchData: async (req, res, next) => {
    try {
      const { search, searchBy, limit, sortBy } = req.query;

      let page = req.query.page || 1;
      let limiter = limit || 5;

      data = {
        search: search || '',
        searchBy: searchBy || 'title',
        offset: (page - 1) * limiter,
        limit: limit || 5,
        sortBy: sortBy || 'ASC',
      };
      console.log(data);

      let searchData = await getDataSearch(data);
      let recipeCount = await getDataRecipeCount(data);
      console.log(searchData);
      console.log(recipeCount);
      let pagination = {
        totalPage: Math.ceil(recipeCount.rows[0].count / limiter),
        totalData: parseInt(recipeCount.rows[0].count),
        pageNow: parseInt(page),
      };

      if (searchData) {
        res.status(200).json({
          status: 200,
          message: 'Search success',
          data: searchData.rows,
          pagination,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  },
};

module.exports = RecipeController;
