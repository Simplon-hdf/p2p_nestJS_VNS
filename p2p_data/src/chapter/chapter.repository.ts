import { Injectable } from "@nestjs/common";
import { Chapter } from "src/entities/chapter.entity";
import { Training } from "src/entities/training.entity";
import { DataSource, ILike } from "typeorm";
import { Lesson } from "src/entities/lesson.entity";

// Creation of a custom repository.
@Injectable()
export class ChapterRepository {
    constructor(private dataSource: DataSource) { }

    chapterRepository = this.dataSource.getRepository(Chapter);
    lessonRepository = this.dataSource.getRepository(Lesson);

    //#region GET

    /**
     * Get All Chapters
     * @returns a LIST of Chapters who comes from DataBase (with their relations)
     */
    getAllChapters() {
        return this.chapterRepository.find({ relations: { trainings: true, lessons: true } });
    }

    /**
     * Get ONE Chapter by ID
     * @param chapterId (Chapter's Id who comes from Service)
     * @returns one Chapter result who comes from DataBase (with his relations)
     */
    getChapterByID(chapterId: number) {
        return this.chapterRepository.findOne({
            where: { id: chapterId },
            relations: { trainings: true, lessons: true }
        });
    }

    /**
     * Get Trainings for one Chapter
     * @param chapter (Chapter's Id who comes from Service)
     * @returns a LIST of Trainings who comes from DataBase
     */
    async getLinkedTrainings(chapter: Chapter): Promise<Training[]> {
        const result = await this.chapterRepository
            .createQueryBuilder("chapter")
            .leftJoinAndSelect("chapter.trainings", "training")
            .where("chapter.id = :id", { id: chapter.id })
            .getMany();

        let trainings: Training[] = [];
        for (let chapterElt of result) {
            if (chapterElt.trainings.length > 0) {
                for (let training of chapterElt.trainings) {
                    trainings.push(training);
                }
            }
        }

        return trainings;
    }
 
    /**
     * Get Chapter by name
     * @param searchedName (the piece of string who comes from Service)
     * @returns a LIST of Chapters who contain the gived name and who comes from DataBase
     */
    async searchByName(searchedName: string) {
        /* protected from SQL Injection */
        return await this.chapterRepository.findBy({
            title: ILike(`%${searchedName}%`) //ILike : case insensitive
        });
    }
    //#endregion

    /**
     * Post a NEW Chapter
     * @param title (the title who comes from Service)
     * @param description (the description who comes from Service)
     * @param duration (the duration who comes from Service)
     * @param lessonsIds (a list of lessons Ids who comes from Service)
     * @returns the Chapter who was created in DataBase
     */
    async createChapter(title: string, description: string, duration: number, lessonsIds: number[]) {
        let lessons = new Array();
        if (lessonsIds.length > 0) {
            for (let currentId of lessonsIds) {
                const lesson = await this.lessonRepository.findOneBy({ id: currentId });
                if (lesson) lessons.push(lesson);
            }
        }

        const chapter = this.chapterRepository.create({ title, description, duration, lessons });
        return this.chapterRepository.save(chapter);
    }

    /**
     * Update a chapter by Id
     * @param chapterId (the Id chapter who comes from Service)
     * @param title (the title who comes from Service)
     * @param description (the description who comes from Service)
     * @param duration (the duration who comes from Service)
     * @param isActive (the isActive who comes from Service)
     * @param trainingsId (the Ids Trainings LIST who comes from Service)
     * @param lessonsIds (the Ids Lessons LIST who comes from Service)
     * @returns the Chapter who was updated in DataBase 
     */
    async updateChapter(
        chapterToUpdate: Chapter,
        title: string,
        description: string,
        duration: number,
        isActive: boolean,
        trainings: Training[],
        lessonsIds: number[]
    ): Promise<Chapter> {
        chapterToUpdate.title = title;
        chapterToUpdate.description = description;
        chapterToUpdate.duration = duration;
        chapterToUpdate.isActive = isActive;
        chapterToUpdate.trainings = trainings;

        let lessons = new Array();
        if (lessonsIds.length > 0) {
            for (let currentId of lessonsIds) {
                const lesson = await this.lessonRepository.findOneBy({ id: currentId });
                if (lesson) lessons.push(lesson);
            }
        }
        chapterToUpdate.lessons = lessons;

        return this.chapterRepository.save(chapterToUpdate);
    }

    /**
     * Delete one Chapter by Id
     * @param chapterId (the chapter's Id who comes from Service)
     */
    deleteChapter(chapterId: number) {
        this.chapterRepository.delete(chapterId);
    }

}