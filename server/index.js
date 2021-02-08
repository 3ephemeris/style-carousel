const express = require('express');
const path = require('path');
// const cors = require('cors');
const bodyParser = require('body-parser');
const controllers = require('./controllers.js');

const app = express();
// app.use(cors());
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const PORT = 3001;

// app.use(express.json());

app.get('/api/items/:productId', controllers.getItems);

app.get('/api/bag/:userId', controllers.getUserBag);
app.post('/api/bag/:userId', controllers.addToBag);

app.listen(PORT, () => {
  console.log(`Style Carousel running on port ${PORT}...`);
});
