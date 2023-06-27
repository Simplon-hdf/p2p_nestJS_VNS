import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LessonRepository } from './lesson.repository';
import { Lesson } from 'src/entities/lesson.entity';

@Injectable()
export class LessonService {
    constructor(
        @Inject(LessonRepository)
        private readonly lessonRepository: LessonRepository,
    ) { }

    async getAllLessons(): Promise<Lesson[]> {
        const lessons = await this.lessonRepository.getAllLessons();
        return [...lessons];
    }

    async getLessonById(lessonId: number): Promise<Lesson> {
        try {
            const lesson = await this.lessonRepository.getLessonByID(lessonId);
            return { ...lesson };
        } catch {
            throw new NotFoundException('Lesson not found');
        }
    }

    async searchByName(searchedName: string) : Promise<Lesson[]> {
        const lessons = await this.lessonRepository.searchByName(searchedName);
        return [ ... lessons ];
    }
    
    async createLesson(title: string, goal: string, subject: string, chaptersIds: number[]): Promise<Lesson> {
        const lesson = await this.lessonRepository.createLesson(title, goal, subject, chaptersIds);
        return { ...lesson };
    }

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

    async deleteLesson(lessonId: number): Promise<string> {
        if (await this.lessonRepository.getLessonByID(lessonId)) {
            this.lessonRepository.deleteLesson(lessonId);
            return "Lesson deleted";
        }
    }
}
