import { 
  serial, 
  text, 
  pgTable, 
  timestamp, 
  integer, 
  boolean,
  date,
  pgEnum,
  real
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'teacher']);
export const attendanceStatusEnum = pgEnum('attendance_status', ['present', 'sick', 'permission', 'absent']);
export const gradeTypeEnum = pgEnum('grade_type', ['daily', 'midterm', 'final']);

// Users table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: userRoleEnum('role').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Academic years table
export const academicYearsTable = pgTable('academic_years', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  start_date: date('start_date').notNull(),
  end_date: date('end_date').notNull(),
  is_active: boolean('is_active').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Semesters table
export const semestersTable = pgTable('semesters', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  academic_year_id: integer('academic_year_id').references(() => academicYearsTable.id).notNull(),
  is_active: boolean('is_active').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Subjects table
export const subjectsTable = pgTable('subjects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  code: text('code').notNull().unique(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Classes table
export const classesTable = pgTable('classes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  grade: integer('grade').notNull(), // 7, 8, 9 for SMP
  academic_year_id: integer('academic_year_id').references(() => academicYearsTable.id).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Students table
export const studentsTable = pgTable('students', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  nisn: text('nisn').notNull().unique(),
  class_id: integer('class_id').references(() => classesTable.id).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Teacher-Subject assignments table
export const teacherSubjectsTable = pgTable('teacher_subjects', {
  id: serial('id').primaryKey(),
  teacher_id: integer('teacher_id').references(() => usersTable.id).notNull(),
  subject_id: integer('subject_id').references(() => subjectsTable.id).notNull(),
  class_id: integer('class_id').references(() => classesTable.id).notNull(),
  academic_year_id: integer('academic_year_id').references(() => academicYearsTable.id).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Attendances table
export const attendancesTable = pgTable('attendances', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').references(() => studentsTable.id).notNull(),
  subject_id: integer('subject_id').references(() => subjectsTable.id).notNull(),
  class_id: integer('class_id').references(() => classesTable.id).notNull(),
  teacher_id: integer('teacher_id').references(() => usersTable.id).notNull(),
  semester_id: integer('semester_id').references(() => semestersTable.id).notNull(),
  date: date('date').notNull(),
  meeting_number: integer('meeting_number').notNull(),
  status: attendanceStatusEnum('status').notNull(),
  notes: text('notes'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Grades table
export const gradesTable = pgTable('grades', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').references(() => studentsTable.id).notNull(),
  subject_id: integer('subject_id').references(() => subjectsTable.id).notNull(),
  class_id: integer('class_id').references(() => classesTable.id).notNull(),
  teacher_id: integer('teacher_id').references(() => usersTable.id).notNull(),
  semester_id: integer('semester_id').references(() => semestersTable.id).notNull(),
  type: gradeTypeEnum('type').notNull(),
  score: real('score').notNull(), // Using real for numeric scores
  date: date('date').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  teacherSubjects: many(teacherSubjectsTable),
  attendances: many(attendancesTable),
  grades: many(gradesTable)
}));

export const academicYearsRelations = relations(academicYearsTable, ({ many }) => ({
  semesters: many(semestersTable),
  classes: many(classesTable),
  teacherSubjects: many(teacherSubjectsTable)
}));

export const semestersRelations = relations(semestersTable, ({ one, many }) => ({
  academicYear: one(academicYearsTable, {
    fields: [semestersTable.academic_year_id],
    references: [academicYearsTable.id]
  }),
  attendances: many(attendancesTable),
  grades: many(gradesTable)
}));

export const subjectsRelations = relations(subjectsTable, ({ many }) => ({
  teacherSubjects: many(teacherSubjectsTable),
  attendances: many(attendancesTable),
  grades: many(gradesTable)
}));

export const classesRelations = relations(classesTable, ({ one, many }) => ({
  academicYear: one(academicYearsTable, {
    fields: [classesTable.academic_year_id],
    references: [academicYearsTable.id]
  }),
  students: many(studentsTable),
  teacherSubjects: many(teacherSubjectsTable),
  attendances: many(attendancesTable),
  grades: many(gradesTable)
}));

export const studentsRelations = relations(studentsTable, ({ one, many }) => ({
  class: one(classesTable, {
    fields: [studentsTable.class_id],
    references: [classesTable.id]
  }),
  attendances: many(attendancesTable),
  grades: many(gradesTable)
}));

export const teacherSubjectsRelations = relations(teacherSubjectsTable, ({ one }) => ({
  teacher: one(usersTable, {
    fields: [teacherSubjectsTable.teacher_id],
    references: [usersTable.id]
  }),
  subject: one(subjectsTable, {
    fields: [teacherSubjectsTable.subject_id],
    references: [subjectsTable.id]
  }),
  class: one(classesTable, {
    fields: [teacherSubjectsTable.class_id],
    references: [classesTable.id]
  }),
  academicYear: one(academicYearsTable, {
    fields: [teacherSubjectsTable.academic_year_id],
    references: [academicYearsTable.id]
  })
}));

export const attendancesRelations = relations(attendancesTable, ({ one }) => ({
  student: one(studentsTable, {
    fields: [attendancesTable.student_id],
    references: [studentsTable.id]
  }),
  subject: one(subjectsTable, {
    fields: [attendancesTable.subject_id],
    references: [subjectsTable.id]
  }),
  class: one(classesTable, {
    fields: [attendancesTable.class_id],
    references: [classesTable.id]
  }),
  teacher: one(usersTable, {
    fields: [attendancesTable.teacher_id],
    references: [usersTable.id]
  }),
  semester: one(semestersTable, {
    fields: [attendancesTable.semester_id],
    references: [semestersTable.id]
  })
}));

export const gradesRelations = relations(gradesTable, ({ one }) => ({
  student: one(studentsTable, {
    fields: [gradesTable.student_id],
    references: [studentsTable.id]
  }),
  subject: one(subjectsTable, {
    fields: [gradesTable.subject_id],
    references: [subjectsTable.id]
  }),
  class: one(classesTable, {
    fields: [gradesTable.class_id],
    references: [classesTable.id]
  }),
  teacher: one(usersTable, {
    fields: [gradesTable.teacher_id],
    references: [usersTable.id]
  }),
  semester: one(semestersTable, {
    fields: [gradesTable.semester_id],
    references: [semestersTable.id]
  })
}));

// TypeScript types for the table schemas
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type AcademicYear = typeof academicYearsTable.$inferSelect;
export type NewAcademicYear = typeof academicYearsTable.$inferInsert;

export type Semester = typeof semestersTable.$inferSelect;
export type NewSemester = typeof semestersTable.$inferInsert;

export type Subject = typeof subjectsTable.$inferSelect;
export type NewSubject = typeof subjectsTable.$inferInsert;

export type Class = typeof classesTable.$inferSelect;
export type NewClass = typeof classesTable.$inferInsert;

export type Student = typeof studentsTable.$inferSelect;
export type NewStudent = typeof studentsTable.$inferInsert;

export type TeacherSubject = typeof teacherSubjectsTable.$inferSelect;
export type NewTeacherSubject = typeof teacherSubjectsTable.$inferInsert;

export type Attendance = typeof attendancesTable.$inferSelect;
export type NewAttendance = typeof attendancesTable.$inferInsert;

export type Grade = typeof gradesTable.$inferSelect;
export type NewGrade = typeof gradesTable.$inferInsert;

// Export all tables and relations for proper query building
export const tables = {
  users: usersTable,
  academicYears: academicYearsTable,
  semesters: semestersTable,
  subjects: subjectsTable,
  classes: classesTable,
  students: studentsTable,
  teacherSubjects: teacherSubjectsTable,
  attendances: attendancesTable,
  grades: gradesTable
};