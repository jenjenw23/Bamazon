DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

-- customer table 

CREATE TABLE products (
  Item_ID INT NOT NULL AUTO_INCREMENT,
  Product_Name VARCHAR(100) NULL,
  Department_Name VARCHAR(100) NULL,
  Price DECIMAL(10,2) NULL,
  Stock_Quantity INT NULL,
  PRIMARY KEY (Item_ID)
);

SELECT * FROM products;

/* Insert 10 Rows into new table */
INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("#2 Mechanical Pencils, 20 Count Pack", "Office Supplies", 2.40, 100);

INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Doctor Who Journal", "Books", 14.62, 15);

INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Buffy Seasons 1-7: The Complete Series", "Movies & TV", 113.19, 50);

INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("LEGO Classic Medium Creative Brick Box", "Toys", 27.99, 45);

INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("5 Tier Shelving with Adjustable Shelves", "Home", 59.99, 300);

INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Creative Lettering and Beyond", "Books", 13.01, 10);

INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Tide PODS Laundry Detergent", "Cleaning Supplies", 18.97, 1000);

INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Hello Kitty School Supply Stationary Set", "School Supplies", 19.99, 80);

INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Sapphire and Diamond Wedding Band White Gold Princess Cut", "Jewelry", 862.49, 5);

INSERT INTO products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Luggage Set Spinner Hard Shell - 3 Piece ", "Luggage", 119.99, 25);

