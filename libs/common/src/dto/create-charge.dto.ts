import { CardDto } from '@app/common/dto/card.dto';
import { IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  card: CardDto;

  amount: number;
}
