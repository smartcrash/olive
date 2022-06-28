<script setup lang="ts">
import CommentForm from "./comment-form.vue";
import useDisclosure from "./../../hooks/useDisclosure";

const { isOpen, onOpen, onClose } = useDisclosure();
</script>

<template>
    <a
        v-if="!isOpen"
        class="bg-gray-50 w-full block py-5 px-4 rounded-md text-gray-500"
        @click="onOpen"
    >
        <i class="mr-3 text-lg">💬</i> Add comment...</a
    >
    <CommentForm v-else @confirm="onClose" @cancel="onClose" />
</template>
