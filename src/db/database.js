import mongoose from 'mongoose';
import Logger from '../services/Logger.js';
import { readFile } from 'fs/promises';

const config = JSON.parse(
    await readFile(
        new URL('../../config.json', import.meta.url)
    )
);

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.dataURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        Logger.log('[Database] Database is successfully connected.');
    } catch (error) {
        Logger.error('[Database] Connection error:', error);
    }
};