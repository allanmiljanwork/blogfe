<script setup>
import { useTagsStore } from "~/store/tags";

const tagsStore = useTagsStore();
const route = useRoute();
await tagsStore.getTag(route.params.id);

console.log("route id:", route.params.id);
console.log("all tag's:", tagsStore.tag);
</script>

<template>
  <p>Vaadates console.log loeb kõik ära.</p>
  <br />
  <p>
    Laraveli backendis returnib antud tag id mitte midagi, kuna see on postiga
    {$className}Seeder lisatud.
  </p>
</template>
