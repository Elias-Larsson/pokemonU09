import express, { type Express } from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from "cors";
import connectDB from './db';
import userRouter from './src/routes/routes';
import "./src/middleware/oauthpassword"
import authRouter from './src/routes/authRouter';


connectDB();
const PORT = process.env.PORT || 3010;
const app: Express = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
app.use (express.json());

app.use(
  cors({
    origin: [ "https://trainer-clash.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
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
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter); 
app.use("/users", userRouter);


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
  console.log("req: ", req.headers);
  try {
    if(req.isAuthenticated()) {
      res.json(req.user);
    }
  } catch(error: unknown) {
    res.status(401).json({ error: "unauthorized"})
  }
});

app.use (express.json());
	
app.get('/', (_, res) => {
    res.send('WebSocket server is running');
});

app.use(userRouter);
app.use("/users", userRouter);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

function next(err: unknown) {
  throw new Error('Function not implemented.');
}