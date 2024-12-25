
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import * as fs from 'fs';

import config from 'config'; 

const prisma  = new PrismaClient();

async function main() {
    Logger.log('Seeding default admin');

    Logger.log(`Creating default admin: ${config.ADMIN_EMAIL}`);
    Logger.log(`Creating default admin: ${config.ADMIN_PASSWORD}`);
    Logger.log(`Creating default admin: ${config.SALT_ROUNDS}`);
    Logger.log(`Creating default admin: ${config.ADMIN_NAME}`);

    Logger.log(bcrypt)

    const hashedPassword = bcrypt.hashSync(config.ADMIN_PASSWORD, config.SALT_ROUNDS);
    Logger.log(hashedPassword);


    const checkAdmin = await prisma.admin.findFirst({
      where: {
        email: config.ADMIN_EMAIL,
      },
    });
    if (checkAdmin) {
      Logger.log('Default admin already exists');
      return;
    }

    // upload image to images/private folder from images/default folder
      const UploadedFile = {
        originalname: 'default.jpg',
        buffer: fs.readFileSync('images/default/default.jpg'),
      }

    const uploadPath = `images/private/${UploadedFile.originalname}`;
    fs.writeFileSync(uploadPath, UploadedFile.buffer);
    Logger.log(`Default image uploaded to: ${uploadPath}`);

    // create image in database
    const image = await prisma.image.create({
      data: {
        url: uploadPath,
      },
    });

    
    const result = await prisma.admin.create({
      data: {
        email: config.ADMIN_EMAIL,
        password: hashedPassword,
        name: config.ADMIN_NAME,
        role: 'MAIN_ADMIN',
        imageId: image.id,
      },
    });
    Logger.log(`Seeding default admin: ${result.email}`);
}

main()
  .catch((e) => {
    Logger.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });