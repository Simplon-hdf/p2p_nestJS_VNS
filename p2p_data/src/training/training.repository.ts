import { Injectable, NotFoundException } from "@nestjs/common";
import { Training } from "src/entities/training.entity";
import { DataSource } from "typeorm"

// Creation of a custom repository.
@Injectable()
export class TrainingRepository{
    constructor(private dataSource: DataSource){}

    trainingRepository = this.dataSource.getRepository(Training);

    getTrainingByID(trainingId: number){

      }
    
      getAllTrainings(){
        
      }
    
      createTraining(){

      }
    
    //   async updateTraining(trainingId: number): Promise<Training> {

    //   }
    
      deleteTraining(trainingId: number){
        
      }
}