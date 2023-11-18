const db = require("../db");

class Category {
  handlerQuery(sql) {
    return new Promise((resolve, reject) => {
      let handler = function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      };
      db.query(sql, handler);
    });
  }

  async getAll() {
    var sql = `select * from category`;
    return this.handlerQuery(sql);
  }

  async getByID(id) {
    var sql = `select * from category where id = ${id}`;
    return this.handlerQuery(sql);
  }

  async create(name_category,thumb) {
    var sql = `insert into category (name_category,thumb) VALUES ('${name_category}','${thumb}')`;
    return this.handlerQuery(sql);
  }

  async update(id, name_category,thumb) {
    var sql = `UPDATE category SET name_category = '${name_category}', thumb = '${thumb}' WHERE id = ${id}`;
    console.log(sql);
    return this.handlerQuery(sql);
  }

  async delete(id) {
    let sql = `DELETE FROM category WHERE id = ${id}`;
    return this.handlerQuery(sql);
  }
}

module.exports = new Category();
