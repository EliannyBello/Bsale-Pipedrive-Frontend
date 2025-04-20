import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numberFormat(value: number): string {
    return new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(value as number);
}