var express=require("express");
var app=express();
app.use(express.urlencoded({extended:false}));
var mysql=require('mysql');
var cors=require('cors');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var connection=mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'fsd_lab'
});
app.get('/db',(req,res)=>
{
res.send("Success");
});
app.get('/',(req,res)=>
{

    res.sendFile(__dirname+'/form.html');
}
);
app.post('/validate',(req,res)=>
{
    var uname=req.body.uname;
    var pwd=req.body.pwd;
    connection.query('insert into test(uname,pwd) values("'+uname+'","'+pwd+'")');
    res.send("successfully inserted.");
});
app.get('/validate',(req,res)=>
{
    var uname=req.body.uname;
    var pwd=req.body.pwd;
    connection.query('insert into test(uname,pwd) values("'+uname+'","'+pwd+'")');
    res.send("successfully inserted.");
});
app.get('/display',(req,res)=>{
var s1='select *from test';
connection.query(s1,function(err,result){
    if(err) throw err;
    console.log(result);
    res.send(result);
})
}
);
app.get('/display/:disp',(req,res)=>{
    var s1='select *from test where uname="'+req.params.disp+'"';
    connection.query(s1,function(err,result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
    }
    );
    app.post('/update/:disp',(req,res)=>{
        var pwd=req.body.pwd;
        var s1='update test set pwd="'+req.body.pwd+'" where uname="'+req.params.disp+'"';
        connection.query(s1,function(err,result){
            if(err) throw err;
            console.log(result);
            res.send(result);
        })
        }
        );
        app.get('/delete/:disp',(req,res)=>{
            var s1='delete from test where uname="'+req.params.disp+'"';
            connection.query(s1,function(err,result){
                if(err) throw err;
                console.log(result);
                res.send(result);
            })
            }
            );
app.listen(1234,()=>
{
    console.log("Server is listening");
});