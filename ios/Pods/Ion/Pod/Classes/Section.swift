//
//  Section.swift
//  Pods
//
//  Created by George Kaimakas on 11/18/15.
//
//

public class Section: InputListener{
    private static var _Instances = 0
    public static var INSTANCES: Int {
        return Section._Instances
    }
    
    public let id: Int
    public let name: String
    
    private var dirty = false
    private var previousState = false
    private var currentState = false
    private var submitted = false
    
    private var inputs = [Input]()
    internal var parentForm: Form?
    private var sectionListeners = [SectionListener]()
    
    //MARK: - Computed Properties
    
    
    public var data: [String: Any]{
        return inputs.map{
            $0.data
            }.filter(){
                $0 != nil
            }.reduce([String:Any]()) { (var result:[String: Any], data:[String : Any]?) -> [String:Any] in
                if let _data = data {
                    for (key, value) in _data{
                        result[key] = value
                    }
                }
                return result
        }
    }
    
    public var errors:[String]? {
        let errorList = inputs.map{
            $0.errors
            }.filter(){
                $0 != nil
            }.reduce([String]()) { (var result:[String], data: [String]?) -> [String] in
                if let _data = data {
                    result.appendContentsOf(_data)
                }
                return result
        }
        
        if errorList.count != 0{
            return errorList
        }
        
        return nil
    }
    
    public var isDirty: Bool{
        return dirty
    }
    
    public var isValid: Bool {
        return validate()
    }
    
    public var isSubmitted: Bool {
        return submitted
    }
    
    public var numberOfInputs: Int {
        return inputs.count
    }
    
    
    //MARK: - Initializers
    public init(name:String){
        self.id = Section._Instances++
        self.name = name
    }
    
    public func addInput(input:Input) -> Section{
        inputs.append(input)
        input.parentSection = self
        input.addInputListener(self)
        return self
    }
    
    public func addSectionListener(listener: SectionListener){
        sectionListeners.append(listener)
    }
    
    public func inputAtIndex(index: Int) -> Input {
        return inputs[index]
    }
    
    //Mark: - Notifications
    
    internal func notifyIfSectionInputValueChange(input: Input){
        for listener:SectionListener in sectionListeners{
            listener.onSectionInputValueChange(self, input: input)
        }
    }
    
    internal func notifyIfSectionStateChange(){
        if previousState != currentState {
            for listener:SectionListener in sectionListeners{
                listener.onSectionStateChange(self)
            }
        }
    }
    
    internal func notifyIfSectionSubmitted(){
        if submitted{
            for listener:SectionListener in sectionListeners{
                listener.onSectionSubmit(self)
            }
        }
        
    }
    
    //MARK: - InputListener implementation
    
    public func onInputStateChange(input: Input) {
        setCurrentState(validate())
        notifyIfSectionStateChange()
    }
    
    public func onInputValueChange(input: Input) {
        dirty = true
        notifyIfSectionInputValueChange(input)
    }
    
    public func onInputSubmitted(input: Input) {
        
    }
    
    public func setCurrentState(state:Bool){
        previousState = currentState
        currentState = state
    }

    public func submit(){
        submitted = true
        for input:Input in inputs{
            input.submit()
        }
    }
    
    public func validate() -> Bool{
        return inputs.reduce(true){
            $0 && $1.validate()
        }
    }
}
