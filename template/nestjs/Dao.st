import { ApiProperty } from '@nestjs/swagger';

export class <% name %> {
  _id?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;
}
