import express from 'express'
import  Jwt  from 'jsonwebtoken'
import path from 'path'
import authRouter from './routes/auth.mjs'
import postRouter from './routes/posts.mjs'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'


const __dirname = path.resolve()
const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use('/api/v1/mongoDB', authRouter)

app.use('/api/v1/mongoDB', (req, res, next) => { // JWT
    console.log("cookies: ", req.cookies);
    
    const token = req.cookies.token;
    console.log("Received token: ", token);
    try {
        const decoded = Jwt.verify(token, process.env.SECRET);
        console.log("decoded: ", decoded);

        req.body.decoded = {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
            _id: decoded._id,
        };

        next();

    } catch (err) {
        console.log('Token verification error: ', err)
        res.status(401).send({ message: "invalid token" })
    }


})

app.use('/api/v1/mongoDB', postRouter) // secure api

app.use('/api/v1/mongoDB/ping', (req, res)=>{
    res.send('OK')
})

app.use('/', express.static(path.join(__dirname,'web/build')))
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,'/web/build/index.html'))
    // res.redirect('/')
})

const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`)
})
