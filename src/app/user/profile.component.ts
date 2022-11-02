import { OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service';
@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em { float: right; color: #E05C65; padding-left: 10px}
    .error input { background-color: #E3C3C5}
    .error ::placeholder { color: #999 }
  `]
})

export class ProfileComponent implements OnInit {
  firstName: any;
  lastName: any;
  profileForm: any;
  mouseoverSave = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {
    this.firstName = new FormControl(this.auth.currentUser?.user.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.auth.currentUser?.user.lastName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
    })
  }

  ngOnInit(): void {
    // this.firstName = new FormControl(this.auth.currentUser?.user.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    // this.lastName = new FormControl(this.auth.currentUser?.user.lastName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);

    // this.profileForm = new FormGroup({
    //   firstName: this.firstName,
    //   lastName: this.lastName,
    // })
  }

  saveProfile(formValues: any) {
    if (this.profileForm.valid) {
      this.auth.updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe(() => {
          this.toastr.success('Profile saved')
        });
    }
    this.router.navigate(['/events']);
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    })
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  validateFirstName() {
    return this.firstName.valid;
  }

  validateLastName() {
    return this.lastName.valid;
  }
}
