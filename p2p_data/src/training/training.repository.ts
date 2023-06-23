import { Injectable, NotFoundException } from "@nestjs/common";
import { Training } from "src/entities/training.entity";
import { DataSource, Repository } from "typeorm"

// Creation of a custom repository.
@Injectable()
export class TrainingRepository{
    constructor(private dataSource: DataSource){}

    trainingRepository = this.dataSource.getRepository(Training);

    getTrainingByID(trainingId: number){
        return this.trainingRepository.findOneBy({
            id: trainingId
        });
    }
    
    getAllTrainings(){
        return this.trainingRepository.find();
    }

    createTraining(title: string){
        const training = this.trainingRepository
        .create({title});
        return this.trainingRepository.save(training);
    }
    
    updateTraining(trainingToUpdate: Training, trainingId: number, title: string, isActive: boolean): Promise<Training> {
        trainingToUpdate.title = title;
        trainingToUpdate.isActive = isActive;
        return this.trainingRepository.save(trainingToUpdate);
    }
    
    deleteTraining(trainingId: number){
        this.trainingRepository.delete(trainingId);
    }
}