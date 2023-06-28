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

    //#region GET

    /**
     * Get ONE Training by ID
     * @param trainingId (Training's Id who comes from Service)
     * @returns one Training OBJECT who comes from BDD
     */
    getTrainingByID(trainingId: number) {
        return this.trainingRepository.findOne({
            where: {id: trainingId},
            relations: {tag: true, chapters:true}
        });
    }
    
    /**
     * Get All Trainings
     * @returns a LIST off Trainings OBJECTS who comes from DataBase
     */
    getAllTrainings() {
        return this.trainingRepository.find({relations: {tag: true, chapters:true}});
    }

    /**
     * Get Chapters by Trainind Id
     * @param trainingId (Training's Id who comes from Service and for find his Chapters)
     * @returns a LIST of Chapters OBJECT who comes from DataBase
     */
    async getLinkedChapters(training: Training) : Promise<Chapter[]> {
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

    /**
     * Get Trainings by name 
     * @param searchedTitle (the piece of string to find and who comes from Service)
     * @returns a LIST of Trainings who comes from DataBase
     */
    async searchByName(searchedName: string) {
        /* protected from SQL Injection */
        return await this.trainingRepository.findBy({
            title: ILike(`%${searchedName}%`) //ILike : case insensitive  
        });
    }
    //#endregion

    /**
     * Post a NEW Training
     * @param title (the title who comes from Service)
     * @returns the new Training OBJECT who comes from DataBase
     */
    createTraining(title: string) {
        const training = this.trainingRepository
        .create({title});
        return this.trainingRepository.save(training);
    }
    
    /**
     * Update one Training by Id
     * @param trainingID (the training's Id who comes from Service)
     * @param title (the title training who comes from Service)
     * @param isActive (the isActive training who comes from Service)
     * @param tagId (the tag's Id training who comes from Service)
     * @param chaptersId (the chapters's Ids who comes from Service)
     * @returns the updated Training OBJECT who comes from DataBase
     */
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
    
    /**
     * Delete one Training by Id
     * @param trainingID (the training's Id who comes from Service)
     */
    deleteTraining(trainingId: number) {
        this.trainingRepository.delete(trainingId);
    }
}