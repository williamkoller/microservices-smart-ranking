import { Category } from '@/categories/models/category.entity'
import { IsEmail, IsNumber, IsString } from 'class-validator'
import { Column, ObjectIdColumn, OneToMany, PrimaryColumn } from 'typeorm'

export class Player {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  @IsString()
  name: string

  @Column()
  @IsEmail()
  email: string

  @Column()
  @IsNumber()
  phone?: number

  @Column()
  @IsString()
  ranking: string

  @Column()
  @IsString()
  rankingPosition: string

  @Column()
  @IsString()
  imgUrl: string

  @Column()
  @OneToMany(() => Category, (category) => category.player)
  category: Category
}
