import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { voyageEmbeddingsProvider } from './providers/voyage-embeddings.provider';
import { PineconeProvider } from './providers/pinecone.providers';
import { SearchController } from './search.controller';

@Module({
  providers: [SearchService, voyageEmbeddingsProvider, PineconeProvider],
  exports: [SearchService, PineconeProvider],
  controllers: [SearchController]
})
export class SearchModule {}
