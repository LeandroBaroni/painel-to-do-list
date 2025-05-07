import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiError } from '@exceptions/ApiError';
import { errorTailorImports } from '@ngneat/error-tailor';
import { AuthService } from '@services/auth.service';
import { getApiError } from '@utils/get-error-api';
import { sleep } from '@utils/sleep';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, RouterLink, errorTailorImports],
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);

  isSubmitting = signal(false)

  formGroup = this.formBuilder.group({
    email: this.formBuilder.control(null, [Validators.required, Validators.email]),
    password: this.formBuilder.control(null, [Validators.required, Validators.min(6)]),
  })

  async handleSubmit () {
    if (this.formGroup.invalid) {
      this.toastrService.error('Preencha todos os campos')
      return;
    }

    const { email, password } = this.formGroup.value;
    try {
      this.isSubmitting.update(() => true);
      await this.authService.signin(email, password);

      await sleep(1000);

      await this.router.navigateByUrl('/itens')
    } catch (error) {
      let message = 'Houve um erro ao logar';
      if (error instanceof ApiError) {
        message = getApiError(error.code);
      }
      this.toastrService.error(message)
    }

    this.isSubmitting.update(() => false);
  }
}
