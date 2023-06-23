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
    
    //   async updateTraining(trainingId: number): Promise<Training> {

    //   }
    
    deleteTraining(trainingId: number){
    
    }
}