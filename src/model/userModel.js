const Pool = require('../config/db');

const getAllUsers = async () => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users ORDER BY id DESC`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const getUserById = async (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM users WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error.message);
      }
    });
  });
};

// Edit user
const putUser = async (data, id) => {
  const { name, email, password } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE users SET name='${name}', email='${email}', password='${password}' WHERE id=${id}`,
      (error, result) => {
        if (!error) {
          // console.log("result model", result);
          resolve(result);
        } else {
          reject(error.message);
        }
      }
    );
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  putUser,
};
