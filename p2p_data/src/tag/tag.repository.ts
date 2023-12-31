import { Injectable } from "@nestjs/common";
import { Tag } from "src/entities/tag.entity";
import { Training } from "src/entities/training.entity";
import { DataSource } from "typeorm";

// Creation of a custom repository.
@Injectable()
export class TagRepository {
    constructor(private dataSource: DataSource){}

    tagRepository = this.dataSource.getRepository(Tag);

    getTagByID(tagId: number){
        return this.tagRepository.findOne({
            where: {id: tagId}
        });
    }

    getAllTags(){
        return this.tagRepository.find();
    }

    createTag(name: string){
        const tag = this.tagRepository
        .create({name});
        return this.tagRepository.save(tag);
    }

    async updateTag(currentTag: Tag, name: string, isActive: boolean, trainings: Training[]): Promise<Tag> {
        currentTag.name = name;
        currentTag.isActive = isActive;
        currentTag.trainings = trainings;
        return this.tagRepository.save(currentTag);
    }

    deleteTag(tagId: number){
        this.tagRepository.delete(tagId);
    }
}