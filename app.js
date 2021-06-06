const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html")
});

app.post("/", function(req, res){

  //getting elements from the body parser
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  // create a data to post to the api while the data is javascript object which sd be converted to json
  var data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonDataUser = JSON.stringify(data);

  //console.log(firstName, lastName, email)
  var options = {
    url: "https://us6.api.mailchimp.com/3.0/lists/caff31beb9",
    method: "POST",
    headers:{
      "Authorization":"sunil1 ee2bb328e69946c1ceacd38571150392-us6"
    },
    body:jsonDataUser
  };

  request(options, function(error, response, body){
      if(error){
        res.sendFile(__dirname+"/failure.html");
      }
      else {
        if(response.statusCode===200){
          res.sendFile(__dirname+"/success.html");
        }
        else{
          res.sendFile(__dirname+"/failure.html");
        }
      }
  });

});

app.post("/failure", function(req, res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
  console.log("server started on port 3000");
});


//mail chimp api calls
// https://mailchimp.com/developer/marketing/api/lists/batch-subscribe-or-unsubscribe/

//api key
//ee2bb328e69946c1ceacd38571150392-us6

//list id https://mailchimp.com/help/find-audience-id/
//caff31beb9

//server prefix
//us6
