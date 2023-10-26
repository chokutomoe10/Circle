export interface IUser {
    id?:number,
    username?: string,
    full_name?: string,
    email?: string,
    profile_picture?: string,
    profile_description?: string
}

export interface IUserRegister {
    full_name: string,
    username: string,
    email: string,
    password: string
}

export interface IUserLogin {
    email: string,
    password: string
}