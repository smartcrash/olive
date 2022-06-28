<script setup lang="ts">
import { differenceInMilliseconds } from "date-fns";
import prettyMiliseconds from "pretty-ms";
import { ref } from "vue";
import useDisclosure from "../../hooks/useDisclosure";
import useFetch from "../../hooks/useFetch";
import { Comment } from "../../types";
import Button from "./button.vue";
import CommentForm from "./comment-form.vue";
import CommentList from "./comment-list.vue";

type Props = { comment: Comment };

const { comment } = defineProps<Props>();

const emit = defineEmits<(e: "comment", comment: Partial<Comment>) => void>();

const {
    isOpen: isReplying,
    onOpen: onReplyOpen,
    onClose: onReplyClose,
} = useDisclosure();

const {
    isOpen: showReplies,
    onOpen: onShowReplies,
    onToggle: onToggleReplies,
} = useDisclosure();

const { execute, data, error, isFetching } = useFetch<Comment[]>(
    `comments/${comment.id}/children`,
    { inmediate: showReplies.value }
);

const childrenCount = ref(comment.children_count);

const humarizedDifferene = prettyMiliseconds(
    differenceInMilliseconds(new Date(), new Date(comment.created_at)),
    { verbose: false, compact: true }
);

function onCommentConfirm(newComment: Partial<Comment>) {
    onReplyClose();
    emit("comment", newComment);

    // Update childrenCount that way the `show replies` button will show
    // in the case that this was the first reply
    childrenCount.value++;

    onShowReplies();

    // Re-fectch children to update the listing
    execute();
}
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
                v-if="childrenCount > 0"
                size="small"
                variant="ghost"
                color-scheme="ghost"
                @click="() => [onToggleReplies(), execute()]"
                >{{ showReplies ? "Hide" : "Show" }} replies</Button
            >
        </div>

        <div class="pl-12">
            <CommentForm
                v-if="isReplying"
                class="pt-5"
                :parent-id="comment.id"
                @confirm="onCommentConfirm"
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
