import { IStudent } from "../dto";
import { IStudentRequest } from "../types";

export interface IStudentRepository {
    create(student : IStudentRequest) : Promise<IStudent>
    getStudents() : Promise <IStudent[]>
    getStudentById(studentId: string) : Promise <IStudent | undefined>
    updateStudent(id: string, student: IStudentRequest): Promise<IStudent>
    delete(id: string): Promise<IStudent>
}

