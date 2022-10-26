import { ISession, restrictedWords } from './../shared/index';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from "@angular/core";


@Component({
    templateUrl: './create-session.component.html',
    styles: [`
    em { float: right; color: #E05C65; padding-left: 10px}
    .error input, .error select, .error textarea { background-color: #E3C3C5}
    .error ::placeholder { color: #999 }
  `]
})
export class CreateSessionComponent implements OnInit {
    newSessionForm: any;
    name: any;
    presenter: any;
    duration: any;
    level: any;
    abstract: any;
    ngOnInit(): void {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])])

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }

    saveSession(formValues: any) {
        let session: ISession = {
            id: 0,
            name: formValues.name,
            duration: +formValues.duration,
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            voters: []
        }
        console.log(session)
    }
}