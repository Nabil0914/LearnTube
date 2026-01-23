import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from './models/user.models.js';
import { PORT, JWT_PASSWORD } from './config/config.js';
import { connectDB } from './db/db.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
connectDB();

enum ResponseStatus{
    SUCCESS = 200,
    INVALID_INPUT = 411,
    INVALID_CREDENTIALS = 401,
    USER_NOT_FOUND = 404,
    USER_EXISTS = 403,
    SERVER_ERROR = 500
}

const signupSchema = z.object({
    username: z.string().min(3).max(8),
    email: z.string().email(),
    password: z.string().min(8).max(20).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.")
})

//Auth Routes
app.post('/api/v1/register', async function (req, res){
    //Create new user
    const parsed = signupSchema.safeParse(req.body);

    if(!parsed.success){
        res.status(ResponseStatus.INVALID_INPUT).json({
            message: "Invalid Inputs"
        });
        return;
    }

    const { username, password, email } = parsed.data;
    try {

        const existingUser = await User.findOne({
            username
        });

        if(existingUser){
            return res.status(ResponseStatus.USER_EXISTS).json({
                message: "User already exist with this username !"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        return res.status(ResponseStatus.SUCCESS).json({
            message: "Successfully registered"
        });
        
    } catch (e) {
        return res.status(ResponseStatus.SERVER_ERROR).json({
            message: "Server Error"
        });
    }


})

const signinSchema = z.object({
    username: z.string().min(3, "Username is too short").max(20, "Username is too long"),
    password: z.string().min(1, "Password is required")
})

app.post('/api/v1/login', async function (req, res){
    //Authenticate user, return JWT
    const parsedInput = signinSchema.safeParse(req.body);
    

    if(!parsedInput.success){
        res.status(ResponseStatus.INVALID_INPUT).json({
            message: "Invalid Input"
        })
        return;
    }

    const { username, password } = parsedInput.data;

    try {
        const existingUser = await User.findOne({
            username
        })

        if(!existingUser){
            return res.status(ResponseStatus.USER_NOT_FOUND).json({
                message: "User doesn't exist"
            })
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if(!passwordMatch){
            return res.status(ResponseStatus.INVALID_CREDENTIALS).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        return res.status(ResponseStatus.SUCCESS).json({
            message: "Signin Successful",
            token,
            user: {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
    }
        })
    } catch (e) {
        return res.status(ResponseStatus.SERVER_ERROR).json({
            message: "Something went wrong. Please try again later"
        });
    }
})

app.get('/api/v1/me', authMiddleware, function (req:any, res){
    //Get logged-in user details (protected)
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    
    try{
        return res.json({
            status: 200,
            id: req.user._id,
            username: req.user.username,
            email: req.user.email
        })
    } catch(error){
        return res.status(500).json({
            message: "Server error"
        })
    }
})

//Playlist Routes
app.post('/api/v1/playlists', function(req, res){
    //Add new playlist (fetch data from YouTube API and store videos + details)    
})

app.get('/api/v1/playlists', function(req, res){
    //Get all playlists for logged-in user  
})

app.get('/api/v1/playlists/:id', function(req, res){
    //Get one playlist (with videos + progress)
})

app.delete('/api/v1/playlists/:id', function(req, res){
    //Delete playlist (and its videos, notes)
})

//Videos Routes
app.patch('/api/v1/videos/:id/toggle-watch', function(req, res){
    //Mark/unmark video as watched
})

app.patch('/api/v1/videos/:id/toggle-important', function(req, res){
    //Mark/unmark as important
})

app.get('/api/v1/videos/:id', function(req, res){
    //Get video details (with notes if any)
})

//Dashboard and Progress Routes
app.get('/api/v1/dashboard/progress', function(req, res){
    //Get progress summary across all playlists (e.g., total watched, percentage per playlist)
})

//Notes Routes


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})