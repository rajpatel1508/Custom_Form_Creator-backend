const express = require('express');
const mongoose = require('mongoose');
const { register, login, logout } = require('./controllers/auth');
const { createForm, generateLink, viewResponses, deleteResponses, editResponses, createResponse, viewForms, viewForm } = require('./controllers/forms');
const { requiresignin } = require('./middlewares/auth');
const cors = require('cors');
const env = require('dotenv');

const app = express();
app.use(express.json());
app.use(cors()); 
env.config();

// connect to mongoDB
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
});

// Register user
app.post('/api/register', register);

// Login user
app.post('/api/login', login);

// logout user
app.post('/api/logout', logout);

// Create form
app.post('/api/forms', requiresignin, createForm);

// view form
app.get('/api/form/:id', viewForm);

// view forms
app.get('/api/forms', viewForms);

// Generate form link
app.get('/api/forms/:id/link', requiresignin, generateLink);

// Generate response
app.post('/api/forms/response/:id', createResponse);

// View responses
app.get('/api/forms/:id/responses', requiresignin, viewResponses);

// Delete response
app.delete('/api/responses/:id', requiresignin, deleteResponses);

// Edit response
app.patch('/api/responses/:id', requiresignin, editResponses);

// const port = process.env.PORT || 3000;
app.listen(2000, () => console.log(`Listening on port ${2000}...`));
