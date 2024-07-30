const express = require('express');
const router = express.Router();
const Dairy = require("../model/dairy");
const User = require("../model/user");
const authenticateToken = require('../routes/auth');

router.post("/create-post", authenticateToken ,async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { id } = req.headers;

        const newDairy = new Dairy({
            title,
            desc,
        });

        const savedPost = await newDairy.save();
        const dairyId = savedPost._id;

        await User.findByIdAndUpdate(id, { $push: { dairy: dairyId } });

        res.status(200).json({ message: "Post created successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/get-all-post", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({path:"dairy", options: { sort: {createdAt: -1}},});
        res.status(200).json({data: userData});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.delete("/delete-post/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        await Dairy.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { dairy: id}});
        res.status(200).json({message:"Task deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.put("/update-post/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;
        await Dairy.findByIdAndUpdate(id, {title: title, desc:desc});
        res.status(200).json({message:"Task updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.put("/update-imp-post/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const DairyData = await Dairy.findById(id);
        const ImpDairy = DairyData.important;
        await Dairy.findByIdAndUpdate(id, { important: !ImpDairy});
        res.status(200).json({message:"Task updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.put("/update-complete-post/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const DairyData = await Dairy.findById(id);
        const CompleteDairy = DairyData.complete;
        await Dairy.findByIdAndUpdate(id, { complete: !CompleteDairy});
        res.status(200).json({message:"Task updated successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.get("/get-imp-post", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({path:"dairy",match: {important: true} ,options: { sort: {createdAt: -1}},});
        const ImpDairyData = Data.dairy;
        res.status(200).json({data: ImpDairyData});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.get("/get-complete-post", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({path:"dairy",match: {complete: true} ,options: { sort: {createdAt: -1}},});
        const CompleteDairyData = Data.dairy;
        res.status(200).json({data: CompleteDairyData});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.get("/get-incomplete-post", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({path:"dairy",match: {complete: false} ,options: { sort: {createdAt: -1}},});
        const InCompleteDairyData = Data.dairy;
        res.status(200).json({data: InCompleteDairyData});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error" });
    }
});

module.exports = router;
