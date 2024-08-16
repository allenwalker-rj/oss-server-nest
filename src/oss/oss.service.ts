import { Injectable } from "@nestjs/common";
import * as OSS from "ali-oss";
import { Readable } from "stream";
import { OssConfig } from "src/config/oss";
import { OssQueryListDto } from "./dto/OssQueryListDto";
import { OssUploadFileDto } from "./dto/OssUploadFileDto";

@Injectable()
export class OssService {
    /**阿里云OSS官方文档可参考 LINK[https://www.alibabacloud.com/help/zh/oss/developer-reference/installation-7?spm=a2c63.p38356.0.0.669f2232WoBLGk] */
    /**GITHUB文档地址 LINK[https://github.com/ali-sdk/ali-oss] */
    private client: any;
    constructor() {
        // 初始化OSS客户端。请将以下参数替换为您自己的配置信息。
        this.client = new OSS({
            accessKeyId: OssConfig.accessKeyId, // 确保已设置环境变量OSS_ACCESS_KEY_ID。
            accessKeySecret: OssConfig.accessKeySecret, // 确保已设置环境变量OSS_ACCESS_KEY_SECRET。
            bucket: OssConfig.bucket, // 示例：'my-bucket-name'，填写存储空间名称。
            region: OssConfig.region, // 示例：'oss-cn-hangzhou'，填写Bucket所在地域。
        });
    }

    async putOssFile(file: any, dto: OssUploadFileDto) {
        const { path } = dto;
        if (!this.isNotEmptyString(path)) {
            return { code: 500, msg: "path not allow empty" };
        }
        //TODO 需要判断path是否符合要求，且应该在页面上有具体的选项，而不是手动填写
        let result;
        try {
            const { originalname, mimetype, size } = file;
            const fileStream = Readable.from(file.buffer);
            result = await this.client.putStream(`/${path}/${originalname}`, fileStream);
        } catch (error) {
            return {
                code: 503,
                msg: `error:${error}`,
            };
        }
        return { code: 200, data: { imgUrl: result.url } };
    }

    async getOssFile(fileName: string) {
        const result = await this.client.get(fileName);
        return result;
    }

    async delete(fileName: string) {
        const result = await this.client.delete(fileName);
        return result;
    }

    async list(dto: OssQueryListDto) {
        const { prefix, amount } = dto;
        if (amount && (amount <= 0 || amount > 1000)) {
            return { code: 500, msg: `amount must be greater than 0 and less than 1000` };
        }
        const maxKey = amount ? amount : 100;
        const result = this.isNotEmptyString(prefix)
            ? await this.client.listV2({ prefix: `${prefix.trim()}/`, "max-key": maxKey })
            : await this.client.listV2({ "max-key": maxKey });
        return result?.objects;
    }

    private isNotEmptyString(str: string) {
        return str && str.trim().length !== 0;
    }
}
