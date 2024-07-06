import connectDB from "./db/index.js";
import {app} from './app.js'
import dotenv from "dotenv"

// this is for development setup only. In prod, we will pick this value from env var of system, that we will set `export monoguser="user"` like this in our entrypoint.sh, we will get those values from vault.
dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
