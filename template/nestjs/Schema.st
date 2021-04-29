import { prop, modelOptions } from '@typegoose/typegoose';
import { IsNumber, IsString } from 'class-validator';
import { hashSync } from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class <% name %>Schema {
  @IsString()
  @prop({ required: true })
  @ApiProperty({ description: '名称', example: 'name1' })
  name: string;

  @IsString()
  @prop()
  @ApiProperty({ description: '描述', example: '' })
  description: string;
}
