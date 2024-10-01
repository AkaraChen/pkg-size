'use client'

import { cn, titleFont } from '@/utils/css'
import { useState } from 'react'
import { Search, StartButton } from './component'

function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export default function Home() {
    const [selected, setSelected] = useState<string[]>([])
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
            <div className='mb-8 mt-auto flex h-12 w-[800px] border-l border-dashed border-black dark:border-white'>
                <div className='flex w-full items-center gap-4 border-y border-dashed border-black px-4 dark:border-white'>
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
                                            ? 'bg-black dark:bg-white'
                                            : 'border border-black dark:border-white',
                                    )}
                                ></span>
                                <label htmlFor={`package-${i}`}>
                                    {value || 'empty'}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <StartButton selected={selected} />
            </div>
        </div>
    )
}
