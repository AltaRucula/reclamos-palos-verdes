const config = {
  port: process.env.PORT || 3000,
  mongoDBURI:
    'mongodb+srv://reclamos-palos-verdes:reclamos-palos-verdes@cluster0.y2gl2.mongodb.net/reclamos-palos-verdes?retryWrites=true&w=majority&appName=Cluster0' as const,
  mongooseClientOptions: {
    serverApi: { version: '1' as const, strict: true, deprecationErrors: true },
  },
};

export default config;
