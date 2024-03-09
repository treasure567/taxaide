const { response: response } = require('../../utils/response');
const Todo = require('../../models/Todo');
const { create_todo, todoId } = require('../../utils/validator/todo');
const { hiddenTodoData } = require('../../utils/apiFilter');


const createTodo = async (req, res) => {
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
        return response(res, 200, { status: true, message: "Todo created successfully" });
    } catch (error) {
        return response(res, 500, { status: false, message: "Failed to resend OTP" });
    }
}

const getTodos = async (req, res) => {
    try {
        const user = req.user;
        const todos = await Todo.find({ user: user }).select(hiddenTodoData());;
        return response(res, 200, { status: true, message: "Todo(s) fetched successfully", data: todos});
    } catch (error) {
        return response(res, 500, { status: false, message: "Server Error Occured", error: err.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        const user = req.user;
        const { title, description, completed, todo_id } = req.body;
        const { errors, valid } = update_todo(title, description, completed, todo_id);
        if (!valid) {
            return response(res, 401, { status: false, message: "Invalid input", errors });
        }
        await User.updateOne({ _id: todo_id }, { 
            title: title,
            description: description,
            completed: completed
        });
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        response(res, 200, { status: true, data: task });
    } catch (error) {
        response(res, 500, { status: false, message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        response(res, 200, { status: true, message: 'Task deleted successfully' });
    } catch (error) {
        response(res, 500, { status: false, message: error.message });
    }
}


