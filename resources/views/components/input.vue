<script setup lang="ts">
interface Props {
    label?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    autocomplete?: string;
    isLoading?: boolean;
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
    isLoading = false,
} = defineProps<Props>();
</script>

<template>
    <div class="field">
        <label v-if="!!label" class="label">{{ label }}</label>
        <div :class="['control', { 'is-loading': isLoading }]">
            <input
                :class="['input', { [`is-${colorScheme}`]: !!colorScheme }]"
                v-bind="{
                    type,
                    name,
                    placeholder,
                    autocomplete,
                    disabled: isLoading,
                }"
            />
        </div>
    </div>
</template>
