import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'
import { ReturnFileS3Type } from '../types/return-file-s3.type'

@Injectable()
export class AwsS3Service {
  private logger = new Logger(AwsS3Service.name)
  constructor(private readonly configService: ConfigService) {}
  public async uploadFile(file: any, id: string): Promise<ReturnFileS3Type> {
    const s3 = new S3({
      region: this.configService.get<string>('AWS_S3_REGION'),
      accessKeyId: this.configService.get<string>('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_S3_SECRET_ACCESS_KEY'),
    })

    const fileExtension = file.originalname.split('.')[1]

    const urlKey = `${id}.${fileExtension}`

    this.logger.log(`urlKey: ${urlKey}`)

    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME')

    await s3
      .putObject({
        Body: file.buffer,
        Bucket: bucketName,
        Key: urlKey,
      })
      .promise()

    return {
      url: `https://${bucketName}.s3.amazonaws.com/${urlKey}`,
    }
  }
}
