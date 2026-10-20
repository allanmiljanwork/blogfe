<script setup>
import { usePostsStore } from "~/store/posts";
let router = useRouter();
let route = useRoute();
let postsStore = usePostsStore();

await postsStore.getPosts(route.query.page);

let page = ref(parseInt(route.query.page ?? 1));

async function to(page) {
  router.push({
    query: {
      page: page,
    },
  });
  await postsStore.getPosts(page);
}

let columns = [
  {
    accessorKey: "id",
    header: "#",
    cell: (cell) => "#" + cell.getValue(),
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
  console.log(row);
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
  <UButton class="my-2" to="/admin/posts/create">Create</UButton>
  <UPagination
    class="my-4 flex justify-center"
    v-model:page="page"
    @update:page="to"
    show-edges
    :sibling-count="2"
    :itemsPerPage="postsStore.pagination.per_page"
    :total="postsStore.pagination.total"
  />
  <UTable :data="postsStore.posts" :columns="columns" class="flex-1" />
</template>
