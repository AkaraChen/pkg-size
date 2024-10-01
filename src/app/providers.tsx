'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { Toaster } from '@/components/ui/toaster'

const client = new QueryClient()

export const Providers: FC<PropsWithChildren> = props => {
    const { children } = props
    return (
        <QueryClientProvider client={client}>
            {children}
            <Toaster />
        </QueryClientProvider>
    )
}
