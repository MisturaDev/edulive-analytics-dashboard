import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { classes, leaderboard, summary, timeseries } from '../data/mockAnalytics'

type ClassInfo = {
  id: string
  name: string
  subject: string
  teacher: string
}

type SummaryItem = {
  id: number
  classId: string
  date: string
  attendanceRate: number
  engagementRate: number
  participationRate: number
  tardyRate: number
  absentRate: number
}

type SeriesItem = {
  date: string
  attendanceRate: number
  engagementRate: number
  participationRate?: number
}

type AnalyticsContextValue = {
  classOptions: ClassInfo[]
  selectedClass: string
  dateRange: string
  setSelectedClass: (value: string) => void
  setDateRange: (value: string) => void
  classInfo: ClassInfo
  classSummary: SummaryItem
  classSeries: SeriesItem[]
  classLeaderboard: typeof leaderboard
  chartLabels: string[]
  advisorInsights: AdvisorInsight[]
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null)

const aggregateSummary = (items: typeof summary) =>
  items.reduce(
    (acc, item) => ({
      id: 0,
      classId: 'all',
      date: item.date,
      attendanceRate: acc.attendanceRate + item.attendanceRate / items.length,
      engagementRate: acc.engagementRate + item.engagementRate / items.length,
      participationRate: acc.participationRate + item.participationRate / items.length,
      tardyRate: acc.tardyRate + item.tardyRate / items.length,
      absentRate: acc.absentRate + item.absentRate / items.length,
    }),
    {
      id: 0,
      classId: 'all',
      date: items[0]?.date ?? '',
      attendanceRate: 0,
      engagementRate: 0,
      participationRate: 0,
      tardyRate: 0,
      absentRate: 0,
    },
  )

const aggregateSeries = (items: typeof timeseries) => {
  const map = new Map<string, { attendance: number; engagement: number; count: number }>()
  items.forEach((item) => {
    const existing = map.get(item.date) ?? { attendance: 0, engagement: 0, count: 0 }
    map.set(item.date, {
      attendance: existing.attendance + item.attendanceRate,
      engagement: existing.engagement + item.engagementRate,
      count: existing.count + 1,
    })
  })
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({
      date,
      attendanceRate: value.attendance / value.count,
      engagementRate: value.engagement / value.count,
      participationRate: items
        .filter((item) => item.date === date)
        .reduce((acc, item) => acc + item.participationRate, 0) /
        items.filter((item) => item.date === date).length,
    }))
}

type AdvisorInsight = {
  id: string
  title: string
  detail: string
  tone: 'warn' | 'info' | 'positive'
}

const buildAdvisorInsights = (items: SummaryItem[], series: SeriesItem[]) => {
  const latest = items[0]
  const insights: AdvisorInsight[] = []

  if (latest.participationRate < 0.5) {
    insights.push({
      id: 'low-participation',
      title: 'Participation below 50%',
      detail: 'Recommend more short quizzes and quick check-ins this week.',
      tone: 'warn',
    })
  }

  if (series.length >= 3) {
    const last = series[series.length - 1].participationRate ?? latest.participationRate
    const prev = series[series.length - 2].participationRate ?? latest.participationRate
    if (last < prev) {
      insights.push({
        id: 'downward-trend',
        title: 'Participation trending down',
        detail: 'Add a 5-minute recap or breakout prompt to re-engage students.',
        tone: 'info',
      })
    }
  }

  if (latest.attendanceRate >= 0.9) {
    insights.push({
      id: 'attendance-strong',
      title: 'Attendance strong',
      detail: 'Keep using reminders and pre-class nudges to maintain momentum.',
      tone: 'positive',
    })
  }

  if (insights.length === 0) {
    insights.push({
      id: 'steady',
      title: 'Engagement steady',
      detail: 'No urgent actions required. Continue current engagement strategy.',
      tone: 'positive',
    })
  }

  return insights.slice(0, 3)
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [selectedClass, setSelectedClass] = useState('all')
  const [dateRange, setDateRange] = useState('Last 30 days')

  const classInfo = useMemo(
    () =>
      selectedClass === 'all'
        ? { id: 'all', name: 'All Classes', subject: 'All Subjects', teacher: 'Admin View' }
        : classes.find((item) => item.id === selectedClass) ?? classes[0],
    [selectedClass],
  )

  const classSummary = useMemo(
    () =>
      selectedClass === 'all'
        ? aggregateSummary(summary)
        : summary.find((item) => item.classId === selectedClass) ?? summary[0],
    [selectedClass],
  )

  const classSeries = useMemo(
    () =>
      selectedClass === 'all'
        ? aggregateSeries(timeseries)
        : timeseries.filter((item) => item.classId === selectedClass),
    [selectedClass],
  )

  const classLeaderboard = useMemo(
    () =>
      selectedClass === 'all'
        ? leaderboard
        : leaderboard.filter((item) => item.classId === selectedClass),
    [selectedClass],
  )

  const chartLabels = useMemo(
    () =>
      classSeries.map((item) =>
        new Date(`${item.date}T00:00:00`).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
        }),
      ),
    [classSeries],
  )

  const advisorInsights = useMemo(
    () =>
      buildAdvisorInsights(
        selectedClass === 'all' ? [aggregateSummary(summary)] : [classSummary],
        classSeries,
      ),
    [classSeries, classSummary, selectedClass],
  )

  const value: AnalyticsContextValue = {
    classOptions: classes,
    selectedClass,
    dateRange,
    setSelectedClass,
    setDateRange,
    classInfo,
    classSummary,
    classSeries,
    classLeaderboard,
    chartLabels,
    advisorInsights,
  }

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider')
  }
  return context
}
