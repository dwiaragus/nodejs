/* Copyright (c) 2015, 2021, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   connect.js
 *
 * DESCRIPTION
 *   Tests a basic connection to the database.
 *   See dbconfig.js for information on connectString formats.
 *
 *   For a connection pool example see connectionpool.js
 *
 *   This example uses Node 8's async/await syntax.
 *
 *****************************************************************************/

 'use strict';

 const oracledb = require('oracledb');
 const dbConfig = require('./dbconfig.js');
 
 // On Windows and macOS, you can specify the directory containing the Oracle
 // Client Libraries at runtime, or before Node.js starts.  On other platforms
 // the system library search path must always be set before Node.js is started.
 // See the node-oracledb installation documentation.
 // If the search path is not correct, you will get a DPI-1047 error.
 if (process.platform === 'win32') { // Windows
   oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_12_1' });
 } else if (process.platform === 'darwin') { // macOS
   oracledb.initOracleClient({ libDir: process.env.HOME + '/Downloads/instantclient_19_8' });
 }
 
 async function run() {
 
   let connection;
   
   try {
    oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_12_1'});
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
  }
 
   try {
     // Get a non-pooled connection
     connection = await oracledb.getConnection(dbConfig);
 
     console.log('Connection was successful!');
 
   } catch (err) {
     console.error(err);
   } finally {
     if (connection) {
       try {
         await connection.close();
       } catch (err) {
         console.error(err);
       }
     }
   }
 }
 
 run();