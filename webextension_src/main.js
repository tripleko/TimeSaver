function strToFormatedArr(str) {
    let arr = str.split("\n")
    arr = arr.map(function(value) {
        return value.trim().toLowerCase();
    });
    
    arr = arr.filter(function(value){
        return value.length > 0;
    });

    //Remove duplicates
    arr = Array.from(new Set(arr));
    
    arr = arr.sort();

    return arr;
}

let arrPermaBlock = strToFormatedArr(strPermaBlock);
let arrWorkingBlock = strToFormatedArr(strWorkingBlock);

function isPermaBlockedUrl(url) {
    url = url.toLowerCase();
    for(let i = 0; i < arrPermaBlock.length; i++) {
        if(url.includes(arrPermaBlock[i])) {
            //console.log("Matching block pattern: " + arrPermaBlock[i]);
            return true;
        }
    }

    return false;
}

function isRegBlockedUrl(url) {
    url = url.toLowerCase();
    for(let i = 0; i < arrWorkingBlock.length; i++) {
        if(url.includes(arrWorkingBlock[i])) {
            //console.log("Matching work-time block pattern: " + arrWorkingBlock[i]);
            return true;
        }
    }

    return false;
}

async function checkOnURLChange(tabId, changeInfo, tab) {
    if(changeInfo["url"]) {
        if(isPermaBlockedUrl(changeInfo["url"])) {
            chrome.tabs.update(tabId, {url: "about:blank"});
        }

        else if(isRegBlockedUrl(changeInfo["url"])) {
            fetch('http://localhost:' + port + '/api/is_allowed/', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow"
            }).then(function (res) {
                return res.json();
            }).then(function(data) {
                if(data.allowed !== "OK") {
                    chrome.tabs.update(tabId, {url: "localhost:" + port + "/blocked"});
                }
            }).catch(function(err) {
                chrome.tabs.update(tabId, {url: "about:blank"});
            });;
        }
    }
}

chrome.tabs.onUpdated.addListener(checkOnURLChange);
