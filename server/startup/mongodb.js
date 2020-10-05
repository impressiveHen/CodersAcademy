const mongoose = require("mongoose");
const { logger } = require("./logging");

module.exports = function() {
    if (process.env.NODE_ENV==='test') {
        return;
    }

    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => logger.info('Connected to MongoDB...'));
    mongoose.set('useCreateIndex', true);
};