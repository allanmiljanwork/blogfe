<script setup>
import { useTagsStore } from "~/store/tags";

const tagsStore = useTagsStore();
const router = useRouter();
let formData = ref({
  name: "",
});
async function create() {
  await tagsStore.createTag(formData.value);
  if (!tagsStore.errors) {
    router.push("/admin/tags");
  }
}
</script>

<template>
  <UPageCard class="mt-3" title="Create tag">
    <UFormField label="Title" :error="tagsStore.errors?.name?.find(() => true)">
      <UInput v-model="formData.name" class="w-full" placeholder="Title" />
    </UFormField>

    <UButton block @click="create">Create</UButton>
  </UPageCard>
</template>
