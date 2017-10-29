import Realm from 'realm';

import {
	UserSchema
} from '../../stores/schema'

if (__DEV__ && Platform.OS === 'ios' && DeviceInfo.isEmulator()) {
	Realm.defaultPath = '/Users/Shared/realm/realm-data/data.realm'
}

console.log('Realm.defaultPath', Realm.defaultPath);

const schema = [
	UserSchema
]

const schemas = [
	{schema: schema, schemaVersion: 1, migration: (oldRealm, newRealm) => {
		// only apply this change if upgrading to schemaVersion 1
		if (oldRealm.schemaVersion < 1) {
			let oldObjects = oldRealm.objects('RiskThumb');
			let newObjects = newRealm.objects('RiskThumb');
			
			// loop through all objects and set the name property in the new schema
			for (let i = 0; i < oldObjects.length; i++) {
				newObjects[i].feature = oldObjects[i].feature.toString()
			}
		}
	}},
]

// the first schema to update to is the current schema version
// since the first schema in our array is at
let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
console.log('nextSchemaIndex.......', nextSchemaIndex)

if(nextSchemaIndex === -1){
	const tempRelm = new Realm(schemas[schemas.length-1]);
	tempRelm.close()
}else{
	while (nextSchemaIndex < schemas.length) {
		const migratedRealm = new Realm(schemas[nextSchemaIndex++]);
		migratedRealm.close();
	}
}

// open the Realm with the latest schema

const realm = new Realm(schemas[schemas.length-1])

//初始化产品缩略图配置数据
realm.write(() => {
	let loadedRiskThumbs = realm.objects('RiskThumb');
	realm.delete(loadedRiskThumbs);
	for (let thumb of riskThumbs) {
		realm.create('RiskThumb', thumb);
	}
});

//初始化设备信息
realm.write(() => {
	let deviceInfos = realm.objects('DeviceInfo')
	
	if (deviceInfos.length === 0) {
		let deviceInfoDomain = new DeviceInfoDomain()
		realm.create('DeviceInfo', deviceInfoDomain)
	}
})

function cascadingDelete(object) {
	
	if (_.isEmpty(object)) {
		return
	}
	
	let objectSchema = object.objectSchema()
	
	// delete all child objects
	for (let propName in objectSchema.properties) {
		let prop = objectSchema.properties[propName]
		// for object properties delete object and all children
		if (prop.type == 'object' && object[propName] != null) {
			cascadingDelete(object[propName])
		}
		// for list properties delete all elements and their children
		if (prop.type == 'list') {
			object[propName].forEach((listObject) => {
				if (_.isEmpty(listObject)) {
					listObject = object[propName][0]
				}
				console.log(222, listObject);
				cascadingDelete(listObject)
			})
		}
	}
	
	// delete the object
	realm.delete(object);
}

/**
 * 用于对象保存前做一次转换，仅用于对象中存在数组属性的对象，其他无使用必要。
 * @param object
 * @param toStr
 * @returns {*}
 */
function cascadingCopy(object,toStr) {
	
	if (_.isEmpty(object)) {
		if (isObservableArray(object) || object instanceof Array) {
			return []
		}
		if (isObservableObject(object) || object instanceof Object) {
			return {}
		}
		if (isObservableMap(object) || object instanceof Map) {
			return {}
		}
		if (object instanceof Date) {
			return new Date();
		}
		return '';
	}
	if (isObservableMap(object) || (object instanceof Map)) {
		
		let res = {}
		let keys = object.keys();
		keys.forEach((key) => {
			//非普通对象，且是观测对象，需递归复制，并toJS转化
			if (isObservableMap(object[key]) ||
				isObservableArray(object[key]) ||
				isObservableObject(object[key])) {
				res[key] = cascadingCopy(toJS(object[key],toStr));
				//非普通对象，非观测对象，需递归复制，无需toJS转化
			} else if ((object[key] instanceof Map) || (object[key] instanceof Array) || (object[key] instanceof Object)) {
				res[key] = cascadingCopy(object[key],toStr);
			} else {
				//普通对象，直接复制
				res[key] = _dealObj(object[key],toStr);
			}
		})
		return res;
	} else if (isObservableArray(object) || (object instanceof Array)) {
		let arrayValues = [];
		object.map((item) => {
			//非普通对象，且是观测对象，需递归复制，并toJS转化
			if (isObservableMap(item) ||
				isObservableArray(item) ||
				isObservableObject(item)) {
				arrayValues.push(cascadingCopy(toJS(item),toStr));
				//非普通对象，非观测对象，需递归复制，无需toJS转化
			} else if ((item instanceof Map) || (item instanceof Array) || (item instanceof Object)) {
				arrayValues.push(cascadingCopy(item,toStr));
			} else {
				//普通对象，直接复制
				arrayValues.push(_dealObj(item,toStr))
			}
		})
		return arrayValues
	} else if (isObservableObject(object) || (object instanceof Object)) {
		let res = {}
		for (let key in object) {
			//非普通对象，且是观测对象，需递归复制，并toJS转化
			if (isObservableMap(object[key]) ||
				isObservableArray(object[key]) ||
				isObservableObject(object[key])) {
				res[key] = cascadingCopy(toJS(object[key],toStr));
				//非普通对象，非观测对象，需递归复制，无需toJS转化
			} else if ((object[key] instanceof Map) || (object[key] instanceof Array) || (object[key] instanceof Object)) {
				res[key] = cascadingCopy(object[key],toStr);
			} else {
				//普通对象，直接复制
				res[key] = _dealObj(object[key],toStr);
			}
		}
		return res;
	}
	
	return object;
}

function _dealObj(obj,toStr){
	if(typeof(obj) == 'number'&&toStr){
		return obj.toString();
	}
	return obj;
}

realm.cascadingDelete = cascadingDelete
realm.cascadingCopy = cascadingCopy

export default realm