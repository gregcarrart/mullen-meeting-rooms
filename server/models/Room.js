import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    room: String,
    location: String,
    status: String,
    bookingsCount: Number,
    image: String,
    size: String
});

module.exports = mongoose.model('Room', roomSchema);
