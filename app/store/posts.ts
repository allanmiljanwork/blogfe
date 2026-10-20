import axios from "axios";
export const usePostsStore = defineStore("postsStore", {
  state: () => ({
    pagination: null,
    posts: [],
    post: null,
    errors: null,
  }),
  actions: {
    async getPosts(page: Number) {
      let res = await axios.get("http://127.0.0.1:8000/api/posts", {
        params: {
          page,
        },
      });
      this.pagination = res.data;
      this.posts = res.data.data;
    },
    async getPost(slug: string) {
      if (this.posts.length) {
        this.post = this.posts.filter(
          (post: any) => post.slug === slug,
        )[0] as any;
      } else {
        let res = await axios.get("http://localhost:8000/api/post/" + slug);
        this.post = res.data;
      }
    },
    async createPost({ title, body }: any) {
      try {
        let res = await axios.post("http://localhost:8000/api/admin/posts/", {
          title,
          body,
        });
        this.errors = null;
      } catch (err: any) {
        console.log(err.response.data);
        this.errors = err.response.data.errors;
      }
    },
    async updatePost(slug: string, { title, body }: any) {
      try {
        let res = await axios.patch(
          "http://localhost:8000/api/admin/posts/" + slug,
          {
            title,
            body,
          },
        );
        this.errors = null;
      } catch (err: any) {
        console.log(err.response.data);
        this.errors = err.response.data.errors;
      }
    },
    async deletePost(slug: string) {
      try {
        let res = await axios.delete(
          "http://localhost:8000/api/admin/posts/" + slug,
        );
        this.errors = null;
      } catch (err: any) {
        console.log(err.response.data);
        this.errors = err.response.data.errors;
      }
    },
  },
});
