import { BadRequestException, FileValidator, Injectable } from '@nestjs/common';

@Injectable()
export class CustomMaxFileSizeValidator extends FileValidator {
  constructor(private readonly maxSize: number) {
    super({});
  }

  isValid(value: Express.Multer.File): boolean {
    return value.size <= this.maxSize;
  }

  buildErrorMessage(): string {
    return `Размер файла больше допустимого (${this.maxSize})`;
  }

  validate(value: Express.Multer.File) {
    if (!this.isValid(value)) {
      throw new BadRequestException(this.buildErrorMessage());
    }
    return value;
  }
}
