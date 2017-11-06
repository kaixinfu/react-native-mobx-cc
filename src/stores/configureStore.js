import {
	HomeStore,
	LoginViewStore,
	UserStore
} from './view'

export default function() {
	const homeStore = new HomeStore();
	const loginForm = new LoginViewStore();
	const userStore = new UserStore()
	
	return {
		homeStore,
		loginForm,
		userStore
	};
}
