import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'
import { UrlType } from '@/modules/aws/types/url.type'

@Injectable()
export class AwsService {
  private logger = new Logger(AwsService.name)
  private s3: S3
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get<string>('AWS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET'),
    })
  }

  public async uploadFile(file: Buffer, id: string): Promise<UrlType> {
    try {
      const bucketName = this.configService.get<string>('AWS_BUCKET_NAME')
      const region = this.configService.get<string>('AWS_REGION')

      const urlKey = `${id}.png`

      await this.s3
        .putObject({
          Bucket: bucketName,
          Body: file,
          Key: urlKey,
          ACL: 'public-read',
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
