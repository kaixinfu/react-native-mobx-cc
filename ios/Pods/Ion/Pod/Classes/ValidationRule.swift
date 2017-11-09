//
//  ValidationRule.swift
//  Pods
//
//  Created by George Kaimakas on 11/18/15.
//
//
import SwiftValidators

struct ValidationRule {
    let rule: Validation
    let errorMessage: String
    
    init(rule: Validation, errorMessage: String){
        self.rule = rule
        self.errorMessage = errorMessage
    }
}
