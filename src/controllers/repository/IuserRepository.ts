import { IUser } from "../dto";
import { IUserRequest } from "../types";

export interface IUserRepository {
    create(student : IUserRequest) : Promise<IUser>
    getStudents() : Promise <IUser[]>
    getStudentById(studentId: string) : Promise <IUser | undefined>
    updateStudent(id: string, student: IUserRequest): Promise<IUser>
    delete(id: string): Promise<IUser>
}

