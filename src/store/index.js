import { createStore } from 'vuex'
import axios from 'axios'

const user = JSON.parse(localStorage.getItem('userInfo'))

export default createStore({
	state: {
		name: 'ingird',
		userInfo : user || {},
		userId : '',
		cartList : []
	},
	getters: {},
	mutations: {
		setName: (state, str) => {
			state.name = str
		},
		setUsers: (state, obj) => {
			if(obj){
				// 更新使用者資料
				state.userInfo = obj
				state.userId = obj.uid ? obj.uid : null
				localStorage.setItem('userInfo', JSON.stringify(obj))
			}else{
				// 清除使用者資料
				state.userInfo = {}
				state.userId = null
				localStorage.removeItem('userInfo')
			}
		},
		setCarts: (state, array) => {
			if(Array.isArray(array)){
				// 更新購物車列表-符合同一user
				state.cartList = array
				if(state.userId){
					localStorage.setItem(`carts_${state.userId}`, JSON.stringify(array))
				}else{
					localStorage.setItem(`carts_vistit`, JSON.stringify(array))
				}
			}else{
				// 刪除購物車列表
				state.cartList = []
				localStorage.removeItem(`carts_${state.userId}`)
			}
		}
	},
	actions: {
		createUser ({ commit, state }, userInfo) {
			commit('setUsers', userInfo)
			// 在這邊要post資料給db，才能製作會員管理
            // php新增使用者的網址
			axios.post('/user', {
                // 以下和資料庫一致
				uid: userInfo.uid,
				name: userInfo.displayName,
				email: userInfo.email,
				emailVerified: userInfo.emailVerified,
				login_at: userInfo.lastLoginAt,
				photoURL: userInfo.photoURL
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			})
		},
		updateUser ({ commit, state }, userInfo) {
			commit('setUsers', userInfo)
			// 在這邊要put資料給db，才能製作會員管理
            // php新增使用者的網址
			axios.put('/user', {
				id: userInfo.id,
				name: userInfo.displayName,
				email: userInfo.email,
				emailVerified: userInfo.emailVerified,
				login_at: userInfo.lastLoginAt,
				photoURL: userInfo.photoURL
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			})
		}
	},
	modules: {}
})
