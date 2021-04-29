import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { PAGINATION } from '../constant';
import { <% name %>Schema } from '../db/schema<% prefix %><% lname %>.schema';
import { <% name %> } from '../dao<% prefix %><% lname %>.entity';

@Injectable()
export class <% name %>Service {
  constructor(
    @InjectModel(<% name %>Schema)
    private readonly <% lname %>Model: ReturnModelType<
      typeof <% name %>Schema
    >,
  ) {}

  async create<% name %>(dao: <% name %>): Promise<<% name %>> {
    return await this.<% lname %>Model.create(dao);
  }

  async get<% name %>Detail(_id: string) {
    return await this.<% lname %>Model.findById(_id);
  }

  async update<% name %>(_id: string, dao: <% name %>) {
    await this.<% lname %>Model.findByIdAndUpdate(_id, dao);
    return await this.<% lname %>Model.findById(_id);
  }

  async delete<% name %>(_id: string) {
    await this.<% lname %>Model.findByIdAndDelete(_id);
    return true;
  }

  async get<% name %>s(keyword, pi, ps) {
    const findOptions = {};
    let regexp = '';
    const pageIndex = parseInt(pi || 0);
    const pageSize = parseInt(ps || PAGINATION.SIZE);

    if (keyword) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      regexp = new RegExp(keyword, 'i');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      findOptions.$and = [{ <% lname %>name: { $regex: regexp } }];
    }

    const total = await this.<% lname %>Model
      .find(findOptions)
      .skip(pageIndex * pageSize)
      .limit(pageSize)
      .count();

    const <% lname %>s = await this.<% lname %>Model
      .find(findOptions)
      .skip(pageIndex * pageSize)
      .limit(pageSize)
      .sort({ _id: -1 });
    return {
      page: pageIndex,
      total: total,
      data: <% lname %>s,
    };
  }
}
