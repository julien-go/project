import express from 'express'

import registerUser from '../controllers/register.js'
import loginUser from '../controllers/login.js'
import disconnectUser from '../controllers/disconnect.js'
import addCategorie from '../controllers/admin/addCategorie.js'
import { uploadAvatar } from '../controllers/uploadAvatar.js'
import getProfileInfos from '../controllers/profile.js'
import modifyProfileInfos from '../controllers/modifyProfile.js'
import deleteAccount from '../controllers/deleteAccount.js'
import { removeAvatar } from '../controllers/removeAvatar.js'

import getCategories from '../controllers/getCategories.js'

const router = express.Router();

// Not connected routes
router.post("/api/register", registerUser)

router.post("/api/login", loginUser)

// User routes
router.get("/api/disconnect", disconnectUser)
router.get("/api/profile/:username", getProfileInfos);

router.post("/api/modify-profile", modifyProfileInfos);
router.post("/api/upload-avatar", uploadAvatar)
router.post("/api/remove-avatar", removeAvatar);
router.post("/api/delete-account", deleteAccount)

router.get("/api/get-categories", getCategories);
// Admin routes 
router.post("/api/admin/add-categorie", addCategorie);

export default router;