<script setup lang="ts">
import Button from "../components/button.vue";
import CommentItem from "../components/comment-item.vue";
import CommentList from "../components/comment-list.vue";
import CommentAdder from "../components/comment-adder.vue";
import { Link } from "@inertiajs/inertia-vue3";
import { Comment, Paginated } from "../../types";
import { Inertia } from "@inertiajs/inertia";

interface Props {
    comments: Paginated<Comment>;
}

const { comments } = defineProps<Props>();

function onNewComment(data: Partial<Comment>) {
    Inertia.post("comments", data, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {}, // TODO: Show toast or something.
        onError: (error) => console.error(error),
    });
}
</script>

<template layout>
    <h1 class="text-5xl font-bold mb-12">
        Sed at augue ipsum. Integer semper nisl a elit placerat
    </h1>

    <p class="text-gray-500 leading-8 font-normal">
        Suspendisse malesuada, massa in convallis vehicula, orci sapien rutrum
        lectus, in molestie massa quam a enim. Sed porta sodales viverra.
        Integer ut suscipit enim, in elementum libero. Cras non vestibulum enim.
        Nunc lacinia tincidunt ex. Proin in sollicitudin tortor. Etiam at
        faucibus enim. Aenean consectetur urna sed orci imperdiet, id fermentum
        purus finibus. Curabitur dignissim mauris enim, tincidunt gravida lorem
        ultricies non. Praesent vitae est eros. Donec fringilla dolor et tortor
        tempor elementum. Sed cursus aliquet semper. Nam rhoncus mi vel tortor
        vulputate viverra. Mauris eu lobortis arcu. Cras id velit ut sapien
        accumsan mollis eget eu mauris. Nam malesuada at justo sed varius. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Sed at augue ipsum.
        Integer semper nisl a elit placerat, at sodales sapien sollicitudin. Sed
        lacinia egestas ultricies. Sed vel eros vehicula, fermentum turpis eget,
        accumsan arcu. Nunc pharetra lectus sed diam aliquam, lobortis imperdiet
        lectus pellentesque. In porttitor enim et diam fringilla laoreet.

        <br />
        <br />

        Integer a lacinia mi, sit amet consequat purus. Suspendisse potenti. In
        quis nulla elementum, porttitor lacus a, venenatis arcu. Integer nibh
        nisl, scelerisque in dignissim in, dignissim vel est. Praesent sodales,
        mauris in pharetra tempor, lorem mi sagittis diam, vitae vehicula est
        sem quis felis. Suspendisse in diam sem. Interdum et malesuada fames ac
        ante ipsum primis in faucibus. Praesent mattis purus sit amet pulvinar
        pretium.
    </p>

    <hr class="my-12" />

    <h4 class="text-xl font-semibold mb-6">Comments</h4>

    <CommentAdder @confirm="onNewComment" />

    <CommentList>
        <CommentItem
            v-for="comment in comments.data"
            :comment="comment"
            @comment="onNewComment"
            :key="comment.id"
        />
    </CommentList>

    <div
        v-if="comments.next_page_url || comments.prev_page_url"
        class="flex justify-center mt-5 space-x-2"
    >
        <Link
            v-if="comments.prev_page_url"
            preserve-scroll
            preserve-state
            :href="comments.prev_page_url"
            :only="['comments']"
        >
            <Button color-scheme="dark">Previous</Button>
        </Link>

        <Link
            v-if="comments.next_page_url"
            preserve-scroll
            preserve-state
            :href="comments.next_page_url"
            :only="['comments']"
        >
            <Button color-scheme="dark">Next</Button>
        </Link>
    </div>
</template>
