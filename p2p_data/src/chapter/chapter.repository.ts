import { Injectable } from "@nestjs/common";
import { Chapter } from "src/entities/chapter.entity";
import { Training } from "src/entities/training.entity";
import { DataSource, ILike } from "typeorm";

// Creation of a custom repository.
@Injectable()
export class ChapterRepository {
  constructor(private dataSource: DataSource){}

  chapterRepository = this.dataSource.getRepository(Chapter);

  //#region Get Methods
  getChapterByID(chapterId: number){
    return this.chapterRepository.findOne({
        where: {id: chapterId},
        relations: {trainings:true} 
      });
      // .createQueryBuilder("chapter")
      // .where("chapter.id = :id", {chapterId})
      // .getOne()
  }

  getAllChapters(){
    return this.chapterRepository.find({relations: {trainings:true}});
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

  async searchByName(searchedName: string){
    /* protected from SQL Injection */
    return await this.chapterRepository.findBy({
        title: ILike(`%${searchedName}%`) //ILike : case insensitive
      });
  }

  createChapter(title: string, description: string, duration: number){
    const chapter = this.chapterRepository
      .create({title, description, duration});
      return this.chapterRepository.save(chapter);
  }

  async updateChapter(
    chapterToUpdate: Chapter, 
    title: string, 
    description: string, 
    duration: number, 
    isActive: boolean,
    trainings: Training[]
  ): Promise<Chapter> {
    chapterToUpdate.title = title;
    chapterToUpdate.description = description;
    chapterToUpdate.duration = duration;
    chapterToUpdate.isActive = isActive;
    chapterToUpdate.trainings = trainings;

    return this.chapterRepository.save(chapterToUpdate);
  }

  deleteChapter(chapterId: number){
    this.chapterRepository.delete(chapterId);
  }
}