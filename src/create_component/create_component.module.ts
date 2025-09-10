import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { componentService } from './create_component.service';
import { CreateComponentController } from './create_component.controller';
import { Component } from './create_component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Component])],
  providers: [componentService],
  controllers: [CreateComponentController],
})
export class CreateComponentModule {}
