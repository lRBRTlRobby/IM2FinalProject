-- insert recipe (userid, category, title, description, cookingtime, servings, imgsrc)
-- values(2, 'lunch', 'Fried Chicken', 'simple fried chicken recipe', 20, 3, 'crispy-chicken.png')

-- CREATE VIEW UserRecipeView AS
-- SELECT
--     u.userid AS user_id,
--     u.firstname AS first_name,
--     u.lastname AS last_name,
--     r.recipeid AS recipe_id,
--     r.title AS recipe_title,
--     r.description AS recipe_description,
--     r.imgsrc AS imagesource
-- FROM
--     User u
-- JOIN Recipe r ON u.userid = r.userid;



create view RecipeIngredientView as
select 
	r.recipeid as recipe_id,
	r.title as recipe_name,
	r.description as recipe_description,
    i.name as ingredient_name,
    i.quantity as ingredient_quantity,
    i.measurement as ingredient_measurement
from
	ingredients i
join recipe r on r.recipeid = i.recipeid;



CREATE VIEW RecipeIngredientView AS
SELECT 
    r.recipeid AS recipe_id,
    r.title AS recipe_name,
    r.description AS recipe_description,
    i.ingredientid AS ingredient_id,  -- Added this line
    i.name AS ingredient_name,
    i.quantity AS ingredient_quantity,
    i.measurement AS ingredient_measurement
FROM
    ingredients i
JOIN recipe r ON r.recipeid = i.recipeid;




def get_allingredients_by_recipeid(id):
    rv = fetchall("""SELECT * FROM RecipeIngredientView where recipe_id = %s""", (id,))
    return rv


create view RecipeInstructionView as
select
	r.recipeid as recipe_id,
    r.title as recipe_name,
    r.description as recipe_description,
    i.instructid as instruction_id, -- Added this line
    i.stepnum as step_number,
    i.description as step_instruction
from 
	instruction i
JOIN recipe r on r.recipeid = i.recipeid


def get_allinstructions_by_recipeid(id):
    rv = fetchall("""SELECT * FROM RecipeInstructionView where recipe_id = %s""", (id,))
    return rv


DELIMITER //
CREATE PROCEDURE DeleteIngredient(IN ingredient_id_to_delete INT)
BEGIN
    -- Check if the recipe exists before attempting to delete
    IF EXISTS (SELECT 1 FROM ingredients WHERE ingredientid = ingredient_id_to_delete) THEN
        -- Delete the recipe
        DELETE FROM ingredients WHERE ingredientid = ingredient_id_to_delete;
        SELECT 'Ingredient deleted successfully.' AS Result;
    ELSE
        SELECT 'Ingredient not found.' AS Result;
    END IF;
END //

DELIMITER //
CREATE PROCEDURE DeleteInstruction(IN instruction_id_to_delete INT)
BEGIN
    -- Check if the recipe exists before attempting to delete
    IF EXISTS (SELECT 1 FROM instruction WHERE instructid = instruction_id_to_delete) THEN
        -- Delete the recipe
        DELETE FROM instruction WHERE instructid = instruction_id_to_delete;
        SELECT 'Instruction deleted successfully.' AS Result;
    ELSE
        SELECT 'Instruction not found.' AS Result;
    END IF;
END //


Updated Views

CREATE VIEW UserRecipeView AS
SELECT
    u.userid AS user_id,
    u.firstname AS first_name,
    u.lastname AS last_name,
    r.recipeid AS recipe_id,
    r.title AS recipe_title,
    r.description AS recipe_description,
    r.cookingtime AS cooking_time,
    r.category AS category,
    r.servings AS servings,
    r.imgsrc AS imagesource
FROM
    User u
JOIN Recipe r ON u.userid = r.userid;


CREATE VIEW RecipeIngredientView AS
SELECT 
    r.recipeid AS recipe_id,
    r.title AS recipe_name,
    r.description AS recipe_description,
    r.cookingtime AS cooking_time,
    r.category AS category,
    r.servings AS servings,
    i.ingredientid AS ingredient_id,  -- Added this line
    i.name AS ingredient_name,
    i.quantity AS ingredient_quantity,
    i.measurement AS ingredient_measurement
FROM
    ingredients i
JOIN recipe r ON r.recipeid = i.recipeid;




create view RecipeInstructionView as
select
	r.recipeid as recipe_id,
    r.title as recipe_name,
    r.description as recipe_description,
    r.cookingtime AS cooking_time,
    r.category AS category,
    r.servings AS servings,
    i.instructid as instruction_id, -- Added this line
    i.stepnum as step_number,
    i.description as step_instruction
from 
	instruction i
JOIN recipe r on r.recipeid = i.recipeid


DELIMITER //
CREATE TRIGGER Before_Delete_Recipe
BEFORE DELETE ON recipe
FOR EACH ROW
BEGIN
    -- Delete corresponding rows in the ingredients table
    DELETE FROM ingredients WHERE recipeid = OLD.recipeid;

    -- Delete corresponding rows in the instructions table
    DELETE FROM instruction WHERE recipeid = OLD.recipeid;
END //


DELIMITER //
CREATE TRIGGER update_sequence
AFTER DELETE
ON instruction FOR EACH ROW
BEGIN
    DECLARE deleted_step INT;

    SELECT StepNum INTO deleted_step
    FROM instruction
    WHERE InstructID = OLD.InstructID;

    UPDATE instruction
    SET StepNum = StepNum - 1
    WHERE StepNum > deleted_step;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_sequence
AFTER DELETE
ON instruction FOR EACH ROW
BEGIN
    DECLARE deleted_step INT;

    SELECT StepNum INTO deleted_step
    FROM instruction
    WHERE InstructID = OLD.InstructID;

    IF deleted_step IS NOT NULL THEN
        UPDATE instruction
        SET StepNum = StepNum - 1
        WHERE StepNum > deleted_step;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_sequence
BEFORE DELETE
ON instruction FOR EACH ROW
BEGIN
    DECLARE deleted_step INT;

    SET deleted_step = OLD.StepNum;

    IF deleted_step IS NOT NULL THEN
        UPDATE instruction
        SET StepNum = StepNum - 1
        WHERE StepNum > deleted_step;
    END IF;
END //
DELIMITER ;