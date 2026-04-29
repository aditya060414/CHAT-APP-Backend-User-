import express from 'express'
import { getAUser, getUsers, LoginUser, updateName, userProfile, verifyUser } from '../controllers/user.js';
import { Auth } from '../middlewares/Auth.js'
const router = express.Router();

router.post("/loginUser", LoginUser);
router.post("/verify", verifyUser);
router.get("/userProfile", Auth, userProfile);
router.post("/update", Auth, updateName);
router.get("/all", Auth, getUsers)
router.get("/me",Auth, getAUser)
export default router;