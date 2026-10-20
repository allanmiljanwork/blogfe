<script setup>
import { usePostsStore } from "~/store/posts";
let route = useRoute();
let postsStore = usePostsStore();
await postsStore.getPost(route.params.slug);
</script>
<template>
  <PostCard :post="postsStore.post"></PostCard>
</template>
