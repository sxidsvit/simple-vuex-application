export default {
  actions: {
    async fetchPosts({ commit, dispatch }, limit = 4) {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=' + limit
      )
      const posts = await res.json()

      dispatch('sayHello')

      commit('updatePosts', posts)
    },
    sayHello() {
      console.log('Запрос к jsonplaceholder.typicode.com выполнен ...');
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    },
    createPost(state, newPost) {
      state.posts.unshift(newPost)
    }
  },
  state: {
    posts: []
  },
  getters: {
    validPosts(state) {
      return state.posts.filter(p => {
        return p.title && p.body
      })
    },
    allPosts(state) {
      return state.posts
    },
    postsCount(state, getters) {
      return getters.validPosts.length
    }
  }
}
