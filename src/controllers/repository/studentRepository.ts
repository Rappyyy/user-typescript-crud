import mySqlPool from "../../config/db";
import { IStudent } from "../dto";
import { IStudentRequest } from "../types";
import { IStudentRepository } from "./IStudentRepository";


export class StudentRepository implements IStudentRepository {
  async create(student: IStudentRequest): Promise<IStudent> {
    const [result]: any = await mySqlPool.query(
      'INSERT INTO students (name, roll_no, fees, medium) VALUES (?, ?, ?, ?)',
      [student.name, student.roll_no, student.fees, student.medium]
    );

    const createdStudent: IStudent = {
      id: result.insertId.toString(),
      ...student,
    };

    return createdStudent;
  }

  async getStudents(): Promise<IStudent[]> {
    const [rows]: [any[], any] = await mySqlPool.query('SELECT * FROM students');
    return rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      roll_no: row.roll_no,
      fees: row.fees,
      medium: row.medium,
    }));
  }

  async getStudentById(studentId: string): Promise<IStudent | undefined> {
    const [rows]: [any[], any] = await mySqlPool.query(
      'SELECT * FROM students WHERE id = ?',
      [studentId]
    );

    if (rows.length === 0) {
      return undefined;
    }

    const student = rows[0];
    return {
      id: student.id.toString(),
      name: student.name,
      roll_no: student.roll_no,
      fees: student.fees,
      medium: student.medium,
    };
  }

  async updateStudent(id: string, student: IStudentRequest): Promise<IStudent> {
    await mySqlPool.query(
      'UPDATE students SET name = ?, roll_no = ?, fees = ?, medium = ? WHERE id = ?',
      [student.name, student.roll_no, student.fees, student.medium, id]
    );

    return {
      id,
      ...student,
    };
  }

  async delete(id: string): Promise<IStudent> {
    const student = await this.getStudentById(id);
    if (!student) {
      throw new Error('Student not found');
    }

    await mySqlPool.query('DELETE FROM students WHERE id = ?', [id]);
    return student;
  }
}
