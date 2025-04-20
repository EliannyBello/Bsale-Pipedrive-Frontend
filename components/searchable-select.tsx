'use client'
import * as React from "react"
import {cn} from "@/lib/utils"

export interface SearchableSelectItem {
    value: string
    label: string
}

interface SearchableSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    items: SearchableSelectItem[]
    placeholder?: string
    onValueChange?: (value: string) => void
}

export function SearchableSelect({
                                     items = [],
                                     placeholder,
                                     onValueChange,
                                     className,
                                     ...props
                                 }: SearchableSelectProps) {
    const [search, setSearch] = React.useState('')
    const selectRef = React.useRef<HTMLSelectElement>(null)

    const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
    )

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onValueChange) {
            onValueChange(event.target.value)
        }
    }

    React.useEffect(() => {
        if (search && filteredItems.length > 0 && selectRef.current) {
            selectRef.current.size = Math.min(filteredItems.length, 5)
        } else if (selectRef.current) {
            selectRef.current.size = 1
        }
    }, [search, filteredItems.length])

    return (
        <div className="relative">
            <input
                type="text"
                placeholder={`Buscar ${placeholder?.toLowerCase()}...`}
                value={search}
                onChange={handleSearchChange}
                className="w-full p-2 border rounded mb-1"
            />
            <select
                ref={selectRef}
                onChange={handleSelectChange}
                className={cn(
                    "w-full p-2 border rounded",
                    {"h-auto": search && filteredItems.length > 0},
                    className
                )}
                {...props}
            >
                <option value="">{placeholder}</option>
                {filteredItems.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

