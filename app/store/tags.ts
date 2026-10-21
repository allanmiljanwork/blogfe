import axios from "axios";
export const useTagsStore = defineStore("tagsStore", {
  state: () => ({
    tags: [] as any[],
    tag: null,
    errors: null,
  }),
  actions: {
    async getTags(page: Number) {
      let res = await axios.get("http://localhost:8000/api/tags", {
        params: {
          page,
        },
      });
      this.tags = res.data.data;
    },

    async getTag(id: number) {
      const cached = this.tags.find((tag) => tag.id === id);
      if (cached) {
        this.tag = cached;
        return;
      }
      let res = await axios.get("http://localhost:8000/api/tag/" + id);
      this.tag = res.data;
    },

    async createTag({ name }: any) {
      try {
        let res = await axios.post("http://localhost:8000/api/admin/tags", {
          name,
        });
        this.errors = null;
      } catch (err: any) {
        console.log(err.response.data);
        this.errors = err.response.data.errors;
      }
    },
    async updateTag(id: number, { name }: any) {
      try {
        let res = await axios.patch(
          "http://localhost:8000/api/admin/tags/" + id,
          { name },
        );
        this.errors = null;
      } catch (err: any) {
        console.log(err.response.data);
        this.errors = err.response.data.errors;
      }
    },
    async deleteTag(id: number) {
      try {
        let res = await axios.delete(
          "http://localhost:8000/api/admin/tags/" + id,
        );
        this.errors = null;
      } catch (err: any) {
        console.log(err.response.data);
        this.errors = err.response.data.errors;
      }
    },
  },
});
