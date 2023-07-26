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

//get data by id
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

//register
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

//delete user
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

//update user
const putUser = async (data, id) => {
  const { nama, email, password } = data;
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

//login user
loginUser = async (email) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  getUser,
  getUserById,
  postUser,
  deleteUser,
  putUser,
  loginUser,
};
