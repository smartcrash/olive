import { reactive, type Ref, toRefs } from "vue"

interface State<T> {
    isFetching: boolean
    statusCode: number | null
    error: string | null
    data: T | null
}

interface UseFetchOptions {
    /**
     * Will automatically run fetch when `useFetch` is used
     *
     * @default true
     */
    immediate?: boolean
    /**
     * Options for the fetch request
     */
    fetchOptions?: RequestInit
}

interface UseFetchReturn<T> {
    /**
     * Indicates if the request is currently being fetched.
     */
    isFetching: Ref<boolean>
    /**
     * The fetch response body, may either be JSON or text
     */
    data: Ref<T | null>
    /**
     * The statusCode of the HTTP fetch response
     */
    statusCode: Ref<number | null>
    /**
     * Any fetch errors that may have occurred
     */
    error: Ref<string | null>
    /**
     * Manually call the fetch
     */
    execute: () => Promise<void>
}

/** Reactive Fetch API wrapper */
function useFetch<T>(url: string, { immediate = true, fetchOptions }: UseFetchOptions = {}): UseFetchReturn<T> {
    const state: State<T> = reactive({
        isFetching: immediate,
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

    if (immediate) execute()

    return { ...toRefs(state), execute }

}

export default useFetch
