import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateUser } from "@interfaces/create-user";
import { User } from "@models/user";
import { lastValueFrom } from "rxjs";

interface LoginParams {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient){}

  createUser (data: CreateUser): Promise<{ id: string }> {
    return lastValueFrom(this.httpClient.post<{ id: string; }>('/users/create', data));
  }

  getById (id: string): Promise<User>{
    return lastValueFrom(this.httpClient.get<User>(`/users/${id}`));
  }

  login ({ email, password }: LoginParams) {
    return lastValueFrom(this.httpClient.get<User>(`/users/${email}/${password}`));
  }
}
