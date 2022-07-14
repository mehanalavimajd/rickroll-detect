const express = require('express');
const isUrl = require('is-url');
let {rick,count} = require('./rickroll.json');
const app = express();
// express.json
app.use(express.json());
// express.urlencoded
app.use(express.urlencoded({ extended: true }));
// express.static
app.use(express.static('views'));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
})
app.post("/",(req,res)=>{
    const {roll} = req.body;
    for (let rickroll = 0; rickroll < rick.length; rickroll++) {
        const link = rick[rickroll];
        if (roll===link) {
            res.sendFile(__dirname+"/views/index.html");
            // sending that it's a rickroll
            count++;
            // update count to json file
            require('fs').writeFileSync('./rickroll.json',JSON.stringify({rick,count}));
            res.send("<h1>It's a rickroll</h1> <h2> helped "+count+" people it total</h2>");
            return;
        }else{
            count++;
            res.send("<h1>It's not a rickroll</h1> <h2> helped "+count+" people in total</h2>");
            require('fs').writeFileSync('./rickroll.json',JSON.stringify({rick,count}));
            return;
        }
    
    }
})
app.post("/roll",(req,res)=>{
    const {roll} = req.body;
    if (isUrl(roll)) {
            rick.push(roll);
            require('fs').writeFileSync('./rickroll.json',JSON.stringify({rick,count}));
            res.send("<h1>Added to rickroll. </h1> <h2> Thanks for helping us!</h2>");
    }else{
        res.send("<h1>Not a valid url</h1> <h2> Please try again</h2>");
}
    // update rick in json

    // update json file

})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
