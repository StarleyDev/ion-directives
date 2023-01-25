import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PressHoldDirective } from './press-hold/press-hold.directive';
import { TapDirective } from './tap/tap.directive';
import { IonInputMaskDirective } from './input-mask/input-mask.directive';
import { CommonModule } from '@angular/common';

/**
 * Gerencia precionamento de enventos
 * @author Starley Cazorla
 */

@NgModule({
    declarations: [
        PressHoldDirective,
        TapDirective,
        IonInputMaskDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PressHoldDirective,
        TapDirective,
        IonInputMaskDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class DirectivesModule {
    static forRoot(): ModuleWithProviders<DirectivesModule> {
        return {
            ngModule: DirectivesModule,
            providers: []
        };
    }
 }
