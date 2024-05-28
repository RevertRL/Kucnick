const mongoose = require('mongoose');
const { authorize, createEvent } = require('../config/googleCalendar');

const appointmentsSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, validate: /^\d{10}$/ },
    customerEmail: { type: String, required: true, trim: true },
    vehicleMake: { type: String, required: true, trim: true },
    vehicleModel: { type: String, required: true, trim: true },
    vehicleYear: { type: Number, required: true, min: 1886, max: new Date().getFullYear() },
    vehicleLicensePlate: { type: String, required: true, trim: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true, validate: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
    serviceType: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'], default: 'Scheduled' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

appointmentsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

appointmentsSchema.post('save', async function (doc, next) {
    try {
        const auth = await authorize();
        await createEvent(auth, doc);
    } catch (error) {
        console.error('Error creating Google Calendar event:', error);
    }
    next();
});

const Appointment = mongoose.model('Appointment', appointmentsSchema);

module.exports = Appointment;