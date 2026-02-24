import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000
const corsOptions = {
    origin: ['http://localhost:5173',
        'https://myecompage.com'],
}

// Connect To MongoDB
mongoose.connect(process.env.MONGO_URL, { dbName: "SessionAuth" })
    .then(() => console.log("Connected To MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB", error))

// User Model 
const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String
})
const User = mongoose.model("User", userSchema)

// middleware
app.use(cors(corsOptions))
app.use(express.json())

// session 
app.use(session({
    secret: process.env.SESSION_SECRET || "MydemosecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collection: "sessions",
        dbName: "SessionAuth"
    }),
    cookie: {
        httpOnlyl: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24  // 1day
    }
}))


// routes 
// Route : Create account
app.post('/api/register', async (req, res) => {
    const { Name, Email, Password } = req.body
    if (!Email || !Password) {
        return res.status(400).json({ error: "Email and Password are required" })
    }

    try {
        const ExistingUser = await User.findOne({ Email: Email })
        if (ExistingUser) {
            return res.status(400).json({ error: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(Password, salt)

        const newUser = new User({ Name, Email, Password: hashedPassword })
        await newUser.save()
        console.log("User Registred")
        return res.status(201).json({ message: "User registered successfully" })

    } catch (error) {
        console.log("Error registering user", error)
        return res.status(500).json({ error: "Internal server error" })
    }

})

// Route Login 

app.post('/api/login', async (req, res) => {
    try {
        const { Email, Password } = req.body
        if (Email == "" || Password == "") {
            return res.status(400).json({ error: "Email and Password are required" })
        }
        else {
            const existingUser = await User.findOne({ Email })
            if (!existingUser) {
                return res.status(401).json({ error: "User not found" })
            }
            const isPasswordValid = await bcrypt.compare(Password, existingUser.Password)
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" })
            }

            req.session.user = {
                id: existingUser._id,
                email: existingUser.Email,
                role: 'user'
            }

            res.json({ message: "Logged in Successfully" })
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
})

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.status(401).json({error:"Not Authenticated"})
    }
}
app.get('/api/profile', isAuthenticated, (req,res) => {
    res.json({
        message: "This is a protected Route",
        user: req.session.user
    });
})



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})