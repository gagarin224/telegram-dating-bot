import User from '../db/models/user.js';
import Like from '../db/models/like.js';
import SessionModel from '../db/models/session.js';

export default class DatabaseHelper {
    constructor() {
        throw new ReferenceError(`Class ${this.constructor.name} cannot be initialized!`);
    }

    static async saveSession({ key, data }) {
        return await SessionModel.findOneAndUpdate({ key }, { data }, { upsert: true });
    }

    static async loadSession({ key }) {
        return (await SessionModel.findOne({ key }))?.data || {};
    }

    static async checkUser({ chatId }) {
        return await User.findOne({ chatId }).exec();
    }

    static async newLike({ userId, memberId }) {
        return await new Like({ userId, memberId, status: true }).save();
    }

    static async newLikeMessage({ userId, memberId, message }) {
        return await new Like({ userId, memberId, status: true, message }).save();
    }

    static async checkLikes({ memberId }) {
        return await Like.findOne({ memberId, status: true }).exec();
    }

    static async pushHistory({ ctx, memberId }) {
        return ctx.session.history.push(memberId);
    }
}