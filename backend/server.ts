import express, { type Express } from 'express';
import http from 'http';
import cors from "cors";
import connectDB from './db';
import "./src/middleware/oauthpassword"
import authRouter from './src/routes/authRouter';
import { setupWebSocket } from './src/wss/ws';

connectDB();
const PORT = process.env.PORT || 3010;
const app: Express = express();

const server = http.createServer(app);
setupWebSocket(server);

app.use (express.json());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: [ "https://trainer-clash.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);	

const mongooose = require("mongoose")

const passport =require("passport")

const GoogleStrategy = require("passport-google-oauth20").Strategy

const session = require ("express-session")

const MongoStore = require("connect-mongo");



app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI! }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true,
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter); 

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", failureMessage: true }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL!);
  }
);

app.get("/auth/logout", (req, res)=> {
  req.logout((err)=> {
    if (err) return next(err);
    res.redirect(process.env.CLIENT_URL!)
  })
})

app.get("/api/googleUser", (req, res)=>{
    if(req.isAuthenticated()) {
      res.json(req.user);
    } else {
    res.status(401).json({ error: "unauthorized"})
    }
});

app.use (express.json());
	
app.get('/', (_, res) => {
    res.send('WebSocket server is running');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

function next(err: unknown) {
  throw new Error('Function not implemented.');
}