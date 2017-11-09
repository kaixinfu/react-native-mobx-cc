//
//  InputListener.swift
//  Pods
//
//  Created by George Kaimakas on 11/18/15.
//
//

public protocol InputListener {
    func onInputValueChange(input:Input)
    func onInputStateChange(input:Input)
    func onInputSubmitted(input:Input)
}
