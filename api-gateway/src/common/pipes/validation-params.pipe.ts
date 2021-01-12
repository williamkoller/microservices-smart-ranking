import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'

export class ValidationParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`The parameter ${metadata.data} must be informed`)
    }
    return value
  }
}
