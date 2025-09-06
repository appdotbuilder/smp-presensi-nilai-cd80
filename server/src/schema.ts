import { z } from 'zod';

// User role enum
export const userRoleSchema = z.enum(['admin', 'teacher']);
export type UserRole = z.infer<typeof userRoleSchema>;

// User schema
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  role: userRoleSchema,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

// Login input schema
export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export type LoginInput = z.infer<typeof loginInputSchema>;

// Create user input schema
export const createUserInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: userRoleSchema
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

// Update user input schema
export const updateUserInputSchema = z.object({
  id: z.number(),
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  role: userRoleSchema.optional()
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

// Academic year schema
export const academicYearSchema = z.object({
  id: z.number(),
  name: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type AcademicYear = z.infer<typeof academicYearSchema>;

// Create academic year input schema
export const createAcademicYearInputSchema = z.object({
  name: z.string().min(1),
  start_date: z.string().or(z.date()),
  end_date: z.string().or(z.date()),
  is_active: z.boolean().optional()
});

export type CreateAcademicYearInput = z.infer<typeof createAcademicYearInputSchema>;

// Update academic year input schema
export const updateAcademicYearInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  start_date: z.string().or(z.date()).optional(),
  end_date: z.string().or(z.date()).optional(),
  is_active: z.boolean().optional()
});

export type UpdateAcademicYearInput = z.infer<typeof updateAcademicYearInputSchema>;

// Semester schema
export const semesterSchema = z.object({
  id: z.number(),
  name: z.string(),
  academic_year_id: z.number(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Semester = z.infer<typeof semesterSchema>;

// Create semester input schema
export const createSemesterInputSchema = z.object({
  name: z.string().min(1),
  academic_year_id: z.number(),
  is_active: z.boolean().optional()
});

export type CreateSemesterInput = z.infer<typeof createSemesterInputSchema>;

// Update semester input schema
export const updateSemesterInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  academic_year_id: z.number().optional(),
  is_active: z.boolean().optional()
});

export type UpdateSemesterInput = z.infer<typeof updateSemesterInputSchema>;

// Subject schema
export const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Subject = z.infer<typeof subjectSchema>;

// Create subject input schema
export const createSubjectInputSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().nullable().optional()
});

export type CreateSubjectInput = z.infer<typeof createSubjectInputSchema>;

// Update subject input schema
export const updateSubjectInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  description: z.string().nullable().optional()
});

export type UpdateSubjectInput = z.infer<typeof updateSubjectInputSchema>;

// Class schema
export const classSchema = z.object({
  id: z.number(),
  name: z.string(),
  grade: z.number().int(),
  academic_year_id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Class = z.infer<typeof classSchema>;

// Create class input schema
export const createClassInputSchema = z.object({
  name: z.string().min(1),
  grade: z.number().int().min(7).max(9), // SMP grades 7-9
  academic_year_id: z.number()
});

export type CreateClassInput = z.infer<typeof createClassInputSchema>;

// Update class input schema
export const updateClassInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  grade: z.number().int().min(7).max(9).optional(),
  academic_year_id: z.number().optional()
});

export type UpdateClassInput = z.infer<typeof updateClassInputSchema>;

// Student schema
export const studentSchema = z.object({
  id: z.number(),
  name: z.string(),
  nisn: z.string(),
  class_id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Student = z.infer<typeof studentSchema>;

// Create student input schema
export const createStudentInputSchema = z.object({
  name: z.string().min(1),
  nisn: z.string().min(1),
  class_id: z.number()
});

export type CreateStudentInput = z.infer<typeof createStudentInputSchema>;

// Update student input schema
export const updateStudentInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  nisn: z.string().min(1).optional(),
  class_id: z.number().optional()
});

export type UpdateStudentInput = z.infer<typeof updateStudentInputSchema>;

