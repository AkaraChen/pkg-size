import { twJoin } from 'tailwind-merge'
import { DotGothic16, Silkscreen } from 'next/font/google'

export const cn = twJoin

export const contentFont = DotGothic16({
    weight: ['400'],
    subsets: ['latin'],
})
export const titleFont = Silkscreen({
    weight: ['400', '700'],
    subsets: ['latin'],
})
