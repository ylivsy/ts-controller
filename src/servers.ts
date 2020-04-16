import App from './app';
import PostsController from './controllers/posts/posts.controller';
import AuthController from './controllers/auth/authController';
import AddressController from "./controllers/address/addressController";

const app = new App(
    [
        new PostsController(),
        new AuthController(),
        new AddressController()
    ],
    5000,
);

app.listen();
