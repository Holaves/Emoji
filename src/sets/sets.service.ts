import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { SetDocument } from './schemas/set.schema';
import { CreateSetDto } from './dto/create-set.dto';

@Injectable()
export class SetsService {

    constructor(@InjectModel(Set.name) private setModel: Model<SetDocument>,
    private fileService: FileService,) {

    }


    async getAllSets() {
        const sets = await this.setModel.find()
        return sets
    }
    async updateSet(id: ObjectId, dto: CreateSetDto, picture?){
        let picturePath = null
        if(picture){
            picturePath = picture.originalname ? this.fileService.createFile(FileType.IMAGE, picture) : picture
        }
        const dish = await this.setModel.findByIdAndUpdate(id, {...dto,  picture: picturePath, categoria: '674e1096f31c0b646fa6fa83'})
        return dish
    }

    async getSetsByCategoriaID(id: ObjectId){
        const sets = await this.setModel.find({categoria: id})
        return sets
    }
    async getOneSet(id: ObjectId) {
        const set = await this.setModel.findById(id)
        return set
    }
    
    async createSet(dto: CreateSetDto, picture) {
        const picturePath = picture.originalname ? this.fileService.createFile(FileType.IMAGE, picture) : picture

        const set = await this.setModel.create({...dto, picture: picturePath, categoria: '674e1096f31c0b646fa6fa83'})
        return set
    }

    async deleteOneSet(id: ObjectId) {
        const set = await this.setModel.findByIdAndDelete(id) 
        return set
    }
}
