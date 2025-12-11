export interface JsonApiResponse<T> {
    data: Array<{
        id: number
        type: string
        attributes: T
    }>
}

export function extractSingle<T>(response: JsonApiResponse<T>): T & { id: number } {
    if (!response.data || response.data.length == 0) {
        throw new Error('No data in response')
    }

    const item = response.data[0]
    return { id: item.id, ...item.attributes }
}

export function extractAll<T>(response: JsonApiResponse<T>): Array<T & {id: number }> {
    if (!response.data || response.data.length == 0) {
        return []
    }

    return response.data.map(item => ({
        id: item.id,
        ...item.attributes
    }))
}
