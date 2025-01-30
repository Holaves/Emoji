import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Model, ObjectId } from 'mongoose';
import { Categoria, CategoriaDocument } from './schemas/categoria.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel(Categoria.name) private categoriaModel: Model<CategoriaDocument>,
    private fileService: FileService,
){}


    async getAllCategories() {
        const categoria = this.categoriaModel.find().populate('subCategories')
        return categoria
    }
    async getOneCategoria(id: ObjectId) {
        const categoria = this.categoriaModel.findById(id).populate('sets')
        return categoria
    }
    async deleteCategoria(id: ObjectId) {
        const categoria = this.categoriaModel.findByIdAndDelete(id)
        return categoria
    }
    async createCategoria(dto: CreateCategoriaDto, picture) {
        let picturePath = null
        if(picture){
            picturePath = picture.originalname ? this.fileService.createFile(FileType.IMAGE, picture) : picture
        }
        // const reservImage: string = 'https://img.promportal.su/foto/good_fotos/49718/497182010/tavr-nerzhaveyuschiy-60h60h6-mm-aisi-304_foto_largest.jpg'
        
        const categoria = await this.categoriaModel
            .create({
                ...dto, subName: dto.subName ? dto.subName : dto.name,
                picture: picturePath,
            })
        return categoria
    }
    async updateCategoria(id: ObjectId, dto: CreateCategoriaDto, picture?){
        let picturePath = null
        if(picture){
            picturePath = picture.originalname ? this.fileService.createFile(FileType.IMAGE, picture) : picture
        }
        const categoria = await this.categoriaModel.findByIdAndUpdate(id, {...dto,  picture: picturePath})
        return categoria
    }
}
