import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/todos", async (req, res) => {
    try {
        const response = await axios.get("https://dummyjson.com/todos?limit=10&skip=0");
        res.status(200).send(response.data.todos);
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.get("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`https://dummyjson.com/todos/${id}`);
        res.status(200).send(response.data);
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.get("/pic", async (req, res) => {
    try { 
        const response = await axios.get("https://picsum.photos/v2/list?page=2&limit=10");

        res.status(200).json({ response: response.data });
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
});

export default router;