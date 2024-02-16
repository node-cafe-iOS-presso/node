import { OmitType } from '@nestjs/mapped-types';
import { CreateModelDto } from './create-model.dto';

export class UpdateModelDto extends OmitType(CreateModelDto, ['user']) {}
