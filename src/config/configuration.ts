export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  anthropic: {
    api: process.env.ANTHROPIC_API_KEY,
  },
  voyage: {
    api: process.env.VOYAGE_API_KEY,
  },
  pinecone: {
    api: process.env.PINECONE_API_KEY,
    index: process.env.PINECONE_INDEX,
  },
});
