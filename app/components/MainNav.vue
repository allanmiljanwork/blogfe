<script setup>
import { useAuthStore } from "~/store/auth";

let route = useRoute();
let authStore = useAuthStore();
let centerItems = computed(() => {
  return [
    {
      label: "Home",
      to: "/",
      active: route.path === "/",
    },
    {
      label: "Admin",
      active: route.path.startsWith("/admin"),
      children: [
        {
          label: "Posts",
          to: "/admin/posts",
          active: route.path.startsWith("/admin/posts"),
        },
        {
          label: "Tags",
          to: "/admin/tags",
          active: route.path.startsWith("/admin/tags"),
        },
      ],
    },
  ];
});
let rightItems = computed(() => {
  let items = [];
  if (authStore.user) {
    items.push({
      label: authStore.user.name,
      children: [
        {
          label: "Logout",
          async onSelect() {
            await authStore.logout();
          },
        },
      ],
    });
  } else {
    items.push({
      label: "Login",
      to: "/login",
      active: route.path.startsWith("/login"),
    });
    items.push({
      label: "Register",
      to: "/register",
      active: route.path.startsWith("/register"),
    });
  }

  return items;
});
</script>
<template>
  <UHeader title="Blog">
    <template #right>
      <UNavigationMenu :items="rightItems" class="w-full justify-end" />
      <UColorModeButton />
    </template>

    <UNavigationMenu :items="centerItems" class="w-full" />
  </UHeader>
</template>
