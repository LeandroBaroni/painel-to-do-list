import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { fullNameValidator } from '@validators/fullName';

@Component({
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [ReactiveFormsModule, RouterLink],
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder)

  formGroup = this.formBuilder.group({
    name: this.formBuilder.control(null, [ Validators.required, fullNameValidator ]),
    email: this.formBuilder.control(null, [ Validators.required, Validators.email ]),
    password: this.formBuilder.control(null, [ Validators.required, Validators.minLength(6) ]),
    confirmPassword: this.formBuilder.control(null, [ Validators.required, Validators.minLength(6) ])
  });

  handleSubmit () {
    if (this.formGroup.invalid) {
      return
    }

    const {confirmPassword, email, name, password} = this.formGroup.value

    if (!Object.is(password, confirmPassword)) {
      return;
    }

    console.log(email, name)
  }
}
