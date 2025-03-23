import fs from 'fs';
import {join, dirname, resolve} from "node:path";
import * as readline from 'node:readline/promises';
import {
  stdin as input,
  stdout as output,
} from 'node:process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//
//
// class Installer {
//
//   targetPath = null;
//
//   run = async () => {
//
//     const _reader = readline.createInterface({input, output});
//
//     this.targetPath = await _reader.question(
//       'Enter target directory:'
//     );
//
//     this.targetPath = configs.www_path + '/' + this.targetPath;
//
//     this.createTargetDirectory(this.targetPath);
//
//     this.cloneDockerRepository();
//     // this.cloneApiRepository();
//     // this.cloneClientsRepositories();
//
//     this.printWhatNext();
//
//     _reader.close();
//   }
//
//   createTargetDirectory = (dir) => {
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, {recursive: true});
//     }
//     console.log('Directory created');
//   }
//
//   cloneDockerRepository = (source, dest) => {
//     fs.cpSync(source, dest, {
//       filter: (path) => {
//         return path.indexOf('sources/packages') == -1
//       },
//       recursive: true,
//     });
//     console.log('Docker compose repository cloned');
//   }
// }
//

//
// let installer = new Installer();
//installer.run();

const printInfo = () => {
  console.log('Для копирования папок исполните команду:');
  console.log('1. frontend: $node ./scripts/clone.ts folder:porabote-frontend');
}

const cloneDockerRepository = (source, dest) => {console.log(source, dest);
  fs.cpSync(source, dest, {recursive: true});
  console.log('Frontend repository cloned');
}

const run = () => {
  try {

    let folderName = null;

    process.argv.forEach(function (val, index, array) {
      let [key, value] = val.split(":");
      if (key === "folder" && typeof value != "undefined") {
        folderName = value;
      }
    });

    if (folderName) {
      if (folderName === "porabote-frontend") {
        cloneDockerRepository(
            join(__dirname, '../packages/porabote-frontend/'),
            join(__dirname, '../volumes/frontend/')
        );
      }
      console.log(folderName);
    } else {
      throw new Error("none");
    }
  } catch (e) {
    console.error(e);
    printInfo();
  }
}

run();