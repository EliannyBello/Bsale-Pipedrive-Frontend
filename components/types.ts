import {DateRange} from "react-day-picker"

export interface DateRangeValue {
    from: Date
    to?: Date
}

export interface DateRangeChangeHandler {
    (value: DateRange | undefined): void
}