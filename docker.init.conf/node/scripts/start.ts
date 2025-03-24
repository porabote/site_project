import fs from 'fs';
import * as readline from 'node:readline/promises';
import {
  stdin as input,
  stdout as output,
} from 'node:process';

class ConfigFilesCreator {

  projectType;

  run = async () => {

    const _reader = readline.createInterface({input, output});

    this.projectType = await _reader.question(
      'Enter project type (crm or site):'
    );

    this.makeNginxConfFile();
    this.makeDockerComposeConfFile();
    _reader.close();
  }

  makeNginxConfFile = async () => {

    //NGINX site.conf
    if (this.projectType == "site") {
      let destSitePath = "./docker.init.conf/nginx/conf.d/site.conf";
      await this.copyFile(
        "./docker.init.conf/nginx/conf.d.sample/site.conf", 
        destSitePath
      );
      this.replaceEnvVariables(destSitePath);
    }

    //NGINX host.conf
    let hostPath = `./docker.init.conf/nginx/conf.d.sample/outside-${process.env['HOST_SERVER_NAME']}.conf`;
    await this.copyFile("./docker.init.conf/nginx/conf.d.sample/host.conf", hostPath);
    this.replaceEnvVariables(hostPath);

    //NGINX porabote.conf
    let destPath = "./docker.init.conf/nginx/conf.d/porabote.conf";
    await this.copyFile(
      "./docker.init.conf/nginx/conf.d.sample/porabote.conf",
      destPath
    );
    this.replaceEnvVariables(destPath);

  }

  makeDockerComposeConfFile = async () => {
    let destPath = "./compose.yaml";
    await this.copyFile(
      "./docker.init.conf/docker/sample/compose.yaml",
      destPath
    );
    this.replaceEnvVariables(destPath);
  }

  replaceEnvVariables = (path) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }

      for (let envParam in process.env) {
        let value = process.env[envParam];

        let pattern = new RegExp(String.raw`{{${envParam}}}`, "g");
        data = data.replace(pattern, value);
      }

      fs.writeFile(path, data, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  }

  copyFile = async (src, dest) => {
    try {

      if (!fs.existsSync(dest)) {// && fs.lstatSync(dest).isFile()
        let file = await fs.open(dest, 'w', (err) => {
          if(err) throw err;
          console.log('File created');
        });
        file?.close();
      }

      await fs.copyFile(src, dest, (err) => {
        if (err) throw err;
        console.log(`${src} was copied to ${dest}`);
      });
    } catch (e) {
      console.log(e);
    }
  }

}

const configFileCreator = new ConfigFilesCreator();
configFileCreator.run();