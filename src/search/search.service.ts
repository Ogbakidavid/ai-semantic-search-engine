import { Injectable, Inject } from '@nestjs/common';
import { VoyageEmbeddings } from '@langchain/community/embeddings/voyage';
import { PINECONE_INDEX } from './providers/pinecone.providers';

@Injectable()
export class SearchService {
   constructor(
    private readonly voyageEmbeddings: VoyageEmbeddings,
    @Inject(PINECONE_INDEX) private readonly pineconeIndex: any,
   ) {}

   async generateEmbedding(text: string): Promise<number[]> {
    return this.voyageEmbeddings.embedQuery(text);
   }

   async searchSimilar(query: string, topK: number = 5): Promise<any[]> {
    const queryVector = await this.generateEmbedding(query);

    const results = await this.pineconeIndex.query({
      vector: queryVector,
      topK,
      includeMetadata: true,
    });

    return results.matches;
  }
}