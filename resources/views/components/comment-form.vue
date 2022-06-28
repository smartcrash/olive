<script setup lang="ts">
import { ref } from "vue";
import useForm from "../../hooks/useForm";
import { Comment } from "../../types";
import Button from "../components/button.vue";
import Input from "../components/input.vue";
import Textarea from "../components/textarea.vue";

const ESCAPE = "Escape";
const ENTER = "Enter";

type FieldValues = {
    author: string;
    content: string;
};

const { parentId } = defineProps<{ parentId?: number }>();

const emit = defineEmits<{
    (e: "confirm", comment: Partial<Comment>): void;
    (e: "cancel"): void;
}>();

const { handleSubmit, isSubmiting, errors } = useForm<FieldValues>();

const submitRef = ref<HTMLInputElement>();

const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === ESCAPE) emit("cancel");

    // This triggers form submit when Ctrl + Enter is pressed
    if (event.key === ENTER && event.ctrlKey) submitRef.value?.click();
};

const onSubmit = handleSubmit((data) =>
    emit("confirm", { ...data, parent_id: parentId })
);
</script>

<template>
    <form @submit.prevent="onSubmit" @keydown="onKeyDown">
        <Input
            label="Name"
            name="author"
            required
            placeholder="Enter your name"
            auto-focus
            autocomplete="username"
            :error="errors.author"
            :is-loading="isSubmiting"
        />

        <Textarea
            name="content"
            label="Comment"
            required
            :error="errors.content"
            placeholder="Write a commnet..."
            :is-loading="isSubmiting"
        />

        <div class="flex space-x-5 justify-end">
            <Button
                color-scheme="white"
                :is-loading="isSubmiting"
                @click="() => emit('cancel')"
                >Cancel</Button
            >
            <Button
                @ref="(el) => (submitRef = el)"
                type="submit"
                color-scheme="dark"
                :is-loading="isSubmiting"
                >Comment</Button
            >
        </div>
    </form>
</template>
