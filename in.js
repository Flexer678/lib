const request = require('request')
const cheerio = require('cheerio');


async function getSearch(search, page) {
    let searchFilter = search.replace(" " , "+")
    searchFilter = searchFilter.replace("&", "&26")
    obj = new Object();
    obj.books = []
    
    const url = 'http://libgen.rs/search.php?req=$'+searchFilter+'&open=0&res=100&view=detailed&phrase=1&column=$title&page='+ page.toString()
    request(url, (error,response, html) => {
    if (!error && response.statusCode== 200) {
        const $ = cheerio.load (html);
        
        $('table').each((i, el)=>{
            
           if($(el).find('img').attr('src') != null){
            
                const info = $(el).find("b") ;
                const author = $(info.get(1)).text();
                const title = $(info.get(0)).text();
                let linkUnfiltered = $(el).find("td b a").attr("href")
                const link = linkUnfiltered.replace(".." , "http://libgen.rs")
                const img = "http://library.lol" + $(el).find('img').attr('src');
                obj.books.push({
                    "author" : author,
                    "title" : title,
                    "img": img,
                    "url" : link,
                    
                })
            
           }else{

           }
        })
        console.log(obj)
        return []

    
    }else{
        return obj
    }

   });

}

//getSearch("middle school", 1)

async function getDetails(url){
    obj = new Object();
    obj.books = []
    request(url, (error,response, html) => {
    if (!error && response.statusCode== 200) {
        console.log("woring")
        const $ = cheerio.load (html);
        
        const title = $("body > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3) > b:nth-child(1) > a:nth-child(1)").text()
            const author = $("body > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > b:nth-child(1)").text()
            const details = $('body > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(19) > td:nth-child(1)').text()
            const download = $('body > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(18) > td:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').attr('href')
            const img = 'http://libgen.rs'+$('body > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > a:nth-child(1)').find('img').attr('src')
            const url = $('body > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(18) > td:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').attr('href')
            obj.books.push({
                    "title" : title,
                    "author" : author,
                    "details": details,
                    "image": img,
                    "download" : download,
                    
                })
        console.log(obj)
        return []

    
    }else{
        return obj
    }

   });

}



 async function download(url){
    obj = new Object();
    obj.books = []
    request(url, (error,response, html) => {
    if (!error && response.statusCode== 200) {
        console.log("woring")
        const $ = cheerio.load (html);
        
        const downlaodlink = $("#download > h2:nth-child(1) > a:nth-child(1)").attr("href")
            obj.books.push({
                'downlaodlink' :downlaodlink 
                    
                })
        console.log(obj)
        return []

    
    }else{
        return obj
    }});
 }

 download("http://library.lol/main/AC901C92D82255ED0570285C5FCEB0CB");