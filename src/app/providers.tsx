'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'

const client = new QueryClient()

export const Providers: FC<PropsWithChildren> = props => {
    const { children } = props
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
