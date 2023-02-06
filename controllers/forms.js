const User = require('../models/user');
const Form = require('../models/form');
const Response = require('../models/response');

exports.createForm = async (req, res) => {
    const form = new Form({
        title: req.body.title,
        fields: req.body.fields,
        createdBy: req.user.id
    });

    try {
        const result = await form.save();
        res.status(200).json({ message: 'Form created successfully', form: result });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'Form creation failed' });
    }
};

exports.viewForms = async (req, res) => {
    const forms = await Form.find({});
    if (!forms)
        return res.status(400).json({ message: 'Forms not found' });
    res.status(200).json({ message: 'Forms retrieved successfully', forms });
};

exports.viewForm = async (req, res) => {
    const form = await Form.findById(req.params.id);
    if (!form)
        return res.status(400).json({ message: 'Form not found' });
    res.status(200).json({ message: 'Forms retrieved successfully', form });
};

exports.generateLink = async (req, res) => {
    const form = await Form.findById(req.params.id);
    if (!form)
        return res.status(400).json({ message: 'Form not found' });

    const link = `http://localhost:2000/forms/${form._id}/response`;
    res.status(200).json({ message: 'Form link generated successfully', link });
};

exports.createResponse = async (req, res) => {
    const form = await Form.findById(req.params.id);
    if (!form)
        return res.status(400).json({ message: 'Form not found' });

    const response = new Response({
        form: form._id,
        answers: req.body.answers
    });

    try {
        const result = await response.save();
        res.status(200).json({ message: 'Response generated successfully', response: result });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Response generation failed' });
    }
};

exports.viewResponses = async (req, res) => {
    const form = await Form.findById(req.params.id);
    if (!form)
        return res.status(400).json({ message: 'Form not found' });
    const responses = await Response.find({ form: form._id });
    res.status(200).json({ message: 'Responses retrieved successfully', responses });
};

exports.deleteResponses = async (req, res) => {
    const response = await Response.findByIdAndDelete(req.params.id);
    if (!response)
        return res.status(400).json({ message: 'Response not found' });
    res.status(200).json({ message: 'Response deleted successfully' });
};

exports.editResponses = async (req, res) => {
    const response = await Response.findByIdAndUpdate(req.params.id, req.body.answers, { new: true });
    if (!response)
        return res.status(400).json({ message: 'Response not found' });
    res.status(200).json({ message: 'Response edited successfully', response });
};