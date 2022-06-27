<script setup lang="ts">
interface Props {
    label?: string;
    placeholder?: string;
}

const { label, placeholder } = defineProps<Props>();
</script>

<template>
    <div class="field">
        <label v-if="!!label" class="label">{{ label }}</label>
        <div class="control">
            <textarea class="textarea" v-bind="{ placeholder }" />
        </div>
    </div>
</template>
