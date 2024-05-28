const Appointment = require('../models/appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    const { customerName, customerPhone, customerEmail, vehicleMake, vehicleModel, vehicleYear, vehicleLicensePlate, appointmentDate, appointmentTime, estimatedTime, serviceType } = req.body;

    const newAppointment = new Appointment({
        customerName,
        customerPhone,
        customerEmail,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        vehicleLicensePlate,
        appointmentDate,
        appointmentTime,
        estimatedTime, // Add estimated time
        serviceType
    });

    try {
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single appointment
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
    const { customerName, customerPhone, customerEmail, vehicleMake, vehicleModel, vehicleYear, vehicleLicensePlate, appointmentDate, appointmentTime, estimatedTime, serviceType, status } = req.body;

    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.customerName = customerName;
        appointment.customerPhone = customerPhone;
        appointment.customerEmail = customerEmail;
        appointment.vehicleMake = vehicleMake;
        appointment.vehicleModel = vehicleModel;
        appointment.vehicleYear = vehicleYear;
        appointment.vehicleLicensePlate = vehicleLicensePlate;
        appointment.appointmentDate = appointmentDate;
        appointment.appointmentTime = appointmentTime;
        appointment.estimatedTime = estimatedTime; // Update estimated time
        appointment.serviceType = serviceType;
        appointment.status = status;

        const updatedAppointment = await appointment.save();
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
