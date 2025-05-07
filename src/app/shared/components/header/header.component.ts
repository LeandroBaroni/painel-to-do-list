import { Component, inject, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { SessionContext } from '@contexts/session.context';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private readonly sessionContext = inject(SessionContext)

  user: User;

  async ngOnInit () {
    const user = await this.sessionContext.getFirebaseUser()
    this.user = user
  }

  async logout () {
    await this.sessionContext.logout()
    await this.router.navigateByUrl('/login')
  }
}
