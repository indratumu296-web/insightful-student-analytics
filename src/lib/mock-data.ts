export const student = {
  id: "STU-2026-0143",
  name: "Ananya Sharma",
  email: "ananya.sharma@university.edu",
  department: "Computer Science & Engineering",
  semester: 6,
  section: "B",
  batch: "2022 – 2026",
  cgpa: 8.74,
  attendance: 91.4,
  rank: 7,
  classSize: 128,
  phone: "+91 98450 22014",
  guardian: "Rajesh Sharma",
  address: "Bengaluru, Karnataka, India",
};

export type Subject = {
  code: string;
  name: string;
  credits: number;
  internal: number;
  external: number;
  total: number;
  grade: string;
  faculty: string;
};

export const subjects: Subject[] = [
  { code: "CS601", name: "Machine Learning", credits: 4, internal: 27, external: 63, total: 90, grade: "A+", faculty: "Dr. R. Menon" },
  { code: "CS602", name: "Distributed Systems", credits: 4, internal: 24, external: 55, total: 79, grade: "A", faculty: "Prof. K. Iyer" },
  { code: "CS603", name: "Data Warehousing", credits: 3, internal: 22, external: 49, total: 71, grade: "B+", faculty: "Dr. S. Nair" },
  { code: "CS604", name: "Cloud Computing", credits: 3, internal: 26, external: 58, total: 84, grade: "A", faculty: "Prof. M. Das" },
  { code: "CS605", name: "Cyber Security", credits: 3, internal: 21, external: 44, total: 65, grade: "B", faculty: "Dr. P. Kulkarni" },
  { code: "CS606", name: "Project Work I", credits: 2, internal: 29, external: 64, total: 93, grade: "A+", faculty: "Dr. R. Menon" },
];

export const semesterTrend = [
  { sem: "Sem 1", gpa: 7.6, attendance: 88 },
  { sem: "Sem 2", gpa: 7.9, attendance: 90 },
  { sem: "Sem 3", gpa: 8.2, attendance: 86 },
  { sem: "Sem 4", gpa: 8.4, attendance: 92 },
  { sem: "Sem 5", gpa: 8.6, attendance: 89 },
  { sem: "Sem 6", gpa: 8.74, attendance: 91 },
];

export const attendanceBySubject = [
  { subject: "CS601", present: 42, total: 45 },
  { subject: "CS602", present: 39, total: 44 },
  { subject: "CS603", present: 35, total: 42 },
  { subject: "CS604", present: 41, total: 43 },
  { subject: "CS605", present: 33, total: 40 },
  { subject: "CS606", present: 28, total: 29 },
];

export const attendanceLog = [
  { date: "2026-08-05", subject: "CS601 · Machine Learning", status: "Present", hours: 2 },
  { date: "2026-08-05", subject: "CS604 · Cloud Computing", status: "Present", hours: 1 },
  { date: "2026-08-04", subject: "CS605 · Cyber Security", status: "Absent", hours: 1 },
  { date: "2026-08-04", subject: "CS602 · Distributed Systems", status: "Present", hours: 2 },
  { date: "2026-08-03", subject: "CS603 · Data Warehousing", status: "Late", hours: 1 },
  { date: "2026-08-02", subject: "CS601 · Machine Learning", status: "Present", hours: 2 },
];

export const skillRadar = [
  { skill: "Analytics", score: 88 },
  { skill: "Programming", score: 92 },
  { skill: "Theory", score: 74 },
  { skill: "Lab Work", score: 85 },
  { skill: "Communication", score: 69 },
  { skill: "Consistency", score: 81 },
];

export const gradeDistribution = [
  { name: "A+", value: 24 },
  { name: "A", value: 38 },
  { name: "B+", value: 31 },
  { name: "B", value: 22 },
  { name: "C", value: 13 },
];

export const facultyRoster = [
  { id: "STU-0117", name: "Arjun Patel", section: "B", cgpa: 9.1, attendance: 96, risk: "Low" },
  { id: "STU-0124", name: "Meera Krishnan", section: "B", cgpa: 8.4, attendance: 88, risk: "Low" },
  { id: "STU-0131", name: "Rohit Verma", section: "A", cgpa: 6.7, attendance: 71, risk: "High" },
  { id: "STU-0143", name: "Ananya Sharma", section: "B", cgpa: 8.74, attendance: 91, risk: "Low" },
  { id: "STU-0158", name: "Kabir Rao", section: "A", cgpa: 7.2, attendance: 78, risk: "Medium" },
  { id: "STU-0166", name: "Sneha Joshi", section: "C", cgpa: 5.9, attendance: 64, risk: "High" },
];

export const departmentPerformance = [
  { dept: "CSE", avg: 8.2, pass: 96 },
  { dept: "ECE", avg: 7.8, pass: 93 },
  { dept: "MECH", avg: 7.1, pass: 88 },
  { dept: "CIVIL", avg: 6.9, pass: 85 },
  { dept: "IT", avg: 8.0, pass: 95 },
];

export const adminStats = [
  { label: "Total students", value: "4,286", delta: "+142 this term" },
  { label: "Faculty members", value: "312", delta: "+8 this term" },
  { label: "Active courses", value: "186", delta: "24 departments" },
  { label: "Avg. institution CGPA", value: "7.84", delta: "+0.21 YoY" },
];
