const mongoose = require('mongoose');


const appointmentsSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    vehicleMake: {
        type: String,
        required: true,
        trim: true
    },
    vehicleModel: {
        type: String,
        required: true,
        trim: true
    },
    vehicleYear: {
        type: Number,
        required: true,
        min: 1886,
        max: new Date().getFullYear()
    },
    vehicleLicensePlate: {
        type: String,
        required: true,
        trim: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: props => `${props.value} is not a valid time!`
        }
    },
    serviceType: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

appointmentsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Appointment = mongoose.model('Appointment', appointmentsSchema);

module.exports = Appointment;