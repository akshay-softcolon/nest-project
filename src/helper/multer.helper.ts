import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Injectable()
export class MulterHelper {
    static fileFilter(file, callback) {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            return callback(
                new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST),
                false,
            );
        }
        callback(null, true);
    }

    static editFileName(file, callback) {    
        console.log('File:', file.files);

        if (!file.originalname) {
            return callback(
                new HttpException('File name is missing', HttpStatus.BAD_REQUEST),
                false
            );
        }

        const name = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        callback(null, `${name}-${randomName}${fileExtName}`);
    }

    static storage = diskStorage({
        destination: './uploads',
        filename: MulterHelper.editFileName,
    });

    static removeFile(filePath: string) {
        console.log(filePath);
        
        fs.unlink(filePath, (err) => {
            if (err) {
                throw new HttpException('File not found', HttpStatus.NOT_FOUND);
            }
        });
    }
}