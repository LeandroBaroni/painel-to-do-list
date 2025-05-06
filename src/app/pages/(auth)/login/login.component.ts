import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder)

  formGroup = this.formBuilder.group({
    email: this.formBuilder.control(null, [Validators.required, Validators.email]),
    password: this.formBuilder.control(null, [Validators.required]),
  })

  handleSubmit () {
    if (this.formGroup.invalid) {
      return
    }
  }
}
