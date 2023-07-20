const Pool = require('../config/db');

const getRecipeAll = async () => {
  console.log('this is model');
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT recipe.id, recipe.title, recipe.ingridients, recipe.photo, category.name AS category FROM recipe JOIN category ON recipe.category_id = category.id`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getRecipeCount = async (data) => {
  const {search, searchBy, offset, limit} = data
  console.log("model getRecipe",search,searchBy,offset,limit)
  return new Promise((resolve,reject)=>
      Pool.query(`SELECT COUNT(*) FROM recipe JOIN category ON recipe.category_id = category.id WHERE ${searchBy} ILIKE '%${search}%'`,(err,result)=>{
          if(!err){
              resolve(result)
          } else{
              reject(err)
          }
      })
  )
}

const getRecipe = async (data) => {
  const {search, searchBy, offset, limit} = data
  console.log("model getRecipe",search,searchBy,offset,limit)
  return new Promise((resolve,reject)=>
      Pool.query(`SELECT recipe.id, recipe.title, recipe.ingridients, recipe.photo, category.name AS category FROM recipe JOIN category ON recipe.category_id = category.id WHERE ${searchBy} ILIKE '%${search}%' OFFSET ${offset} LIMIT ${limit}`,(err,result)=>{
          if(!err){
              resolve(result)
          } else{
              reject(err)
          }
      })
  )
}

const getRecipeById = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM recipe WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const postRecipe = async (data) => {
  const { title, ingridients, category_id } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO recipe(title,ingridients,category_id,photo) VALUES('${title}', '${ingridients}', ${category_id}, 'https://placehold.co/600x400')`,
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

const putRecipe = async (data, id) => {
  const { title, ingridients, category_id } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE recipe SET title='${title}', ingridients='${ingridients}', category_id=${category_id} WHERE id=${id}`,
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

const deleteRecipe = async (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`DELETE FROM recipe WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  getRecipeAll,
  getRecipeCount,
  getRecipe,
  getRecipeById,
  postRecipe,
  putRecipe,
  deleteRecipe,
};
