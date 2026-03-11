import path from "node:path";
import { pathToFileURL } from "node:url";

const srcDir = path.resolve("src");

export function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const resolved = pathToFileURL(path.join(srcDir, specifier.slice(2)));
    return nextResolve(resolved.href, context);
  }
  return nextResolve(specifier, context);
}
