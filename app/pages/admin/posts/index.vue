<script setup>
import { usePostsStore } from "~/store/posts";

const router = useRouter();
const route = useRoute();
const postsStore = usePostsStore();
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UButton = resolveComponent("UButton");

await postsStore.getPosts(route.query.page);

const page = ref(parseInt(route.query.page ?? 1));

async function to(page) {
  router.push({
    query: {
      page: page,
    },
  });
  await postsStore.getPosts(page);
}

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => "" + row.getValue("id"),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "created_at",
    header: "Created",
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
            "aria-label": "Actions dropdown",
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
              "aria-label": "Actions dropdown",
            }),
        ),
      );
    },
  },
];

function getRowItems(row) {
  return [
    {
      label: "View",
      to: `/admin/posts/${row.original.slug}/view`,
    },
    {
      label: "Edit",
      to: `/admin/posts/${row.original.slug}/edit`,
    },
    {
      label: "Delete",
      async onSelect() {
        await postsStore.deletePost(row.original.slug);
        await postsStore.getPosts(route.query.page);
      },
    },
  ];
}
</script>

<template>
  <div class="flex justify-end">
    <UButton
      label="Create Post"
      icon="i-lucide-plus"
      to="/admin/posts/create"
    />
  </div>

  <div>
    <UTable :data="postsStore.posts" :columns="columns" />
  </div>
</template>
