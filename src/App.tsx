import { useMemo, useState } from 'react'
import { alerts, classes, leaderboard, summary, timeseries } from './data/mockAnalytics'

const formatPercent = (value: number) => `${Math.round(value * 100)}%`

const trendLabel = (trend: string) => {
  if (trend === 'up') return '▲'
  if (trend === 'down') return '▼'
  return '◆'
}

function App() {
  const [selectedClass, setSelectedClass] = useState('c1')
  const [dateRange, setDateRange] = useState('Last 30 days')

  const classInfo = classes.find((item) => item.id === selectedClass) ?? classes[0]
  const classSummary = summary.find((item) => item.classId === selectedClass) ?? summary[0]
  const classSeries = timeseries.filter((item) => item.classId === selectedClass)
  const classLeaderboard = leaderboard.filter((item) => item.classId === selectedClass)
  const classAlerts = alerts.filter((item) => item.classId === selectedClass)

  const attendanceBars = useMemo(
    () => classSeries.map((item) => ({ id: item.id, value: item.attendanceRate })),
    [classSeries],
  )
  const engagementBars = useMemo(
    () => classSeries.map((item) => ({ id: item.id, value: item.engagementRate })),
    [classSeries],
  )

  return (
    <div className="px-4 pb-16 pt-10 sm:px-8 lg:px-12">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="metric-chip">EduLive Analytics</p>
          <h1 className="mt-4 text-3xl font-semibold text-ink-900 sm:text-4xl lg:text-5xl">
            Class Performance Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ink-500 sm:text-lg">
            Track attendance, participation, and engagement trends at a glance. Use filters to
            compare classes, spot risk signals, and respond with timely interventions.
          </p>
        </div>
        <div className="panel w-full max-w-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                Live Overview
              </p>
              <p className="mt-1 text-2xl font-semibold text-ink-900">
                {formatPercent(classSummary.participationRate)}
              </p>
              <p className="text-sm text-ink-500">Participation today</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Live
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-ink-500">
            <div>
              <p className="text-xs uppercase tracking-widest">Attendance</p>
              <p className="mt-1 text-lg font-semibold text-ink-900">
                {formatPercent(classSummary.attendanceRate)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest">Engagement</p>
              <p className="mt-1 text-lg font-semibold text-ink-900">
                {formatPercent(classSummary.engagementRate)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-ink-900">Filters</h2>
              <p className="text-sm text-ink-500">Adjust the view by class and date range.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                  Class
                </label>
                <select
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-ink-900 outline-none"
                  value={selectedClass}
                  onChange={(event) => setSelectedClass(event.target.value)}
                >
                  {classes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} · {item.subject}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                  Date Range
                </label>
                <select
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-ink-900 outline-none"
                  value={dateRange}
                  onChange={(event) => setDateRange(event.target.value)}
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Quarter to date</option>
                  <option>Semester to date</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-ink-500 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest">Class</p>
              <p className="mt-2 text-base font-semibold text-ink-900">{classInfo.name}</p>
              <p>{classInfo.subject}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest">Teacher</p>
              <p className="mt-2 text-base font-semibold text-ink-900">{classInfo.teacher}</p>
              <p>Weekly roster: 32 students</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest">Range</p>
              <p className="mt-2 text-base font-semibold text-ink-900">{dateRange}</p>
              <p>Latest update: 31 Mar 2026</p>
            </div>
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-xl font-semibold text-ink-900">Risk Alerts</h2>
          <p className="text-sm text-ink-500">Flagged participation drops and absentee spikes.</p>
          <div className="mt-4 space-y-3">
            {classAlerts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-4 text-sm text-ink-500">
                No urgent alerts for this class.
              </div>
            )}
            {classAlerts.map((alert) => (
              <div key={alert.id} className="rounded-2xl border border-orange-100 bg-orange-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                  Participation alert
                </p>
                <p className="mt-2 text-sm font-semibold text-ink-900">{alert.note}</p>
                <p className="mt-1 text-xs text-ink-500">Reported on {alert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink-900">Attendance Trend</h2>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
              Weekly
            </p>
          </div>
          <div className="mt-6 flex h-32 items-end gap-2">
            {attendanceBars.map((bar) => (
              <div
                key={bar.id}
                className="flex-1 rounded-2xl bg-mint-500/70"
                style={{ height: `${Math.round(bar.value * 100)}%` }}
              ></div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-ink-500">
            <span>Avg attendance</span>
            <span className="font-semibold text-ink-900">
              {formatPercent(classSummary.attendanceRate)}
            </span>
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink-900">Engagement Trend</h2>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
              Weekly
            </p>
          </div>
          <div className="mt-6 flex h-32 items-end gap-2">
            {engagementBars.map((bar) => (
              <div
                key={bar.id}
                className="flex-1 rounded-2xl bg-sky-500/70"
                style={{ height: `${Math.round(bar.value * 100)}%` }}
              ></div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-ink-500">
            <span>Avg engagement</span>
            <span className="font-semibold text-ink-900">
              {formatPercent(classSummary.engagementRate)}
            </span>
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink-900">Participation Mix</h2>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
              Today
            </p>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-ink-500">
                <span>Participation</span>
                <span>{formatPercent(classSummary.participationRate)}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-coral-500"
                  style={{ width: `${classSummary.participationRate * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-ink-500">
                <span>Tardy</span>
                <span>{formatPercent(classSummary.tardyRate)}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-amber-400"
                  style={{ width: `${classSummary.tardyRate * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-ink-500">
                <span>Absent</span>
                <span>{formatPercent(classSummary.absentRate)}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-rose-400"
                  style={{ width: `${classSummary.absentRate * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-ink-500">
            Participation is strongest in {classInfo.subject} labs and quick checks.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink-900">Participation Leaderboard</h2>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
              Top 3
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {classLeaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/80 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-ink-900">
                    {index + 1}. {entry.student}
                  </p>
                  <p className="text-xs text-ink-500">Participation score</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-ink-900">
                    {entry.participationScore}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-ink-500">
                    {trendLabel(entry.trend)} {entry.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-xl font-semibold text-ink-900">Engagement Advisor</h2>
          <p className="text-sm text-ink-500">AI insights will appear here once enabled.</p>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white/60 p-4 text-sm text-ink-500">
            Upcoming: recommended interventions, suggested quiz cadence, and nudges for low
            participation.
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
