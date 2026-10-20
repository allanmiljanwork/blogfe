<script setup>
defineProps(["post", "snippet"]);
</script>
<template>
  <UBlogPost
    :title="post.title"
    :authors="[{ name: post.user.name }]"
    :image="post.images[0]?.path"
    :description="snippet ? post.snippet : post.body"
    :to="'/post/' + post.slug"
  >
  </UBlogPost>
</template>
