import { ToDoService } from './to-do.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { PriorityEnum } from '@enums/priority';
import { ToDo } from '@models/to-do';

describe('ToDoService', () => {
  let service: ToDoService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      post: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
      put: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    service = new ToDoService(httpClientMock);
  });

  it('should create a to-do', async () => {
    const mockResponse = { id: '1', userId: 'user-1' };
    const body = { description: 'Test task', priority: PriorityEnum.HIGH };

    httpClientMock.post.mockReturnValueOnce(of(mockResponse));
    const result = await service.create(body);

    expect(result).toEqual(mockResponse);
    expect(httpClientMock.post).toHaveBeenCalledWith('/to-do', body);
  });

  it('should return all to-dos', async () => {
    const mockToDos: ToDo[] = [
      { id: '1', userId: 'user-1', description: 'Task 1', priority: PriorityEnum.MEDIUM, isCompleted: false },
      { id: '2', userId: 'user-1', description: 'Task 2', priority: PriorityEnum.HIGH, isCompleted: false },
    ];

    httpClientMock.get.mockReturnValueOnce(of(mockToDos));
    const result = await service.getAll();

    expect(result).toEqual(mockToDos);
    expect(httpClientMock.get).toHaveBeenCalledWith('/to-do');
  });

  it('should delete a to-do by ID', async () => {
    const id = '123';
    const mockResponse = { description: 'Task deleted' };

    httpClientMock.delete.mockReturnValueOnce(of(mockResponse));
    const result = await service.delete(id);

    expect(result).toEqual(mockResponse);
    expect(httpClientMock.delete).toHaveBeenCalledWith(`/to-do/${id}`);
  });

  it('should update a to-do by ID', async () => {
    const id = '123';
    const mockResponse = { description: 'Task updated' };

    httpClientMock.put.mockReturnValueOnce(of(mockResponse));
    const result = await service.update(id);

    expect(result).toEqual(mockResponse);
    expect(httpClientMock.put).toHaveBeenCalledWith('/to-do', { id });
  });
});
