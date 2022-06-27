<script setup lang="ts">
interface Props {
    type?: "button" | "submit" | "reset";
    size?: "small" | "normal" | "medium" | "large";
    variant?: "solid" | "ghost";
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
    type = "button",
    colorScheme = "primary",
    variant = "solid",
    size = "normal",
    isLoading = false,
} = defineProps<Props>();
</script>

<template>
    <button
        :type="type"
        :class="[
            'button',
            `is-${colorScheme}`,
            `is-${size}`,
            { 'is-light': variant === 'ghost', 'is-loading': isLoading },
        ]"
        :disabled="isLoading"
    >
        <slot />
    </button>
</template>
