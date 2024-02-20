import {
  BulkOperationType,
  CosmosClient,
  CosmosDbDiagnosticLevel,
  OperationInput,
} from "@azure/cosmos";

const DB_ID = "ChatHistory";
const CONTAINER_ID = "Session";
const endpoint = process.env.AZURE_COSMOS_DB_ENDPOINT as string;
const key = process.env.AZURE_COSMOS_DB_KEY as string;
const client = new CosmosClient({
  endpoint,
  key,
  diagnosticLevel: CosmosDbDiagnosticLevel.debug,
});

type ChatThread = {
  id: string;
  text: { value: string; followupQuestions: string[] }[];
  followupQuestions: string[];
  citations: string[];
  timestamp: string;
  isUserMessage: boolean;
  sessionName: string;
  createDate: number;
  parentId: string;
  // partition keys
  UserId: string;
  SessionId: string;
};

async function getContainer() {
  const { database } = await client.databases.createIfNotExists({ id: DB_ID });
  const { container } = await database.containers.createIfNotExists({
    id: CONTAINER_ID,
  });
  return container;
}

export async function saveSession({
  thread,
  userId,
  sessionId,
}: {
  thread: ChatThread[];
  userId: string;
  sessionId: string;
}) {
  try {
    const operations: OperationInput[] = [];
    const container = await getContainer();
    const [firstEntry] = thread;
    console.log("Creating items in the database", { userId, sessionId });

    for (let entry of thread) {
      entry = {
        ...entry,
        UserId: userId,
        SessionId: sessionId,
        sessionName: entry.text[0].value,
        createDate: Date.now(),

        // the first message in the thread will have a parentId of undefined
        parentId: firstEntry.parentId || firstEntry.id,
      };
      operations.push({
        partitionKey: [userId, sessionId],
        operationType: BulkOperationType.Upsert,
        resourceBody: entry,
      });
    }

    const { diagnostics } = await container.items.bulk(operations);
    console.log("Items upserted successfully");

    return { diagnostics };
  } catch (error: any) {
    if (error.code === 409) {
      console.log("There was a conflict with an existing item");
      console.log(error);
    }
  }
}

export async function readSession({
  userId,
  sessionId,
}: {
  userId: string;
  sessionId: string;
}) {
  const partitionKey = [userId, sessionId];
  console.log("Reading items", { userId, sessionId });

  const container = await getContainer();
  const querySpec = { query: "SELECT * from c" };
  const { resources: items, diagnostics } = await container.items
    .query(querySpec, { partitionKey })
    .fetchAll();
  return { items, diagnostics };
}

export async function deleteSession({
  userId,
  sessionId,
}: {
  userId: string;
  sessionId: string;
}) {
  console.log("Deleting items", { userId, sessionId });

  const container = await getContainer();
  const querySpec = {
    query: "SELECT * from c",
  };
  const { resources: items } = await container.items
    .query(querySpec, {
      partitionKey: [userId, sessionId],
    })
    .fetchAll();
  const operations: OperationInput[] = [];
  for (let entry of items) {
    operations.push({
      partitionKey: [userId, sessionId],
      operationType: BulkOperationType.Delete,
      id: entry.id,
    });
  }
  const { diagnostics } = await container.items.bulk(operations);
  console.log("Items deleted successfully");

  return { diagnostics };
}

export async function listSessions({ userId }: { userId: string }) {
  console.log("Listing items", { userId });

  const container = await getContainer();

  // Note: r.parentId = r.id means the first message in the thread
  const querySpec = {
    query: `SELECT r.createDate, r.id, r.SessionId, r.UserId, r.sessionName FROM root r WHERE r.UserId = "${userId}" AND r.isUserMessage = true AND r.parentId = r.id GROUP BY r.createDate, r.SessionId, r.UserId, r.id, r.sessionName`,
  };
  const { resources: items, diagnostics } = await container.items
    .query(querySpec)
    .fetchAll();
  return { items, diagnostics };
}
