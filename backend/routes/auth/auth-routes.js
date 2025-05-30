import express from 'express'
import { registerUser, loginUser ,logoutUser, authMiddleware} from '../../controllers/auth/auth-controller.js';

const authRouter = express.Router()
authRouter.post('/signup', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.get('/check-auth', authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "User is authenticated",
        user: {
            email: req.user.email,
            role: req.user.role,
            id: req.user.id
        }
    });
});

export {authRouter};