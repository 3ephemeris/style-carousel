const faker = require('faker');
const fs = require('file-system');

const writeUsers = fs.createWriteStream('users.csv');
writeUser.write('username, email\n', 'utf8');

// const writeStock = fs.createWriteStream('stock.csv');
//writeStock.write( , 'utf8');

// const writeBag = fs.createWriteStream('bag.csv');
//writeBag.write( , 'utf8');

// const writeProducts = fs.createWriteStream('products.csv');
//writeProducts.write( , 'utf8');

// const writeQuantity = fs.createWriteStream('quantity.csv');
//writeQuantity.write( , 'utf8');

// const writeStyles = fs.createWriteStream('styles.csv');
//writeStyles.write( , 'utf8');


const generateUser = () => {
  let user = {
    email: faker.internet.email(),
    username: faker.internet.userName()
  }
  return user;
};

// const generateProduct = () => {
//   return faker.commerce.productName();
// }

// const generateQuantity = () => {
//   let sizes = {
//     xs: Math.floor(Math.random() * 10000),
//     s: Math.floor(Math.random() * 10000),
//     m: Math.floor(Math.random() * 10000),
//     l: Math.floor(Math.random() * 10000),
//     xl: Math.floor(Math.random() * 10000),
//     xxl: Math.floor(Math.random() * 10000)
//   }
//   return sizes;
// }

// const generateStyles = () => {
//   let style = {
//     styleName: faker.commerce.color();
//   }
// }

const writeManyEntries = (stream, amount, encoding, cb) => {
  let i = amount;
  let id = 0;
  const write = () => {
    let continue = true;
    do {
      i -= 1;
      id += 1;
      const user = generateUser();
      const data = `${user.username}, ${user.email}\n`;
      //change to larger divisible
      if (i % 10 === 0) {
        console.log('ten more rows written')
      }
      if (i === 0) {
        stream.write(data, encoding, cb);
      } else {
        ok = stream.write(data, encoding);
      }
    } while (i > 0 && continue);
    if (i > 0) {
      stream.once('drain', write);
    }
  }
  write();
}

writeManyEntries(writeUsers, 30, 'utf-8', () => {
  console.log('writing users completed!');
  writeUsers.end();
});