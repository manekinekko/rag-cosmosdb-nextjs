import { NextResponse } from "next/server";
import { deleteSession, readSession, saveSession } from "../../_lib";

export async function GET(
  _request: Request,
  { params }: { params: { partitionKey: [userId: string, sessionId: string] } }
) {
  return NextResponse.json(await readSession(params.partitionKey), {
    status: 200,
  });
}

export async function POST(request: Request) {
  const { thread, userId, sessionId } = await request.json();
  const { diagnostics } = (await saveSession({
    thread,
    userId,
    sessionId,
  })) as any;

  return NextResponse.json(
    {
      diagnostics,
      items: (await readSession([userId, sessionId])).items,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(request: Request) {
  const { userId, sessionId } = await request.json();
  const { diagnostics } = await deleteSession({ userId, sessionId });

  return NextResponse.json(
    {
      diagnostics,
      items: (await readSession([userId, sessionId])).items,
    },
    {
      status: 200,
    }
  );
}
