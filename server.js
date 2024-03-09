const express = require('express');
const cors = require('cors');
const app = express();
const { MONGO_URI, SERVER_PORT } = require('./src/utils/secrets');
const mongoose = require('mongoose');
const uri = MONGO_URI;

process.on('uncaughtException', (err) => {
    console.error('An uncaught exception occurred:', err);
});
  
process.on('unhandledRejection', (reason, promise) => {
    console.error('An unhandled promise rejection occurred:', reason);
});

async function run() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri)
    .then(() => {
        console.log('connected to MongoDB');
        const PORT = SERVER_PORT;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
    })
}

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        'message': "Taxaide API testing"
    });
});

app.use((req, res, next) => {
    res.status(404).json({
        error: "Not Found",
        message: "The requested resource was not found on this server"
    });
});

run();