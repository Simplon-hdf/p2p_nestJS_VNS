import { Injectable } from "@nestjs/common";
import { Lesson } from "src/entities/lesson.entity";
import { DataSource, ILike } from "typeorm";
import { Chapter } from "src/entities/chapter.entity";

// Creation of a custom repository.
@Injectable()
export class LessonRepository {
    constructor(private dataSource: DataSource) { }

    lessonRepository = this.dataSource.getRepository(Lesson);
    chapterRepository = this.dataSource.getRepository(Chapter);


    getLessonByID(lessonId: number) {
        return this.lessonRepository.findOne({
            where: { id: lessonId },
            relations: ['chapters']
        });
    }

    getAllLessons() {
        // return this.lessonRepository.find({ relations: ['chapters'] });
        return this.lessonRepository
            .createQueryBuilder("lesson")
            .leftJoinAndSelect("lesson.chapters", "chapter")
            .getMany();

    }

    async searchByName(searchedName: string){
        /* protected from SQL Injection */
        return await this.lessonRepository.findBy({
            title: ILike(`%${searchedName}%`) //ILike : case insensitive  
        });
    }

    createLesson(title: string, goal: string, subject: string, chaptersIds: number[]) {
        const lesson = this.lessonRepository.create({ title, goal, subject });
        let newArray = [];

        for (let currentId of chaptersIds) {
            const chapter = this.chapterRepository.findOneBy({ id: currentId });
            newArray.push(chapter);
        }

        lesson.chapters = newArray; 
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

    deleteLesson(lessonId: number) {
        this.lessonRepository.delete(lessonId);
    }
}