import { ConfigService } from "@nestjs/config";
import { Pinecone } from "@pinecone-database/pinecone";

export const PINECONE_INDEX = "PINECONE_INDEX";

export const PineconeProvider = {
    provide: PINECONE_INDEX,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const apiKey = configService.get<string>('pinecone.api');
      const indexName = configService.get<string>('pinecone.index');

      if (!apiKey || !indexName) {
        throw new Error('Pinecone config (API KEY or INDEX is missing in .env');
      }

      const pinecone = new Pinecone({
        apiKey: apiKey,
      });

      return pinecone.index(indexName);
    }
}