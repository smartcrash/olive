<script setup lang="ts">
import { onMounted, ref } from "vue";
import autosize from "autosize";

interface Props {
    label?: string;
    name?: string;
    placeholder?: string;
    rows?: string | number;
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
    rows = 3,
    placeholder,
    colorScheme,
    isLoading = false,
} = defineProps<Props>();

const textarea = ref<HTMLInputElement | null>(null);

onMounted(() => autosize(textarea.value!));
</script>

<template>
    <div class="field">
        <label v-if="!!label" class="label">{{ label }}</label>
        <div :class="['control', { ['is-loading']: isLoading }]">
            <textarea
                :class="['textarea', { [`is-${colorScheme}`]: !!colorScheme }]"
                ref="textarea"
                v-bind="{ rows, placeholder, name, disabled: isLoading }"
            />
        </div>
    </div>
</template>
