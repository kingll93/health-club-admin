import { ApiPropertyOptional } from "@nestjs/swagger";


export class StatisticDto {
    @ApiPropertyOptional({ description: '开始时间' })
    readonly startTime?: string;


    @ApiPropertyOptional({ description: '结束时间' })
    readonly endTime?: string;
}
