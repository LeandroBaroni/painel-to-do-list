import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemsComponent } from './list-items.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToDoService } from '@services/to-do.service';
import { ToastrService } from 'ngx-toastr';
import { PriorityTextPipe } from 'src/app/shared/pipes/priority-text.pipe';
import { PriorityEnum } from '@enums/priority';
import { ToDo } from '@models/to-do';

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;
  let mockToDoService: jest.Mocked<ToDoService>;
  let mockToastrService: jest.Mocked<ToastrService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PriorityTextPipe],
      declarations: [ListItemsComponent],
      providers: [
        FormBuilder,
        { provide: ToDoService, useValue: mockToDoService },
        { provide: ToastrService, useValue: mockToastrService },
      ],
    });

    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load all items on initialization', async () => {
      const mockItems: ToDo[] = [
        { id: '1', description: 'Test Item 1', priority: PriorityEnum.HIGH, isCompleted: false, userId: "abcdef" },
      ];

      mockToDoService.getAll.mockResolvedValue(mockItems);
      await component.ngOnInit();
      expect(component.items()).toEqual(mockItems);
    });
  });

  describe('handleSubmit', () => {
    it('should display an error message if the form is invalid', async () => {
      component.formGroup.controls['description'].setValue('');
      component.formGroup.controls['priority'].setValue(null);

      await component.handleSubmit();

      expect(mockToastrService.error).toHaveBeenCalledWith('Preencha todos os campos!');
    });

    it('should add a new item successfully', async () => {
      const mockItem = {
        id: '123',
        description: 'New Task',
        priority: PriorityEnum.HIGH,
        userId: '456',
      };
      component.formGroup.controls['description'].setValue('New Task');
      component.formGroup.controls['priority'].setValue(PriorityEnum.HIGH);

      mockToDoService.create.mockResolvedValue(mockItem);
      await component.handleSubmit();

      expect(mockToDoService.create).toHaveBeenCalledWith({
        description: 'New Task',
        priority: PriorityEnum.HIGH,
      });

      expect(component.items().length).toBe(1);
      expect(component.items()[0].description).toBe('New Task');
      expect(component.formGroup.value).toEqual({ description: '', priority: null });
    });

    it('should show error when creating a new item fails', async () => {
      const mockError = new Error('Failed to create');
      mockToDoService.create.mockRejectedValue(mockError);

      component.formGroup.controls['description'].setValue('New Task');
      component.formGroup.controls['priority'].setValue(PriorityEnum.HIGH);

      await component.handleSubmit();

      expect(mockToastrService.error).toHaveBeenCalledWith('Houve um erro ao criar item');
    });
  });

  describe('update', () => {
    it('should update the item and remove it from the list', async () => {
      const mockItem: ToDo = { id: '123', description: 'Test Item', priority: PriorityEnum.HIGH, userId: 'abc123', isCompleted: false };
      mockToDoService.update.mockResolvedValue(mockItem);

      component.items.update(() => [mockItem]);
      await component.update(mockItem.id);

      expect(mockToDoService.update).toHaveBeenCalledWith(mockItem.id);
      expect(component.items().length).toBe(0);
      expect(mockToastrService.success).toHaveBeenCalledWith(mockItem.description);
    });

    it('should show an error message when updating fails', async () => {
      const mockError = new Error('Update failed');
      mockToDoService.update.mockRejectedValue(mockError);

      await component.update('123');

      expect(mockToastrService.error).toHaveBeenCalledWith('Houve um erro ao marcar item como completa');
    });
  });

  describe('delete', () => {
    it('should delete the item and remove it from the list', async () => {
      const mockItem: ToDo = { id: '123', description: 'Test Item', priority: PriorityEnum.HIGH, userId: 'abc123', isCompleted: false };
      mockToDoService.delete.mockResolvedValue(mockItem);

      component.items.update(() => [mockItem]);
      await component.delete(mockItem.id);

      expect(mockToDoService.delete).toHaveBeenCalledWith(mockItem.id);
      expect(component.items().length).toBe(0);
      expect(mockToastrService.success).toHaveBeenCalledWith(mockItem.description);
    });

    it('should show an error message when deletion fails', async () => {
      const mockError = new Error('Delete failed');
      mockToDoService.delete.mockRejectedValue(mockError);

      await component.delete('123');

      expect(mockToastrService.error).toHaveBeenCalledWith('Houve um erro ao deletar item');
    });
  });
});
