import { IUser } from "../dto";
import { IUserRequest } from "../types";

export interface IUserRepository {
    create(user : IUserRequest) : Promise<IUser>
    getUsers() : Promise <IUser[]>
    getUserById(userId: string) : Promise <IUser | undefined>
    updateUser(id: string, user: IUserRequest): Promise<IUser>
    delete(id: string): Promise<IUser>
}

