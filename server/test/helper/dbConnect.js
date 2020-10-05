const mongoose  = require('mongoose');

function connect() {
    mongoose.connect(process.env.TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('useCreateIndex', true);
    return mongoose.connection;
}

module.exports = { connect };