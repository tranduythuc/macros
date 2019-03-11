//====================================================================
// NAME     : ORGANIC GOOGLE SEARCH
// CONTACT  : tranduythuc1@gmail.com
// UPDATE   : 23/11/2018
//====================================================================

var loop = 10; //number of loop
//var proxy = "proxy:port"; //backconnect or rotating proxy, make sure to use 'different ip per http request' setting to get different ip everytime you search
var notfound = ""; //some old imacros version uses #EANF# if string not found

//put these txt files on imacros datasource folder
var inputfile = "C:\\Users\\tranduy\\Documents\\iMacros\\Macros\\keywordurl.txt"; // format : keyword|domain eg: red widget|redwidget.com
var uafile = "C:\\Users\\tranduy\\Documents\\iMacros\\Macros\\ua.txt"; //consist of your user agent. one per line
var ramdomurl="C:\\Users\\tranduy\\Documents\\iMacros\\Macros\\ramdomurl.txt"; //ramdom url will click affter go to page
var ramdomproxy="C:\\Users\\tranduy\\Documents\\iMacros\\Macros\\ramdomproxy.txt"; //ramdom url will click affter go to page
var ramdomgooogle="C:\\Users\\tranduy\\Documents\\iMacros\\Macros\\ramdomgoogle.txt"; //ramdom for search energy
//headers
var n = "\n"
var headers = "CODE:SET !ERRORIGNORE YES" + n
headers += "SET !TIMEOUT_STEP 0" + n
headers += "SET !TIMEOUT_PAGE 30" + n
//headers += 'PROXY ADDRESS=' + proxy + n


var getkeyword = headers
getkeyword +=  "SET !DATASOURCE {{filename}}" + "\n";
getkeyword +=  "SET !DATASOURCE_COLUMNS 1" + "\n";
getkeyword +=  "SET !DATASOURCE_LINE {{linesrc}}" + "\n";
getkeyword +=  "ADD !EXTRACT {{!COL1}}" + "\n";


var goto = headers
goto += 'WAIT SECONDS=2' + n
goto += 'SET !USERAGENT {{uastring}}' + n
goto += "URL GOTO={{googlex}}" + n
//FOR yahoo
goto += 'TAG POS=1 TYPE=INPUT:TEXT FORM=ID:sf ATTR=ID:yschsp CONTENT={{keyword}}' + n
goto += 'TAG POS=1 TYPE=BUTTON FORM=ID:sf ATTR=TXT:Search' + n
goto += 'WAIT SECONDS=2' + n
//FOR google
goto += "TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:f ATTR=NAME:q CONTENT={{keyword}}" + n
goto += "TAG POS=1 TYPE=INPUT:SUBMIT FORM=NAME:f ATTR=NAME:btnG" + n
goto += 'WAIT SECONDS=2' + n
goto += 'TAG POS=1 TYPE=DIV ATTR=ID:resultStats EXTRACT=TXT' + n

var clearcache = headers
clearcache += 'CLEAR' + n

var wait1 = headers
wait1 += 'WAIT SECONDS={{sec}}' + n

var findurl = headers
findurl += 'WAIT SECONDS=2' + n
findurl += "TAG POS=1 TYPE=A ATTR=HREF:*{{url}}* EXTRACT=HREF" + n

var clicktxt = headers
clicktxt += "TAG POS=2 TYPE=A ATTR=HREF:*{{urlx}}*" + n
clicktxt += 'WAIT SECONDS={{rwait}}' + n


var clickurl = headers
clickurl += 'SET !USERAGENT {{uastring}}' + n
clickurl += "TAG POS=1 TYPE=A ATTR=HREF:*{{url}}*" + n
clickurl += 'WAIT SECONDS={{rwait}}' + n

var nextpage = headers
nextpage += "TAG POS=1 TYPE=A ATTR=TXT:{{page}}" + n
nextpage += 'WAIT SECONDS=2' + n


var ramdomclick =headers
ramdomclick += "CLICK X={{xlocation}} Y={{ylocation}}" + n
ramdomclick += 'WAIT SECONDS=7' + n
ramdomclick += 'TAB CLOSEALLOTHERS' + n

