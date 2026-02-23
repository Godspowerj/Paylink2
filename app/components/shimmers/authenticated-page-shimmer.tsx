import DashboardShimmer from "./dashboard-shimmer"

export default function AuthenticatedPageShimmer({
    className,
    pathname,
}: {
    className?: string
    pathname?: string
}) {

    switch (pathname || window.location.pathname) {
        case "/dashboard":
            return <DashboardShimmer className={className} />

        default:
            return <DashboardShimmer className={className} />
    }
}