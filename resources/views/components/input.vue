<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
    label?: string;
    type?: string;
    required?: boolean;
    name?: string;
    placeholder?: string;
    autocomplete?: string;
    isLoading?: boolean;
    autoFocus?: boolean;
    error?: string;
    colorScheme?:
        | "white"
        | "light"
        | "dark"
        | "black"
        | "text"
        | "ghost"
        | "primary"
        | "link"
        | "info"
        | "success"
        | "warning"
        | "danger";
}

const {
    label,
    name,
    type,
    placeholder,
    autoFocus,
    autocomplete,
    colorScheme,
    error,
    required,
    isLoading = false,
} = defineProps<Props>();

const inputRef = ref<HTMLInputElement>();

onMounted(() => {
    if (autoFocus) inputRef.value?.focus();
});
</script>

<template>
    <div class="field">
        <label v-if="!!label" class="label">{{ label }}</label>
        <div :class="['control', { 'is-loading': isLoading }]">
            <input
                ref="inputRef"
                :class="[
                    'input',
                    {
                        [`is-${colorScheme}`]: !!colorScheme,
                        'is-danger': !!error,
                    },
                ]"
                v-bind="{
                    type,
                    name,
                    placeholder,
                    required,
                    autocomplete,
                    disabled: isLoading,
                    autoFocus,
                }"
            />
        </div>

        <p v-if="!!error" class="help is-danger">{{ error }}</p>
    </div>
</template>
