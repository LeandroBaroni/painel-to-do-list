import { inject, Injectable } from '@angular/core';
import {
  Auth,
  confirmPasswordReset,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  verifyPasswordResetCode
} from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { UserService } from './user.service';

export class AuthError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  constructor(protected firestore: Firestore, private userService: UserService) {}

  /**
   * Asynchronously signs in using an email and password.
   *
   * @param email - The users email address.
   * @param password - The users password.
   */

  async signin(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const userId = userCredential.user.uid;
    await this.validateUserStatus(userId);
    return userCredential;
  }

  /**
   * Sends a password reset email to the given email address.
   *
   * @param email - The user's email address.
   */
  recoverPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  /**
   * Checks a password reset code sent to the user by email or other out-of-band mechanism.
   *
   * @returns the user's email address if valid.
   *
   * @param code - A verification code sent to the user.
   */
  verifyPasswordResetCode(actionCode: string) {
    return verifyPasswordResetCode(this.auth, actionCode);
  }

  /**
   * Completes the password reset process, given a confirmation code and new password.
   *
   * @param oobCode - A confirmation code sent to the user.
   * @param newPassword - The new password.
   */
  async resetPassword(oobCode: string, newPassword: string) {
    await confirmPasswordReset(this.auth, oobCode, newPassword);
  }

  private async validateUserStatus(userId: string): Promise<void> {
    const user = await this.userService.getById(userId);

    if (!user) {
      await this.auth.signOut();
      throw new AuthError('USER_NOT_FOUND', 'Usuário não encontrado');
    }
  }
}
