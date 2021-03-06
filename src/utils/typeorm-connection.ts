import { createConnection, getConnectionManager } from 'typeorm';
import { types } from 'pg';
import models from '../entities';

const enableParse = async () => {

  types.setTypeParser(1700, function(val) {
    return parseInt(val);
  });
};
/**
 * Create Typeorm connection
 * Example: Receive index: 0 Column of Type name, sheet: Hidden sheet of the catalogue, element: 'Devolución', the result must be the typeID of Devolución = 1
 * @param {boolean} read - Flag to connect to Read Only Database
 * @return {}
 * */
export const initConnection = async () => {
  let debug = false;
  const debugLabel = `TypeOrm Connection Start ${new Date()}`;  
  const manager: any = getConnectionManager();
  
  console.time(debugLabel);
  
  enableParse();
  if( debug) console.log('Number of connections BEFORE:', manager.connections.length);
  if (manager.connections.length === 0) {      
    const result = await createConnection({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      schema: process.env.TYPEORM_SCHEMA,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: models,
      synchronize: false,
      logging: false
    });     
  }
  

  if (debug) console.log('DB Connected');
  if (debug) console.log('Connection Manager', manager.connections[0]?.manager);
  if( debug) console.log('Number of connections AFTER:', manager.connections.length);

  console.timeEnd(debugLabel);
};
