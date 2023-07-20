// const Pool = require('../config/db')

// const getUser = async () =>{
//     return new Promise((resolve,reject) =>{
//         Pool.query(`SELECT * FROM users`,(err,result)=>{
//             if(!err){
//                 resolve(result)
//             }else{
//                 reject(err)
//             }
//         })
//     })
// }

// const getUserById = async (id) =>{
//     return new Promise((resolve, reject) =>{
//         Pool.query(`SELECT * FROM users WHERE id=${id}`, (err, result)=>{
//             if(!err){
//                 resolve(result)
//             }else{
//                 reject(err)
//             }
//         })
//     })
// }

// const registerUser = async (data) =>{
//     const {nama, usia, alamat, email} = data
//     return new Promise((resolve,reject) =>{
//         Pool.query(`INSERT INTO users(nama, usia, alamat, email) VALUES('${nama}', '${usia}', '${alamat}', '${email}')`, (err, result) =>{
//             if(!err){
//                 resolve(result)
//             }else{
//                 reject(err)
//             }
//         })
//     })
// }

// const putUser = async (data, id) =>{
//     const {nama, usia, alamat, email} = data
//     return new Promise((resolve,reject) =>{
//         Pool.query(`UPDATE users SET nama='${nama}', usia='${usia}', alamat='${alamat}', email='${email}' WHERE id=${id}`, (err,result)=>{
//             if(!err){
//                 resolve(result)
//             }else{
//                 reject(err)
//             }
//         })
//     })
// }

// const deleteUserById = async(id) =>{
//     return new Promise((resolve,reject)=>{
//         Pool.query(`DELETE FROM users WHERE id=${id}`, (err,result)=>{
//             if(!err){
//                 resolve(result)
//             }else{
//                 reject(err)
//             }
//         })
//     })

// }

// // const loginUser = async (data) =>{
// //     const {nama, email} = data
// //     return new Promise ((resolve, reject) =>{
// //         Pool.query(`SELECT FROM users WHERE nama='${nama}', email='${email}'`, (err,result) =>{
// //             if(!err){
// //                 resolve(result)
// //             }else{
// //                 reject(err)
// //             }
// //         })
// //     })

// // }

// module.exports = {getUser, getUserById, registerUser, putUser, deleteUserById}

const Pool = require('../config/db');

//get data
const getUser = async () => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM users`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const getUserById = async (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const postUser = async (data) => {
  const { nama, email, password } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO users(nama,email,password) VALUES('${nama}','${email}','${password}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const putUser = async (data, id) => {
  const { nama,email,password } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE users SET nama='${nama}',email='${email}', password='${password}' WHERE id=${id}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

module.exports = { getUser, getUserById, postUser, deleteUser, putUser };
