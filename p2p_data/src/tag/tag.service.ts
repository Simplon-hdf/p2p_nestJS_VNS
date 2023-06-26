import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { Tag } from 'src/entities/tag.entity';

@Injectable()
export class TagService {
    constructor(
        @Inject(TagRepository)
        private readonly tagRepository: TagRepository,
    ) {}

    async getAllTags(): Promise<Tag[]> {
        const tags = await this.tagRepository.getAllTags();
        return [ ... tags ]; //Unpack tags to not send a reference (to avoid modifying the original array)
        }

    async getTagById(tagId: number): Promise<Tag> {
        const tag = await this.tagRepository.getTagByID(tagId);
        if(!tag){
            throw new NotFoundException('Tag not found');
        }
        return { ... tag };
    }

    async createTag(name: string): Promise<Tag> {
        const tag = await this.tagRepository.createTag(name);
        return { ... tag }; // Unpack elements and create a new object to avoid sending references.
    }

    async updateTag(tagId: number, name: string, isActive: boolean): Promise<Tag> {
        if(await this.tagRepository.getTagByID(tagId)){
            const tag = await this.tagRepository.updateTag(tagId, name, isActive);
            return { ... tag };
        }
    }

    async deleteTag(tagId: number): Promise<string> {
        if(await this.tagRepository.getTagByID(tagId)){
            this.tagRepository.deleteTag(tagId);
            return "Tag deleted";
        }
    }     
}
