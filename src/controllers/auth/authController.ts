import express from 'express';
import AuthRepository from '../../repositories/auth/authRepository';
import * as secret from '../../config/auth/jwt/sercret'
import checkJWT from '../../middlewares/checkJwt'
import AuthService from '../../services/auth/authService';
import jwt from 'jsonwebtoken';



class AuthController {

    public path = '/auth';
    public router = express.Router();
    public userRepository = AuthRepository.getInstance();
    public authService = new AuthService();

    constructor() {
        this.intializeRoutes();
    }

    private intializeRoutes() {
        this.router.get(`/health`, this.health);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/signup`, this.signup);

        this.router.post(`${this.path}/signout`, checkJWT , this.signout);
    }

    private login = (request: express.Request, response: express.Response) => {
        const body = request.body
        this.validateLoginBody(body, response);

        const user = this.userRepository.findByUserUserNameAndPassword(body.username, body.password);
        if (!user) {
            return response.status(404).json({error: 'user not found, our system support in memory user management :) '})
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            secret.JWT_SECRET,
            { expiresIn: '1h' }
        );

        response.status(200).json({externalToken: token, externalUserId: user.id});
    }

    validateLoginBody = (body: any, response: express.Response) => {
        if (!body){
            return response.status(404).json({error: 'bad request'});
        }

        if (Object.keys(body).length === 0 || !body.username || !body.password) {
            return response.status(404).json({error: 'bad request'});
        }
    }

    private signup = (request: express.Request, response: express.Response) => {
        const body = request.body
        this.validateLoginBody(body.account, response);

        const user = this.userRepository.findByUserName(body.account.username);
        if (user) {
            return response.status(404).json({error: 'user already exists'})
        }

        const usr = this.authService.createUser(body);

        const token = jwt.sign(
            { userId: usr.id, username: usr.username },
            secret.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return response.status(200).json({externalToken: token, externalUserId: usr.id});
    }

    private signout = (request: express.Request, response: express.Response) => {
        return response.status(204).send();
    }

    private health = (request: express.Request, response: express.Response) => {
        return response.status(200).send();
    }
}


export default AuthController;
