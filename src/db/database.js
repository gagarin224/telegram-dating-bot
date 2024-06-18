import mongoose from 'mongoose';
import Logger from '../services/Logger.js';
import config from '../config/config.json' assert { type: 'json' };

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.dataURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        Logger.info('[Database] Database is successfully connected.');
    } catch (error) {
        Logger.error('[Database] Connection error:', error);
    }
};