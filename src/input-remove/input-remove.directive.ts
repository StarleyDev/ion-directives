import { Directive, Host, Input, Self } from '@angular/core';
import { NgModel } from "@angular/forms";

@Directive({
    selector: '[appRemoveFromInput]',
    host: {
        '(ionInput)': 'onIonInput($event)'
    }
})
export class IonInputRemoveDirective {
    @Input('appRemoveFromInput') pattern: string;

    constructor(@Host() @Self() public model: NgModel) { }

    /**
     * Determines whether ion input on
     * @author Starley Cazorla
     * @param event
     */
    onIonInput(event: any) {
        const input = event.target as HTMLInputElement;
        let value = input.value;

        if (this.pattern) {
            value = value.normalize('NFD').replace(this.getPattern(this.pattern), '');
            input.value = value;

            this.model.control.setValue(value, {
                emitEvent: true,
                emitModelToViewChange: true,
                emitViewToModelChange: true
            });
        }
    }

    /**
     * Gets pattern
     * @author Starley Cazorla
     * @param typePatter
     * @returns pattern - letter - number - special - punctuation
     */
    getPattern(typePatter: string): RegExp {
        if (typePatter === 'letter') return /[a-zA-Z]+/g;
        if (typePatter === 'number') return /[0-9]/g;
        if (typePatter === 'special') return /[^a-zA-Z0-9\s.,!?'"():;]/g;
        if (typePatter === 'punctuation') return /[.,!?'"():;_-]/g;
        return new RegExp(typePatter, 'g');
    }
}
