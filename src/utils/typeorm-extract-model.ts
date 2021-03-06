import * as dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config();

let debug: boolean = true;
/**
 * Separate arguments of the command to get it
 * @param {schema} - Schemas of Postgres separate by commas ej: user,catalogue,product
 * @param {out} - Directory to save entities in the repository ej: src/entities_new
 * @return {}
 * */
const getArgs = () => {
  const args = {};
  process.argv.slice(2, process.argv.length).forEach(arg => {
    // long arg
    if (arg.slice(0, 2) === '--') {
      const longArg = arg.split('=');
      const longArgFlag = longArg[0].slice(2, longArg[0].length);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      args[longArgFlag] = longArgValue;
    }
    // flags
    else if (arg[0] === '-') {
      const flags = arg.slice(1, arg.length).split('');
      flags.forEach(flag => {
        args[flag] = true;
      });
    }
  });
  return args;
};

/**
 * Set UP AWS Credetials and throw the typeorm-model-generator command
 * @param {}
 * @return {}
 * */
const extractModels = async () => {
  const args: any = getArgs();

  process.env.STAGE = await execSync(`git branch --show-current`)
    .toString()
    .replace('\n', '');
  
  if(!process.env.STAGE.match(/^(dev|qa|master)$/)) process.env.STAGE = 'dev'

  if (debug) console.log('Arguments', args);
  if (debug) console.log('Migrations for STAGE:', process.env.STAGE);


  const schema = args.schema ? args.schema : process.env.TYPEORM_SCHEMA;
  const out = args.out ? args.out : process.env.TYPEORM_OUT;

  if (debug) console.log('Extracting entities... command ...');

  await execSync(
    `npx typeorm-model-generator -h ${process.env.TYPEORM_HOST} -d ${process.env.TYPEORM_DATABASE} -p ${process.env.TYPEORM_PORT} -u ${process.env.TYPEORM_USERNAME} -x ${process.env.TYPEORM_PASSWORD} -e ${process.env.TYPEORM_CONNECTION} -s ${schema}  --output ${out}`,
    { stdio: 'pipe' }
  ).toString();
  //Unless you specify your desired folder, command always generate a new folder inside called "entities" for that, here take all files and move in the proper folder
  /**IN PROGRESS jaja */
  //For secret variables, delete ormconfig.json generated 
  //this Won't Work for now on Cmd & Powershell
  await execSync(`rm -rf ${out}/ormconfig.json ${out}/tsconfig.json `);
  
  if (debug) console.log('Done ✔️');
};

extractModels();
