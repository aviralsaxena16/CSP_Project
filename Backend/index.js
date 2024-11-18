import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import tourRoute from "./routes/tours.js"
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/review.js'
import bookingRoute from "./routes/bookings.js"

dotenv.config()
const app = express();
const port = process.env.PORT || 8000
const corsOptions = {
    origin:true,
    credentials:true
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/v1/tours",tourRoute);
app.use("/api/v1/users",userRoute);
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/review",reviewRoute);
app.use("/api/v1/booking",bookingRoute);
//http://localhost:4000/api/v1/tours/:id

mongoose.set("strictQuery", false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB database is connected")
    } catch (error) {
        console.log("MongoDB connection failed:", error)
    }
}

connect();

app.get("/", (req, res) => {
    res.send("API is working")
})

app.listen(port, () => {
    console.log("Server listening on Port", port)
})