// Teacher subject assignment schema
export const teacherSubjectSchema = z.object({
  id: z.number(),
  teacher_id: z.number(),
  subject_id: z.number(),
  class_id: z.number(),
  academic_year_id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type TeacherSubject = z.infer<typeof teacherSubjectSchema>;

// Create teacher subject input schema
export const createTeacherSubjectInputSchema = z.object({
  teacher_id: z.number(),
  subject_id: z.number(),
  class_id: z.number(),
  academic_year_id: z.number()
});

export type CreateTeacherSubjectInput = z.infer<typeof createTeacherSubjectInputSchema>;

// Attendance status enum
export const attendanceStatusSchema = z.enum(['present', 'sick', 'permission', 'absent']);
export type AttendanceStatus = z.infer<typeof attendanceStatusSchema>;

// Attendance schema
export const attendanceSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  subject_id: z.number(),
  class_id: z.number(),
  teacher_id: z.number(),
  semester_id: z.number(),
  date: z.coerce.date(),
  meeting_number: z.number().int(),
  status: attendanceStatusSchema,
  notes: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Attendance = z.infer<typeof attendanceSchema>;

// Create attendance input schema
export const createAttendanceInputSchema = z.object({
  student_id: z.number(),
  subject_id: z.number(),
  class_id: z.number(),
  teacher_id: z.number(),
  semester_id: z.number(),
  date: z.string().or(z.date()),
  meeting_number: z.number().int().positive(),
  status: attendanceStatusSchema,
  notes: z.string().nullable().optional()
});

export type CreateAttendanceInput = z.infer<typeof createAttendanceInputSchema>;

// Bulk attendance input schema
export const bulkAttendanceInputSchema = z.object({
  subject_id: z.number(),
  class_id: z.number(),
  teacher_id: z.number(),
  semester_id: z.number(),
  date: z.string().or(z.date()),
  meeting_number: z.number().int().positive(),
  attendances: z.array(z.object({
    student_id: z.number(),
    status: attendanceStatusSchema,
    notes: z.string().nullable().optional()
  }))
});

export type BulkAttendanceInput = z.infer<typeof bulkAttendanceInputSchema>;

// Grade type enum
export const gradeTypeSchema = z.enum(['daily', 'midterm', 'final']);
export type GradeType = z.infer<typeof gradeTypeSchema>;

// Grade schema
export const gradeSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  subject_id: z.number(),
  class_id: z.number(),
  teacher_id: z.number(),
  semester_id: z.number(),
  type: gradeTypeSchema,
  score: z.number(),
  date: z.coerce.date(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Grade = z.infer<typeof gradeSchema>;

// Create grade input schema
export const createGradeInputSchema = z.object({
  student_id: z.number(),
  subject_id: z.number(),
  class_id: z.number(),
  teacher_id: z.number(),
  semester_id: z.number(),
  type: gradeTypeSchema,
  score: z.number().min(0).max(100),
  date: z.string().or(z.date()),
  description: z.string().nullable().optional()
});

export type CreateGradeInput = z.infer<typeof createGradeInputSchema>;

// Update grade input schema
export const updateGradeInputSchema = z.object({
  id: z.number(),
  score: z.number().min(0).max(100).optional(),
  description: z.string().nullable().optional()
});

export type UpdateGradeInput = z.infer<typeof updateGradeInputSchema>;

// Get attendance report input schema
export const getAttendanceReportInputSchema = z.object({
  subject_id: z.number(),
  class_id: z.number(),
  semester_id: z.number()
});

export type GetAttendanceReportInput = z.infer<typeof getAttendanceReportInputSchema>;

// Get grade report input schema
export const getGradeReportInputSchema = z.object({
  subject_id: z.number(),
  class_id: z.number(),
  semester_id: z.number()
});

export type GetGradeReportInput = z.infer<typeof getGradeReportInputSchema>;

// Authentication response schema
export const authResponseSchema = z.object({
  success: z.boolean(),
  user: userSchema.optional(),
  message: z.string()
});

export type AuthResponse = z.infer<typeof authResponseSchema>;