require('dotenv').config();

const {
    JWT_SECRET_KEY,
    SERVER_PORT,
    MONGO_URI
} = process.env;

const requiredCreds = [
    JWT_SECRET_KEY,
    SERVER_PORT,
    MONGO_URI,
];

for (const [key, value] of Object.entries(requiredCreds)) {
    if (!value) {
        console.log(`Environment variable ${key} is missing.`);
        process.exit(1);
    }
}

module.exports = {
    JWT_SECRET_KEY,
    SERVER_PORT,
    MONGO_URI,
}