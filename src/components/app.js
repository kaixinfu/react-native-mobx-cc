import config from "../stores/configureStore";
import route from "./route";

export default function() {
	const stores = config();
	return route(stores);
}
