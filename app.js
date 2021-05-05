const express = require("express");
const bodyparser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const async = require("async");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/", function (req,res)
  {
  res.sendFile(__dirname + "/signup.html");
  });

    mailchimp.setConfig( {
      apiKey:"cfb5fe863a82f2fabe0b85bbccbf4642-us1",
      server:"us1"
    });



app.post("/",function(req, res)
 {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const listId = "30b1815b3a";

  const subscriber =
  {
    firstname:firstname,
    lastname:lastname,
    email:email
  };


  async function run()
  {
    const object = await mailchimp.lists.addListMember(listId,
    {
      email_address:subscriber.email,
      status:"subscribed",
      merge_fields:
      {
        FNAME:subscriber.firstname,
        LNAME:subscriber.lastname
      }
    });
    console.log(subscriber);
    res.sendFile(__dirname + "/success.html");

  }
    run().catch(e => res.sendFile(__dirname + "/fail.html"));
  });






 app.listen(process.env.PORT || 3000, function()
{
  console.log("we here");
});





// async function run()
// {
//   const object = awaitmailchimp.lists.addListMember(listId,
//   {
//     email_address:subscriber.email,
//     status:"subscribed",
//     merge_fields:
//     {
//       FNAME:subscriber.firstname,
//       LNAME:subscriber.lastname
//     }
//   });
//   res.sendFile(__dirname + "/success.html");
//
// }
//   run().catch(e => res.sendFile(__dirname + "/fail.html"));
// });
