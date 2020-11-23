import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article, ArticleDto } from './entity/article.entity';
import Pagination, { PaginationData } from '../utils/Pagination';
import moment from 'moment-es6';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async getList(query: any): Promise<PaginationData> {
    let pagination = new Pagination(
      this.articleRepository,
      +query.page,
      +query.size,
    );
    return await pagination.excute();
  }

  save(article: ArticleDto) {
    article.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
    article.updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    this.articleRepository.save(article);
  }

  update() {
    let article: ArticleDto = {
      id: 1,
      name: 'title111111111111',
      type: 'ios',
      content: '<html>123</html>',
      createTime: '2020/11/06 16:59:00',
      updateTime: '2020/11/06 16:59:00',
    };
    this.articleRepository.save(article);
  }

  delete() {}
}
