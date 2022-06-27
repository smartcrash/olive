<script setup lang="ts">
interface Props {
    label?: string;
    type?: string;
    placeholder?: string;
    autocomplete?: string;
}

const { label, type, placeholder, autocomplete } = defineProps<Props>();
</script>

<template>
    <div class="field">
        <label v-if="!!label" class="label">{{ label }}</label>
        <div class="control">
            <input class="input" v-bind="{ type, placeholder, autocomplete }" />
        </div>
    </div>
</template>
