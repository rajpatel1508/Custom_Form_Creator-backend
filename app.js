const express = require('express');
const mongoose = require('mongoose');
const { register, login, logout } = require('./controllers/auth');
const { createForm, generateLink, viewResponses, deleteResponses, editResponses, createResponse, viewForms } = require('./controllers/forms');
const { requiresignin } = require('./middlewares/auth');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

// connect to mongoDB
mongoose.connect('mongodb+srv://rajpatel1508:Crowley%401508@cluster0.l4cl70a.mongodb.net/Formgenerator?retryWrites=true&w=majority', {
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

// Create form
app.get('/api/forms', viewForms);

// Generate form link
app.get('/api/forms/:id/link', requiresignin, generateLink);

// Generate response
app.post('/forms/:id/response', createResponse);

// View responses
app.get('/api/forms/:id/responses', requiresignin, viewResponses);

// Delete response
app.delete('/api/responses/:id', requiresignin, deleteResponses);

// Edit response
app.patch('/api/responses/:id', requiresignin, editResponses);

// const port = process.env.PORT || 3000;
app.listen(2000, () => console.log(`Listening on port ${2000}...`));
