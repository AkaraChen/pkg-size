import type { Metadata } from 'next'
import './globals.css'
import { cn, contentFont } from '@/utils/css'
import { PropsWithChildren } from 'react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import blogpostIcon from '@/assets/blog-post.svg'
import blogpostDarkIcon from '@/assets/blog-post-dark.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Providers } from './providers'

export const metadata: Metadata = {
    title: 'Package size',
    description: 'Find the real cost of a package',
}

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang='en' className='h-full'>
            <body className={cn(contentFont.className, 'flex h-full flex-col')}>
                <header className='basis-32 border-b border-black dark:border-white'>
                    <div className='container m-auto flex h-full w-full items-center justify-between border-x border-black px-12 dark:border-white'>
                        <Link href={'/'}>
                            <h1 className='select-none text-2xl'>
                                Package size
                            </h1>
                        </Link>
                        <a
                            href={'https://github.com/akarachen/pkg-size'}
                            target='_blank'
                        >
                            <SiGithub size={32} />
                        </a>
                    </div>
                </header>
                <main className='h-full overflow-scroll'>
                    <div className='container m-auto h-full w-full overflow-auto border-x border-black p-12 dark:border-white'>
                        <Providers>{children}</Providers>
                    </div>
                </main>
                <footer className='basis-32 border-t border-black dark:border-white'>
                    <div className='container m-auto flex h-full w-full items-center justify-between border-x border-black px-12 dark:border-white'>
                        <Image
                            src={blogpostIcon}
                            alt='Blog post icon'
                            width={40}
                            height={40}
                            className='dark:hidden'
                        />
                        <Image
                            src={blogpostDarkIcon}
                            alt='Blog post icon'
                            width={40}
                            height={40}
                            className='hidden dark:block'
                        />
                        <div className='flex select-none flex-col text-lg'>
                            <a href={'https://akr.moe'} target='_blank'>
                                AkaraChen
                            </a>
                            <p className='ml-auto'>
                                {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    )
}
