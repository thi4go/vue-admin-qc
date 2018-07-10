
const state = {
  api_url: ''
}

const mutations = {
  setApiScope(url) {
    state.api_url = url
  }
}


export default {
  state,
  mutations
}
