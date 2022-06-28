<script setup lang="ts">
import { onMounted, ref } from "vue";
import autosize from "autosize";

interface Props {
    label?: string;
    error?: string;
    name?: string;
    required?: boolean;
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
    required,
    rows = 3,
    placeholder,
    colorScheme,
    error,
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
                :class="[
                    'textarea',
                    {
                        [`is-${colorScheme}`]: !!colorScheme,
                        'is-danger': !!error,
                    },
                ]"
                ref="textarea"
                v-bind="{
                    rows,
                    placeholder,
                    name,
                    disabled: isLoading,
                    required,
                }"
            />
        </div>

        <p v-if="!!error" class="help is-danger">{{ error }}</p>
    </div>
</template>
