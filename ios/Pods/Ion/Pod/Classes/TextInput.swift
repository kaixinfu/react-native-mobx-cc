//
//  TextInput.swift
//  Pods
//
//  Created by George Kaimakas on 11/19/15.
//
//

public class TextInput: Input {
    public let hint:String
    
    public init(name: String, hint: String) {
        self.hint = hint
        super.init(name: name)
    }
}
