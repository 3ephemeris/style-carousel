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
    model.addToBag(userId, data, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send();
      }
    });
  }

}


