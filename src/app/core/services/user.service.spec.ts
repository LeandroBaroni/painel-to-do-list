import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { CreateUser } from '@interfaces/create-user';
import { User } from '@models/user';

describe('UserService', () => {
  let service: UserService;
  let httpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClient = {
      post: jest.fn(),
      get: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    service = new UserService(httpClient);
  });

  it('should create a user', async () => {
    const mockResponse = { id: '123' };
    const payload: CreateUser = { name: 'Test', email: 'test@test.com', password: '123456' };

    httpClient.post.mockReturnValueOnce(of(mockResponse));
    const result = await service.createUser(payload);

    expect(result).toEqual(mockResponse);
    expect(httpClient.post).toHaveBeenCalledWith('/users/create', payload);
  });

  it('should get user by ID', async () => {
    const mockUser: User = { id: '123', name: 'Test', email: 'test@test.com' };

    httpClient.get.mockReturnValueOnce(of(mockUser));
    const result = await service.getById('123');

    expect(result).toEqual(mockUser);
    expect(httpClient.get).toHaveBeenCalledWith('/users/123');
  });

  it('should login a user', async () => {
    const mockUser: User = { id: '123', name: 'Test', email: 'test@test.com' };

    httpClient.get.mockReturnValueOnce(of(mockUser));
    const result = await service.login({ email: 'test@test.com', password: '123456' });

    expect(result).toEqual(mockUser);
    expect(httpClient.get).toHaveBeenCalledWith('/users/test@test.com/123456');
  });
});
