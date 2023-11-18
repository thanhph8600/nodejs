const db = require("../db");

class Product {
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
    var sql = `select * from products`;
    return this.handlerQuery(sql);
  }

  async getProductByParams(query) {
    var sql = `SELECT * FROM products WHERE name_product LIKE '%${query}%' OR author LIKE '%${query}%'OR year LIKE '%${query}%'`;
    return this.handlerQuery(sql);
  }

  async getProductByIdCategory(id_category) {
    var sql = `SELECT * FROM products WHERE id_category = ${id_category}`;
    return this.handlerQuery(sql);
  }

  async getProductByIsbn(isbn) {
    var sql = `select * from products where isbn = ${isbn}`;
    return this.handlerQuery(sql);
  }

  async create(item) {
    var sql = `insert into products (isbn,name_product,author,year, price, id_category, description, thumb) VALUES (123,'${item.name_product}','${item.author}','${item.year}','${item.price}','${item.id_category}','${item.description}','${item.thumb}')`;
    return this.handlerQuery(sql);
  }

  async update(id, name_product,author,year, id_category, price, description, thumb) {
    var sql = `UPDATE products SET 
            name_product = '${name_product}',
            id_category = ${id_category},
            author = '${author}',
            year = ${year},
            price = ${price},
            description = '${description}',
            thumb = '${thumb}'
            WHERE id = ${id}`;
    return this.handlerQuery(sql);
  }

  async updateISBN(id, isbn) {
    var sql = `UPDATE products SET isbn = '${isbn}' WHERE id = ${id}`;
    this.handlerQuery(sql);
  }

  async delete(id) {
    let sql = `DELETE FROM products WHERE id = ${id}`;
    return this.handlerQuery(sql);
  }
}

module.exports = new Product();
