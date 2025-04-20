'use client'

import React, { useState, useEffect } from 'react'
import { useDebounce } from "@/hooks/useDebounce"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';

interface SearchBarProps {
    initialSearchValue: string
    onSearchChangeAction: (search: string) => void
    loading: boolean
}

export function SearchBar({ initialSearchValue, onSearchChangeAction, loading }: SearchBarProps) {
    const [searchValue, setSearchValue] = useState(initialSearchValue)
    const DEBOUNCE_TIME = 500
    const debouncedSearch = useDebounce(searchValue, DEBOUNCE_TIME)

    useEffect(() => {
        onSearchChangeAction(debouncedSearch)
    }, [debouncedSearch, onSearchChangeAction])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <Input
                type="text"
                placeholder="Buscar..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full py-2 pl-10 pr-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none bg-transparent"
            />
            {loading && searchValue !== initialSearchValue && (
                <span className="text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2">
                    Buscando ...
                </span>
            )}
        </div>


    )
}