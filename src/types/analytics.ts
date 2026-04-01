export type Trend = 'up' | 'down' | 'flat'

export type ClassSummary = {
  id: number
  classId: string
  date: string
  attendanceRate: number
  engagementRate: number
  participationRate: number
  tardyRate: number
  absentRate: number
}

export type TimeSeriesPoint = {
  id: number
  classId: string
  date: string
  attendanceRate: number
  engagementRate: number
  participationRate: number
}

export type ClassInfo = {
  id: string
  name: string
  subject: string
  teacher: string
}

export type LeaderboardEntry = {
  id: number
  classId: string
  student: string
  participationScore: number
  trend: Trend
}

export type AlertItem = {
  id: number
  classId: string
  date: string
  participationRate: number
  note: string
}

export type AnalyticsFilters = {
  classId?: string
  dateFrom?: string
  dateTo?: string
}
