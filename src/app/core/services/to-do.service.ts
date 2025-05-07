import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PriorityEnum } from '@enums/priority';
import { ToDo } from "@models/to-do";
import { lastValueFrom } from "rxjs";

interface CreateParams {
  description: string;
  priority: PriorityEnum
}

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  constructor (private httpClient: HttpClient) { }

  create (body: CreateParams): Promise<{ id: string; userId: string }> {
    return lastValueFrom(this.httpClient.post<{ id: string; userId: string }>('/to-do', body));
  }

  getAll (): Promise<ToDo[]> {
    return lastValueFrom(this.httpClient.get<ToDo[]>('/to-do'));
  }

  delete (id: string): Promise<{ description: string; }> {
    return lastValueFrom(this.httpClient.delete<{ description: string; }>(`/to-do/${id}`));
  }

  update (id: string): Promise<{ description: string; }> {
   return lastValueFrom(this.httpClient.put<{ description: string; }>('/to-do', { id }));
  }
}
