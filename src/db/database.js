const mongoose = require('mongoose');
const { dataURL } = require('../config/config.json');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(dataURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('[Database] Database is successfully connected.');
    } catch (error) {
        console.error('[Database] Connection error:', error);
    }
};

module.exports = {
    connectToDatabase
}