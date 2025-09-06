import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import all schemas
import {
  loginInputSchema,
  createUserInputSchema,
  updateUserInputSchema,
  createAcademicYearInputSchema,
  updateAcademicYearInputSchema,
  createSemesterInputSchema,
  updateSemesterInputSchema,
  createSubjectInputSchema,
  updateSubjectInputSchema,
  createClassInputSchema,
  updateClassInputSchema,
  createStudentInputSchema,
  updateStudentInputSchema,
  createTeacherSubjectInputSchema,
  createAttendanceInputSchema,
  bulkAttendanceInputSchema,
  getAttendanceReportInputSchema,
  createGradeInputSchema,
  updateGradeInputSchema,
  getGradeReportInputSchema,
  attendanceStatusSchema
} from './schema';

// Import all handlers
import { login, logout } from './handlers/auth';
import { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from './handlers/users';
import {
  createAcademicYear,
  getAcademicYears,
  getActiveAcademicYear,
  updateAcademicYear,
  deleteAcademicYear
} from './handlers/academic_years';
import {
  createSemester,
  getSemesters,
  getSemestersByAcademicYear,
  getActiveSemester,
  updateSemester,
  deleteSemester
} from './handlers/semesters';
import {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
} from './handlers/subjects';
import {
  createClass,
  getClasses,
  getClassesByAcademicYear,
  getClassesByGrade,
  getClassById,
  updateClass,
  deleteClass
} from './handlers/classes';
import {
  createStudent,
  getStudents,
  getStudentsByClass,
  getStudentById,
  getStudentByNisn,
  updateStudent,
  deleteStudent
} from './handlers/students';
import {
  createTeacherSubject,
  getTeacherSubjects,
  getTeacherSubjectsByTeacher,
  getTeacherSubjectsByClass,
  getTeacherSubjectsByAcademicYear,
  deleteTeacherSubject
} from './handlers/teacher_subjects';
import {
  createAttendance,
  createBulkAttendance,
  getAttendances,
  getAttendancesByStudent,
  getAttendancesByClass,
  getAttendanceReport,
  updateAttendance,
  deleteAttendance
} from './handlers/attendances';
import {
  createGrade,
  getGrades,
  getGradesByStudent,
  getGradesByClass,
  getGradesByTeacher,
  getGradeReport,
  updateGrade,
  deleteGrade,
  getStudentGradeSummary
} from './handlers/grades';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Authentication routes
  login: publicProcedure
    .input(loginInputSchema)
    .mutation(({ input }) => login(input)),
  
  logout: publicProcedure
    .mutation(() => logout()),

  // User management routes (Admin only)
  createUser: publicProcedure
    .input(createUserInputSchema)
    .mutation(({ input }) => createUser(input)),
  
  getUsers: publicProcedure
    .query(() => getUsers()),
  
  getUserById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getUserById(input.id)),
  
  updateUser: publicProcedure
    .input(updateUserInputSchema)
    .mutation(({ input }) => updateUser(input)),
  
  deleteUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteUser(input.id)),

  // Academic year management routes (Admin only)
  createAcademicYear: publicProcedure
    .input(createAcademicYearInputSchema)
    .mutation(({ input }) => createAcademicYear(input)),
  
  getAcademicYears: publicProcedure
    .query(() => getAcademicYears()),
  
  getActiveAcademicYear: publicProcedure
    .query(() => getActiveAcademicYear()),
  
  updateAcademicYear: publicProcedure
    .input(updateAcademicYearInputSchema)
    .mutation(({ input }) => updateAcademicYear(input)),
  
  deleteAcademicYear: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteAcademicYear(input.id)),

  // Semester management routes (Admin only)
  createSemester: publicProcedure
    .input(createSemesterInputSchema)
    .mutation(({ input }) => createSemester(input)),
  
  getSemesters: publicProcedure
    .query(() => getSemesters()),
  
  getSemestersByAcademicYear: publicProcedure
    .input(z.object({ academicYearId: z.number() }))
    .query(({ input }) => getSemestersByAcademicYear(input.academicYearId)),
  
  getActiveSemester: publicProcedure
    .query(() => getActiveSemester()),
  
  updateSemester: publicProcedure
    .input(updateSemesterInputSchema)
    .mutation(({ input }) => updateSemester(input)),
  
  deleteSemester: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteSemester(input.id)),

  // Subject management routes (Admin only)
  createSubject: publicProcedure
    .input(createSubjectInputSchema)
    .mutation(({ input }) => createSubject(input)),
  
  getSubjects: publicProcedure
    .query(() => getSubjects()),
  
  getSubjectById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getSubjectById(input.id)),
  
  updateSubject: publicProcedure
    .input(updateSubjectInputSchema)
    .mutation(({ input }) => updateSubject(input)),
  
  deleteSubject: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteSubject(input.id)),

  // Class management routes (Admin only)
  createClass: publicProcedure
    .input(createClassInputSchema)
    .mutation(({ input }) => createClass(input)),
  
  getClasses: publicProcedure
    .query(() => getClasses()),
  
  getClassesByAcademicYear: publicProcedure
    .input(z.object({ academicYearId: z.number() }))
    .query(({ input }) => getClassesByAcademicYear(input.academicYearId)),
  
  getClassesByGrade: publicProcedure
    .input(z.object({ grade: z.number() }))
    .query(({ input }) => getClassesByGrade(input.grade)),
  
  getClassById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getClassById(input.id)),
  
  updateClass: publicProcedure
    .input(updateClassInputSchema)
    .mutation(({ input }) => updateClass(input)),
  
  deleteClass: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteClass(input.id)),

  // Student management routes (Admin only)
  createStudent: publicProcedure
    .input(createStudentInputSchema)
    .mutation(({ input }) => createStudent(input)),
  
  getStudents: publicProcedure
    .query(() => getStudents()),
  
  getStudentsByClass: publicProcedure
    .input(z.object({ classId: z.number() }))
    .query(({ input }) => getStudentsByClass(input.classId)),
  
  getStudentById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getStudentById(input.id)),
  
  getStudentByNisn: publicProcedure
    .input(z.object({ nisn: z.string() }))
    .query(({ input }) => getStudentByNisn(input.nisn)),
  
  updateStudent: publicProcedure
    .input(updateStudentInputSchema)
    .mutation(({ input }) => updateStudent(input)),
  
  deleteStudent: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteStudent(input.id)),

  // Teacher-Subject assignment routes (Admin only)
  createTeacherSubject: publicProcedure
    .input(createTeacherSubjectInputSchema)
    .mutation(({ input }) => createTeacherSubject(input)),
  
  getTeacherSubjects: publicProcedure
    .query(() => getTeacherSubjects()),
  
  getTeacherSubjectsByTeacher: publicProcedure
    .input(z.object({ teacherId: z.number() }))
    .query(({ input }) => getTeacherSubjectsByTeacher(input.teacherId)),
  
  getTeacherSubjectsByClass: publicProcedure
    .input(z.object({ classId: z.number() }))
    .query(({ input }) => getTeacherSubjectsByClass(input.classId)),
  
  getTeacherSubjectsByAcademicYear: publicProcedure
    .input(z.object({ academicYearId: z.number() }))
    .query(({ input }) => getTeacherSubjectsByAcademicYear(input.academicYearId)),
  
  deleteTeacherSubject: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteTeacherSubject(input.id)),

  // Attendance management routes (Teachers can create/update, Admin can view all)
  createAttendance: publicProcedure
    .input(createAttendanceInputSchema)
    .mutation(({ input }) => createAttendance(input)),
  
  createBulkAttendance: publicProcedure
    .input(bulkAttendanceInputSchema)
    .mutation(({ input }) => createBulkAttendance(input)),
  
  getAttendances: publicProcedure
    .query(() => getAttendances()),
  
  getAttendancesByStudent: publicProcedure
    .input(z.object({ studentId: z.number() }))
    .query(({ input }) => getAttendancesByStudent(input.studentId)),
  
  getAttendancesByClass: publicProcedure
    .input(z.object({ 
      classId: z.number(), 
      subjectId: z.number().optional(), 
      semesterId: z.number().optional() 
    }))
    .query(({ input }) => getAttendancesByClass(input.classId, input.subjectId, input.semesterId)),
  
  getAttendanceReport: publicProcedure
    .input(getAttendanceReportInputSchema)
    .query(({ input }) => getAttendanceReport(input)),
  
  updateAttendance: publicProcedure
    .input(z.object({ 
      id: z.number(), 
      status: attendanceStatusSchema, 
      notes: z.string().optional() 
    }))
    .mutation(({ input }) => updateAttendance(input.id, input.status, input.notes)),
  
  deleteAttendance: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteAttendance(input.id)),

  // Grade management routes (Teachers can create/update, Admin can view all)
  createGrade: publicProcedure
    .input(createGradeInputSchema)
    .mutation(({ input }) => createGrade(input)),
  
  getGrades: publicProcedure
    .query(() => getGrades()),
  
  getGradesByStudent: publicProcedure
    .input(z.object({ 
      studentId: z.number(), 
      semesterId: z.number().optional() 
    }))
    .query(({ input }) => getGradesByStudent(input.studentId, input.semesterId)),
  
  getGradesByClass: publicProcedure
    .input(z.object({ 
      classId: z.number(), 
      subjectId: z.number().optional(), 
      semesterId: z.number().optional() 
    }))
    .query(({ input }) => getGradesByClass(input.classId, input.subjectId, input.semesterId)),
  
  getGradesByTeacher: publicProcedure
    .input(z.object({ teacherId: z.number() }))
    .query(({ input }) => getGradesByTeacher(input.teacherId)),
  
  getGradeReport: publicProcedure
    .input(getGradeReportInputSchema)
    .query(({ input }) => getGradeReport(input)),
  
  updateGrade: publicProcedure
    .input(updateGradeInputSchema)
    .mutation(({ input }) => updateGrade(input)),
  
  deleteGrade: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteGrade(input.id)),
  
  getStudentGradeSummary: publicProcedure
    .input(z.object({ 
      studentId: z.number(), 
      semesterId: z.number() 
    }))
    .query(({ input }) => getStudentGradeSummary(input.studentId, input.semesterId)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`🎓 SMP Attendance & Grading System API listening at port: ${port}`);
}

start();