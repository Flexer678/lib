const request = require('request')
const cheerio = require('cheerio');


async function getSearch(search, page) {
    let searchFilter = search.replace(" " , "+")
    searchFilter = searchFilter.replace("&", "&26")
    obj = new Object();
    obj.books = []
    
    for( let x =1 ; x< page; x++){
    const url = 'http://libgen.rs/search.php?req=$'+searchFilter+'&open=0&res=100&view=detailed&phrase=1&column=$title&page='+x.toString()
    console.log(url)
    request(url, (error,response, html) => {
    if (!error && response.statusCode== 200) {
        console.log("woring")
        const $ = cheerio.load (html);
        
        $('table').each((i, el)=>{
            
           if($(el).find('img').attr('src') != null){
            
                const info = $(el).find("b") ;
                const author = $(info.get(1)).text();
                const title = $(info.get(0)).text();
                let linkUnfiltered = $(el).find("td b a").attr("href")
                const link = linkUnfiltered.replace(".." , "http://libgen.rs")
                const img = "http://library.lol" + $(el).find('img').attr('src');
                console.log(i,title)
                obj.books.push({
                    "author" : author,
                    "title" : title,
                    "img": img,
                    "url" : link,
                    
                })
            
           }
           

        })

    }else{
        return null       
    }

     });
    }
    console.log(obj)
    return obj

}

getSearch("middle school", 4)

async function detailed( url){

}
//https://stackoverflow.com/questions/8963693/how-to-create-json-string-in-javascript
