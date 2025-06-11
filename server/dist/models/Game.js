import mongoose from 'mongoose';
const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    genres: [{
            type: String,
            required: true
        }],
    playerTypes: [{
            type: String,
            required: true
        }],
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
export const Game = mongoose.model('Game', gameSchema);
