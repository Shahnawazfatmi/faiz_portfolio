// Post-build fix for Next 16 static export: the client prefetches route segments as
// flat, dot-joined files (e.g. /work/__next.!KHNpdGUp.work.__PAGE__.txt) but the export
// writes them nested (/work/__next.!KHNpdGUp/work/__PAGE__.txt). Plain static hosts
// would 404, so mirror every nested segment file to its flat name.
import { copyFile, readdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if (!(await stat(p)).isDirectory()) continue;
    if (name.startsWith("__next.")) await flatten(dir, p);
    else await walk(p);
  }
}

async function flatten(pageDir, segDir) {
  for (const name of await readdir(segDir)) {
    const p = join(segDir, name);
    if ((await stat(p)).isDirectory()) await flatten(pageDir, p);
    else if (name.endsWith(".txt")) {
      await copyFile(p, join(pageDir, relative(pageDir, p).split(sep).join(".")));
      copied++;
    }
  }
}

await walk(OUT);
console.log(`fix-export: mirrored ${copied} prefetch segment file(s)`);
