/**
 * Exports a mixin containg user's token provided by authentication
 */
export default {
  install(vue, options) {
    vue.mixin({
      data() {
        const token = localStorage.getItem('user-token')
          ? localStorage.getItem('user-token')
          : ''
        return {
          auth: {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        }
      }
    })
  }
}
