<script setup lang="ts">
import Input from "../components/input.vue";
import Button from "../components/button.vue";
import Textarea from "../components/textarea.vue";
import { Inertia } from "@inertiajs/inertia";
import useForm from "../../hooks/useForm";

const ESCAPE = "Escape";

type FieldValues = {
    author: string;
    content: string;
};

const { parentId } = defineProps<{ parentId?: number }>();

const emit = defineEmits<{
    (e: "confirm"): void;
    (e: "cancel"): void;
}>();

const { handleSubmit, setErrors, isSubmiting, errors } = useForm<FieldValues>();

const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === ESCAPE) emit("cancel");
};

const onSubmit = handleSubmit((data) => {
    Inertia.post(
        "comments",
        { ...data, parent_id: parentId ?? "" },
        {
            preserveScroll: true,
            onSuccess: () => emit("confirm"),
            onError: (error) => setErrors(error as any),
        }
    );
});
</script>

<template>
    <form @submit.prevent="onSubmit" @keydown="onKeyDown">
        <Input
            label="Name"
            name="author"
            placeholder="Enter your name"
            autocomplete="username"
            :error="errors.author"
            :is-loading="isSubmiting"
        />

        <Textarea
            name="content"
            label="Comment"
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
            <Button type="submit" :is-loading="isSubmiting">Comment</Button>
        </div>
    </form>
</template>
