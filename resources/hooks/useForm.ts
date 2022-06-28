import { reactive, ref } from "vue";

/** Returns an object created by key-value entries of a <form/>  */
const serialize = (form: HTMLFormElement): Record<string, string> => {
    const data = new FormData(form);
    const entries: [string, string][] = []

    data.forEach((value, key) => entries.push([key, String(value)]))

    return Object.fromEntries(entries)
}

interface UseFormOptions {
    resetAfterSubmit?: boolean
}

/**  Custom hook to manage a form */
function useForm<FieldValues extends Record<string, string>, FieldErrors = Partial<FieldValues>>({ resetAfterSubmit = false }: UseFormOptions) {
    const isSubmiting = ref(false);
    const errors: FieldErrors = reactive({} as any)

    /** Sets field's error message */
    const setError = (field: keyof FieldErrors, message: string) => {
        errors[field] = message as any
    }

    /** Sets fields errors from a map */
    const setErrors = (errorBag: Record<keyof FieldValues, string>) => {
        Object.entries(errorBag).forEach(([key, value]) => setError(key as any, value))
    }

    /** Clears all fiel errors */
    const clearErrors = () => {
        // @ts-ignore
        Object.keys(errors).forEach((key) => errors[key] = undefined)
    }

    /**
     * Creates a form submit event handler
     *
     * @example
     *
     * const onSubmit = handleSubmit(() => {...})
     *
     * <form @submit.prevent="onSubmit"></form>
     */
    const handleSubmit = (onValid: (data: FieldValues) => Promise<void> | void) => async (event: Event) => {
        clearErrors()

        isSubmiting.value = true;

        const data = serialize(event.target as HTMLFormElement) as FieldValues
        await onValid(data)

        if (resetAfterSubmit) (event.target as HTMLFormElement).reset()

        isSubmiting.value = false;
    }

    return { isSubmiting, errors, setError, setErrors, handleSubmit, clearErrors }
}

export default useForm
