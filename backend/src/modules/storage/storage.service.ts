import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly localUploadDir: string;

  constructor(private configService: ConfigService) {
    this.localUploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.localUploadDir)) {
      fs.mkdirSync(this.localUploadDir, { recursive: true });
    }
  }

  async uploadFile(buffer: Buffer, filename: string, folder: string = 'invoices'): Promise<string> {
    const targetFolder = path.join(this.localUploadDir, folder);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const filePath = path.join(targetFolder, filename);
    await fs.promises.writeFile(filePath, buffer);
    this.logger.log(`Stored file locally at ${filePath}`);
    
    // Returns relative/URL accessible path
    return `/uploads/${folder}/${filename}`;
  }
}
