import { Injectable, NotFoundException } from "@nestjs/common";
import { Tag } from "src/entities/tag.entity";
import { Training } from "src/entities/training.entity";
import { DataSource, ILike, Like, Repository } from "typeorm"

// Creation of a custom repository.
@Injectable()
export class TrainingRepository{
    constructor(private dataSource: DataSource){}

    trainingRepository = this.dataSource.getRepository(Training);

    getTrainingByID(trainingId: number){
        return this.trainingRepository.findOne({
            where: {id: trainingId},
            relations: {tag: true}
        });
    }
    
    getAllTrainings(){
        return this.trainingRepository.find({relations: {tag: true}});
    }

    async searchByName(searchedName: string){
        /* One way to search: not protected from SQL injection */
        // return await this.trainingRepository
        //     .createQueryBuilder("training")
        //     .where("training.title like :search", {search: `%${searchedName}%`})
        //     .getMany()
        
        /* Another way to search, protected from SQL Injection */
        return await this.trainingRepository.findBy({
            title: ILike(`%${searchedName}%`) //ILike : case insensitive  
        });
    }

    createTraining(title: string){
        const training = this.trainingRepository
        .create({title});
        return this.trainingRepository.save(training);
    }
    
    updateTraining(trainingToUpdate: Training, title: string, isActive: boolean, tag: Tag): Promise<Training> {
        trainingToUpdate.title = title;
        trainingToUpdate.isActive = isActive;
        if(tag) trainingToUpdate.tag = tag;
        return this.trainingRepository.save(trainingToUpdate);
    }
    
    deleteTraining(trainingId: number){
        this.trainingRepository.delete(trainingId);
    }
}