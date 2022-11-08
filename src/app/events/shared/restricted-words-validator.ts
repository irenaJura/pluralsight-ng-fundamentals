import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function restrictedWords(words: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!words) return null;

        const invalidWords = words
            .map((w: string) => control.value.includes(w) ? w : null)
            .filter(w => w != null);

        return invalidWords && invalidWords.length > 0 ?
            { restrictedWords: invalidWords.join(', ') } : null;
    }
}