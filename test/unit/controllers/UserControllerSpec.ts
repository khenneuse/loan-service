import request from 'supertest';
import { app } from '../../../src/server';
import { UserDTO } from '../../../src/services/dtos';
import * as UserService from '../../../src/services/UserService';

describe('UserController routes', () => {
  describe('GET /users', () => {
    it('returns all users', async () => {
      const allUsers = [
        { id: 'id', name: 'user name' },
      ];
      const serviceMock = jest.spyOn(UserService, 'getAllUsers').mockResolvedValue(allUsers);
      const { body } = await request(app).get('/users');

      expect(body).toEqual(allUsers);
      expect(serviceMock).toHaveBeenCalledTimes(1);
    });

    it('returns [] if there are no users', async () => {
      const allUsers: UserDTO[] = [];
      const serviceMock = jest.spyOn(UserService, 'getAllUsers').mockResolvedValue(allUsers);
      const { body } = await request(app).get('/users');

      expect(body).toEqual(allUsers);
      expect(serviceMock).toHaveBeenCalledTimes(1);
    });
  });
});
