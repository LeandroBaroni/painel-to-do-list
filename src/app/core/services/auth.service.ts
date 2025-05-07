import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
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

  private async validateUserStatus(userId: string): Promise<void> {
    const user = await this.userService.getById(userId);

    if (!user) {
      await this.auth.signOut();
      throw new AuthError('USER_NOT_FOUND', 'Usuário não encontrado');
    }
  }
}
