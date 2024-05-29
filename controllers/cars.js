const Appointment = require('../models/appointment');

// List all appointments
async function getAllApp(req, res) {
    try {
        const appointments = await Appointment.find();
        res.render('appointments/index', { appointments });
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).send('Server Error');
    }
}

// Create a new appointment
async function createApp(req, res) {
    const { customerName, customerPhone, customerEmail, vehicleMake, vehicleModel, vehicleYear, vehicleLicensePlate, appointmentDate, appointmentTime, serviceType } = req.body;

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
        serviceType
    });

    try {
        await newAppointment.save();
        res.redirect('/appointments');
    } catch (err) {
        console.error('Error creating appointment:', err);
        res.render('appointments/new', { errorMsg: err.message });
    }
}

// Get a single appointment by ID
async function getAppById(req, res) {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send('Appointment not found');
        }
        res.render('appointments/show', { appointment });
    } catch (err) {
        console.error('Error fetching appointment:', err);
        res.status(500).send('Server Error');
    }
}

// Update an appointment
async function updateApp(req, res) {
    const { customerName, customerPhone, customerEmail, vehicleMake, vehicleModel, vehicleYear, vehicleLicensePlate, appointmentDate, appointmentTime, serviceType, status } = req.body;

    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send('Appointment not found');
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
        appointment.serviceType = serviceType;
        appointment.status = status;

        await appointment.save();
        res.redirect(`/appointments/${appointment._id}`);
    } catch (err) {
        console.error('Error updating appointment:', err);
        res.status(500).send('Server Error');
    }
}

// Delete an appointment
async function deleteApp(req, res) {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).send('Appointment not found');
        }
        res.redirect('/appointments');
    } catch (err) {
        console.error('Error deleting appointment:', err);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getAllApp,
    createApp,
    getAppById,
    updateApp,
    deleteApp
};