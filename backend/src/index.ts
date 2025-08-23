import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

//Auth Routes
app.post('/api/v1/register', function (req, res){
    //Create new user
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