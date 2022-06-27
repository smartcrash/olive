<script setup lang="ts">
import { onMounted, ref } from "vue";
import autosize from "autosize";

interface Props {
    label?: string;
    placeholder?: string;
    rows?: string | number;
}

const { label, rows = 3, placeholder } = defineProps<Props>();

const textarea = ref<HTMLInputElement | null>(null);

onMounted(() => autosize(textarea.value!));
</script>

<template>
    <div class="field">
        <label v-if="!!label" class="label">{{ label }}</label>
        <div class="control">
            <textarea
                class="textarea"
                ref="textarea"
                v-bind="{ rows, placeholder }"
            />
        </div>
    </div>
</template>