var scrollpage=headers
//YOUTUBE RUN
scrollpage += "FRAME F=1" + n
scrollpage += "TAG POS=1 TYPE=BUTTON ATTR=CLASS:ytp-large-play-button<SP>ytp-button&&ARIA-LABEL:Play&&TXT:" + n
scrollpage += "FRAME F=2" + n
scrollpage += "TAG POS=1 TYPE=BUTTON ATTR=CLASS:ytp-large-play-button<SP>ytp-button&&ARIA-LABEL:Play&&TXT:" + n
scrollpage += "FRAME F=3" + n
scrollpage += "TAG POS=1 TYPE=BUTTON ATTR=CLASS:ytp-large-play-button<SP>ytp-button&&ARIA-LABEL:Play&&TXT:" + n
scrollpage += "URL GOTO=javascript:window.scrollBy(0,140)" + n
scrollpage += 'WAIT SECONDS={{rwait}}' + n
scrollpage += "URL GOTO=javascript:window.scrollBy(0,{{rwait}})" + n
scrollpage += 'WAIT SECONDS=12' + n
scrollpage += "URL GOTO=javascript:window.scrollBy(0,40)" + n
scrollpage += 'WAIT SECONDS=14' + n
scrollpage += "URL GOTO=javascript:window.scrollBy(0,100)" + n
scrollpage += 'WAIT SECONDS=12' + n
scrollpage += "URL GOTO=javascript:window.scrollBy(0,{{rwait}})" + n
scrollpage += 'WAIT SECONDS=12' + n
scrollpage += "URL GOTO=javascript:window.scrollBy(0,100)" + n
scrollpage += 'WAIT SECONDS=2' + n
scrollpage += "URL GOTO=javascript:window.scrollBy(0,100)" + n
scrollpage += 'WAIT SECONDS=3' + n
for (var linesrc=1; linesrc<=loop; linesrc++){

  //clear cache for new search
  iimPlay(clearcache);

  //change proxy
  var proxy=""
  var proxyrun=headers
  proxyrun += 'TAB CLOSEALLOTHERS' + n
  proxyrun += 'PROXY ADDRESS=' + proxy + n
  iimPlay(proxyrun); 


 
  //get random user agent, in this case we have 1- 84 user agents
  rnum = Math.floor((Math.random() * 84) + 1);
  iimSet('linesrc',rnum);
  iimSet('filename',uafile);
  iimPlay(getkeyword);
  uastring = iimGetLastExtract();
 
 

  //get random url & keyword, in this case we have 5 line of keyword|url
  iimSet('uastring',uastring);
  rnum = Math.floor((Math.random() * 24) + 1);
  iimSet('linesrc',rnum);
  iimSet('filename',inputfile);
  iimPlay(getkeyword);
  url = iimGetLastExtract();
 
  //split keyword & url
  url_array = url.split("|");
  keyword = url_array[0];
  url = url_array[1];
 
  iimDisplay ("CHƯƠNG TRÌNH ORGANIC\nTỪ KHÓA: "+keyword+"\nTRÌNH DUYỆT: "+uastring)
 //get ramdom google
  rnum = Math.floor((Math.random() * 7) + 1);
  iimSet('linesrc',rnum); 
  iimSet('filename',ramdomgooogle); 
  iimPlay(getkeyword);
  googlex = iimGetLastExtract();
  iimSet('googlex',googlex); 


  //submit keyword to google
  iimSet("keyword",keyword)
  iimPlay(goto); 
  result = iimGetLastExtract();
 


  //if error, sleep for x secs and continue loop
  if (result == notfound) {
  iimSet('sec',5);
  iimPlay(wait1);
  continue;
  }
 
  //check for url on google serp until page 10
  var page = 2;
  do {
      //find url on google serp
      iimSet("url",url);
      iimPlay(findurl);
      index = iimGetLastExtract();
    
      //check if url exist, else go to next page
      if (index == notfound){
        iimSet('page',page);
        iimPlay(nextpage);
        page++;
      } else {



        //change proxy
        rnum = Math.floor((Math.random() * 5) + 1); //using 10 ramdom url
        iimSet('linesrc',rnum);
        iimSet('filename',ramdomproxy);
        iimPlay(getkeyword);
        proxyx = iimGetLastExtract(); 
        var proxyrunx =headers
        proxyrunx += 'TAB OPEN' + n
        proxyrunx += 'TAB T=2' + n
        proxyrunx += 'URL GOTO=about:preferences' + n
        proxyrunx += 'PROXY ADDRESS=' + proxyx + 'BYPASS=*iopus*'+ n
        proxyrunx += 'WAIT SECONDS=2' + n
        proxyrunx += 'TAB T=1' + n
        iimPlay(proxyrunx); 


        //set how long should stay in the page, in this case 10-500 seconds
        rnum = Math.floor((Math.random() * 400) + 100);
        //click url
        iimSet('rwait',rnum);
        iimSet('url',url);
        iimSet('uastring',uastring);
        iimPlay(clickurl);
        iimPlay(scrollpage);


        //click url affter go to page
        rnum = Math.floor((Math.random() * 10) + 1); //using 10 ramdom url
        iimSet('linesrc',rnum);
        iimSet('filename',ramdomurl);
        iimPlay(getkeyword);
        urlx = iimGetLastExtract();
        iimSet("urlx",urlx);
        iimPlay(clicktxt);
        rnum = Math.floor((Math.random() * 400) + 100); //for watting next
        iimSet('rwait',rnum);
        iimPlay(scrollpage);

        //ramdom click in small page
        xlocation=Math.floor((Math.random() * 500) + 1);
        ylocation=Math.floor((Math.random() * 500) + 1);
        iimSet('xlocation',xlocation);
        iimSet('ylocation',ylocation);
        iimPlay(ramdomclick)
        }
  } while ((index == notfound) && (page <= 10));
  

}