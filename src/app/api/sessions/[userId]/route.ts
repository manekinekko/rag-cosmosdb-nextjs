import { NextResponse } from "next/server";
import { listSessions } from "../../_lib";

export async function GET(
  _request: Request,
  { params }: { params: { userId: string } }
) {
  return NextResponse.json(await listSessions({ userId: params.userId }), {
    status: 200,
  });
}
