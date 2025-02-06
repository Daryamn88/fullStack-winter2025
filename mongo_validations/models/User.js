const mongoose = require('mongoose');

const emailRegEx = /^\S+@\S+\.\S+$/;
const cityRegEx = /^[a-zA-Z\s]+$/;
const zipRegEx = /^\d{5}-\d{4}$/;
const webRegEx = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const phoneRegEx = /^1-\d{3}-\d{3}-\d{4}$/;

// Create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [4, "Username must be at least 4 characters"],
        maxLength: [20, "Username cannot be more than 20 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [emailRegEx, "Email format is invalid"],
        unique: true // Ensures uniqueness at the database level
    },
    address: {
        street: {
            type: String,
            required: [true, "Street is required"],
        },
        suite: {
            type: String,
            required: [true, "Suite is required"]
        },
        city: {
            type: String,
            required: [true, "City is required"],
            match: [cityRegEx, "City format is invalid"]
        },
        zipcode: {
            type: String,
            required: [true, "Zipcode is required"],
            match: [zipRegEx, "ZipCode format is invalid"]
        },
        geo: {
            lat: {
                type: String,
                required: [true, "Latitude is required"],
            },
            lng: {
                type: String,
                required: [true, "Longitude is required"],
            }
        }
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        match: [phoneRegEx, "Phone format is invalid"]
    },
    website: {
        type: String,
        required: [true, "Website is required"],
        match: [webRegEx, "Web URL format is invalid"]
    },
    company: {
        name: {
            type: String,
            required: [true, "Company name is required"]
        },
        catchPhrase: {
            type: String,
            required: [true, "Company CatchPhrase is required"]
        },
        bs: {
            type: String,
            required: [true, "Company Business Slogan is required"]
        }
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

// Pre-save hook to check for existing user
UserSchema.pre('save', async function (next) {
    try {
        const existingUser = await mongoose.model("User").findOne({ email: this.email });

        if (existingUser) {
            console.log(`User with email ${this.email} already exists. Cannot create account.`);
            return next(new Error(`User with email ${this.email} already exists. Cannot create account.`));
        }

        console.log(`User with email ${this.email} doesn't exist, proceeding with save.`);
        this.createdAt = this.createdAt || Date.now();
        this.updatedAt = Date.now();

        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
