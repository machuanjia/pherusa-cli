import { Module } from '@nestjs/common';
import { <% name %>Controller } from '.<% prefix %><% lname %>.controller';
import { <% name %>Service } from '.<% prefix %><% lname %>.service';

@Module({
  controllers: [<% name %>Controller],
  providers: [<% name %>Service],
})
export class <% name %>Module {}
