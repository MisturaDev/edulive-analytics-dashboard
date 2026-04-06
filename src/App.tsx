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
    isLoading,
  } = useAnalytics()

  return (
    <div className="px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl dashboard-frame">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              EduLive Analytics
            </p>
            <h1 className="mt-2 text-4xl font-bold text-ink-900">
              Class Performance Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Track attendance, engagement and participation trends in real time.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="filter-card">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Class
              </label>
                <select
                  className="mt-1 block w-full bg-transparent text-sm font-semibold text-ink-900 outline-none"
                  value={selectedClass}
                  onChange={(event) => setSelectedClass(event.target.value)}
                  disabled={isLoading}
                >
                  <option value="all">All Classes</option>
                  {classOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} - {item.subject}
                    </option>
                  ))}
              </select>
            </div>
            <div className="filter-card">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Date Range
              </label>
              <select
                className="mt-1 block w-full bg-transparent text-sm font-semibold text-ink-900 outline-none"
                value={dateRange}
                onChange={(event) => setDateRange(event.target.value)}
                disabled={isLoading}
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Quarter to date</option>
                <option>Semester to date</option>
              </select>
            </div>
          </div>
        </header>

        <section className="mx-auto w-full max-w-[1240px] grid gap-[64px] [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]">
          <div className="metric-card metric-card--blue">
            <p className="metric-label">Attendance</p>
            <p className="metric-value">{formatPercent(classSummary.attendanceRate)}</p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Absences {formatPercent(classSummary.absentRate)}
            </p>
          </div>
          <div className="metric-card metric-card--green">
            <p className="metric-label">Engagement</p>
            <p className="metric-value">{formatPercent(classSummary.engagementRate)}</p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Tardy {formatPercent(classSummary.tardyRate)}
            </p>
          </div>
          <div className="metric-card metric-card--orange">
            <p className="metric-label">Participation</p>
            <p className="metric-value">{formatPercent(classSummary.participationRate)}</p>
            <p className="mt-2 text-sm font-medium text-slate-500">Live classroom input</p>
          </div>
          <div className="metric-card metric-card--neutral">
            <p className="metric-label">Class</p>
            <p className="metric-value" style={{ color: 'var(--primary)', fontSize: '1.4rem' }}>
              {classInfo.name}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">{classInfo.teacher}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="panel p-5">
            <TrendChart
              title="Attendance Trend"
              subtitle="Weekly"
              labels={chartLabels}
              values={classSeries.map((item) => item.attendanceRate)}
              lineColor="var(--blue)"
              fillColor="rgba(37, 99, 235, 0.2)"
            />
          </div>
          <div className="panel p-5">
            <TrendChart
              title="Engagement Trend"
              subtitle="Weekly"
              labels={chartLabels}
              values={classSeries.map((item) => item.engagementRate)}
              lineColor="var(--green)"
              fillColor="rgba(22, 163, 74, 0.2)"
            />
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <h2 className="section-title">Participation Leaderboard</h2>
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Top 3</span>
            </div>
            <div className="mt-4 space-y-3">
              {classLeaderboard.slice(0, 3).map((entry, idx) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-xs font-semibold text-ink-900">
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
                    <span
                      className={`mt-1 inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${
                        entry.trend === 'up'
                          ? 'bg-emerald-50 text-emerald-600'
                          : entry.trend === 'down'
                          ? 'bg-orange-50 text-orange-600'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {trendLabel(entry.trend)} {entry.trend}
                    </span>
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
