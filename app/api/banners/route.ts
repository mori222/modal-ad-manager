import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import { IncomingMessage } from 'http';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/db';
import { Readable } from 'stream';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

// デバッグ用のログ関数
function log(message: string, data?: any) {
  console.log(message);
  if (data) console.log(data);
}

async function convertNextRequestToIncomingMessage(req: NextRequest): Promise<IncomingMessage> {
  log('1. Converting NextRequest to IncomingMessage');
  
  const buffer = await req.arrayBuffer();
  log(`2. Request buffer received, size: ${buffer.byteLength}`);

  const readable = new Readable({
    read() {} // required but noop
  });
  readable.push(Buffer.from(buffer));
  readable.push(null);
  log('3. Readable stream created');

  const headers = Object.fromEntries(req.headers);
  
  // IncomingMessage のモックを拡張
  const mock = {
    ...readable,
    headers,
    method: req.method,
    url: req.url,
    pipe: readable.pipe.bind(readable),
    on: readable.on.bind(readable),
    emit: readable.emit.bind(readable),
    pause: () => readable.pause(),
    resume: () => readable.resume(),
    unpipe: readable.unpipe.bind(readable),
    destroy: readable.destroy.bind(readable),
  };

  log('4. Mock IncomingMessage created with headers:', headers);
  return mock as unknown as IncomingMessage;
}

export async function POST(req: NextRequest) {
  try {
    log('1. Request received');
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    log(`2. Upload directory created: ${uploadDir}`);

    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024,
    });
    log('3. Formidable configured');

    const incomingMessage = await convertNextRequestToIncomingMessage(req);
    log('5. Request converted to IncomingMessage');

    // formidable でのパース処理を Promise 化
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      log('6. Starting form parse');
      form.parse(incomingMessage, (err, fields, files) => {
        if (err) {
          log('7. Form parse error:', err);
          reject(err);
        } else {
          log('7. Form parse success:', { fields, files });
          resolve([fields, files]);
        }
      });
    });

    const name = fields.name?.[0] || '';
    const displayTiming = fields.displayTiming?.[0] || '';
    const url = fields.url?.[0] || '';
    const file = files.file?.[0];

    log('8. Parsed data:', { name, displayTiming, url, file });

    if (!name || !file || !url) {
      return NextResponse.json(
        { error: 'バナー名とURL、画像ファイルは必須です。' },
        { status: 400 }
      );
    }

    const fileUrl = `/uploads/${path.basename(file.filepath)}`;
    
    const banner = await prisma.banner.create({
      data: {
        name,
        displayTiming,
        imageUrl: fileUrl,
        url,
        siteId: 1, // 適切な siteId を設定してください
      },
    });

    log('9. Banner created:', banner);
    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      log('Error in POST /api/banners:', error.message);
    } else {
      log('Error in POST /api/banners:', 'Unknown error occurred');
    }
    
    return NextResponse.json(
      { error: 'バナーの作成に失敗しました。' },
      { status: 500 }
    );
  }
}

// GET ハンドラーを追加
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get('siteId');

    if (!siteId) {
      return NextResponse.json(
        { error: 'siteId is required' },
        { status: 400 }
      );
    }

    const banners = await prisma.banner.findMany({
      where: {
        siteId: parseInt(siteId),
      },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    );
  }
}
