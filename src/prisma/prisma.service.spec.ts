import { Test } from '@nestjs/testing';

import { PrismaService } from './prisma.service';

import type { TestingModule } from '@nestjs/testing';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the $connect method', () => {
    expect(service.$connect).toBeDefined();
  });

  it('should have the $disconnect method', () => {
    expect(service.$disconnect).toBeDefined();
  });
});
