const express = require("express");

const fs =require('fs')
const app = express ();
const users = require("./MOCK_DATA.json");
const PORT = 8000;

//middleware
app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.get("/api/users",(req,res) =>{
    return res.json(users);
})
app.get("/users",(req,res) =>{
    const html =`
  <ul>
${users.map(user => `<li>${user.first_name}</li>`).join("")}
  </ul> 
`;
res.send(html);
});

app.route("/api/users/:id").get((req,res) =>{
   const id = Number(req.params.id);
   const user = users.find((user) => user.id === id);
   return res.json(user);


}).put((req,res)=>{
    //edit user with id
    res.json({status : "pending"});
})
.delete((req,res) => {
    //delete user with id
     res.json({status : "pending"})
});


app.post("/api/users",(req,res) =>{
    const body =req.body;
    users.push({ ...body, id: users.length + 1});
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) =>{
            return res.json({status: "sucess", id: users.length + 1});
        });
});


app.listen(PORT, () => console.log(`server started at PORT:${PORT}`))




