import express from 'express';
import { checkAuth, forgotPassword, Login, logout, resetPassword, signUp, updateUserProfile, verifyEmail } from '../controller/user.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.route('/checkauth').get(isAuthenticated,checkAuth);
router.route('/signup').post(signUp);
router.route('/login').post(Login);
router.route('/logout').post(logout);
router.route('/verifyemail').post(verifyEmail);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').post(resetPassword);
router.route('/profile/update').put(isAuthenticated,updateUserProfile);

export default router;
