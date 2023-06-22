import { Injectable } from "@nestjs/common";
import { Chapter } from "src/entities/chapter.entity";
import { DataSource } from "typeorm"

// Creation of a custom repository.
@Injectable()
export class ChapterRepository {
  constructor(private dataSource: DataSource){}

  chapterRepository = this.dataSource.getRepository(Chapter);

  async getChapterByID(chapterId: number) : Promise<Chapter> {
    return await this.chapterRepository.findOneBy({
        id: chapterId
    });
      // .createQueryBuilder("chapter")
      // .where("chapter.id = :id", {chapterId})
      // .getOne()
  }

  getAllChapters(){
    return this.chapterRepository.find();
  }

  createChapter(title: string, description: string, duration: number){
    const chapter = this.chapterRepository
      .create({title, description, duration});
      return this.chapterRepository.save(chapter);
  }

}