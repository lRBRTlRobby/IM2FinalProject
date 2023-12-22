from flask import Flask, request, jsonify
from users import get_all_users, get_user_by_id, create_user, update_user, delete_user, create_recipe, delete_instruction
from users import get_all_recipes, get_recipe_by_id, get_all_recipe_by_userid, update_recipe, update_ingredient, update_instruction, delete_recipe
from users import get_allingredients_by_recipeid, get_allinstructions_by_recipeid, insert_instruction, insert_ingredient, delete_ingredient, delete_allRecipe_user
from flask_mysqldb import MySQL
from database import set_database
from dotenv import load_dotenv
from os import getenv
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
load_dotenv()

app.config['MYSQL_HOST'] = getenv('MYSQL_HOST')
# app.config['MYSQL_PORT'] = getenv('MYSQL_PORT')
app.config['MYSQL_USER'] = getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = getenv('MYSQL_DB')
app.config["MYSQL_CURSORCLASS"] = getenv('MYSQL_CURSORCLASS') # to return rows as dictionaries not array
app.config["MYSQL_AUTOCOMMIT"] = True if getenv('MYSQL_AUTOCOMMIT') == 'True' else False
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_PORT'] = 3306
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'D0oll@ar'
# app.config['MYSQL_DB'] = 'im2_finalproject'
# app.config["MYSQL_CURSORCLASS"] = "DictCursor" # to return rows as dictionaries not array
# app.config["MYSQL_AUTOCOMMIT"] = True

mysql = MySQL(app)
set_database(mysql) 


@app.route('/')
def home():
    return  "<h1>Hello, im!</h1>"


# USERS ------------------------------------ USERS

@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        data = request.get_json()
        result = create_user(data)              
    else:
        result = get_all_users()
    return jsonify(result) 

@app.route('/users/<id>', methods=['GET', 'PUT', 'DELETE'])
def users_by_id(id):
    if request.method == 'PUT':
        data = request.get_json()
        result = update_user(id, data)
    if request.method == 'DELETE':
        result = get_user_by_id(id)
        if result is not None:
            result = delete_user(id)
        else:
            result = False
    else:
        result = get_user_by_id(id)
    return jsonify(result)

# USERS ------------------------------------ USERS


# RECIPE ------------------------------------ RECIPE

@app.route('/recipes', methods=['GET', 'POST'])
def create_recipe_user():
    if request.method == 'POST':
        user_id = request.json.get("user_id")
        recipe_data = request.get_json()
        result = create_recipe(user_id, recipe_data)      
    else:
        result = get_all_recipes()
    return jsonify(result)

@app.route('/recipes', methods=['GET'])
def recipes():
    result = get_all_recipes()
    return jsonify(result)

@app.route('/recipes/<id>', methods=['GET'])
def recipes_by_id(id):
    result = get_recipe_by_id(id)
    return jsonify(result)

@app.route('/recipes/user/<id>', methods=['GET'])
def recipes_by_userid(id):
    result = get_all_recipe_by_userid(id)
    return jsonify(result)

@app.route('/recipes/<id>', methods=['PUT'])
def recipe_by_id(id):
    user_id = request.json.get("user_id")
    data = request.get_json()
    result = update_recipe(id, user_id, data)
    return jsonify(result)

@app.route('/recipes/<id>', methods=['DELETE'])
def delete_recipe_user(id):
    result = get_recipe_by_id(id)
    if result is not None:
        result = delete_recipe(id)
    else:
        result = False
    return jsonify(result)

@app.route('/recipes/delete/<id>', methods=['DELETE'])
def delete_recipe_by_user(id):
    result = get_recipe_by_id(id)
    if result is not None:
        result = delete_allRecipe_user(id)
    else:
        result = False
    return jsonify(result)

# RECIPE ------------------------------------ RECIPE


# INGREDIENTS ------------------------------------ INGREDIENTS

@app.route('/recipe/ingredients', methods=['POST'])
def insert_ingredient_by_recipe():
    data = request.get_json()
    result = insert_ingredient(data)      
    return jsonify(result)

@app.route('/recipes/ingredients/<id>', methods=['GET'])
def ingredients_by_recipeid(id):
    result = get_allingredients_by_recipeid(id)
    return jsonify(result)

@app.route('/recipes/ingredients/<id>', methods=['PUT'])
def ingredients_by_id(id):
    recipe_id = request.json.get("recipe_id")
    data = request.get_json()
    result = update_ingredient(id, recipe_id, data)
    return jsonify(result)

@app.route('/ingredients/<id>', methods=['DELETE'])
def delete_ingredient_user(id):
    result = get_allingredients_by_recipeid(id)
    if result is not None:
        result = delete_ingredient(id)
    else:
        result = False
    return jsonify(result)

# INGREDIENTS ------------------------------------ INGREDIENTS


# INSTRUCTION ------------------------------------ INSTRUCTION

@app.route('/recipe/instructions', methods=['POST'])
def insert_instruction_by_recipe():
    data = request.get_json()
    result = insert_instruction(data)      
    return jsonify(result)

@app.route('/recipes/instructions/<id>', methods=['GET'])
def instructions_by_recipeid(id):
    result = get_allinstructions_by_recipeid(id)
    return jsonify(result)

@app.route('/recipes/instructions/<id>', methods=['PUT'])
def instructions_by_id(id):
    recipe_id = request.json.get("recipe_id")
    data = request.get_json()
    result = update_instruction(id, recipe_id, data)
    return jsonify(result)

@app.route('/instructions/<id>', methods=['DELETE'])
def delete_instruction_user(id):
    result = get_allinstructions_by_recipeid(id)
    if result is not None:
        result = delete_instruction(id)
    else:
        result = False
    return jsonify(result)

# INSTRUCTION ------------------------------------ INSTRUCTION