'use client'

import { cn, titleFont } from '@/utils/css'
import { useState } from 'react'

function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export default function Home() {
    const [selected, setSelected] = useState<string[]>([])
    const [keyword, setKeyword] = useState('')
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
            <input
                className='mt-12 w-[640px] border border-black p-4 outline-none placeholder:text-black'
                placeholder='Search Packages...'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
            />
            <div className='mb-8 mt-auto flex h-12 w-[640px] border-l border-dashed border-black'>
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
                <button className='bg-black px-8 text-white'>Start</button>
            </div>
        </div>
    )
}
