import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "../../../");

export const tempDir = path.join(rootDir, "temp");
export const uploadDir = path.join(rootDir, "uploads");