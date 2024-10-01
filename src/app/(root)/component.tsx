'use client'

import { FC, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ResponseData } from '../api/npm/route'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils/css'
import { Check } from 'lucide-react'
import { Loading } from '@/components/loading'
import { match, P } from 'ts-pattern'
import { useInView } from 'react-intersection-observer'

interface SearchProps {
    onSubmit: (name: string) => void
    onRemove: (name: string) => void
    selected: string[]
}

export const Search: FC<SearchProps> = props => {
    const { onSubmit, selected, onRemove } = props
    const [keyword, setKeyword] = useState('')
    const query = useInfiniteQuery({
        queryKey: ['search', keyword],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 1, signal }) => {
            const url = new URL('/api/npm', window.location.href)
            url.searchParams.set('keyword', keyword)
            url.searchParams.set('page', pageParam.toString())
            return fetch(url, {
                signal,
            }).then(res => res.json()) as Promise<ResponseData>
        },
        getNextPageParam: (_, __, lastPageParams) => {
            return lastPageParams + 1
        },
    })
    const { ref: endRef } = useInView({
        onChange(inView) {
            if (inView) {
                query.fetchNextPage()
            }
        },
    })
    return (
        <Popover>
            <PopoverTrigger>
                <input
                    className='mt-12 w-[800px] border border-black p-4 outline-none placeholder:text-black'
                    placeholder='Search Packages...'
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
            </PopoverTrigger>
            <PopoverContent
                className='h-96 w-[800px] overflow-auto'
                onOpenAutoFocus={e => e.preventDefault()}
            >
                {match(query)
                    .with({ data: P.nonNullable }, ({ data }) => {
                        return (
                            <div>
                                {data?.pages
                                    .flatMap(p => p)
                                    .map(d => {
                                        const isSelected = selected.includes(
                                            d.package.name,
                                        )
                                        return (
                                            <div
                                                key={d.package.name}
                                                onClick={() => {
                                                    if (isSelected) {
                                                        onRemove(d.package.name)
                                                    } else {
                                                        onSubmit(d.package.name)
                                                    }
                                                }}
                                                className={cn(
                                                    isSelected &&
                                                        'text-zinc-500',
                                                    'flex',
                                                )}
                                            >
                                                {d.package.name}
                                                <span className='ml-auto'>
                                                    {isSelected && (
                                                        <Check size={20} />
                                                    )}
                                                </span>
                                            </div>
                                        )
                                    })}
                            </div>
                        )
                    })
                    .with({ isLoading: true }, () => {
                        return <Loading>Loading...</Loading>
                    })
                    .otherwise(() => {
                        return <div>Waiting for input...</div>
                    })}
                <div ref={endRef}></div>
            </PopoverContent>
        </Popover>
    )
}
