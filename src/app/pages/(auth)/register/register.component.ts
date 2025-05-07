import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SessionContext } from '@contexts/session.context';
import { ApiError } from '@exceptions/ApiError';
import { errorTailorImports } from '@ngneat/error-tailor';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { getApiError } from '@utils/get-error-api';
import { sleep } from '@utils/sleep';
import { fullNameValidator } from '@validators/fullName';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [ReactiveFormsModule, RouterLink, errorTailorImports],
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly authService = inject(AuthService)
  private readonly userRepository = inject(UserService);

  formGroup = this.formBuilder.group({
    name: this.formBuilder.control(null, [ Validators.required, fullNameValidator ]),
    email: this.formBuilder.control(null, [ Validators.required, Validators.email ]),
    password: this.formBuilder.control(null, [ Validators.required, Validators.minLength(6) ]),
    confirmPassword: this.formBuilder.control(null, [ Validators.required, Validators.minLength(6) ])
  });

  isSubmitting = signal(false)

  async handleSubmit () {
    if (this.formGroup.invalid) {
      this.toastrService.error('Preencha todos os campos')
      return
    }

    const {confirmPassword, email, name, password} = this.formGroup.value

    try {
      this.isSubmitting.update(() => true);
      if (!Object.is(password, confirmPassword)) {
        return;
      }

      await this.userRepository.createUser({ email, name, password });

      await sleep(1000);

      await this.authService.signin(email, password);

      await this.router.navigateByUrl('/itens')
    } catch (error) {
      let message = 'Houve um erro ao criar usuário';
      if (error instanceof ApiError) {
        message = getApiError(error.code);
      }
      this.toastrService.error(message);
    }

    this.isSubmitting.update(() => false);
  }
}
