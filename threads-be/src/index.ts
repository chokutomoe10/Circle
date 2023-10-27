import { AppDataSource } from "./data-source"
import express = require ("express");
// import * as express from 'express'
import cors = require ("cors");
// import * as cors from 'cors'
import router from "./route"

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    app.use(express.json())
    app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
    }))
    app.use("/api/v1", router)
    app.use("/uploads", express.static("uploads"))

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
})
.catch(error => console.log(error))