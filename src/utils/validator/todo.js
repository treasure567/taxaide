const validator = require('validator');

const create_todo = (title = '', description = '', user = '') => {
    const errors = {};
    if (validator.isEmpty(title)) {
        errors["title"] = "Title cannot be blank"
    }
    if (validator.isEmpty(description)) {
        errors["description"] = "Description cannot be blank";
    }
    if (!validator.isLength(title, { min: 6 })) {
        errors["title"] = "Ensure that your todo title has a minimum of 6 characters";
    }
    if (validator.isUUID(user)) {
        errors["user"] = "Invalid User UUID given";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

const update_todo = (title = '', description = '', completed = '', todo_id = '') => {
    const errors = {};
    if (validator.isEmpty(title)) {
        errors["title"] = "Title cannot be blank"
    }
    if (validator.isEmpty(description)) {
        errors["description"] = "Description cannot be blank";
    }
    if (!validator.isLength(title, { min: 6 })) {
        errors["title"] = "Ensure that your todo title has a minimum of 6 characters";
    }
    if (validator.isEmail(completed)) {
        errors["completed"] = "Completed cannot be blank";
    }
    if (validator.isBoolean(completed)) {
        errors["completed"] = "Completed must be a boolean";
    }
    if (validator.isEmpty(todo_id)) {
        errors['todo_id'] = "Todo ID is required"
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports = {
    create_todo,
    todoId
}