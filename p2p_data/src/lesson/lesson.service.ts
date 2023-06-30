import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LessonRepository } from './lesson.repository';
import { Lesson } from 'src/entities/lesson.entity';

@Injectable()
export class LessonService {
    constructor(
        @Inject(LessonRepository)
        private readonly lessonRepository: LessonRepository,
    ) { }

    //#region 

    /**
     * Get All Lessons
     * @returns a LIST off Lessons OBJECTS who comes from Repository
     */
    async getAllLessons(): Promise<Lesson[]> {
        const lessons = await this.lessonRepository.getAllLessons();
        return [...lessons];
    }

    /**
     * Get ONE Lesson by ID
     * @param lessonId (Lesson's Id to search who comes from Controller)
     * @returns one Lesson OBJECT who comes from Repository
     */
    async getLessonById(lessonId: number): Promise<Lesson> {
        try {
            const lesson = await this.lessonRepository.getLessonByID(lessonId);
            return { ...lesson };
        } catch {
            throw new NotFoundException('Lesson not found');
        }
    }

    /**
     * Get Lesson by name
     * @param searchedTitle (the piece of string to find and who comes from Controller)
     * @returns a LIST of Lessons who comes from Repository
     */
    async searchByName(searchedName: string) : Promise<Lesson[]> {
        const lessons = await this.lessonRepository.searchByName(searchedName);
        return [ ... lessons ];
    }
    //#endregion
    
    /**
     * Post a NEW Lesson
     * @param title (the title who comes from Controller)
     * @param goal (the goal who comes from Controller)
     * @param subject (the subject who comes from Controller)
     * @param chaptersIds (the chapter's Ids list who comes from Controller)
     * @returns the new Lesson OBJECT who comes from Repository
     */
    async createLesson(title: string, goal: string, subject: string, chaptersIds: number[]): Promise<Lesson> {
        const lesson = await this.lessonRepository.createLesson(title, goal, subject, chaptersIds);
        return { ...lesson };
    }

    /**
     * Update a Lesson by Id
     * @param lessonID (the Lesson Id who comes from Controller)
     * @param title (the title who comes from Controller)
     * @param goal (the goal who comes from Controller)
     * @param subject (the subject who comes from Controller)
     * @param chaptersIds (the chapter's Ids list who comes from Controller)
     * @returns the new Lesson OBJECT who comes from Repository
     */
    async updateLesson(lessonId: number, title: string, goal: string, subject: string, isActive: boolean, chaptersIds: number[]): Promise<Lesson> {
        const previousLesson = await this.getLessonById(lessonId);
        const lesson = await this.lessonRepository.updateLesson(
            previousLesson,
            title,
            goal,
            subject,
            isActive,
            chaptersIds);
        return { ...lesson };
    }

    /**
     * Delete one Lesson By Id
     * @param lessonID (the Lesson's Id who comes from Controller)
     * @returns a STRING
     */
    async deleteLesson(lessonId: number): Promise<string> {
        if (await this.lessonRepository.getLessonByID(lessonId)) {
            this.lessonRepository.deleteLesson(lessonId);
            return "Lesson deleted";
        }
    }
}
