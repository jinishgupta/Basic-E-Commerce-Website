import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/user.js'

//register
const registerUser = async (req, res) => {
    console.log("Request body:", req.body);
    const { userName, email, password } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!userName) missingFields.push('userName');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');

    if (missingFields.length > 0) {
        console.log("Validation failed - Missing fields:", missingFields);
        return res.status(400).json({
            success: false,
            message: `Please provide ${missingFields.join(', ')}`
        });
    }

    try {
        const checkUser = await User.findOne({ email });
        if(checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with same email"
            });
        }

        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration successful"
        });

    } catch(e) {
        console.error("Registration error:", e);
        const errorMessage = e.message || "Some error occurred";
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
}

//login

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist with this email"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }
        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, 'CLIENT_SECRET_KEY', { expiresIn: '240m' });
        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Login successful",
            user: {
                email: user.email,
                role: user.role,
                id: user._id,
            }
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message:"Some error occured"
        });
    }
}

//logout

const logoutUser = async (req, res) => {
    try {
        console.log("Logging out user");
        res.clearCookie('token').json({
            success: true,
            message: "Logout successful"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        });
    }
}

//middleware

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        });
    }
    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        });
    }
}

export { registerUser, loginUser , logoutUser , authMiddleware };
