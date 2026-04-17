import { ConfigService } from "@nestjs/config";
import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";

export const voyageEmbeddingsProvider = {
    provide: VoyageEmbeddings,
    inject: [ConfigService],
    
useFactory: (configService: ConfigService) => {
    const apiKey = configService.get<string>("voyage.api"); // Match the name in configuration.ts
    if (!apiKey) {
        throw new Error('VOYAGE_API_KEY is missing in your .env file');
    }
    return new VoyageEmbeddings({
        apiKey: apiKey,
        modelName: 'voyage-3',
    });
}
}