const {
  getUser,
  getUserById,
  postUser,
  deleteUser,
  putUser,
  loginUser,
} = require('../model/userModel');
const argon2 = require('argon2');
const GenerateToken = require('../helpers/GenerateToken')

const userController = {
  getUserData: async (req, res, next) => {
    try {
      let dataUsr = await getUser();
      console.log('Data User');
      console.log(dataUsr);
      if (dataUsr.rowCount == 0) {
        return res.status(404).json({
          status: 404,
          message: 'DATA NOT FOUND IN DATABASE! PLEASE CEK THE DATABASE!',
        });
      }
      res.status(200).json({
        Status: 200,
        Message: 'GET DATA USER SUCCESS',
        data: dataUsr.rows,
      });
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  },

  getUserId: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id || id <= 0 || isNaN(id)) {
        return res
          .status(404)
          .json({ status: 404, message: 'ID WRONG OR ID NOT FOUND' });
      }
      let dataId = await getUserById(parseInt(id));
      console.log('Data User: ');
      console.log(dataId);
      if (!dataId.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'USER ID NOT FOUND ! PLEASE CEK YOUR ID !',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'GET DATA BY ID SUCCES',
        data: dataId.rows[0],
      });
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  },

  postDataUser: async (req, res, next) => {
    try {
      let { email, password, nama } = req.body;

      if (!email || !password || !nama) {
        return res.status(404).json({
          status: 404,
          message: 'FORM NAME, EMAIL, PASSWORD IS REQUIRED!',
        });
      }

      let user = await loginUser(email);

      if (user.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'YOUR EMAIL HAS REGISTERED, PLEASE LOGIN!',
        });
      }

      password = await argon2.hash(password);

      let dataUser = {
        email,
        nama,
        password,
      };

      let data = await postUser(dataUser);
      console.log(data);

      if (!data.rowCount == 1) {
        return res
          .status(404)
          .json({ status: 404, message: 'REGISTER FAILED' });
      }

      return res
        .status(200)
        .json({ status: 200, message: 'REGISTER SUCCESS, LOGIN NOW!', data:data.rows });
      // let data = {
      //   nama: nama,
      //   email: email,
      //   password: password
      // };
      // console.log(data);

      // const dataPost = postUser(data);
      // console.log(dataPost);
      // return res
      //   .status(200)
      //   .json({ status: 200, message: 'POST DATA USER SUCCESS', data });
    } catch (error) {
      return res
        .status(404)
        .json({ status: 404, message: 'REGISTER FAILED', error });
    }
  },

  deleteDataUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id || id <= 0 || isNaN(id)) {
        res
          .status(404)
          .json({ status: 404, message: 'ID NOT FOUND! PLEASE CEK YOUR ID!' });
      }
      let deleteId = deleteUser(parseInt(id));
      console.log(deleteId);

      return res
        .status(200)
        .json({ status: 200, message: 'DELETE DATA USER SUCCESS' });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  updateUser: async (req, res, next) => {
    const { id } = req.params;
    const { nama, email, password } = req.body;

    if (!id || id <= 0 || isNaN(id)) {
      return res.status(404).json({ message: 'ID wrong' });
    } else {
    }

    let dataId = await getUserById(parseInt(id));
    console.log('PutUser: ');
    console.log(dataId.rows[0]);
    // res.status(200).json({status:200, message:'YOUR PREVIOUS DATA',data:dataId.rows})

    let data = {
      nama: nama || dataId.rows[0].nama,
      email: email || dataId.rows[0].email,
      password: password || dataId.rows[0].password,
    };

    let result = putUser(data, id);
    console.log(result);

    delete data.id;

    res
      .status(200)
      .json({ status: 200, message: 'update data user success', data });
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res
        .status(404)
        .json({ status: 404, message: 'form email or password is required' });
    }

    let data = await loginUser(email, password);
    console.log(data.rows[0]);

    if (!data.rows[0]) {
      return res
        .status(404)
        .json({ status: 404, message: 'YOUR EMAIL HAS NOT REGISTERED!' });
    }

    let users = data.rows[0];
    console.log('Pass: ');
    console.log(users.password);
    let verify = await argon2.verify(users.password, password);

    if (!verify) {
      return res
        .status(404)
        .json({ status: 404, message: 'YOUR PASSWORD IS WRONG!' });
    }

    let token = GenerateToken(users)
    users.token = token

    res
      .status(200)
      .json({ status: 200, message: 'LOGIN SUCCESS!', data: data.rows });
  },
};

module.exports = userController;
