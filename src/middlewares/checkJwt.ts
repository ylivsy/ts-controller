import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from '../config/auth/jwt/sercret'


const checkJwt = function(req: Request, res: Response, next: NextFunction) {
    //Get the jwt token from the head
    const token = <string>req.headers["authorization"];

    if (!token) {
        res.status(401).send();
        return;
    }

    let sliceToken = token.slice(7);
    let jwtPayload;

    //Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(sliceToken, config.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.JWT_SECRET, {
        expiresIn: "1h"
    });
    // res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
};

export default checkJwt;
