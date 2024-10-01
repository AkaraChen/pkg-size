'use client'

import { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ResponseData } from '../api/npm/route'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils/css'
import { Check } from 'lucide-react'

interface SearchProps {
    onSubmit: (name: string) => void
    onRemove: (name: string) => void
    selected: string[]
}

export const Search: FC<SearchProps> = props => {
    const { onSubmit, selected, onRemove } = props
    const [keyword, setKeyword] = useState('')
    const { data } = useQuery({
        queryKey: ['search', keyword],
        queryFn: async () => {
            const url = new URL('/api/npm', window.location.href)
            url.searchParams.set('keyword', keyword)
            return fetch(url).then(res => res.json()) as Promise<ResponseData>
        },
        enabled: Boolean(keyword),
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
            <PopoverContent className='h-96 w-[800px] overflow-auto'>
                <div>
                    {data?.map(d => {
                        const isSelected = selected.includes(d.package.name)
                        return (
                            <div
                                onClick={() => {
                                    if (isSelected) {
                                        onRemove(d.package.name)
                                    } else {
                                        onSubmit(d.package.name)
                                    }
                                }}
                                className={cn(
                                    isSelected && 'text-zinc-500',
                                    'flex',
                                )}
                            >
                                {d.package.name}
                                <span className='ml-auto'>
                                    {isSelected && <Check size={20} />}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </PopoverContent>
        </Popover>
    )
}
