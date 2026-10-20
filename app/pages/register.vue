<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
authStore.clearErrors();
const router = useRouter();
let formData = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
async function register() {
  await authStore.register(formData.value);
  if (!authStore.errors) {
    router.push("/");
  }
}
</script>

<template>
  <UPageCard class="mt-3" title="Register">
    <UFormField label="Name" :error="authStore.errors?.name?.find(() => true)">
      <UInput v-model="formData.name" class="w-full" placeholder="Name" />
    </UFormField>
    <UFormField
      label="Email"
      :error="authStore.errors?.email?.find(() => true)"
    >
      <UInput
        type="email"
        v-model="formData.email"
        class="w-full"
        placeholder="Email"
      />
    </UFormField>
    <UFormField label="Password">
      <UInput
        type="password"
        v-model="formData.password"
        class="w-full"
        placeholder="Password"
        :error="authStore.errors?.password?.find(() => true)"
      />
    </UFormField>
    <UFormField label="Confirm Password">
      <UInput
        type="password"
        v-model="formData.password_confirmation"
        class="w-full"
        placeholder="Confirm Password"
        :error="authStore.errors?.password_confirmation?.find(() => true)"
      />
    </UFormField>
    <UButton block @click="register">Register</UButton>
  </UPageCard>
</template>
