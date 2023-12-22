-- CREATE TABLE User (
--     userid INT PRIMARY KEY AUTO_INCREMENT,
--     firstname VARCHAR(50) NOT NULL,
--     lastname VARCHAR(50) NOT NULL,
--     password VARCHAR(50) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL
-- );

-- CREATE TABLE Recipe (
--     RecipeID INT PRIMARY KEY AUTO_INCREMENT,
--     userid INT,
--     category VARCHAR(100) NOT NULL,
--     Title VARCHAR(100) NOT NULL,
--     Description TEXT,
--     CookingTime INT,
--     Servings INT,
--     ImgSrc VARCHAR(255),
--     FOREIGN KEY (userid) REFERENCES User(userid) ON DELETE CASCADE
-- );

-- CREATE TABLE Ingredients (
--     ingredientID INT PRIMARY KEY AUTO_INCREMENT,
--     RecipeID INT,
--     Name VARCHAR(100) NOT NULL,
--     Quantity DECIMAL(10, 2) NOT NULL,
--     Measurement VARCHAR(50) NOT NULL,
--     FOREIGN KEY (RecipeID) REFERENCES Recipe(RecipeID) ON DELETE CASCADE
-- );

-- CREATE TABLE Instruction (
--     InstructID INT PRIMARY KEY AUTO_INCREMENT,
--     StepNum INT NOT NULL,
--     Description TEXT NOT NULL,
--     RecipeID INT,
--     FOREIGN KEY (RecipeID) REFERENCES Recipe(RecipeID) ON DELETE CASCADE
-- );













