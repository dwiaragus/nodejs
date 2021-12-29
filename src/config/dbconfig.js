const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
dotenv.config({ path: path.join(__dirname, '../../.env') });

var oracledb = require('oracledb');
oracledb.initOracleClient({configDir: 'C:\\oracle\\instantclient_12_1'});
oracledb.getConnection({
      user: process.env.NODE_ORACLEDB_NAME,
      password: process.env.NODE_ORACLEDB_PASSWORD,
      connectString: process.env.NODE_ORACLEDB_HOST
}, function(err, connection) {
if (err) {
    console.error(err.message);
    return;
}
     connection.execute("SELECT * FROM TRX_PRF_EXPENSE",[], function(err, result) {
    if (err) { console.error(err.message);
          doRelease(connection);
          return;
     }
     console.log(result.metaData);
     console.log(result.rows);
     doRelease(connection);
   });
});
function doRelease(connection) {
       connection.release(function(err) {
         if (err) {
          console.error(err.message);
        }
      }
   );
}