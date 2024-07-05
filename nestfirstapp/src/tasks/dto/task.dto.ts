import { TaskStatus } from "../task.entity";
import  {IsString, IsNotEmpty,  MinLength, IsOptional, IsEnum} from 'class-validator'


export class CreateTaskDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    title: string;
    @IsNotEmpty()
    @IsString()
    description: string;
    }

export class UpdateTaskDTO{
    @IsString()
    @IsOptional()
    title?: string ;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    //@IsIn([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}