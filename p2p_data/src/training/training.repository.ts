import { Injectable } from "@nestjs/common";
import { Chapter } from "src/entities/chapter.entity";
import { Tag } from "src/entities/tag.entity";
import { Training } from "src/entities/training.entity";
import { DataSource, ILike } from "typeorm"

// Creation of a custom repository.
@Injectable()
export class TrainingRepository{
    constructor(private dataSource: DataSource) { }

    trainingRepository = this.dataSource.getRepository(Training);

    //#region Get Methods
    getTrainingByID(trainingId: number) {
        return this.trainingRepository.findOne({
            where: {id: trainingId},
            relations: {tag: true, chapters:true}
        });
    }
    
    getAllTrainings() {
        return this.trainingRepository.find({relations: {tag: true, chapters:true}});
    }

    /** Get all the chapters linked to a given training. */
    async getTrainingLinkedChapters(training: Training) : Promise<Chapter[]> {
        const result = await this.trainingRepository
            .createQueryBuilder("training")
            .leftJoinAndSelect("training.chapters", "chapter")
            .where("training.id = :id", {id: training.id})
            .getMany();

        //We should only get one Training but we receive an array from the query.
        var chapters: Chapter[] = [];
        for (var trainingElt of result) { 
            if (trainingElt.chapters.length > 0 ) {
                for(var chapter of trainingElt.chapters){
                    chapters.push(chapter);
                }
            }
        }

        return chapters;
    }
    //#endregion

    async searchByName(searchedName: string) {
        /* protected from SQL Injection */
        return await this.trainingRepository.findBy({
            title: ILike(`%${searchedName}%`) //ILike : case insensitive  
        });
    }

    createTraining(title: string) {
        const training = this.trainingRepository
        .create({title});
        return this.trainingRepository.save(training);
    }
    
    updateTraining(
        trainingToUpdate: Training, 
        title: string, 
        isActive: boolean, 
        tag: Tag, 
        chapters: Chapter[]
    ): Promise<Training> {
        trainingToUpdate.title = title;
        trainingToUpdate.isActive = isActive;
        if(tag) trainingToUpdate.tag = tag;
        if(chapters.length > 0) trainingToUpdate.chapters = chapters;
        return this.trainingRepository.save(trainingToUpdate);
    }
    
    deleteTraining(trainingId: number) {
        this.trainingRepository.delete(trainingId);
    }
}