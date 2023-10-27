import { NextFunction, Response, Request } from "express";
import jwt = require ("jsonwebtoken");
// import * as jwt from "jsonwebtoken"

const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): Response => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        return res.status(401).json({
            error: "Unauthorizated",
        })
    }

    const token = authorizationHeader.split(" ")[1];

    try {
        const loginSession = jwt.verify(token, "itssecret");
        console.log("ini bagian loginSession", loginSession)
        res.locals.loginSession = loginSession
        next()
    } catch (error) {    
        return res.status(401).json({error: "Unauthorizated"})
    }
}

export default authenticate