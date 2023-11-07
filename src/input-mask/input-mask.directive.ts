import { ChangeDetectorRef, Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';

/**
 * Directive input mask
 * @author Starley Cazorla
 * @version 1.0.0
 */

@Directive({
    selector: '[appMask]',
    providers: [NgModel]
})
export class IonInputMaskDirective implements OnChanges {

    @Input('appMask') pattern: string;
    private rawValue: string = '';

    constructor(private elementRef: ElementRef, private renderer: Renderer2, private ngModel: NgModel, private cdRef: ChangeDetectorRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['pattern'] && !changes['pattern'].firstChange) {
            // Quando a máscara muda, limpe o valor e aplique a nova máscara
            this.rawValue = this.extractRawValue(this.ngModel.value); // Extraia o valor bruto antes de aplicar a nova máscara
            this.applyMask(); // Reaplique a máscara
            this.cdRef.detectChanges();
        }
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
        this.rawValue = this.extractRawValue(value); // Atualize o valor bruto com o novo valor de entrada
        this.applyMask(); // Reaplique a máscara
    }

    private applyMask() {
        // Aplique a máscara ao valor bruto
        const maskedValue = this.maskValue(this.rawValue, this.pattern);
        Promise.resolve().then(() => {
            // Atualizar o input e o modelo de controle com o valor mascarado
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', maskedValue);
            this.ngModel.control?.setValue(maskedValue, { emitEvent: false });
        });
    }

    private extractRawValue(value: string): string {
        return value.replace(/\D/g, ''); // Remove todos os caracteres não dígitos
    }

    private maskValue(rawValue: string, mask: string): string {
        let maskedValue = '';
        let rawValIndex = 0;
        for (let i = 0; i < mask.length && rawValIndex < rawValue.length; i++) {
            if (mask[i] === '*') {
                maskedValue += rawValue[rawValIndex++];
            } else {
                maskedValue += mask[i];
            }
        }
        return maskedValue;
    }
}
