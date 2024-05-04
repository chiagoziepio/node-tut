const http = require("http");
const fs = require('fs');
const fspromises = require("fs").promises
const path = require("path")

const PORT = process.env.PORT || 5000

const renderFile = async(filePath, contentType, response)=>{
    try {
        const data =  await fspromises.readFile(filePath, "utf8")
        response.writeHead(200, {"content-Type": contentType})
        response.end()
        
    } catch (error) {
        console.log(error);
        response.statusCode = 500;
        response.end()
    }
}

const server = http.createServer((req,res)=>{
    console.log(req.url, req.method);
   /*  if(req.url=== "/" || "index.html"){
        res.statusCode = 200;
        res.setHeader("content-Type", "text/html");

       fs.readFile(path.join(__dirname, "pages", "index.html"), "utf8", (err, data)=>{
        res.end(data);
       })
    } */
    const fileExtention = path.extname(req.url)

    let contentType ;
    switch (fileExtention) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
    
        case ".json":
            contentType = "application/json";
            break;
    
        case ".jpg":
            contentType = "image/jpeg";
            break;
    
        case ".png":
            contentType = "image/png";
            break;
    
        case ".txt":
            contentType = "text/plain"
            break
    
        default:
            contentType = "text/html"
            
    };
    let filePath =
                contentType=== "text/html" && req.url === "/"
                    ? path.join(__dirname, "pages", "index.html")
                    :contentType === "text/html" && req.url.slice(-1) === "/"
                        ?path.join(__dirname, "pages", req.url, "index.html")
                        :contentType === "text/html"
                            ?path.join(__dirname, "pages", req.url)
                            :path.join(__dirname, req.url);

    // this will make the html extention not required and will server the correct req.url if it exist
    if(!fileExtention && req.url.slice(-1) !== "/") filePath = ".html"

    const fileExist = fs.existsSync(filePath)

    if (fileExist) {
        renderFile(filePath, contentType, res)
        
    } else {
        switch(path.parse(filePath).base){
            case "old-page.html":
                res.writeHead(301, {"loction":"/new-page.html"})
                res.end()
                break;
            case "www.page.html":
                res.writeHead(301, {"location": "/"})
                res.end()
                break;
            default:
                renderFile(path.join(__dirname, "pages", "error.html"), "text/html", res)
        }
    }

})


server.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
})