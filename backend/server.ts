import express, { type Express } from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from "cors";
import connectDB from './db';
import userRouter from './src/routes/routes';
import "./src/middleware/oauthpassword"
import authRouter from './src/routes/authRouter';




connectDB();
const PORT = import.meta.env.PORT || 3010;
const app: Express = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
app.use (express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL! || "http://localhost:5173"],
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
    cookie: {
      maxAge: 12 * 60 * 60 * 1000,
    },
  })
);

app.use("/auth", authRouter); 
app.use("/users", userRouter);

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173");
  }
);

app.get("/auth/logout", (req, res)=> {
  req.logout((err)=> {
    if (err) return next(err);
    res.redirect("http://localhost:5173")
  })
})

app.get("/api/googleUser", (req, res)=>{
  if (req.isAuthenticated()){
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Unauthiruzed"})
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

function next(err: any): void {
  throw new Error('Function not implemented.');
}

