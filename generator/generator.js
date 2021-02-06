const faker = require('faker');
const fs = require('file-system');

const writeUsers = fs.createWriteStream('users.csv');
writeUsers.write('username,email\n', 'utf8');

const writeStock = fs.createWriteStream('stock.csv');
writeStock.write('name\n', 'utf8');

const writeQuantity = fs.createWriteStream('quantity.csv');
writeQuantity.write('xs,s,m,l,xl,xxl\n', 'utf8');

const writeStyles = fs.createWriteStream('styles.csv');
writeStyles.write('imageUrl,styleName,price,quantityId\n', 'utf8');

const writeProducts = fs.createWriteStream('products.csv');
writeProducts.write('productId,styleId\n' , 'utf8');

const writeBag = fs.createWriteStream('bag.csv');
writeBag.write('userId,itemId,size,quantity,calculatedPrice\n', 'utf8');


const generateUser = () => {

  let email = faker.internet.email();
  let username = faker.internet.userName();

  return `${username},${email}\n`
};

const generateStock = () => {
  return `${faker.commerce.productName()}\n`;
}

const generateQuantity = () => {
  let xs = Math.floor(Math.random() * 10000);
  let s = Math.floor(Math.random() * 10000);
  let m = Math.floor(Math.random() * 10000);
  let l = Math.floor(Math.random() * 10000);
  let xl = Math.floor(Math.random() * 10000);
  let xxl = Math.floor(Math.random() * 10000);

  return `${xs},${s},${m},${l},${xl},${xxl}\n`;
}

const generateStyles = (num) => {

  let imageUrl = "https://loremflickr.com/320/240/clothing";
  let styleName = faker.commerce.color();
  let price = faker.commerce.price();
  let quantityId =  num;
  return `${imageUrl},${styleName},${price},${quantityId}\n`;
}

const generateProduct = (num) => {

  let productId = Math.floor(Math.random() * (1000000 - 1) + 1)
  let styleId = num;

  return `${productId},${styleId}\n`;
}

const generateBag = () => {

  let userId = Math.floor(Math.random() * (1000000 - 1) + 1);

  let itemId = Math.floor(Math.random() * (2000000 - 1) + 1);

  let sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
  let index = Math.floor(Math.random() * sizes.length);
  let size = sizes[index];

  let price = faker.commerce.price();
  let quantity = Math.floor(Math.random() * (15 - 1) + 1)

  return `${userId},${itemId},${size},${quantity},${price}\n`;
}


const writeManyEntries = (stream, amount, dataFunc, encoding, cb) => {
  let i = amount;
  let id = 0;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = dataFunc(id);

      if (i % 100000 === 0) {
        console.log(`a hundred thousand more rows written. ${i} left to go`);
      }
      if (i === 0) {
        stream.write(data, encoding, cb);
      } else {
        ok = stream.write(data, encoding);
      }
    } while (i > 0 && ok);

    if (i > 0) {
      stream.once('drain', write);
    }
  }
  write();
}

writeManyEntries(writeUsers, 1000000, generateUser, 'utf-8', () => {
  console.log('writing users completed!');
  writeUsers.end();
});

writeManyEntries(writeStock, 1000000, generateStock, 'utf-8', () => {
  console.log('writing stock completed!');
  writeStock.end();
});

writeManyEntries(writeQuantity, 2000000, generateQuantity, 'utf-8', () => {
  console.log('writing quantity completed!');
  writeQuantity.end();
});

writeManyEntries(writeStyles, 2000000, generateStyles, 'utf-8', () => {
  console.log('writing style completed!');
  writeStyles.end();
});

writeManyEntries(writeProducts, 2000000, generateProduct, 'utf-8', () => {
  console.log('writing products completed!');
  writeProducts.end();
});

writeManyEntries(writeBag, 2000000, generateBag, 'utf-8', () => {
  console.log('writing bag completed!');
   writeBag.end();
});
