import express from 'express'
import session from 'express-session'
import pool from '../config/database.js'
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser'

import registerUser from '../controllers/register.js'
import loginUser from '../controllers/login.js'
import disconnectUser from '../controllers/disconnect.js'

const router = express.Router();

router.post("/api/register", registerUser)
router.post("/api/login", loginUser)
router.get("/api/disconnect", disconnectUser)

export default router;