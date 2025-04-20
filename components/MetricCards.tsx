export interface MetricCardProps {
    title: string
    value: string
    subtitle: string
}

function MetricCard({ title, value, subtitle }: MetricCardProps) {
    return (
        <div className="p-6 bg-white rounded shadow">
            <div className="flex items-center justify-between">
                <h3 className="text-gray-600">{title}</h3>
                <span className="text-gray-400">$</span>
            </div>
            <p className="text-3xl font-bold mt-2">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
    )
}

export function MetricCards({metrics}: { metrics: MetricCardProps[] }) {
    return (
    <div className={`grid ${metrics.length > 6 ? 'grid-cols-2' : 'grid-cols-5'} gap-6`}>

            {metrics.map((metric, index) => (
                <MetricCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    subtitle={metric.subtitle}
                />
            ))}
        </div>
    )
}