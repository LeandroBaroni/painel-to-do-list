import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateUser } from "@interfaces/create-user";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient){}

  createUser (data: CreateUser): Promise<{ id: string }> {
    const url = '';
    return lastValueFrom(this.httpClient.post<{id: string}>(`${url}/api/users/`, data));
  }
}
