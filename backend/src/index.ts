import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import bcrypt from 'bcrypt'
import { User } from './models/user.models.js';
import { PORT } from './config/config.js';
import { connectDB } from './db/db.js';
const app = express();
app.use(express.json());
app.use(cors());
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

app.post('/api/v1/login', function (req, res){
    //Authenticate user, return JWT
})

app.get('/api/v1/me', function (req, res){
    //Get logged-in user details (protected)
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