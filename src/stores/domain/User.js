import {observable} from 'mobx';
import realm from '../../services/realm';

/**
 * 险种基本信息
 */
export default class User {
	
	static create(risk) {
		realm.create('Risk', realm.cascadingCopy(risk), true)
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
