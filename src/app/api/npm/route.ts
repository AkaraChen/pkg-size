import { searchPackages } from 'query-registry'

export type ResponseData = Awaited<ReturnType<typeof searchPackages>>['objects']

export async function GET(req: Request) {
    const search = new URL(req.url).searchParams
    const keyword = search.get('keyword')
    const data = await searchPackages({
        text: keyword as string,
    })
    return Response.json(data.objects)
}
