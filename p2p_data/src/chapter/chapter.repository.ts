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

  //#region Get Methods
  getChapterByID(chapterId: number) {
    return this.chapterRepository.findOne({
        where: { id: chapterId },
        relations: { trainings:true, lessons: true }
      });
  }

  getAllChapters() {
    return this.chapterRepository.find({ relations: { trainings:true, lessons: true } });
  }

  /** Get all the trainings linked to a given chapter. */
  async getChapterLinkedTrainings(chapter: Chapter) : Promise<Training[]> {
    const result = await this.chapterRepository
        .createQueryBuilder("chapter")
        .leftJoinAndSelect("chapter.trainings", "training")
        .where("chapter.id = :id", {id: chapter.id})
        .getMany();

    var trainings: Training[] = [];
    for (var chapterElt of result) { 
        if (chapterElt.trainings.length > 0 ) {
            for(var training of chapterElt.trainings){
                trainings.push(training);
            }
        }
    }

    return trainings;
  }
  //#endregion

  async searchByName(searchedName: string) {
    /* protected from SQL Injection */
    return await this.chapterRepository.findBy({
      title: ILike(`%${searchedName}%`) //ILike : case insensitive
    });
  }

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

  deleteChapter(chapterId: number) {
    this.chapterRepository.delete(chapterId);
  }
}