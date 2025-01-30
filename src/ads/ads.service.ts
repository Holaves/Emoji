import { Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { FileService, FileType } from 'src/file/file.service';
import { Ad, AdDocument } from './schemas/ad.schema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdsService {
    constructor(
        private fileService: FileService,
        @InjectModel(Ad.name) private adModel: Model<AdDocument>,
    ){}

    async getAllAds() {
        const ads = await this.adModel.find()
        return ads
    }
    async getOneAd(id: ObjectId) {
        const ad = await this.adModel.findById(id)
        return ad
    }
    async deleteOneAd(id: ObjectId) {
        const ad = await this.adModel.findByIdAndDelete(id)
        return ad
    }
    async createAd(dto: CreateAdDto, picture) {
        const picturePath = picture.originalname ? this.fileService.createFile(FileType.IMAGE, picture) : picture

        let expiresAt = null;
        if (dto.vrema) {
            expiresAt = new Date(Date.now() + dto.vrema * 1000); // Вычисляем время жизни
        }

        const ad = await this.adModel.create({...dto, picture: picturePath, expiresAt: expiresAt})
        return ad
    }
}
