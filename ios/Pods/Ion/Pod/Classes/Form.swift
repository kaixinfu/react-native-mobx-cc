//
//  Form.swift
//  Pods
//
//  Created by George Kaimakas on 11/18/15.
//
//

public class Form: SectionListener {
    private static var _Instances = 0
    public static var INSTANCES: Int {
        return Form._Instances
    }
    
    public let id: Int
    public let name: String
    
    private var dirty = false
    private var submitted = false
    private var currentState = false
    private var previousState = false
    
    private var sections = [Section]()
    private var formListeners = [FormListener]()
    
    //MARK: - Computed Properties
    
    public var data: [String: Any]{
        return sections.map{
            $0.data
            }.reduce([String:Any]()) { (var result:[String: Any], data:[String : Any]) -> [String:Any] in
                for (key, value) in data{
                    result[key] = value
                }
                return result
        }
    }
    
    public var errors:[String]? {
        let errorList = sections.map{
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
    
    public var isSubmitted: Bool{
        return submitted
    }
    
    public var isValid:Bool {
        return validate()
    }
    
    public var numberOfSections:Int {
        return sections.count
    }
    
    //MARK: - Initializers
    public init(name:String){
        self.id = Form._Instances++
        self.name = name
    }
    
    public func addSection(section: Section) -> Form{
        sections.append(section)
        section.parentForm = self
        section.addSectionListener(self)
        return self
    }
    
    public func addFormListener(listener: FormListener){
        formListeners.append(listener)
    }
    
    public func sectionAtIndex(index: Int) -> Section{
        return sections[index]
    }
    
    //MARK: - Notifications
    
    public func notifyIfFormInputValueChange(section: Section, input:Input){
        for listener: FormListener in formListeners{
            listener.onFormInputValueChange(self,section: section, input: input)
        }
    }
    
    public func notifyIfFormStateChange(){
        for listener: FormListener in formListeners{
            listener.onFormStateChange(self)
        }
    }
    
    public func notifyIfFormSubmitted(){
        for listener: FormListener in formListeners{
            listener.onFormSubmitted(self)
        }
    }
    
    //MARK: - SectionListener Implementation
    
    public func onSectionInputValueChange(section: Section, input: Input) {
        dirty = true
        notifyIfFormInputValueChange(section, input: input)
    }
    
    public func onSectionStateChange(section: Section) {
        setCurrentState(validate())
    }
    
    public func onSectionSubmit(section: Section) {
        
    }
    
    public func setCurrentState(state:Bool){
        previousState = currentState
        currentState = state
    }
    
    public func submit(){
        for section: Section in sections{
            section.submit()
        }
        submitted = true
        notifyIfFormSubmitted()
    }
    
    public func validate() -> Bool {
        return sections.reduce(true){
            $0 && $1.validate()
        }
    }
}
