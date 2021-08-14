const router = require('express').Router();
const authController = require('./controller/auth-controller');
const activateController = require('./controller/activate-controller');
const authMiddleware = require('./middlewares/authMiddleware');


router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.post('/api/activate',authMiddleware, activateController.active);
router.post('/api/logout',authMiddleware, activateController.logout);
router.post('/api/refresh', authController.refresh);
