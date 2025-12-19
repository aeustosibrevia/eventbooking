import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<Partial<Repository<User>>>;

  beforeEach(async () => {
    userRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const userData = { name: 'Andrii', email: 'andrii@example.com' };
    const entity = { ...userData } as User;
    const saved = { id: 1, ...userData } as User;

    (userRepository.create as jest.Mock).mockReturnValue(entity);
    (userRepository.save as jest.Mock).mockResolvedValue(saved);

    const created = await service.create(userData as any);

    expect(created).toMatchObject(userData);
    expect(created).toHaveProperty('id', 1);

    expect(userRepository.create).toHaveBeenCalledWith(userData);
    expect(userRepository.save).toHaveBeenCalledWith(entity);
  });

  it('should return all users', async () => {
    const users = [
      { id: 1, name: 'Andrii', email: 'andrii@example.com' },
    ] as User[];

    (userRepository.find as jest.Mock).mockResolvedValue(users);

    const result = await service.findAll();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      name: 'Andrii',
      email: 'andrii@example.com',
    });

    expect(userRepository.find).toHaveBeenCalled();
  });

  it('should return a user by id', async () => {
    const user = { id: 1, name: 'Andrii', email: 'andrii@example.com' } as User;

    (userRepository.findOneBy as jest.Mock).mockResolvedValue(user);

    const found = await service.findOne(1);

    expect(found).toEqual(user);
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should throw NotFoundException if user not found', async () => {
    (userRepository.findOneBy as jest.Mock).mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
  });
});
