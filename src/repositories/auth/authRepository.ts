import User from '../../entities/user'

class AuthRepository {

    private static _repository : Map<string, User> = new Map<string, User>();
    private static inc: number = 0 ;

    static get repository(): Map<string, User> {
        return this._repository;
    }

    static set repository(value: Map<string, User>) {
        this._repository = value;
    }

    private static instance: AuthRepository;

    private constructor() {
    }

    public static getInstance(): AuthRepository {
        if (!AuthRepository.instance) {
            AuthRepository.instance = new AuthRepository();
        }

        return AuthRepository.instance;
    }

    findByUserUserNameAndPassword(username: String, password: String) {
        return AuthRepository._repository.get(username.toString());
    }

    findByUserName(username: string) {
        return AuthRepository._repository.get(username);
    }

    create(account: any) {
        let user = new User(account.username, account.password, AuthRepository.inc);
        AuthRepository._repository.set(account.username, user)

        AuthRepository.inc++;
        return user;
    }
}

export default AuthRepository;
