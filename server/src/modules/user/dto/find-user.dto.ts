/*
 * @Author: wll
 * @Date: 2022-10-29 14:14:53
 * @LastEditors: wll
 * @LastEditTime: 2022-10-29 15:21:53
 * @Description: 
 */
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindUserDto {
  @ApiPropertyOptional({ description: '用户姓名' })
  readonly name?: string;

  @ApiPropertyOptional({ description: '页码' })
  readonly page?: number;

  @ApiPropertyOptional({ description: '每页条数' })
  readonly pageSize?: number;
}
