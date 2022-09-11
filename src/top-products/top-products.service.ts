import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopProducts } from './entities/top-product.entity';
import { TopProductDto } from './top-product-dto';

@Injectable()
export class TopProductsService {
  constructor(@InjectRepository(TopProducts) private topProductRepo: Repository<TopProducts>) {}
  // create(createTopProductDto: CreateTopProductDto) {
  //   return 'This action adds a new topProduct';
  // }

  getTopProducts(): Promise<TopProducts[]> {
    return this.topProductRepo.find();
  }

  addTopProduct(topProduct: TopProductDto): Promise<TopProducts> {
    return this.topProductRepo.save(topProduct)
  }

  getTopProduct(id: number): Promise<TopProducts> {
    return this.topProductRepo.findOne({id});
  }

  removeTopProduct(id: number) {
    return this.topProductRepo.delete(id)
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} topProduct`;
  // }

  // update(id: number, updateTopProductDto: UpdateTopProductDto) {
  //   return `This action updates a #${id} topProduct`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} topProduct`;
  // }
}
