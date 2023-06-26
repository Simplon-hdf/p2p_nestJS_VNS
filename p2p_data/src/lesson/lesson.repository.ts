import { Injectable } from "@nestjs/common";
import { Lesson } from "src/entities/lesson.entity";
import { DataSource } from "typeorm";

// Creation of a custom repository.
@Injectable()
export class LessonRepository{
    constructor(private dataSource: DataSource){}

    lessonRepository = this.dataSource.getRepository(Lesson);

    getLessonByID(lessonId: number){
        return this.lessonRepository.findOneBy({
            id: lessonId
        });
    }
    
    getAllLessons(){
        return this.lessonRepository.find();
    }

    createLesson(title: string, goal: string, subject: string){
        const lesson = this.lessonRepository
        .create({title, goal, subject});
        return this.lessonRepository.save(lesson);
    }
    
    updateLesson(
        lessonToUpdate: Lesson,
        title: string, 
        goal: string,
        subject: string,
        isActive: boolean
    ): Promise<Lesson> {
        lessonToUpdate.title = title;
        lessonToUpdate.goal = goal;
        lessonToUpdate.subject = subject;
        lessonToUpdate.isActive = isActive;
        return this.lessonRepository.save(lessonToUpdate);
    }
    
    deleteLesson(lessonId: number){
        this.lessonRepository.delete(lessonId);
    }
}