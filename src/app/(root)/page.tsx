'use client'

import { cn, titleFont } from '@/utils/css'
import Link from 'next/link'
import { useState } from 'react'
import { Search } from './component'

function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export default function Home() {
    const [selected, setSelected] = useState<string[]>([])
    const search = new URLSearchParams()
    search.set('selections', selected.join(','))
    return (
        <div className='flex h-full w-full flex-col items-center'>
            <h2
                className={cn(
                    titleFont.className,
                    'mt-8 text-center text-5xl uppercase leading-tight',
                )}
            >
                Find the real cost <br /> of a package
            </h2>
            <Search
                onSubmit={name => {
                    setSelected(selected => {
                        if (selected.length < 5) {
                            return [...selected, name]
                        }
                        return selected
                    })
                }}
                onRemove={name => {
                    setSelected(selected => {
                        return selected.filter(selection => selection !== name)
                    })
                }}
                selected={selected}
            />
            <div className='mb-8 mt-auto flex h-12 w-[800px] border-l border-dashed border-black'>
                <div className='flex w-full items-center gap-4 border-y border-dashed border-black px-4'>
                    {range(0, 5).map(i => {
                        const value = selected.at(i)
                        const hasValue = value !== undefined
                        return (
                            <div
                                key={i}
                                className='flex items-center'
                                onClick={() => {
                                    if (hasValue) {
                                        setSelected(selected => {
                                            return selected.filter(
                                                selection =>
                                                    selection !== value,
                                            )
                                        })
                                    }
                                }}
                            >
                                <span
                                    className={cn(
                                        'mr-2 size-2',
                                        hasValue
                                            ? 'bg-black'
                                            : 'border border-black',
                                    )}
                                ></span>
                                <label htmlFor={`package-${i}`}>
                                    {value || 'empty'}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <Link href={`/result?${search}`} className='block'>
                    <button className='h-full w-full bg-black px-8 text-white'>
                        Start
                    </button>
                </Link>
            </div>
        </div>
    )
}
