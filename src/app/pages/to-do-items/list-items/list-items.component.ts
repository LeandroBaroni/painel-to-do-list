import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToDo } from '@models/to-do';

@Component({
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
  imports: [ReactiveFormsModule],
})
export class ListItemsComponent {
  private readonly formBuilder = inject(FormBuilder);

  formGroup = this.formBuilder.group({
    description: this.formBuilder.control<string>('', [Validators.required]),
    priority: this.formBuilder.control<string>('', [Validators.required]),
  });

  items = signal<ToDo[]>([]);

  removeItem (id: number) {
    this.items.update((items) => {
      const index = items.findIndex(item => item.id === id)

      if (index === -1) {
        return items
      }

      items.splice(index, 1);

      return [ ...items ];
    })
  }

  handleSubmit () {
    if (this.formGroup.invalid) {
      return
    }

    const { description, priority } = this.formGroup.value

    this.items.update((items) => {
      items.push({
        description,
        priority,
        userId: 1,
        id: 1,
        createdAt: new Date(),
        isCompleted: false,
        updatedAt: null
      });
      return items
    })
  }
}
