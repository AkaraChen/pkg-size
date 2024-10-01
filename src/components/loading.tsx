import { cn, titleFont } from '@/utils/css'
import Image from 'next/image'
import loadingIcon from '@/assets/loading.svg'
import { FC, PropsWithChildren } from 'react'

interface LoadingProps extends PropsWithChildren {}

export const Loading: FC<LoadingProps> = props => {
    const { children } = props
    return (
        <div className='flex h-full flex-col items-center justify-center gap-4'>
            <Image
                src={loadingIcon}
                alt='Loading icon'
                width={200}
                height={200}
                className='animate-pulse animate-duration-[2000ms] animate-infinite animate-ease-in'
            />
            <h2 className={cn('text-3xl', titleFont.className)}>{children}</h2>
        </div>
    )
}
