import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PriorityEnum, PriorityTypeOptions } from '@enums/priority';
import { ApiError } from '@exceptions/ApiError';
import { ToDo } from '@models/to-do';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ToDoService } from '@services/to-do.service';
import { getApiError } from '@utils/get-error-api';
import { ToastrService } from 'ngx-toastr';
import { PriorityTextPipe } from 'src/app/shared/pipes/priority-text.pipe';

@Component({
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
  imports: [ReactiveFormsModule, errorTailorImports, PriorityTextPipe],
})
export class ListItemsComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly toDoService = inject(ToDoService);
  private readonly toastrService = inject(ToastrService);

  priorityOptions = PriorityTypeOptions

  formGroup = this.formBuilder.group({
    description: this.formBuilder.control<string>('', [ Validators.required ]),
    priority: this.formBuilder.control<PriorityEnum>(null, [ Validators.required ]),
  });

  items = signal<ToDo[]>([]);

  async ngOnInit () {
    const items = await this.toDoService.getAll();

    this.items.update(() => items);
  }

  private removeItem (id: string) {
    this.items.update((items) => {
      const index = items.findIndex(item => item.id === id)

      if (index === -1) {
        return items
      }

      items.splice(index, 1);

      return [ ...items ];
    })
  }

  async update (id: string) {
    try {
      const { description } = await this.toDoService.update(id);
      this.removeItem(id)
      this.toastrService.success(description);
    } catch (error) {
      let message = 'Houve um erro ao marcar item como completa';
      if (error instanceof ApiError) {
        message = getApiError(error.code);
      }
      this.toastrService.error(message)
    }
  }

  async delete (id: string) {
    try {
      const { description } = await this.toDoService.delete(id);
      this.removeItem(id)
      this.toastrService.success(description);
    } catch (error) {
      let message = 'Houve um erro ao deletar item';
      if (error instanceof ApiError) {
        message = getApiError(error.code);
      }
      this.toastrService.error(message)
    }
  }

  async handleSubmit () {
    if (this.formGroup.invalid) {
      this.toastrService.error('Preencha todos os campos!');
      return
    }

    const { description, priority } = this.formGroup.value;

    try {
      const { id, userId } = await this.toDoService.create({ description, priority });

      this.items.update((items) => {
        items.push({
          id,
          userId,
          priority,
          description,
          createdAt: new Date(),
          isCompleted: false,
          updatedAt: null
        });
        return items;
      });

      this.formGroup.reset();
    } catch (error) {
      let message = 'Houve um erro ao criar item';
      if (error instanceof ApiError) {
        message = getApiError(error.code);
      }
      this.toastrService.error(message)
    }
  }
}
