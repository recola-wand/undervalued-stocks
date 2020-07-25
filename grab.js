//financial navi, fitb, dfs

//tech xrx, NTAP

//energy OKE

//communication DISCA, T

//real estate VNO, SPG

//consumer RL

//industrials ARNC

//food ADM

//xray stock


profit=[]
$.each(reponse, function(k,b){
if(b.defaultKeyStatistics.pegRatio.raw > 0 && b.defaultKeyStatistics.earningsQuarterlyGrowth.raw > 0 && //b.defaultKeyStatistics.priceToBook.raw < 1 && 
b.defaultKeyStatistics.profitMargins.raw > .10 && b.summaryProfile.sector != "Financial Services"){
console.log(b.symbol)
profit.push(b)
}
})

profit = profit.sort(function(a, b){
return a.defaultKeyStatistics.priceToBook.raw - b.defaultKeyStatistics.priceToBook.raw
})


getStocks = function(splist){
    var t = 0;
    spdata=[]
    spretry=[];
    spcount = splist.length;
    $.each(splist, function(a,s){
    t=t+200;
    setTimeout(function(){
        spcount =spcount -1
    console.log(s.Symbol);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=US&lang=en&symbol="+s.Symbol,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "private-get-you-own-api-key"
        }
    }
    
    $.ajax(settings).done(function (response) {
    spdata.push(response)
    }, function(){
    
    spretry.push(s)
    });
    
    if(spcount == 1){
        console.log("bout to retry")
        setTimeout(function(){
            addStocks(spretry)
        }, 3000)
    
    }
    
    }, t);
    
    
    })

}
