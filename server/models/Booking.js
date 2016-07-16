import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    date: Date,
    time: String,
    contact: String,
    room: String,
    duration: String
});

module.exports = mongoose.model('Booking', bookingSchema);
