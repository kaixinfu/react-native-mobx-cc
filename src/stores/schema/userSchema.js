const UserSchema = {
	name: 'user',
	primaryKey: 'user_id',
	properties: {
		user_name: 'string',
		age: {type: 'int', default: 0},
		sex: 'string'
	}
}
export default UserSchema