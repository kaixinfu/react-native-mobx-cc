//
//  Input.swift
//  Pods
//
//  Created by George Kaimakas on 11/18/15.
//
//

import SwiftValidators

public class Input {
    public enum Type{
        case None
        case Text
    }
    
    private static var _Instances = 0
    public static var INSTANCES: Int {
        return Input._Instances
    }
    public static let DEFAULT_VALUE = ""
    
    public let id: Int
    public let name: String
    
    private var dirty = false
    private var currentState = false
    private var previousState = false
    private var submitted = false
    
    private var value: String = Input.DEFAULT_VALUE
    private var previousValue: String?
    
    private var inputListeners = [InputListener]()
    private var validationRules = [ValidationRule]()
    
    internal var parentSection: Section?
    
    //MARK: - Computed Properties
    
    public var data: [String: Any]?{
        if !self.isValid{
            return nil
        }
        return [self.name : self.value]
    }
    
    public var errors:[String]? {
        let errorMessages = validationRules.filter(){
            $0.rule(self.value) == false
            }
            .map{
            $0.errorMessage
        }
        
        if errorMessages.count != 0 {
            return errorMessages
        }
        
        return nil
    }
    
    public var isDirty: Bool {
        return dirty
    }
    
    public var isValid: Bool {
        return self.validate()
    }
    
    public var isSubmitted: Bool {
        return self.submitted
    }
    
    //MARK: - Initializers
    public init(name: String){
        self.id = Input._Instances++
        self.name = name
    }
    
    public init(name: String, initialValue: String){
        self.id = Input._Instances++
        self.name = name
        setValue(initialValue)
    }
    
    public func addInputListener(listener:InputListener) -> Input {
        inputListeners.append(listener)
        return self
    }
    
    public func addValidationRule(rule: Validation, errorMessage: String) -> Input{
        validationRules.append(ValidationRule(rule: rule, errorMessage: errorMessage))
        return self
    }
    
    public func getValue() -> String{
        return value
    }
    
    //MARK: - Notifications
    internal func notifyIfInputValueChanged(){
        if previousValue! != value {
            for listener:InputListener in inputListeners {
                listener.onInputValueChange(self)
            }
        }
    }
    
    internal func notifyIfInputStateChanged(){
        if previousState != currentState {
            for listener:InputListener in inputListeners{
                listener.onInputStateChange(self)
            }
        }
    }
    
    internal func notifyIfInputSubmitted(){
        if submitted{
            for listener:InputListener in inputListeners{
                listener.onInputSubmitted(self)
            }
        }
    }
    
    public func setCurrentState(state:Bool){
        previousState = currentState
        currentState = state
    }
    
    public func setValue(value:String){
        dirty = true
        previousValue = self.value
        self.value = value
        
        setCurrentState(validate())
        
        notifyIfInputValueChanged()
        notifyIfInputStateChanged()
    }
    
    public func submit(){
        submitted = true
        notifyIfInputSubmitted()
    }
    
    public func validate() -> Bool {
        return validationRules.reduce(true){
            $0 && $1.rule(self.value)
        }
    }
    
    
    
    
}
