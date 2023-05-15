import { ApiProperty } from '@nestjs/swagger';

export class ExportProjectDTO {
  @ApiProperty({
    name: 'exerciseId',
    required: false,
  })
  exerciseId: number;

  @ApiProperty({
    name: 'projectId',
    required: true,
  })
  projectId: number;
}
