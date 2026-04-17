import { Injectable, Inject } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { PINECONE_INDEX } from '../search/providers/pinecone.providers';
import { CreateDocumentDto } from './dto/create-document.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly searchService: SearchService,
    @Inject(PINECONE_INDEX) private readonly pineconeIndex: any,
  ) {}

  async create(dto: CreateDocumentDto) {
    const document = await this.prisma.document.create({
      data: {
        title: dto.title,
        content: dto.content,
      },
    });

    const embedding = await this.searchService.generateEmbedding(dto.content);

    await this.pineconeIndex.upsert([
      {
        id: document.id,
        values: embedding,
        metadata: {
          title: document.title,
          content:document.content,
        },
      },
    ]);

    return {
      message: 'Document indexed successfully',
      id: document.id,
      title: document.title
    };
  }
}
