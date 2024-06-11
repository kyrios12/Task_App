import express from "express";
import { registerGet,registerPost,loginGet,loginPost, getLocalStorage } from "../controllers/authController.js";

const router = express();

// router.get('/register', registerGet);

// router.get('/login', loginGet);

router.post('/register', registerPost);

router.post('/login', loginPost);

// router.get('/getFromLocalStorage', getLocalStorage);

export default router;