import { join, extname } from 'std/path/mod.ts'
import { contentType } from "std/media_types/mod.ts";

const reqHandler = async (req: Request) => {
  const filePath = join('./', new URL(req.url).pathname);

  let fileSize
  try {
    fileSize = (await Deno.stat(filePath)).size;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return new Response(null, { status: 404 });
    }
    return new Response(null, { status: 500 });
  }

  const body = (await Deno.open(filePath)).readable;
  return new Response(body, {
    headers: {
      "content-length": fileSize.toString(),
      "content-type": contentType(extname(filePath)) || "application/octet-stream",
    },
  });
};

Deno.serve({ port: 4999 }, reqHandler);
