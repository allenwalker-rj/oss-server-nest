import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { OssService } from "./oss.service";
import { OssQueryListDto } from "./dto/OssQueryListDto";
import { OssUploadFileDto } from "./dto/OssUploadFileDto";
import { OssDeleteDto } from "./dto/OssDeleteDto";

@Controller("oss")
export class OssController {
    constructor(private readonly ossService: OssService) {}
    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    upload(@UploadedFile() file: Express.Multer.File, @Body() dto: OssUploadFileDto) {
        return this.ossService.putOssFile(file, dto);
    }

    @Get("get")
    getImgUrl(@Query("fileName") fileName: string) {
        return this.ossService.getOssFile(fileName);
    }

    @Delete("delete")
    delete(@Body() dto: OssDeleteDto) {
        const { fileName } = dto;
        return this.ossService.delete(fileName);
    }

    @Get("list")
    list(@Query() dto: OssQueryListDto) {
        return this.ossService.list(dto);
    }
}
