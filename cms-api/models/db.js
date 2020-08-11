const mysql = require('mysql');
//创建连接
/*const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '960604',
    database : 'cms'
});*/ //这样每次连接完都要废掉,反复创建和舍弃,浪费资源
//所以创建连接池,用时即用,不用时待命
const pool  = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'960604',
    database:'cms'
});
//操作数据
/*connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});*/
//关闭连接
/*connection.end();*/


//封装mysql,避免重复的写和拿用连接数据库
/**
 * query方法(SQL语句):
 *  查询返回的是数组
 *  增删改返回的是对象
 * @param sqlStr
 * @returns {Promise<unknown>}
 */
exports.query = function (sqlStr) {
    //从连接池中拿一个连接
    return new Promise ((resolve,reject) =>{
        pool.getConnection((err, connection) => {
          if (err){
              return reject(err)
          }
          connection.query(sqlStr,(err,...args) =>{
              //操作结束,尽早的释放连接,保持连接池有连接
              connection.release();
              if (err){
                  return reject(err)
              }
              resolve(...args)
          })
        })
    })
}