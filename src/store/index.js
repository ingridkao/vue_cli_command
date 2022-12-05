import { createStore } from 'vuex'

const user = JSON.parse(sessionStorage.getItem('userInfo'))

export default createStore({
	state: {
		userInfo : user || {}
	},
	getters: {
	},
	mutations: {
		setUsers: (state, obj) => {
			state.userInfo = obj
			localStorage.setItem('userInfo', JSON.stringify(obj))
		}
	},
	actions: {
	},
	modules: {
	}
})
