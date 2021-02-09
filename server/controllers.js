const model = require('./model.js')

module.exports = {
  getItems: (req, res) => {
    let productId = req.params.productId;
    model.getProducts( productId, (err, results) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send(results);
      }
    });
  },

  getUserBag: (req, res) => {
    let userId = req.params.userId;
    model.getUserBag(userId, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  addToBag: (req,res) => {
    let userId = req.params.userId;
    let data = req.body;
    model.updateQuantity(data.quantityid, data.size, data.quantity,() => {
      model.addToBag(userId, data, (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send();
        }
      });
    });
  },

  testUpdateQuantity: (req, res) => {
    let data = req.body;
    model.updateQuantity(data.quantityid, data.size, data.quantity,(err, result) => {
      if (err) {
        console.log('an error: ', err);
        res.status(500).send(err);
      } else{
        res.status(200).send(result);
      }
    });
  },

  addProduct: (req,res) => {
    let name = req.body.productname;
    model.addProduct(name, (err, id) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(id);
      }
    });
  },

  deleteProduct: (req,res) => {
    let id = req.query;
    model.deleteProduct(id, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    });
  },

  addStyle: (req, res) => {
    let productid = req.params.productid;
    let data = req.body;
    model.addStyle(productid, data, (err, itemid) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(itemid);
      }
    });
  }
}


