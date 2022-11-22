import { EntityRepository } from '@mikro-orm/mysql';

class BaseRepository<T extends object> extends EntityRepository<T> {
  async exists(where: any): Promise<boolean> {
    const count = await this.count(where);
    return count !== 0;
  }
}

export default BaseRepository;
