import { FormControl } from "@angular/forms";

export function restrictedWords(words: string[]) {
    return (control: FormControl): { [key: string]: any } | null => {
        if (!words) return null;

        let invalidWords = words
            .map((w: string) => control.value.includes(w) ? w : null)
            .filter(w => w != null);

        return invalidWords && invalidWords.length > 0 ?
            { 'restrictedWords': invalidWords.join(', ') } :
            null;
    }
}