import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from './tag.repository';

@Module({
  providers: [TagService, TagRepository],
  controllers: [TagController]
})
export class TagModule {}
