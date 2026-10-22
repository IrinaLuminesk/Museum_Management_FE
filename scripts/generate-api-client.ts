
import path from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { Project } from "ts-morph";

const root = process.cwd();

const inputPath = path.join(
    root,
    "src/api/api-client.ts"
);

const outputPath = path.join(
    root,
    "src/api/apiClient.ts"
);

const project = new Project({
    skipAddingFilesFromTsConfig: true,
});

const sourceFile = project.addSourceFileAtPath(inputPath);

const clients = sourceFile
    .getClasses()
    .filter(
        (cls) =>
            cls.isExported() &&
            cls.getName()?.endsWith("Client")
    )
    .map((cls) => cls.getName()!)
    .sort();

if (clients.length === 0) {
    throw new Error("No generated client classes found.");
}

const imports = clients
    .map((name) => `  ${name},`)
    .join("\n");

const instances = clients
    .map((name) => {
        const serviceName =
            `_${name.replace(/Client$/, "Service")}`;

        return [
            `export const ${serviceName} =`,
            `  new ${name}(API_BASE_URL, apiAxios);`,
        ].join("\n");
    })
    .join("\n\n");

const output = `// AUTO-GENERATED FILE. DO NOT EDIT.
import {
${imports}
} from "./api-client";

import { apiAxios } from "./AxiosTrack";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

${instances}
`;

mkdirSync(path.dirname(outputPath), {
    recursive: true,
});

writeFileSync(outputPath, output, "utf8");

