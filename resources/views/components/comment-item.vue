<script setup lang="ts">
import { Comment } from "../../types";
import prettyMiliseconds from "pretty-ms";
import { differenceInMilliseconds } from "date-fns";
import Button from "./button.vue";
import CommentList from "./comment-list.vue";
import useDisclosure from "../../hooks/useDisclosure";
import useFetch from "../../hooks/useFetch";
import CommentForm from "./comment-form.vue";
import { computed } from "@vue/reactivity";

type Props = { comment: Comment };

const { comment } = defineProps<Props>();

const {
    isOpen: isReplying,
    onOpen: onReplyOpen,
    onClose: onReplyClose,
} = useDisclosure();

const { isOpen, onToggle } = useDisclosure();

const { execute, data, error, isFetching } = useFetch<Comment[]>(
    `comments/${comment.id}/children`,
    { inmediate: isOpen.value }
);

const showReplies = computed(() => isOpen.value && comment.children_count > 0);

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

        <div class="flex space-x-2">
            <Button
                size="small"
                variant="ghost"
                color-scheme="ghost"
                @click="onReplyOpen"
                >Reply</Button
            >

            <Button
                v-if="comment.children_count > 0"
                size="small"
                variant="ghost"
                color-scheme="ghost"
                @click="() => [onToggle(), execute()]"
                >{{ isOpen ? "Hide" : "Show" }} replies</Button
            >
        </div>

        <div class="pl-12">
            <CommentForm
                v-if="isReplying"
                class="pt-5"
                :parent-id="comment.id"
                @confirm="onReplyClose"
                @cancel="onReplyClose"
            />

            <template v-if="showReplies">
                <p v-if="isFetching" class="pt-5 text-sm">Loading...</p>
                <CommentList v-else-if="data">
                    <comment-item
                        v-for="child in data"
                        :comment="child"
                        :key="comment.id"
                    />
                </CommentList>
                <p v-else class="pt-5 text-sm text-red-500">
                    Error: {{ error }}
                </p>
            </template>
        </div>
    </li>
</template>
