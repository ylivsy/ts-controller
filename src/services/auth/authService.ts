import AuthRepository from '../../repositories/auth/authRepository';

class AuthService {

    constructor() {
    }


    createUser(body: any) {
        const {account} = body;

        return AuthRepository.getInstance().create(account)
    }
}

export default AuthService;
