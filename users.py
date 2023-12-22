from database import fetchall, fetchone, execute



# USERS ------------------------------------ USERS

def create_user(data):
    cur = execute("""CALL InsertUser(%s, %s, %s, %s)""", 
            (data["firstname"], data["lastname"], data["email"], data["password"]))
    row = cur.fetchone()
    data["id"] = row["id"]
    return data
   
def get_all_users():
    rv = fetchall(""" SELECT * FROM user""")
    return rv

def get_user_by_id(id):
    rv = fetchone("""SELECT * FROM user where userid = %s""", (id,))
    return rv

def update_user(id, data):
    cur = execute("""CALL UpdateUser(%s, %s, %s, %s, %s)""",
            (id, data["firstname"], data["lastname"], data["email"], data["password"]))
    row = cur.fetchone()
    data["id"] = row["id"]
    return data

def delete_user(id):
    cur = execute("""CALL DeleteUser(%s)""", (id,))
    row = cur.fetchone()
    if row is None:
        return True
    return False

# USERS ------------------------------------ USERS


# RECIPE ------------------------------------ RECIPE

def create_recipe(user_id, data):
    cur = execute("""CALL CreateRecipe(%s, %s, %s, %s, %s, %s, %s)""", 
                  (user_id, data["category"], data["Title"],
                   data["Description"], data["CookingTime"],
                   data["Servings"], data.get("ImgSrc", "")))

    row = cur.fetchone()
    data["id"] = row["id"]
    data["user_id"] = user_id
    return data


def get_all_recipes():
    rv = fetchall(""" SELECT * FROM UserRecipeView """)
    return rv

def get_recipe_by_id(id):
    rv = fetchone("""SELECT * FROM UserRecipeView where recipe_id = %s""", (id,))
    return rv

def update_recipe(id, user_id, data):
    cur = execute("""CALL UpdateRecipe(%s, %s, %s, %s, %s, %s, %s, %s)""",
             (id, user_id, data["category"], data["Title"],
                   data["Description"], data["CookingTime"],
                   data["Servings"], data.get("ImgSrc", "")))
    row = cur.fetchone()
    data["id"] = row["id"]
    data["user_id"] = user_id
    return data

def get_all_recipe_by_userid(id):
    rv = fetchall("""SELECT * FROM UserRecipeView where user_id = %s""", (id,))
    return rv

def delete_recipe(id):
    cur = execute("""CALL DeleteRecipe(%s)""", (id,))
    row = cur.fetchone()
    if row is None:
        return True
    return False

def delete_allRecipe_user(id):
    cur = execute("""DELETE FROM recipe WHERE recipeid = %s""", (id,))
    row = cur.fetchone()
    if row is None:
        return True
    return False

# RECIPE ------------------------------------ RECIPE


# INGREDIENTS ------------------------------------ INGREDIENTS

def insert_ingredient(data):
    cur = execute("""CALL InsertIngredient(%s, %s, %s, %s)""", 
            (data["recipeid"], data["name"], data["quantity"], data["measurement"]))
    row = cur.fetchone()
    data["id"] = row["id"]
    return data

def get_allingredients_by_recipeid(id):
    rv = fetchall("""SELECT * FROM RecipeIngredientView where recipe_id = %s""", (id,))
    return rv

def update_ingredient(id, recipe_id, data):
    cur = execute("""CALL UpdateIngredient(%s, %s, %s, %s, %s)""",
             (id, recipe_id, data["name"], data["quantity"], data["measurement"]))
    row = cur.fetchone()
    data["id"] = row["id"]
    data["recipe_id"] = recipe_id
    return data

def delete_ingredient(id):
    cur = execute("""CALL DeleteIngredient(%s)""", (id,))
    row = cur.fetchone()
    if row is None:
        return True
    return False

# INGREDIENTS ------------------------------------ INGREDIENTS


# INSTRUCTION ------------------------------------ INSTRUCTION

def insert_instruction(data):
    cur = execute("""CALL InsertInstruction(%s, %s, %s)""", 
            ( data["stepnum"], data["description"], data["recipeid"]))
    row = cur.fetchone()
    data["id"] = row["id"]
    return data

def get_allinstructions_by_recipeid(id):
    rv = fetchall("""SELECT * FROM RecipeInstructionView where recipe_id = %s""", (id,))
    return rv

def update_instruction(id, recipe_id, data):
    cur = execute("""CALL UpdateInstruction(%s, %s, %s, %s)""",
             (id, data["stepnum"], data["description"], recipe_id))
    row = cur.fetchone()
    data["id"] = row["id"]
    data["recipe_id"] = recipe_id
    return data

def delete_instruction(id):
    cur = execute("""CALL DeleteInstruction(%s)""", (id,))
    row = cur.fetchone()
    if row is None:
        return True
    return False

# INSTRUCTION ------------------------------------ INSTRUCTION
