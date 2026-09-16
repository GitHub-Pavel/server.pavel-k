const fs = require('fs');
const path = require('path');

function searchDirectory(dirPath, searchTerm) {
  let results = [];
  const list = fs.readdirSync(dirPath);
  
  list.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(searchDirectory(fullPath, searchTerm));
    } else {
      if (file.includes(searchTerm)) {
        results.push(fullPath);
      }
    }
  });
  
  return results;
}

function copySchema(schema) {
  fs.copyFileSync(schema, path.join(process.cwd(), 'prisma/models/', path.basename(schema)));
  return schema;
}

function deleteSchema(schema) {
  fs.rmSync(path.join(process.cwd(), 'prisma/models/', path.basename(schema)), { force: true });
  return schema;
}

searchDirectory(path.join(process.cwd(), 'src/areas'), '.prisma').map(deleteSchema).map(copySchema);