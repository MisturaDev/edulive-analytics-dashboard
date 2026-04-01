export const classes = [
  { id: 'c1', name: 'Grade 10A', subject: 'Mathematics', teacher: 'Ms. Daniels' },
  { id: 'c2', name: 'Grade 10B', subject: 'Science', teacher: 'Mr. Okoye' },
  { id: 'c3', name: 'Grade 11A', subject: 'English', teacher: 'Mrs. Cole' },
]

export const summary = [
  {
    id: 1,
    classId: 'c1',
    date: '2026-03-31',
    attendanceRate: 0.92,
    engagementRate: 0.74,
    participationRate: 0.68,
    tardyRate: 0.08,
    absentRate: 0.05,
  },
  {
    id: 2,
    classId: 'c2',
    date: '2026-03-31',
    attendanceRate: 0.88,
    engagementRate: 0.7,
    participationRate: 0.54,
    tardyRate: 0.1,
    absentRate: 0.09,
  },
  {
    id: 3,
    classId: 'c3',
    date: '2026-03-31',
    attendanceRate: 0.95,
    engagementRate: 0.79,
    participationRate: 0.73,
    tardyRate: 0.04,
    absentRate: 0.03,
  },
]

export const timeseries = [
  { id: 101, classId: 'c1', date: '2026-03-01', attendanceRate: 0.9, engagementRate: 0.7, participationRate: 0.6 },
  { id: 102, classId: 'c1', date: '2026-03-08', attendanceRate: 0.93, engagementRate: 0.74, participationRate: 0.66 },
  { id: 103, classId: 'c1', date: '2026-03-15', attendanceRate: 0.91, engagementRate: 0.72, participationRate: 0.64 },
  { id: 104, classId: 'c1', date: '2026-03-22', attendanceRate: 0.94, engagementRate: 0.75, participationRate: 0.69 },
  { id: 105, classId: 'c1', date: '2026-03-29', attendanceRate: 0.92, engagementRate: 0.74, participationRate: 0.68 },
  { id: 201, classId: 'c2', date: '2026-03-01', attendanceRate: 0.86, engagementRate: 0.66, participationRate: 0.58 },
  { id: 202, classId: 'c2', date: '2026-03-08', attendanceRate: 0.88, engagementRate: 0.68, participationRate: 0.56 },
  { id: 203, classId: 'c2', date: '2026-03-15', attendanceRate: 0.87, engagementRate: 0.69, participationRate: 0.55 },
  { id: 204, classId: 'c2', date: '2026-03-22', attendanceRate: 0.89, engagementRate: 0.71, participationRate: 0.53 },
  { id: 205, classId: 'c2', date: '2026-03-29', attendanceRate: 0.88, engagementRate: 0.7, participationRate: 0.54 },
  { id: 301, classId: 'c3', date: '2026-03-01', attendanceRate: 0.94, engagementRate: 0.76, participationRate: 0.7 },
  { id: 302, classId: 'c3', date: '2026-03-08', attendanceRate: 0.95, engagementRate: 0.78, participationRate: 0.72 },
  { id: 303, classId: 'c3', date: '2026-03-15', attendanceRate: 0.96, engagementRate: 0.8, participationRate: 0.74 },
  { id: 304, classId: 'c3', date: '2026-03-22', attendanceRate: 0.95, engagementRate: 0.79, participationRate: 0.73 },
  { id: 305, classId: 'c3', date: '2026-03-29', attendanceRate: 0.95, engagementRate: 0.79, participationRate: 0.73 },
]

export const leaderboard = [
  { id: 1, classId: 'c1', student: 'Amina Yusuf', participationScore: 92, trend: 'up' },
  { id: 2, classId: 'c1', student: 'Kelechi Obi', participationScore: 88, trend: 'up' },
  { id: 3, classId: 'c1', student: 'Liam Okoro', participationScore: 81, trend: 'flat' },
  { id: 4, classId: 'c2', student: 'Sarah Mensah', participationScore: 76, trend: 'down' },
  { id: 5, classId: 'c2', student: 'Tunde Bello', participationScore: 73, trend: 'flat' },
  { id: 6, classId: 'c2', student: 'David Nwosu', participationScore: 70, trend: 'down' },
  { id: 7, classId: 'c3', student: 'Chloe Hart', participationScore: 94, trend: 'up' },
  { id: 8, classId: 'c3', student: 'Amir Idris', participationScore: 89, trend: 'up' },
  { id: 9, classId: 'c3', student: 'Grace Uche', participationScore: 86, trend: 'flat' },
]

export const alerts = [
  {
    id: 1,
    classId: 'c2',
    date: '2026-03-31',
    participationRate: 0.49,
    note: 'Participation below 50% for two weeks',
  },
]
