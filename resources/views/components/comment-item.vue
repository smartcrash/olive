<script setup lang="ts">
import { Comment } from "../../types";
import prettyMiliseconds from "pretty-ms";
import { differenceInMilliseconds } from "date-fns";
import Button from "./button.vue";

interface Props {
    comment: Comment;
}

const { comment } = defineProps<Props>();

const humarizedDifferene = prettyMiliseconds(
    differenceInMilliseconds(new Date(), new Date(comment.created_at)),
    { compact: true }
);
</script>

<template>
    <li class="py-6">
        <div class="flex items-center space-x-2">
            <h5 class="uppercase font-bold">{{ comment.author }}</h5>
            <span class="text-xs text-gray-500">{{ humarizedDifferene }}</span>
        </div>
        <p class="text-gray-500 my-5">{{ comment.content }}</p>

        <div>
            <Button size="small" variant="ghost" color-scheme="ghost"
                >Reply</Button
            >
        </div>
    </li>
</template>
