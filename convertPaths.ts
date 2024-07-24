import fs from "fs";
import path from "path";

const cwd = process.cwd();
const files = process.argv.slice(2);

files.forEach((file) => {
  const filePath = path.resolve(cwd, file);
  let content = fs.readFileSync(filePath, "utf8");

  content = content.replace(/\.\.\/\.\.\//g, "@/");

  fs.writeFileSync(filePath, content, "utf8");
});
