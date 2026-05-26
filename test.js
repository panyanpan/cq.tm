// ==UserScript==
// @name         git.test
// @namespace    http://tampermonkey.net/
// @version      2026-05-26
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none

// @downloadURL https://raw.githubusercontent.com/panyanpan/cq.tm/refs/heads/main/test.js
// @updateURL https://raw.githubusercontent.com/panyanpan/cq.tm/refs/heads/main/test.js

// ==/UserScript==

(function() {
    'use strict';

    //------------------------------------------------------------------------------------------------------------
    function funPYBlood() {
        console.log("TimeBlood1:"+new Date().toLocaleString());       
        intervalIdPYKuafu = setInterval(async () => {        
            try {
            //const nowHourPY = new Date().getHours() * 100 + new Date().getMinutes();
                await new Promise(resolve => setTimeout(resolve, 100));
                console.log("TimeBlood2:"+new Date().toLocaleString());   
            } catch (error) {
                console.error("内层定时器执行异常：", error);
            }
            if(new Date().getHours() * 100 + new Date().getMinutes()>1900){
                clearInterval(intervalIdPYKuafu);
                intervalIdPYKuafu = null;
            }
        }, 3000);
    
    }
})();


