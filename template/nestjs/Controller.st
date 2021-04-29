import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { <% name %> } from '../dao<% prefix %><% lname %>.entity';
import { <% name %>Service } from '.<% prefix %><% lname %>.service';

@Controller('<% lname %>s')
@ApiTags('<% name %>')
export class <% name %>Controller {
  constructor(private readonly <% lname %>Service: <% name %>Service) {}

  @Post()
  async create<% name %>(@Req() req: Request, @Body() dto: <% name %>) {
    return this.<% lname %>Service.create<% name %>(dto);
  }

  @Get(':_id')
  async get<% name %>Detail(@Req() req: Request, @Param('_id') _id: string) {
    return this.<% lname %>Service.get<% name %>Detail(_id);
  }

  @Put(':_id')
  async update<% name %>(
    @Req() req: Request,
    @Param('_id') _id: string,
    @Body() dao: <% name %>,
  ) {
    return this.<% lname %>Service.update<% name %>(_id, dao);
  }

  @Delete(':_id')
  async delete<% name %>(@Req() req: Request, @Param('_id') _id: string) {
    return this.<% lname %>Service.delete<% name %>(_id);
  }

  @Get()
  @ApiQuery({
    name: 'keyword',
    type: String,
    required: false,
    description: '关键字',
  })
  @ApiQuery({
    name: 'pi',
    type: String,
    required: false,
    description: '第几页',
  })
  @ApiQuery({
    name: 'ps',
    type: String,
    required: false,
    description: '每页多少条',
  })
  async get<% name %>s(
    @Req() req: Request,
    @Query('keyword') keyword: string,
    @Query('pi') pi: number,
    @Query('ps') ps: number,
  ) {
    return this.<% lname %>Service.get<% name %>s(keyword, pi, ps);
  }
}
