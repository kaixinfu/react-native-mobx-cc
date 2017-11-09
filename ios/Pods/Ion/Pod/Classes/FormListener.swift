//
//  FormListener.swift
//  Pods
//
//  Created by George Kaimakas on 11/18/15.
//
//

public protocol FormListener {
    func onFormInputValueChange(form:Form, section:Section, input: Input)
    func onFormStateChange(form: Form)
    func onFormSubmitted(form: Form)
}
