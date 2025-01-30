import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dish, DishDocument } from './schemas/dish.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateDishDto } from './dto/create-dish.dto';
import { FileService, FileType } from 'src/file/file.service';
import { CategoriesService } from 'src/categories/categories.service';
import { Categoria, CategoriaDocument } from 'src/categories/schemas/categoria.schema';

@Injectable()
export class DishesService {

    constructor(
        @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
        @InjectModel(Categoria.name) private categoriaModel: Model<CategoriaDocument>,
        private fileService: FileService,
    ) {}

    
    async getAllDishes() {
        const dishes = await this.dishModel.find().populate('categoria')
        return dishes
    }
    
    async getOneDish(id: ObjectId) {
        const dish = await this.dishModel.findById(id)
        return dish
    }
    
    async createDish(dto: CreateDishDto, picture) {
        const picturePath = picture.originalname ? this.fileService.createFile(FileType.IMAGE, picture) : picture
        const dish = await this.dishModel.create({...dto, picture: picturePath})
        const categoria = await this.categoriaModel.findById(dto.categoria)
        categoria.dishes.push(dish)
        await categoria.save()
        
        return dish
    }

    async deleteDish(id: ObjectId) {
        const dish = await this.dishModel.findByIdAndDelete(id)
        return dish
    }

    async getDishesByCategoriaID(id: ObjectId){
        const dishes = await this.dishModel.find({categoria: id})
        return dishes
    }

    async updateDish(id: ObjectId, dto: CreateDishDto, picture?,) {
        let picturePath = null
        if(picture){
            picturePath = picture.originalname ? this.fileService.createFile(FileType.IMAGE, picture) : picture
        }
        const dish = await this.dishModel.findByIdAndUpdate(id, {...dto,  picture: picturePath})
        return dish
    }

}
