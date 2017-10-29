import {
	HomeStore,
	LoginViewStore
} from './view'

export default function() {
	const homeStore = new HomeStore();
	const loginForm = new LoginViewStore();
	
	return {
		homeStore,
		loginForm,
	};
}
