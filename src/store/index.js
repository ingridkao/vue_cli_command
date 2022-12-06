import { createStore } from 'vuex'

const user = JSON.parse(localStorage.getItem('userInfo'))

export default createStore({
	state: {
		name: 'ingird',
		userInfo : user || {}
	},
	getters: {
	},
	mutations: {
		setUsers: (state, obj) => {
			state.userInfo = obj
			if(obj){
				state.userInfo = obj
				localStorage.setItem('userInfo', JSON.stringify(obj))
			}else{
				state.userInfo = {}
				localStorage.removeItem('userInfo')
			}
		},
		setName: (state, str) => {
			state.name = str
		}
	},
	actions: {
	},
	modules: {
	}
})
