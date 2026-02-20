import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000
const corsOptions = {
    origin: ['http://localhost:5173',
        'https://myecompage.com']
}

// Connect To MongoDB
mongoose.connect(process.env.MONGO_URL,{dbName:"SessionAuth"})
    .then( ()=> console.log("Connected To MongoDB"))
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


// routes 
app.get('/api/user',(req, res) => {
        const user = { id: 1155, name: "Tom", Phone: 7775552221 }
        res.send(user)
    })

// Route : Create account
app.post('/api/register', async(req, res) => {
    const { Name, Email, Password } = req.body
    if (!Email || !Password) {
        return res.status(400).json({error:"Email and Password are required"})
    }

    try {
        const ExistingUser = await User.findOne({Email: Email})
        if (ExistingUser) {
            return res.status(400).json({error:"User already exists"})
        }        
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(Password, salt)

        const newUser = new User({ Name, Email, Password: hashedPassword })
        await newUser.save()
        console.log("User Registred")
        return res.status(201).json({message:"User registered successfully"})

    } catch (error) {
        console.log("Error registering user", error)
        return res.status(500).json({error:"Internal server error"})
    }
    
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})