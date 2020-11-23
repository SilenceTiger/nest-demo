import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { PaginationData } from '../utils/Pagination';
import { ArticleDto } from './entity/article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  getList(@Query() query): Promise<PaginationData> {
    return this.articleService.getList(query);
  }

  @Post('save')
  saveArticle(@Body() article: ArticleDto) {
    return this.articleService.save(article);
  }

  @Get('update')
  updateArticle() {
    return this.articleService.update();
  }
}
