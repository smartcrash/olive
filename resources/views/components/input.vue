<script setup lang="ts">
interface Props {
    label?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    autocomplete?: string;
    isLoading?: boolean;
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
    autocomplete,
    colorScheme,
    error,
    isLoading = false,
} = defineProps<Props>();
</script>

<template>
    <div class="field">
        <label v-if="!!label" class="label">{{ label }}</label>
        <div :class="['control', { 'is-loading': isLoading }]">
            <input
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
                    autocomplete,
                    disabled: isLoading,
                }"
            />
        </div>

        <p v-if="!!error" class="help is-danger">{{ error }}</p>
    </div>
</template>
