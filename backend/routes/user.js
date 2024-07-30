const express = require('express');
const router = express.Router();
const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/sign-in", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        } else if (username.length < 4) {
            return res.status(400).json({ message: "Username must be at least 4 characters" });
        }

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashpassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashpassword,
        });

        await newUser.save();
        return res.status(200).json({ message: "Sign-In successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password);

        if (isPasswordCorrect) {
            const authClaims = { name: username, jti: jwt.sign({}, "tcmTM") };
            const token = jwt.sign(authClaims, "tcmTM", { expiresIn: "2d" });
            res.status(200).json({ id: existingUser._id, token });
        } else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal server Error", error: error.message });
    }
});

module.exports = router;
