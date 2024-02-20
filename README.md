This is a Next.js project that uses Azure Cosmos DB to create a simple web experience that allows users to store their OpenAI ChatGPT sessions in a Cosmos DB instance.

The application uses data that was trained on the Contoso Real Estate dataset, which is available in the [here](https://github.com/Azure-Samples/contoso-real-estate).

## Getting Started

### Cosmos DB

Before using this project, you need to create a Cosmos DB instance and a database with a collection. You can follow the [official documentation](https://learn.microsoft.com/azure/cosmos-db/nosql/quickstart-portal) to create a Cosmos DB instance.

When creating the Cosmos DB instance, choose the NOSQL API and the location that best suits your needs. Then, create a database and provide a [hierarchical Partition Key](https://learn.microsoft.com/azure/cosmos-db/hierarchical-partition-keys) of:

```bash
/UserId
    /SessionId
```

### GitHub OAuth

You also need to create a GitHub OAuth application. You can follow the [official documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to create a GitHub OAuth application.

### Environment Variables

Once you have created the Cosmos DB instance and the GitHub OAuth application, you need to create a `.env.local` file in the root of the project with the following environment variables:

```bash
AZURE_COSMOS_DB_ENDPOINT=""
AZURE_COSMOS_DB_KEY=""

NEXTAUTH_SECRET="" # Provide a random string, this can be generated with `openssl rand -hex 32`
NEXTAUTH_URL="http://localhost:3000" # The URL of your Next.js app (by default, http://localhost:3000)

GITHUB_ID="" # The Client ID of your GitHub OAuth application
GITHUB_SECRET="" # The Client Secret of your GitHub OAuth application

NEXT_PUBLIC_RAG_API_URL="" # The URL of the RAG API (see https://github.com/Azure-Samples/azure-search-openai-javascript)
```

### Running the Project

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
