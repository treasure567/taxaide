const router = require("express").Router();
const todoController = require("../../../controllers/Todo/todoController");
const { hasAuth } = require("../../../middleware/hasAuth");


module.exports = app => {
    router.post("/create", hasAuth, todoController.createTodo);
    
    app.use('/api/v1/todo', router);
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            status: false,
            message: err.message
        });
        next();
    });
}