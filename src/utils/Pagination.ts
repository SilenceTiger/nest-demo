import { Repository } from 'typeorm';

export default class Pagination {
  private page: number;
  private size: number;
  private total: number;
  private list: any[];
  private repository: Repository<any>;
  private alias: string;
  private query: any;

  constructor(
    repository: Repository<any>,
    page: number,
    size: number,
    query?: any,
    alias?: string,
  ) {
    this.repository = repository;
    this.page = page || 1;
    this.size = size || 10;
    this.query = query;
    this.alias = alias || 't'
  }

  private getWhereByQuery() {
    return {
      state: this.query?.state || '1 = 1',
      value: this.query?.value || {},
    };
  }

  private async setList() {
    const where = this.getWhereByQuery();
    this.list = await this.repository
      .createQueryBuilder(this.alias)
      .skip((this.page - 1) * this.size)
      .take(this.size)
      .where(where.state, where.value)
      .getMany();
  }

  private async setTotal() {
    const where = this.getWhereByQuery();
    this.total = await this.repository
      .createQueryBuilder(this.alias)
      .select('count(*)')
      .where(where.state, where.value)
      .getCount();
  }

  async excute() {
    await this.setList();
    await this.setTotal();
    return {
      page: this.page,
      size: this.size,
      total: this.total,
      list: this.list,
    };
  }
}

export interface PaginationData {
  page: number;
  size: number;
  total: number;
  list: any[];
}
