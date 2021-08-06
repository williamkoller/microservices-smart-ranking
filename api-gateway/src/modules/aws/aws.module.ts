import { Module } from '@nestjs/common'
import { AwsService } from '@/modules/aws/s3/aws.service'

@Module({
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
