<script setup lang="ts">
import { onMounted, ref } from "vue";
import autosize from "autosize";

interface Props {
    label?: string;
    name?: string;
    placeholder?: string;
    rows?: string | number;
}

const { label, name, rows = 3, placeholder } = defineProps<Props>();

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
                v-bind="{ rows, placeholder, name }"
            />
        </div>
    </div>
</template>
