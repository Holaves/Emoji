import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { FileModule } from 'src/file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdSchema } from './schemas/ad.schema';

@Module({
  controllers: [AdsController],
  providers: [AdsService],
  imports: [
    FileModule,
    MongooseModule.forFeature([{name: Ad.name, schema: AdSchema}]),
  ]
})
export class AdsModule {}
