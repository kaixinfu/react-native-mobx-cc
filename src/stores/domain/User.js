import {observable} from 'mobx';
import realm from '../../services/realm';

import Root from './Root'

/**
 * 险种基本信息
 */
export default class User extends Root{
	@observable name = this.name;
	@observable sex = '';
	@observable age = '';
	@observable job = '';
	
	constructor(name, sex, age, job) {
		super();
		this.name = name;
		this.sex = sex;
		this.age = age;
		this.job = job
	}
	
	static create(risk) {
		realm.create('User', realm.cascadingCopy(risk), true)
	}
	
	static findByPk(pk) {
		let loadedRisk = realm.objectForPrimaryKey('Risk', pk);
		return {...loadedRisk}
	}
	
	static findAll() {
		return realm.objects('Risk')
	}
	
	static find(clause) {
		let syncTables = realm.objects('Risk').filtered(clause)
		return syncTables
	}
	static findByRiskNo(risk_no){
		let loadedRisk = realm.objects('Risk').filtered('policy_id == $0', risk_no);
		return {...loadedRisk[0]};
	}
	
	static findByPolicyId(policyId){
		let loadedRisk = realm.objects('Risk').filtered('policy_id == $0', policyId);
		return {...loadedRisk[0]};
	}
}
