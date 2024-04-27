const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://ell:tcNVov3QaFlsJoVh@cluster0.09jpazb.mongodb.net/testBlog?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for your data
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON
app.use(express.json());

// Route to handle POST request to create a new user
app.post('/users', async (req, res) => {
    try {
        const { username, name, passwordHash, blogs } = req.body;
        const newUser = new User({ username, name, passwordHash, blogs });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'An error occurred while saving the user' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
