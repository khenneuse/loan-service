/* eslint-disable @typescript-eslint/no-use-before-define */
import { getRepository } from 'typeorm';
import { inspect } from 'util';
import { v4 as uuidV4 } from 'uuid';
import { User as UserEntity } from '../entities/User';
import { UserDTO } from './dtos';

export async function createUser(name: string, id = uuidV4()): Promise<UserDTO> {
  const result = await getRepository(UserEntity).save({ id, name });
  console.log(`User created ${inspect(result)}`);
  return convertToUserDTO(result);
}

export async function getAllUsers(): Promise<UserDTO[]> {
  const entities = await getRepository(UserEntity).find();
  return entities.map(convertToUserDTO);
}

export async function getUser(id:string): Promise<UserDTO | null> {
  const entity = await getRepository(UserEntity).findOne(id);
  return entity ? convertToUserDTO(entity) : null;
}

function convertToUserDTO(entity: UserEntity): UserDTO {
  return {
    id: entity.id,
    name: entity.name,
  };
}
