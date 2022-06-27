<script setup lang="ts">
interface Props {
    type?: string;
    size?: "small" | "normal" | "medium" | "large";
    variant?: "solid" | "ghost";
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
    colorScheme = "primary",
    variant = "solid",
    size = "normal",
} = defineProps<Props>();
</script>

<template>
    <button
        :class="[
            'button',
            `is-${colorScheme}`,
            `is-${size}`,
            { 'is-light': variant === 'ghost' },
        ]"
    >
        <slot />
    </button>
</template>
