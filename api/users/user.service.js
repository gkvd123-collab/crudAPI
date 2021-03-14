const db=require('../../config/database')


module.exports={
    create:(data,callBack) => {
           db.query(
        `insert into registration(firstName,lastName,gender,email,password,number)
          values(?,?,?,?,?,?)`,
          [
              data.firstName,
              data.lastName,
              data.gender,
              data.email,
              data.password,
              data.number  
          ],
          (err,results,fields)=>{
              if(err){
                return  callBack(err)
              }else{
                return  callBack(null,results)
              }
          }
           );
        },
        getUser:callBack=>{
          db.query('select id,firstName,lastName,gender,email,number from registration'
          ,[],
          (err,result,fields)=>{
            if(err){
              return callBack(err)
            }
            else{
              return callBack(null,result)
            }
          }
          )
        },
          getUserById:(id,callBack)=>{
            console.log(id,'dkdk');
            db.query(`select id,firstName,lastName,gender,email,number from registration where id = ?`
            ,[id]
            ,
            (err,result,field)=>{
              if(err){
                console.log(result,'ressf');
                return callBack(err)
              }
              else{
                console.log(result,'ressf');
                return callBack(null,result[0])
              }
            })
          }
          ,
          updateUserById:(data,callBack)=>{
            db.query('update registration set firstName=?,lastName=?,gender=?,email=?,password=?,number=?  where id=?'
            ,[
              data.firstName,
              data.lastName,
              data.gender,
              data.email,
              data.password,
              data.number,
              data.id
            ]
            ,
            (err,result,field)=>{
              if(err){
                return callBack(err)
              }
              else{
                return callBack(null,result[0])
              }
            }
            )
          },
          deletUserById:(id,callBack)=>{
            db.query('delete from registration where id=? '
            ,[id]
            ,
            (err,result,field)=>{
              if(err){
                return callBack(err)
              }
              else{
                return callBack(null,result[0])
              }
            }
            )} 
          ,
          getUserByUserEmail:(email,callBack)=>{
            db.query(
              'select *from registration where email=?',
              [email],
              (err,results,fields)=>{
                if(err){
                  return callBack(err)
                }
                return callBack(null,results[0])
              }
            )
          }
    }