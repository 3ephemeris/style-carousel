# Project Name
FJORDS by LibraFX

> HackReactors F.E.C. project conducted by team LibraFX: Alex Klyuev, Alex Yu, Samuel Bjorklund, Zachary Cuch.
Reacretion of Patagonia's Fjord Flannel Jacket item page featuring the selected item carousel, detailed overview, related items, and customer reviews; handled by ZC, AY, AK, and SB respectively.
Project designed as a non-functional Full-stack application using Node.JS, React, and a simulated Mongo database.


## Related Projects

  - https://github.com/LibraFX/size-carousel
  - https://github.com/LibraFX/overview
  - https://github.com/LibraFX/related-items
  - https://github.com/LibraFX/reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- Express
- Mongoose
- React
- Bluebird
- Webpack
- Babel
- Enzyme/Jest
-

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

# API


### GET
  - `/items/:productId` *done*
    returns an object containing the product name, id and an array of objects that pertain to colors available for that product. Inside of each color is an amount property wich will denote the the different sizes available in each color and the amount of the that specific color/size combo available in stock
    *color is equivalent to style*

    ```JSON
      {
        productName: String,
        productId: Number,
        styles: [
          {
            colorId: number,
            colorName: string
            color: string,
            price: number,
            amount: [
              {
                size: string,
                stock: number,
              },
              {
                size: string,
                stock: number,
              }
            ]
            abbreviation: string,
            imageUrl: string
          }
        ],
      }
    ```

  - `/api/bag/:userId` *done*
    retrieves the items in the users bag, given a user id

    *request*
    {
      params: {
        id: userid - integer
      }
    }

    *response*
    [
      {
        itemid: number - integer
        size: lower case string of a size ranging 'xs-xxl'
        quantity: number - the amount of product the user chose
        calculatedprice: string - float number of the item price times quantity
      }
    ]

### POST
  - `/items/stock` --in progress--
    adds an item to the stock table in database given a string for stock item name

    *Request Body*
    ```JSON
      {
        name: string
      }
    ```

    *response*
    {
      productid: integer - id of the now inserted product
    }

  - `/items/style/:productid` --in progress--
    add a color/style to stock and colors with reference to the size. effects the product, style and quantity table. adds style to style table, then style id to product table and inserts quantity for particular size

    *Request Body*
    ```JSON
      {
        params: {
          productid: integer - productid that this style will belong to
        }
      }
      {
        imageurl: string- correspond to url image of product syle
        stylename: string - name of style
        price: float - price of product style
        quantity: {
          xs: integer - corresponds to the amount available in size
          if not available integer will be 0
          s: integer
          m: integer
          l: integer
          xl: integer
          xxl: integer
        }

      }
    ```
  - `/bags/:userId` *done*
    adds an item to the users bag, will also the stock table to reduce stock quantity by bag quantity. if Number goes below 0 sends back an error stating that stock amount is not available

    *Request Body*
    ```JSON
      {
        productId: number
        styleId: number
        quantityId: number
        size: string
        bagQuantity: number
        calculatedPrice: number
      }
    ```
### PUT
  - `/items/stock/:productId` --in progress--
    modify an in the stock table of the database

    *Request Body*

    ```JSON
      {
        productName: string
      }
    ```

  - `/items/stock/:productId` --in progress--
    modify a product in the product table of the database

    *Request Body*
    ```JSON
      {
        productId: number
        styleId: number
      }
    ```

  - `/items/style/:styleId` --in progress--
    modify a style in the style table of the database

    *Request Body*
      - must contain at least one of the properties found below to modify
      - if changing all properties utilize DELETE method and then POST  instead
    ```JSON
      {
        colorId: number
        colorName: string
        price: string
        sizeId: number
        quantity: number
        imageUrl: string
        abbreviation: string
        productId: number
      }
    ```
  - `/bags/:userid` --in progress--
    modify the user's shopping bag, will also modify the quantity table to modify the appropriate quantity id field id

    *Request Body*
    ```JSON
      {
        productId: number
        styleId: number
        size: string
        bagQuantity: number
        calculatedPrice: number
      }
    ```

### DELETE
  - `/items/product/:productId` --in progress--
    removes product from the product table, also will remove any entries that refence that product id

  - `/items/style/:styleId` --in progress--
    removes style from style table, also will remove any entries in products tabe that reference the style id and removes row in quantity table that mached the quantityId of the style

  - `/items/stock/:stockid` --in progress--
    removes a stock item from the stock table based on id removes any products that reference stock id

  - `/bags/:userId/:stockId` --in progress--
    removes the item from given users bag based on user id and stock id




