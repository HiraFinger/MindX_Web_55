const express = require("express");
const AuthCtrl = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", async (req, res) => {
    // Step 1: find user by username
    try{
        const loggedInInfo=await AuthCtrl.login(req.body.username, req.body.password);
        res.json(loggedInInfo);
    }
    catch(err){
        res.status(400).send(err.message)
    }
});
router.post("/register", async (req, res) => {
    // Validation
    if (!req.body.password || req.body.password.length < 8) {
        res.status(400).send("Password must contain at least 8 characters");
        return;
    }
    // Call logic
    try {
        const newUser = await AuthCtrl.register(
            req.body.username, 
            req.body.email, 
            req.body.password
        );
        res.json(newUser);
    } catch (err) {
        res.status(409).send(err.message);
    }
});

module.exports = router;
