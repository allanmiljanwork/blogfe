<script setup>
import { useTagsStore } from "~/store/tags";

const router = useRouter();
const route = useRoute();
const tagsStore = useTagsStore();
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UButton = resolveComponent("UButton");

await tagsStore.getTags(route.query.page);

const page = ref(parseInt(route.query.page ?? 1));

async function to(page) {
  router.push({
    query: {
      page: page,
    },
  });
  await tagsStore.getTags(page);
}

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => "" + row.getValue("id"),
  },
  {
    accessorKey: "name",
    header: "Name",
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
      to: `/admin/tags/${row.original.id}/view`,
    },
    {
      label: "Edit",
      to: `/admin/tags/${row.original.id}/edit`,
    },
    {
      label: "Delete",
      async onSelect() {
        await tagsStore.deleteTag(row.original.id);
        await tagsStore.getTags(route.query.page);
      },
    },
  ];
}
</script>

<template>
  <div class="flex justify-end">
    <UButton label="Create Tag" icon="i-lucide-plus" to="/admin/tags/create" />
  </div>

  <div>
    <UTable :data="tagsStore.tags" :columns="columns" />
  </div>
</template>
