import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonInputMaskDirective } from './input-mask/input-mask.directive';
import { IonInputRemoveDirective } from './input-remove/input-remove.directive';
import { PressHoldDirective } from './press-hold/press-hold.directive';
import { TapDirective } from './tap/tap.directive';

/**
 * Gerencia precionamento de enventos
 * @author Starley Cazorla
 */

@NgModule({
    declarations: [
        PressHoldDirective,
        TapDirective,
        IonInputMaskDirective,
        IonInputRemoveDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PressHoldDirective,
        TapDirective,
        IonInputMaskDirective,
        IonInputRemoveDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class DirectivesModule {
    static forRoot(): ModuleWithProviders<DirectivesModule> {
        return {
            ngModule: DirectivesModule,
            providers: [],
        };
    }
}
