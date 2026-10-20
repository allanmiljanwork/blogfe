<script setup>
import axios from "axios";
import { useAuthStore } from "./store/auth";
axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;
let authStore = useAuthStore();
authStore.getUser();
</script>

<template>
  <UApp>
    <MainNav></MainNav>
    <UContainer>
      <ClientOnly>
        <NuxtPage></NuxtPage>
      </ClientOnly>
    </UContainer>
  </UApp>
</template>
