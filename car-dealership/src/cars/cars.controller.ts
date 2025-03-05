import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO, UpdateCarDTO } from './dto/create-car.dto';
@Controller('cars')
//@UsePipes(ValidationPipe)
export class CarsController {
  // Por el momento estará acá

  constructor(private readonly carService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    //Todo: Validar

    return this.carService.findOneById(id);
  }

  @Post()
  create(@Body() createCarDto: CreateCarDTO) {
    return this.carService.create(createCarDto);
  }

  @Patch(':id')
  updateCar(
    @Body() updateCar: UpdateCarDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.carService.update(id, updateCar);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carService.delete(id);
  }
}
