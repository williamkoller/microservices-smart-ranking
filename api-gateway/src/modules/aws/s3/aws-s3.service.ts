import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'
import { UrlType } from '@/modules/aws/types/url.type'

@Injectable()
export class AwsS3Service {
  private logger = new Logger(AwsS3Service.name)
  private s3: S3
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get<string>('AWS_S3_REGION'),
      accessKeyId: this.configService.get<string>('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_S3_SECRET_ACCESS_KEY'),
    })
  }

  public async uploadFile(file: any, id: string): Promise<UrlType> {
    try {
      const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME')
      const region = this.configService.get<string>('AWS_S3_REGION')

      const fileExt = file.originalname.split('.')[1]

      const urlKey = `${id}.${fileExt}`

      await this.s3
        .putObject({
          Bucket: bucketName,
          Body: file.buffer,
          Key: urlKey,
        })
        .promise()

      return {
        url: `https://${bucketName}.s3-${region}.amazonaws.com/${urlKey}`,
      }
    } catch (e) {
      this.logger.error(`Error processing the image: ${JSON.stringify(e.message)}`)
      throw new BadRequestException(e.message)
    }
  }
}
