class User {
    private _id : number;
   private _username: string;
   private _password: string;

    constructor(name: string, password: string, id: number) {
        this._username = name;
        this._password = password;
        this._id = id;
    }



    get username(): string {
        return this._username;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}

export default User;
