import { Injectable, NotFoundException } from "@nestjs/common";
import { Tag } from "src/entities/tag.entity";
import { Training } from "src/entities/training.entity";
import { DataSource, Repository } from "typeorm"

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