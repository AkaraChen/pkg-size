import { searchPackages } from 'query-registry'

export type RequestSearchParams = {
    keyword: string
    pageSize: number
    page: number
}

export type ResponseData = Awaited<ReturnType<typeof searchPackages>>['objects']

export async function GET(req: Request) {
    const search = new URL(req.url).searchParams
    const keyword = search.get('keyword')
    const size = Number(search.get('pageSize') ?? 20)
    const page = Number(search.get('page'))
    const data = await searchPackages({
        text: keyword as string,
        size: size,
        from: page * size,
    })
    return Response.json(data.objects)
}
