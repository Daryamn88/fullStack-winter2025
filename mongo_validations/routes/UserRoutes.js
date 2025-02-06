const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.use(express.json()); // Ensure JSON parsing

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        console.log(`Users fetched: ${JSON.stringify(users)}`);
        res.status(200).json(users);
    } catch (err) {
        console.error(`Error fetching users: ${err.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to insert a new user
router.post('/insert', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            console.log('No data provided to be saved.');
            return res.status(400).json({ error: 'No data provided' });
        }

        const newUser = new User(req.body);
        console.log(`User to save to DB: ${JSON.stringify(newUser)}`);

        await newUser.save();

        res.status(201).json({
            message: `User ${newUser.email} saved to DB successfully`,
            user: newUser
        });

    } catch (err) {
        console.error(`Error inserting user: ${err.message}`);

        if (err.code === 11000) {
            return res.status(400).json({ error: `User with email ${req.body.email} already exists.` });
        }

        if (err.name === "ValidationError") {
            const validationErrors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors: validationErrors });
        }

        res.status(400).json({ error: err.message || "An error occurred" });
    }
});

module.exports = router;



const testObj = 
{
    "name": "John Doe",
    "username": "johndoe",
    "email": "john.doe@example.com",
    "address": {
      "street": "123 Main St",
      "suite": "Apt. 101",
      "city": "Toronto",
      "zipcode": "12345-6789",
      "geo": {
        "lat": "40.7128",
        "lng": "-74.0060"
      }
    },
    "phone": "1-123-456-7890",
    "website": "https://johndoe.com",
    "company": {
      "name": "Doe Inc.",
      "catchPhrase": "Innovating the Future",
      "bs": "Leading industry standards"
    }
}
  