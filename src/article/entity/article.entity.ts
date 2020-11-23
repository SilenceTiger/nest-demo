import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ArticleType {
  Android = 'android',
  Ios = 'ios',
}

export interface ArticleDto {
  id?: number,
  name: string,
  type: string,
  content: string,
  createTime?: string,
  updateTime?: string
}

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ArticleType,
  })
  type: string;

  @Column({
    type: 'longtext',
  })
  content: string;

  @Column({
    type: 'datetime'
  })
  createTime: string;

  @Column({
    type: 'datetime'
  })
  updateTime: string;
}
