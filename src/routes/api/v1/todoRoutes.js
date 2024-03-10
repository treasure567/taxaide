const router = require("express").Router();
const todoController = require("../../../controllers/Todo/todoController");
const { hasAuth } = require("../../../middleware/hasAuth");


module.exports = app => {
    router.get("/get", hasAuth, todoController.getTodos);
    router.post("/create", hasAuth, todoController.createTodo);
    router.post("/update", hasAuth, todoController.updateTodo);
    router.post("/delete", hasAuth, todoController.deleteTodo);

    app.use('/api/v1/todo', router);
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            status: false,
            message: err.message
        });
        next();
    });
}