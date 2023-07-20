// const { getUser, getUserById, registerUser, putUser, deleteUserById } = require('../model/userModel');

// const userController = {
//   getData: async (req, res, next) => {
//     let dataUser = await getUser();
//     console.log('Data User: ');
//     console.log(dataUser);
//     if (dataUser) {
//       res.status(200).json({
//         status: 200,
//         message: 'get data user success',
//         data: dataUser.rows,
//       });
//     }
//   },

//   getDataById: async (req, res, next) => {
//     const { id } = req.params;
//     if (!id || id <= 0 || isNaN(id)) {
//       return res.status(404).json({ 'message': 'ID wrong' });
//     }
//     let dataUserId = await getUserById(parseInt(id));
//     console.log('dataUser');
//     console.log(dataUserId);

//     if (!dataUserId.rows[0]) {
//       return res
//         .status(200)
//         .json({ status: 200, message: 'get data user not found', data: [] });
//     }
//     return res
//       .status(200)
//       .json({
//         status: 200,
//         message: 'get data user success',
//         data: dataUserId.rows[0],
//       });
//   },

//   register: async(req,res,next) =>{
//     const {nama, usia, alamat, email} = req.body
//     console.log('Register User: ');
//     console.log(nama, usia, alamat, email);

//     if(!nama || !usia || !alamat || !email){
//         return res.status(404).json({'message':'input nama, usia, alamat, email required!'})
//     }
//     let data = {
//         nama: nama,
//         usia: usia,
//         alamat: alamat,
//         email: email
//     }

//     console.log('data: ');
//     console.log(data);
//     let result = registerUser(data)
//     console.log(result);

//     return res.status(200).json({'status':200, 'message':'Register User Success', data})
//   },

//   updateUser: async(req,res,next)=>{
//     const {id} = req.params
//     const {nama, usia, alamat, email} = req.body

//     if(!id || id <= 0 || isNaN(id)){
//         return res.status(404).json({'message':'ID wrong'})
//     }

//     let dataId = await getUserById(parseInt(id))
//     console.log('PutUser: ');
//     console.log(dataId.rows[0]);

//     let data ={
//         nama: nama || dataId.rows[0].nama,
//         usia: usia || dataId.rows[0].usia,
//         alamat: alamat || dataId.rows[0].alamat,
//         email: email || dataId.rows[0].email
//     }

//     let result = putUser(data,id)
//     console.log(result);

//     delete data.id

//     return res.status(200).json({'status':200, 'message':'update data user success', data})
//   },

//   deleteUser: async(req,res,next) =>{
//     const {id} = req.params
//     if(!id || id <= 0 || isNaN(id)){
//         return res.status(404).json({'message':'ID wrong'})
//     }

//     let result = deleteUserById(parseInt(id))
//     console.log(result);
//     if(result.rowCount == 0){
//         return res.status(404).json({'message':'delete data failed'})
//     }

//     return res.status(200).json({'status':200, 'message':'delete data user success'})
//   }

// //   login: async(req,res,next)=>{
// //     const {nama,email} = req.body
// //     let dataLogin = await loginUser()
// //     console.log('Login User');
// //     console.log(dataLogin);
// //     if(dataLogin){
// //         res.status(200).json({'message':'Login Berhasil', data:dataLogin.rows})
// //     }
// //   }
// };

// module.exports = userController;

const {
  getUser,
  getUserById,
  postUser,
  deleteUser,
  putUser,
} = require('../model/userModel');

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
        return res
          .status(404)
          .json({ status: 404, message: 'USER ID NOT FOUND ! PLEASE CEK YOUR ID !' });
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
      const { nama,email,password } = req.body;
      console.log('DATA USER: ');
      console.log(nama,email,password);

      if (!nama || !email || !password) {
        return res.status(404).json({
          status: 404,
          message: 'YOUR INPUT IS NOT COMPLETED! PLEASE CEK YOUR INPUT FORM! ',
        });
      }
      let data = {
        nama: nama,
        email: email,
        password: password
      };
      console.log(data);

      const dataPost = postUser(data);
      console.log(dataPost);
      return res
        .status(200)
        .json({ status: 200, message: 'POST DATA USER SUCCESS', data });
    } catch (error) {}
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
    const { nama,email,password } = req.body;

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
      password: password || dataId.rows[0].password
    };

    let result = putUser(data, id);
    console.log(result);

    delete data.id;

    res
      .status(200)
      .json({ status: 200, message: 'update data user success', data });
  },
};

module.exports = userController;
