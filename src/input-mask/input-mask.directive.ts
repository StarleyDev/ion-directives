import { Attribute, Directive } from '@angular/core';
import { NgModel } from "@angular/forms";

/**
 * Responsavel pelo mascaramento de inputs
 * @author Thiago Przyczynski
 * przyczynski@gmail.com
 */

@Directive({
    selector: '[appMask]',
    host: {
        '(keydown)': 'onKeyDown($event)'
    },
    providers: [NgModel]
})
export class IonInputMaskDirective {

    pattern: string;

    /**
     * Construtor
     * @param {NgModel} model
     * @param {string} pattern
     */
    constructor(public model: NgModel,
        @Attribute('appMask') pattern: string = null) {
        this.pattern = pattern;
    }

    /**
     * Listener para mudança de valor do input
     * @param event
     */
    onKeyDown(event: any) {
        let value = event.target.value,
            pattern = this.pattern;
        if (pattern !== null) {
            if (event.keyIdentifier === 'U+0008' || event.keyCode === 8 || event.key === 'Backspace') {
                if (value.length) { //prevent fatal exception when backspacing empty value in progressive web app
                    //remove all trailing formatting then delete character
                    while (pattern[value.length] && pattern[value.length] !== '*') {
                        value = value.substring(0, value.length - 1);
                    }
                    //remove all leading formatting to restore placeholder
                    if (pattern.substring(0, value.length).indexOf('*') < 0) {
                        value = value.substring(0, value.length - 1);
                    }
                }

                // Caso o padrao esteja definido como null ira retornar o valor digitado!
            } else {
                let maskIndex = value.length;
                let formatted = '';
                formatted += value;
                if (maskIndex < pattern.length) {
                    //apply trailing formatting
                    while (pattern[maskIndex] !== '*') {
                        formatted += pattern[maskIndex];
                        maskIndex++;
                    }
                }
                value = formatted;
            }
        }
        event.target.value = value;
        if (this.model) {
            this.model.update.emit(value);
        }
        return true;
    }

}