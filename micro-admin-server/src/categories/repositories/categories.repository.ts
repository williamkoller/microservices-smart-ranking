import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'
import { Category, CategoryDocument } from '../models/category.schema'

@Injectable()
export class CategoriesRepository {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto)

    await category.save()

    return category
  }

  async findByName(name: string): Promise<Category> {
    return this.categoryModel.findOne({ name })
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find({}, { __v: false }).populate('players')
  }

  async findById(id: string): Promise<Category> {
    return await this.categoryModel.findById(id)
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
    return this.categoryModel.updateOne({ _id: id }, { $set: updateCategoryDto })
  }

  async addPlayerToCategory(playerId: string, categoryId: string, category: Category): Promise<void> {
    if (category.players) {
      category.players.push(Types.ObjectId(playerId))
    } else {
      category.players = [Types.ObjectId(playerId)]
    }

    await this.categoryModel.findOneAndUpdate({ _id: categoryId }, { $set: category })
  }

  async findByPlayerId(playerId: string): Promise<Category> {
    return this.categoryModel.findOne({ players: Types.ObjectId(playerId) })
  }

  async findPlayerInCategory(categoryId: string, playerId: string): Promise<Category[]> {
    return this.categoryModel.find({ _id: categoryId, players: { $in: [Types.ObjectId(playerId)] } })
  }
}
