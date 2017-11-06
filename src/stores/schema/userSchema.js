const UserSchema = {
	name: 'user',
	properties: {
		user_name: 'string',
		age: {type: 'string', default: '0'},
		sex: 'string'
	}
}
export default UserSchema