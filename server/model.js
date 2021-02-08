const client = require('../database/index.js');

module.exports = {
  getProductName: (productId, cb) => {
    let qstring = `SELECT name FROM stock WHERE productid=${productId}`;
    client.query(qstring, (err, res) => {
      if (err) {
        client.end();
        console.log('this is the error ', err);
        cb(err);
      } else {
        console.log('this is the response from query ', res.rows);
        cb(null, res.rows);
      }
    });
  },

  getProducts: (productId, cb) => {
    let qstring = `SELECT stock.name, products.styleid, styles.imageurl, styles.stylename, styles.price, quantity.xs, quantity.s, quantity.m, quantity.l, quantity.xl, quantity.xxl FROM stock  INNER JOIN products ON stock.productid=products.productid INNER JOIN styles ON products.styleid=styles.styleid INNER JOIN quantity ON styles.quantityid=quantity.quantityid WHERE products.productid=${productId}`;
    client.query(qstring, (err, res) => {
      if (err) {
        console.log('this is the error ', err);
        cb(err);
      } else {
        console.log('this is the response from query ', res.rows);
        cb(null, res.rows);
      }
    });
  },

  getUserBag: (userId, cb) => {
    let qstring = `SELECT itemid, size, quantity, calculatedprice FROM bag WHERE userid=${userId}`;
    client.query(qstring, (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    });
  },

  addToBag: (userId, item, cb) => {
    let qstring = `INSERT INTO bag VALUES(null, ${userId}, ${item.itemId}, ${item.size}, ${item.quantity}, ${item.calculatedPrice})`;
  }

}

// bagId serial PRIMARY KEY,
//   userId INT,
//   itemId INT,
//   FOREIGN KEY (userId)
//     REFERENCES  users (userId),
//   FOREIGN KEY (itemId)
//     REFERENCES  products (itemId),
//   size VARCHAR (5),
//   quantity INTEGER,
//   calculatedPrice DECIMAL