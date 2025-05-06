import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fullNameValidator } from '@validators/fullName';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder)

  formGroup = this.formBuilder.group({
    name: this.formBuilder.control(null, [ Validators.required, fullNameValidator ]),
    email: this.formBuilder.control(null, [ Validators.required, Validators.email ]),
    password: this.formBuilder.control(null, [ Validators.required ]),
    confirmPassword: this.formBuilder.control(null, [ Validators.required ])
  });

  handleSubmit () {
    if (!this.formGroup.invalid) {
      return
    }

    const {confirmPassword, email, name, password} = this.formGroup.value

    if (!Object.is(password, confirmPassword)) {
      return;
    }

    console.log(email, name)
  }
}
