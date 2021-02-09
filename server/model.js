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
    let qstring = `SELECT stock.name, products.styleid, products.itemid, styles.imageurl, styles.stylename, styles.price, quantity.quantityid, quantity.xs, quantity.s, quantity.m, quantity.l, quantity.xl, quantity.xxl FROM stock  INNER JOIN products ON stock.productid=products.productid INNER JOIN styles ON products.styleid=styles.styleid INNER JOIN quantity ON styles.quantityid=quantity.quantityid WHERE products.productid=${productId}`;
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
    let qstring = `INSERT INTO bag (userid, itemid, size, quantity, calculatedprice) VALUES(${userId}, ${item.itemId}, '${item.size}', ${item.quantity}, ${item.calculatedPrice})`;

    client.query(qstring, (err) => {
      if (err) {
        console.log('the error is ', err);
        cb(err);
      } else {
        cb();
      }
    });
  },

  updateQuantity: (quantityId, size, amount, cb) => {
    let qstring = `UPDATE quantity SET ${size} = ${size} - ${amount} WHERE quantityid=${quantityId} returning ${size}`;
    console.log('this is the query: ', qstring);

    client.query(qstring, (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(result);
      }
    });
  },

  addProduct: (name, cb) => {
    let qstring = `INSERT INTO stock (name) VALUES('${name}') returning productid`;
    client.query(qstring, (err, id) => {
      if (err) {
        console.log('this is the err ', err);
        cb(err);
      } else {
        cb(null, id.rows[0]);
      }
    });
  },

  // deleteProduct: (id, cb) => {
  //   let qstring = ``;
  //   client.query(qstring, (err) => {
  //     if (err) {
  //       cb(err);
  //     } else {
  //       cb();
  //     }
  //   })
  // },

  // addStyle: (productId, data, cb) => {
  //   let quantObj = data.quantity;
  //   let qstring = `INSERT INTO quantity (xs,s,m,l,xl,xxl) VALUES(${quantObj.xs}, ${quantObj.s}, ${quantObj.m}, ${quantObj.l}, ${quantObj.xl}, ${quantObj.xxl}) returning quantityid`;
  //   let qstring2 = `INSERT INTO styles (imageurl, stylename, price) VALUES()`
  //   client.query(qstring, (err, itemid) => {
  //     if (err) {
  //       cb(err);
  //     } else {
  //       cb(null, itemid.rows[0]);
  //     }
  //   })
  // }

}

