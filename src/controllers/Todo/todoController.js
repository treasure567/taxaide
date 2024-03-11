const { response: response } = require('../../utils/response');
const Todo = require('../../models/Todo');
const { create_todo, update_todo, delete_todo } = require('../../utils/validator/todo');
const { hiddenTodoData } = require('../../utils/apiFilter');


exports.createTodo = async (req, res) => {
    try {
        const user = req.user;
        const { title, description } = req.body;
        let { errors, valid } = create_todo(title, description);
        if (!valid) {
            return response(res, 401, { status: false, message: "Invalid input", errors });
        }
        const todo = new Todo({
            title: title,
            description: description,
            user: user
        });
        await todo.save();
        data = {
            '_id': todo._id
        };
        return response(res, 200, { status: true, message: "Todo created successfully", data: data });
    } catch (error) {
        return response(res, 500, { status: false, message: "Failed to create Todo" });
    }
}

exports.getTodos = async (req, res) => {
    try {
        const user = req.user;
        const todos = await Todo.find({ user: user }).sort({ createdAt: -1 }).select(hiddenTodoData());;
        return response(res, 200, { status: true, message: "Todo(s) fetched successfully", data: todos});
    } catch (error) {
        return response(res, 500, { status: false, message: "Server Error Occured", error: err.message });
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const user = req.user;
        const { title, description, completed, todo_id } = req.body;
        const { errors, valid } = update_todo(title, description, completed, todo_id);
        if (!valid) {
            return response(res, 401, { status: false, message: "Invalid input", errors });
        }
        try {
            check_todo = await Todo.findById(todo_id);
            if (!check_todo) {
                return response(res, 400, { status: false, message: "Invalid Todoid" });
            }
            if (check_todo.user !== user) {
                return response(res, 400, { status: false, message: "Invalid Access" });
            }
        } catch (err) {
            return response(res, 500, { status: false, message: "Invalid todo id", error: err.message });
        }
        await Todo.updateOne({ _id: todo_id }, { 
            title: title,
            description: description,
            completed: completed
        });
        data = {
            '_id': todo_id
        };
        return response(res, 200, { status: true, message: "Todo updated successfully", data: data});
    } catch (error) {
        response(res, 500, { status: false, message: error.message });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const user = req.user;
        const { todo_id } = req.body;
        const { errors, valid } = delete_todo(todo_id);
        if (!valid) {
            return response(res, 401, { status: false, message: "Invalid input", errors });
        }
        try {
            check_todo = await Todo.findById(todo_id);
            if (!check_todo) {
                return response(res, 400, { status: false, message: "Invalid Todoid" });
            }
            if (check_todo.user !== user) {
                return response(res, 400, { status: false, message: "Invalid Access" });
            }
        } catch (err) {
            return response(res, 500, { status: false, message: "Invalid todo id", error: err.message });
        }
        await Todo.deleteOne({ _id: todo_id });
        return response(res, 200, { status: true, message: "Todo deleted successfully"});
    } catch (error) {
        response(res, 500, { status: false, message: error.message });
    }
}


