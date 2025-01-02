import express, { urlencoded } from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config()
const app = express()
const port = process.env.PORT
import connectdb from "./src/db/index.js";
import userRouter from "./src/routes/user.routes.js"

app.use(urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use('/user', userRouter)
app.get('/', (req, res) => {
    res.send('server')
})

connectdb()
    .then(() => {
        app.listen(port, () => {
            console.log("server is running at port ", port);
        })
    })
    .catch((err) => {
        console.log(err);
    })