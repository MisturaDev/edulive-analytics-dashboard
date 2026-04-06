import { TrendChart } from './components/TrendChart'
import { useAnalytics } from './context/AnalyticsContext'

const formatPercent = (value: number) => `${Math.round(value * 100)}%`
const trendLabel = (trend: string) => {
  if (trend === 'up') return '^'
  if (trend === 'down') return 'v'
  return '-'
}

function App() {
  const {
    classOptions,
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
  } = useAnalytics()

  return (
    <div className="px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              EduLive Analytics
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-ink-900">
              Class Performance Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Track attendance, engagement, and participation trends in real time.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Class
              </label>
                <select
                  className="mt-1 block w-full bg-transparent text-sm font-semibold text-ink-900 outline-none"
                  value={selectedClass}
                  onChange={(event) => setSelectedClass(event.target.value)}
                >
                  <option value="all">All Classes</option>
                  {classOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} - {item.subject}
                    </option>
                  ))}
              </select>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Date Range
              </label>
              <select
                className="mt-1 block w-full bg-transparent text-sm font-semibold text-ink-900 outline-none"
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
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="panel border-l-4 border-l-blue-500 p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Attendance</p>
            <p className="mt-3 text-3xl font-semibold text-ink-900">
              {formatPercent(classSummary.attendanceRate)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Absences {formatPercent(classSummary.absentRate)}
            </p>
          </div>
          <div className="panel border-l-4 border-l-emerald-500 p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Engagement</p>
            <p className="mt-3 text-3xl font-semibold text-ink-900">
              {formatPercent(classSummary.engagementRate)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Tardy {formatPercent(classSummary.tardyRate)}
            </p>
          </div>
          <div className="panel border-l-4 border-l-orange-500 p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Participation</p>
            <p className="mt-3 text-3xl font-semibold text-ink-900">
              {formatPercent(classSummary.participationRate)}
            </p>
            <p className="mt-1 text-xs text-slate-500">Live classroom input</p>
          </div>
          <div className="panel border-l-4 border-l-slate-400 p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Class</p>
            <p className="mt-3 text-xl font-semibold text-ink-900">{classInfo.name}</p>
            <p className="mt-1 text-xs text-slate-500">{classInfo.teacher}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="panel p-5">
            <TrendChart
              title="Attendance Trend"
              subtitle="Weekly"
              labels={chartLabels}
              values={classSeries.map((item) => item.attendanceRate)}
              lineColor="#3b82f6"
              fillColor="rgba(59, 130, 246, 0.2)"
            />
          </div>
          <div className="panel p-5">
            <TrendChart
              title="Engagement Trend"
              subtitle="Weekly"
              labels={chartLabels}
              values={classSeries.map((item) => item.engagementRate)}
              lineColor="#22c55e"
              fillColor="rgba(34, 197, 94, 0.2)"
            />
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <h2 className="section-title">Participation Leaderboard</h2>
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Top 3</span>
            </div>
            <div className="mt-5 space-y-4">
              {classLeaderboard.map((entry, idx) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-xs font-semibold text-ink-900">
                      {entry.student
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">
                        {idx + 1}. {entry.student}
                      </p>
                      <p className="text-xs text-slate-400">Participation score</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-ink-900">
                      {entry.participationScore}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                      {trendLabel(entry.trend)} {entry.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <h2 className="section-title">Engagement Advisor</h2>
              <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-600">
                AI
              </span>
            </div>
            <p className="section-sub mt-2">AI guidance based on participation trends.</p>
            <div className="mt-4 space-y-3">
              {advisorInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    insight.tone === 'warn'
                      ? 'border-orange-100 bg-orange-50 text-orange-700'
                      : insight.tone === 'positive'
                      ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <p className="font-semibold">{insight.title}</p>
                  <p className="mt-1 text-xs">{insight.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App

