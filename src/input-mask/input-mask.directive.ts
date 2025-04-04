import { ChangeDetectorRef, Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';

/**
 * Directive input mask
 * @author Starley Cazorla
 * @version 3.0.0
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
            this.pattern = changes['pattern'].currentValue;
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

    /**
     * Applys mask
     * @author Starley Cazorla
     */
    private applyMask() {
        if (!this.pattern) {
            return;
        }

        // Aplique a máscara ao valor bruto
        const maskedValue = this.maskValue(this.rawValue, this.pattern);
        Promise.resolve().then(() => {
            // Atualizar o input e o modelo de controle com o valor mascarado
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', maskedValue);
            this.ngModel.control?.setValue(maskedValue, { emitEvent: false });
        });
    }

    private extractRawValue(value: string): string {
        return value.replace(/[^a-zA-Z0-9]/g, ''); // Remove todos os caracteres não são letras e digitos
    }

    /**
     * Masks value
     * @author Starley Cazorla
     * @param rawValue
     * @param mask
     * @returns value
     */
    private maskValue(rawValue: string, mask: string): string {

        // Se a máscara não tiver um padrão, não faca nada
        if (!mask || mask === undefined || mask === null || mask === '') {
            return rawValue;
        }

        let maskedValue = '';
        let rawValIndex = 0;
        let i = 0;

        while (rawValIndex < rawValue.length) {
            if (mask[i] === '*') {
                maskedValue += rawValue[rawValIndex++];
            } else {
                maskedValue += mask[i] ? mask[i] : '';
            }
            i = (i + 1) % mask.length; // Volta ao início da máscara se necessário
        }

        return maskedValue;
    }

}
