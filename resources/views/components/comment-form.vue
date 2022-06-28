<script setup lang="ts">
import Input from "../components/input.vue";
import Button from "../components/button.vue";
import Textarea from "../components/textarea.vue";
import { Inertia } from "@inertiajs/inertia";
import useForm from "../../hooks/useForm";

type FieldValues = {
    author: string;
    content: string;
};

const { handleSubmit, setErrors, isSubmiting, errors } = useForm<FieldValues>({
    resetAfterSubmit: true,
});

const onSubmit = handleSubmit((data) => {
    Inertia.post("comments", data, {
        preserveScroll: true,
        onSuccess: () => console.log("succsess!"),
        onError: (error) => setErrors(error as any),
    });
});
</script>

<template>
    <form @submit.prevent="onSubmit">
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

        <Button type="submit" :is-loading="isSubmiting">Comment</Button>
    </form>
</template>
