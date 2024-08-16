import { Type } from "class-transformer";
export class OssQueryListDto {
    /**匹配前缀：也可以理解为文件夹 */
    @Type(() => String)
    prefix?: string;
    /**获取数量：默认100，上限1000 */
    @Type(() => Number)
    amount?: number;
}
