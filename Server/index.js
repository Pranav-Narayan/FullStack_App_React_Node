import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000
const corsOptions = {
    origin: ['http://localhost:5173',
        'https://myecompage.com']
}

app.use(cors(corsOptions))

app.get('/api/user',
    (req, res) => {
        const user = { id: 1155, name: "Tom", Phone: 7775552221 }
        res.send(user)
    })

app.post('/api/register', (req, res) => {
    res.send({
        message: "Account Creation Completed"
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})