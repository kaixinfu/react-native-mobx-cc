import * as React from "react";
import { Provider } from "mobx-react/native";
import { StyleProvider } from "native-base";
import View from './View';
import Realm from 'realm';

export default function(stores) {
	return class Setup extends React.Component<Props, State> {
		render() {
			return (
				<StyleProvider>
					<Provider {...stores}>
						<View />
					</Provider>
				</StyleProvider>
			);
		}
	};
}