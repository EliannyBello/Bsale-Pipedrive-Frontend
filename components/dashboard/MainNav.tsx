import Link from "next/link"
import { cn } from "@/lib/utils"
import { useDashboard, Module } from "@/app/context/DashboardContext"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
    currentPath?: string;
}

export function MainNav({
                            className,
                            currentPath = "/",
                            ...props
                        }: MainNavProps) {
    const { selectedOption } = useDashboard()

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {selectedOption.modules.map((item: Module) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary-foreground",
                        currentPath === item.href
                            ? "text-primary-foreground"
                            : "text-muted-foreground"
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}

