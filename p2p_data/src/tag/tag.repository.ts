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
            where: {id: tagId},
            relations: {trainings: true}
        });
    }

    getAllTags(){
        return this.tagRepository.find({
            relations: {trainings: true}
        });
    }

    createTag(name: string){
        const tag = this.tagRepository
        .create({name});
        return this.tagRepository.save(tag);
    }

    async updateTag(tagId: number, name: string, isActive: boolean, trainings: Training[]): Promise<Tag> {
        const tag = await this.tagRepository.findOneBy({id: tagId});
        tag.name = name;
        tag.isActive = isActive;
        tag.trainings = trainings;
        return this.tagRepository.save(tag);
    }

    deleteTag(tagId: number){
        this.tagRepository.delete(tagId);
    }
}