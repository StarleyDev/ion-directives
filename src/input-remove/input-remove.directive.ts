import { Directive, Input } from '@angular/core';
import { NgModel } from "@angular/forms";

/**
 * Remove any text from input
 * @author Starley Cazorla
 */

@Directive({
    selector: '[appRemoveFromInput]',
    host: {
        '(keydown)': 'onKeyDown($event)'
    },
    providers: [NgModel]
})
export class IonInputRemoveDirective {

    @Input('appRemoveFromInput') pattern: string;

    /**
     * Construtor
     * @param {NgModel} model
     * @param {string} pattern
     */
    constructor(public model: NgModel) {
    }

    /**
     * Determines whether key down on
     * @author Starley Cazorla
     * @param event
     * @returns
     */
    onKeyDown(event: any) {
        let value: any = event.target.value;

        if (this.pattern && this.pattern !== undefined && this.pattern !== null && this.pattern !== '') {
            value = value.normalize('NFD').replace(this.getPattern(this.pattern), '');
        }

        event.target.value = value;
        if (this.model) {
            this.model.update.emit(value);
        }
        return true;
    }

    /**
     * Gets pattern to remove or set the text to remove
     * @author Starley Cazorla
     * @param typePatter - letter - number - special - punctuation
     * @returns
     */
    getPattern(typePatter: string) {
        if (typePatter === 'letter') return /[a-zA-Z]+/g;
        if (typePatter === 'number') return /[0-9]/;
        if (typePatter === 'special') return /[^a-zA-Z0-9\s.,!?'"():;]/g;
        if (typePatter === 'punctuation') return /[.,!?'"():;_-]/g;
        return typePatter;
    }

}
