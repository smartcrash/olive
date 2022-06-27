<script setup lang="ts">
interface Props {
    label?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    autocomplete?: string;
}

const { label, name, type, placeholder, autocomplete } = defineProps<Props>();
</script>

<template>
    <div class="field">
        <label v-if="!!label" class="label">{{ label }}</label>
        <div class="control">
            <input
                class="input"
                v-bind="{ type, name, placeholder, autocomplete }"
            />
        </div>
    </div>
</template>
