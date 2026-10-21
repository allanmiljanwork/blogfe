<script setup>
import { useTagsStore } from "~/store/tags";

const tagsStore = useTagsStore();
const route = useRoute();
await tagsStore.getTag(route.params.id);
const router = useRouter();
let formData = ref({
  name: tagsStore.tag?.name ?? "",
});
async function update() {
  await tagsStore.updateTag(route.params.id, formData.value);
  if (!tagsStore.errors) {
    router.push("/admin/tags");
  }
}
</script>

<template>
  <UPageCard class="mt-3" title="Edit tag">
    <UFormField label="Title" :error="tagsStore.errors?.name?.find(() => true)">
      <UInput v-model="formData.name" class="w-full" placeholder="" />
    </UFormField>
    <UButton block @click="update">Update</UButton>
  </UPageCard>
</template>
