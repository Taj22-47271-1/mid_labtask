import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Repository, ILike } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    await this.productsRepo.save(product);

    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  async findAll() {
    const data = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'All products fetched successfully',
      count: data.length,
      data,
    };
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, dto);
    await this.productsRepo.save(product);

    return {
      message: 'Product updated successfully',
      data: product,
    };
  }

  async replace(id: number, dto: UpdateProductDto) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    product.name = dto.name;
    product.description = dto.description;
    product.price = dto.price;
    product.stock = dto.stock ?? 0;
    product.category = dto.category;
    product.isActive = dto.isActive ?? true;

    await this.productsRepo.save(product);

    return {
      message: 'Product replaced successfully',
      data: product,
    };
  }

  async remove(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productsRepo.delete(id);

    return {
      message: 'Product deleted successfully',
      id,
    };
  }

  async findByCategory(category: string) {
    const data = await this.productsRepo.find({
      where: { category },
      order: { createdAt: 'DESC' },
    });

    return {
      message: `Products in category ${category} fetched successfully`,
      count: data.length,
      data,
    };
  }

  async search(keyword: string) {
    const data = await this.productsRepo.find({
      where: { name: ILike(`%${keyword}%`) },
      order: { createdAt: 'DESC' },
    });

    return {
      message: `Products matching "${keyword}" fetched successfully`,
      count: data.length,
      data,
    };
  }

  async toggleActive(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    product.isActive = !product.isActive;
    await this.productsRepo.save(product);

    return {
      message: 'Product active status toggled successfully',
      data: product,
    };
  }
}