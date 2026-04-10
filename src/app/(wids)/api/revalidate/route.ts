import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const revalidateToken = request.headers
    .get("authorization")
    ?.replace("Bearer ", "");

  if (revalidateToken !== process.env.REVALIDATE_TOKEN) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const revalidateAll = request.nextUrl.searchParams.get("all") === "true";

  if (revalidateAll) {
    revalidatePath("/", "layout");

    return Response.json({
      revalidated: true,
      now: Date.now(),
      message: "Full layout revalidation triggered",
      all: true,
    });
  }

  const paths =
    request.nextUrl.searchParams
      .get("path")
      ?.split(",")
      .map((path) => path.trim())
      .filter(Boolean) ?? [];
  const tags =
    request.nextUrl.searchParams
      .get("tag")
      ?.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean) ?? [];

  if (tags.length > 0) {
    for (const tag of tags) {
      revalidateTag(tag, "max");
    }
  }

  if (paths.length > 0) {
    for (const path of paths) {
      revalidatePath(path);
    }
  }

  if (tags.length > 0 || paths.length > 0) {
    return Response.json({
      revalidated: true,
      now: Date.now(),
      message: "Revalidation triggered",
      tags,
      paths,
    });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path or tag to revalidate",
  });
}
