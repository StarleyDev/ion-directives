import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormChangeDetector {

    isDirty: boolean = false;

    private originalFormValues: any;

    private clearFormChangeDetection() {
        this.originalFormValues = null;
        this.isDirty = false;
    }

    prepareFormChangeDetection(documentForm: FormGroup) {
        this.clearFormChangeDetection();
        this.originalFormValues = { ...documentForm.getRawValue() };
        // Garante estado pristine inicial
        documentForm.markAsPristine();
        documentForm.markAsUntouched();
        this.isDirty = false;
        this.formChangeDetection(documentForm);

        return documentForm;
    }

    private formChangeDetection(documentForm: FormGroup): any {
        documentForm.valueChanges.subscribe(() => {
            if (!this.originalFormValues) {
                this.isDirty = false;
                return;
            }

            const currentValues = documentForm.getRawValue();
            let normalizedCurrent = { ...currentValues };
            let normalizedOriginal = { ...this.originalFormValues };
            this.isDirty = JSON.stringify(normalizedCurrent) !== JSON.stringify(normalizedOriginal);
        });
    }

}
