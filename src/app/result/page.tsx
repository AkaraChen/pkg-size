import { PageProps } from '@/types'
import { cn, titleFont } from '@/utils/css'

interface PkgSize {
    name: string
    version: string
    publish: {
        bytes: number
        files: number
        pretty: string
        color: string
    }
    install: {
        bytes: number
        files: number
        pretty: string
        color: string
    }
}

async function fetchPkgSize(name: string, version?: string) {
    const url = new URL('https://packagephobia.com/v2/api.json')
    url.searchParams.set('p', version ? `${name}@${version}` : name)
    return (await fetch(url, {
        headers: {
            'User-Agent': 'packagephobia.com',
        },
    }).then(res => res.json())) as PkgSize
}

export default async function Page({ searchParams }: PageProps) {
    const selections = (searchParams['selections'] as string).split(',')
    const data = await Promise.all(
        selections.map(selection => fetchPkgSize(selection)),
    )
    const sorted = data.sort((a, b) => a.install.bytes - b.install.bytes)
    const smallest = sorted[0]
    const largest = sorted[sorted.length - 1]
    return (
        <div>
            <h1 className={cn(titleFont.className, 'text-5xl leading-normal')}>
                The Successor is... <br />
                <span className='text-4xl'>
                    {smallest.name}({smallest.install.pretty})
                </span>
            </h1>
            <div className='my-8 flex flex-col gap-8'>
                {data.map(size => (
                    <div className='space-y-2' key={size.name}>
                        <label className='inline-flex bg-black px-4 py-2 text-white'>
                            {size.name}
                        </label>
                        <div className='w-full border border-black p-2'>
                            <div
                                className='flex h-full min-w-fit items-center justify-center bg-black/75 px-4 py-1 text-white'
                                style={{
                                    width: `${(size.install.bytes / largest.install.bytes) * 100}%`,
                                }}
                            >
                                {size.install.pretty}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
