<script setup>
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
authStore.clearErrors();
const router = useRouter();
let formData = ref({
  email: "",
  password: "",
});
async function login() {
  await authStore.login(formData.value);
  if (!authStore.errors) {
    router.push("/");
  }
}
</script>

<template>
  <UPageCard class="mt-3" title="Login">
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
    <UButton block @click="login">Login</UButton>
  </UPageCard>
</template>
