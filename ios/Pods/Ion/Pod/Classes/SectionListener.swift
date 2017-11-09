//
//  SectionListener.swift
//  Pods
//
//  Created by George Kaimakas on 11/18/15.
//
//

public protocol SectionListener {
    func onSectionInputValueChange(section:Section, input:Input)
    func onSectionStateChange(section:Section)
    func onSectionSubmit(section:Section)
}
