import { Test, TestingModule } from '@nestjs/testing';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';

// describe('TablesController', () => {
//   let controller: TablesController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [TablesController],
//       providers: [TablesService],
//     }).compile();

//     controller = module.get<TablesController>(TablesController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });


// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';

// describe('UsersController', () => {
//   let controller: UsersController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [UsersService],
//     }).compile();

//     controller = module.get<UsersController>(UsersController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });


// import { Test, TestingModule } from '@nestjs/testing';
// import { User } from '../users/entities/user.entity';
// import { UsersService } from '../users/users.service';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';

describe('TablesServices', () => {
  let service: TablesService;

  const mockAuthService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablesController],
      providers: [TablesService]
    }).overrideProvider(TablesService).useValue(mockAuthService).compile();

    const controller = module.get<TablesController>(TablesController);
    // service = module.get<AuthService>(AuthService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
