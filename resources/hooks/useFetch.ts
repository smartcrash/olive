import { reactive, toRefs } from "vue"

interface State<T> {
    isFetching: boolean
    statusCode: number | null
    error: string | null
    data: T | null
}

interface UseFetchOptions {
    inmediate?: boolean
    fetchOptions?: RequestInit
}

function useFetch<T>(url: string, { inmediate = true, fetchOptions }: UseFetchOptions = {}) {
    const state: State<T> = reactive({
        isFetching: inmediate,
        statusCode: null,
        error: null,
        data: null
    })

    const execute = async () => {
        state.isFetching = true

        try {
            const response = await fetch(url, fetchOptions)

            state.statusCode = response.status

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            state.data = await response.json()
        } catch (error: unknown) {
            state.error = (error as Error).message
        } finally {
            state.isFetching = false
        }
    }

    if (inmediate) execute()

    return { ...toRefs(state), execute }

}

export default useFetch
