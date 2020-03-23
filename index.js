const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const request = require('request');

//routes
app.get("/", async function(req, res){
    
 let parsedData = await getImages("otters","vertical");
 
 //console.dir("parsedData: " + parsedData); //displays content of the object
    
 res.render("index", {"images":parsedData});
            
});


app.get("/results", async function(req, res){
    
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    let orientation = req.query.orientationInput;
    
    let parsedData = await getImages(keyword,orientation);

    res.render("results", {"images":parsedData});
    
});//results route


//Returns all data from the Pixabay API as JSON format
function getImages(keyword, orientation){
    
    
    return new Promise(function(resolve, reject){
        request('https://pixabay.com/api/?key=15427240-0a0cdf747df6fa42f590ac319'+ "&q=" + keyword + "&orientation=" + orientation,
                 function (error, response, body) {
    
                    if (!error && response.statusCode == 200  ) { //no issues in the request
                
                        let parsedData = JSON.parse(body); //converts string to JSON
                        
                        //console.dir(parsedData)
                 
                        resolve(parsedData);
                        
                        //let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
                        //res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                        //res.render("index", {"image":parsedData.hits[randomIndex].largeImageURL});
                
                    } else {
                        reject(error);
                        console.log(response.statusCode);
                        console.log(error);
                    }
    
                });
   
    });
    
}


//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});