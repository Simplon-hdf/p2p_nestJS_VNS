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

    //#region 

    /**
     * Get All Lessons
     * @returns a LIST off Lessons OBJECTS who comes from DataBase
     */
    getAllLessons() {
        // return this.lessonRepository.find({ relations: ['chapters'] });
        return this.lessonRepository
            .createQueryBuilder("lesson")
            .leftJoinAndSelect("lesson.chapters", "chapter")
            .getMany();
    }

    /**
     * Get ONE Lesson by ID
     * @param lessonId (Lesson's Id to search who comes from Service)
     * @returns one Lesson OBJECT who comes from Database
     */
    getLessonByID(lessonId: number) {
        return this.lessonRepository.findOne({
            where: { id: lessonId },
            relations: ['chapters']
        });
    }

    /**
     * Get Lesson by name
     * @param searchedTitle (the piece of string to find and who comes from Service)
     * @returns a LIST of Lessons who comes from DataBase
     */
    async searchByName(searchedName: string){
        /* protected from SQL Injection */
        return await this.lessonRepository.findBy({
            title: ILike(`%${searchedName}%`) //ILike : case insensitive  
        });
    }
    //#endregion

    /**
     * Post a NEW Lesson
     * @param title (the title who comes from Service)
     * @param goal (the goal who comes from Service)
     * @param subject (the subject who comes from Service)
     * @param chaptersIds (the chapter's Ids list who comes from Service)
     * @returns the new Lesson OBJECT who comes from DataBase
     */
    async createLesson(title: string, goal: string, subject: string, chaptersIds: number[]) {
        let chapters = new Array();
        if(chaptersIds.length > 0){
            for (let currentId of chaptersIds) {
                const chapter = await this.chapterRepository.findOneBy({ id: currentId });
                if(chapter) chapters.push(chapter);
            }
        }

        const lesson = this.lessonRepository.create({ title, goal, subject, chapters });
        return this.lessonRepository.save(lesson);
    }

    /**
     * Update a Lesson by Id
     * @param lessonID (the Lesson Id who comes from Service)
     * @param title (the title who comes from Service)
     * @param goal (the goal who comes from Service)
     * @param subject (the subject who comes from Service)
     * @param chaptersIds (the chapter's Ids list who comes from Service)
     * @returns the new Lesson OBJECT who comes from DataBase
     */
    async updateLesson(
        lessonToUpdate: Lesson,
        title: string,
        goal: string,
        subject: string,
        isActive: boolean,
        chaptersIds: number[]
    ): Promise<Lesson> {
        lessonToUpdate.title = title;
        lessonToUpdate.goal = goal;
        lessonToUpdate.subject = subject;
        lessonToUpdate.isActive = isActive;

        let chapters = new Array();
        if(chaptersIds.length > 0){
            for (let currentId of chaptersIds) {
                const chapter = await this.chapterRepository.findOneBy({ id: currentId });
                if(chapter) chapters.push(chapter);
            }
        }

        lessonToUpdate.chapters = chapters;
        return this.lessonRepository.save(lessonToUpdate);
    }

    /**
     * Delete one Lesson By Id
     * @param lessonID (the Lesson's Id who comes from Service)
     */
    deleteLesson(lessonId: number) {
        this.lessonRepository.delete(lessonId);
    }
}