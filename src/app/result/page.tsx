import { cn, titleFont } from '@/utils/css'

interface PkgSize {
    name: string
    version: string
    size: number
    friendlySize: string
}

export default async function Page() {
    const data = await new Promise<PkgSize[]>(resolve => {
        setTimeout(() => {
            resolve([
                {
                    name: 'react',
                    version: '17.0.2',
                    size: 11745,
                    friendlySize: '11.45KB',
                },
                {
                    name: 'react-dom',
                    version: '17.0.2',
                    size: 23600,
                    friendlySize: '23.80KB',
                },
            ])
        }, 1000)
    })
    const largestSize = data.reduce((prev, current) =>
        prev.size > current.size ? prev : current,
    ).size
    return (
        <div>
            <h1 className={cn(titleFont.className, 'text-5xl leading-normal')}>
                The Successor is... <br />
                <span className='text-4xl'>react(11.45KB)</span>
            </h1>
            <div className='my-8 flex flex-col gap-8'>
                {data.map(size => (
                    <div className='space-y-2'>
                        <label className='inline-flex bg-black px-4 py-2 text-white'>
                            {size.name}
                        </label>
                        <div className='w-full border border-black p-2'>
                            <div
                                className='flex h-full items-center justify-center bg-black/75 text-white'
                                style={{
                                    width: `${(size.size / largestSize) * 100}%`,
                                }}
                            >
                                {size.friendlySize}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
