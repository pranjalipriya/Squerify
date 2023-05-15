import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Query } from '@nestjs/common/decorators';
import { ExportProjectDTO } from '../columnConstraints/dto/export-project.dto';
import * as jwt from 'jsonwebtoken';
@ApiTags('Projects')
@ApiBearerAuth('JWT-auth')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  //CREATE PROJECT WITH CREATE PROJECT REQUEST OBJECT
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: Request
  ) {
    try {
      const token = req.headers.authorization;
      const slicedToken = token.split(' ').slice(1).join('');
      const payload = jwt.decode(slicedToken);
      return await this.projectsService.createProject(
        createProjectDto,
        +payload['userid'],
      );
    } catch (e) {
      throw e;
    }
  }

  //GET ALL PROJECTS AND EXERCISES
  @Get('/projectsExercises/globalData')
  async findProjectsExercises(@Req() req: Request) {
    try {
      const token = req.headers.authorization;
      const slicedToken = token.split(' ').slice(1).join('');
      const payload = jwt.decode(slicedToken);
      return await this.projectsService.findProjectAndExercises(payload['userid']);
    } catch (e) {
      throw e;
    }
  }

  //EXPORTING PROJECT/INDEPENDENT EXERCISE TO GENERATE QUERIES AND SEND IT AS RESPONSE
  @Get('/exportProject')
  async export(
    @Query() query: ExportProjectDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const token = req.headers.authorization;
      const slicedToken = token.split(' ').slice(1).join('');
      const payload = jwt.decode(slicedToken);
      const queries = await this.projectsService.exportProject(
        +query.projectId,
        payload['userid'],
        +query.exerciseId
      );
      //DOWNLOAD ROUTE TO BE USED LATER
      //   const file = `${queries.entityName}.sql`;
      //  writeFileSync(file , queries.query.join(';\n').toString())
      //  const files = createReadStream(join(process.cwd(), file));
      //  res.set({
      //   'Content-Type': 'application/json',
      //   'Content-Disposition': 'attachment; filename=demo.json',
      // });
      // return new StreamableFile(files);
      // // return res.download("" + file);
      res.send(queries.query);
    } catch (e) {
      throw e;
    }
  }

  //GET ALL PROJECTS BELONGING TO A USER
  @Get('/user/:id')
  async find(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectsService.findProjectsByUserId(id);
    } catch (e) {
      throw e;
    }
  }

  //UPDATE PROJECT WITH ID OF THE PROJECT AND UPDATED PROJECT REQUEST OBJECT
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: Request
  ) {
    try {
      const token = req.headers.authorization;
      const slicedToken = token.split(' ').slice(1).join('');
      const payload = jwt.decode(slicedToken);
      const username=payload['username']
      return await this.projectsService.updateProjects(id, updateProjectDto,username);
    } catch (e) {
      throw e;
    }
  }

  //DELETE A PROJECT WITH THE PROJECT ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectsService.removeOne(id);
    } catch (e) {
      throw e;
    }
  }
}
