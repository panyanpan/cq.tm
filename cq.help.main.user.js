// ==UserScript==
// @name         cq.help.main.v1.1
// @namespace    http://tampermonkey.net/
// @version      1.02
// @description  try to take over the world!
// @author       pany
// @match        *://rk.hlxy.db9x.com/*
// @match        *://sdk.zwnet.cn/*
// @icon         https://sdk.zwnet.cn/favicon.ico
// @grant        GM_setValue
// @grant        GM_getValue
// @downloadURL https://ghproxy.net/https://raw.githubusercontent.com/panyanpan/cq.tm/refs/heads/main/cq.help.main.user.js
// @updateURL https://ghproxy.net/https://raw.githubusercontent.com/panyanpan/cq.tm/refs/heads/main/cq.help.main.user.js
// ==/UserScript==

(function () {
    'use strict';

    if (window.location.href.includes('sdk.zwnet.cn')) {
        setTimeout(() => {
            const iframe = document.querySelector('iframe');
            window.open(iframe.getAttribute('src'));
        }, 5000);
    }

    // 全局日志开关（生产环境改为 false）
    const GLOBAL_LOG_ENABLE = false;
    const originalConsoleLog = console.log;
    console.log = function (...args) {
        if (GLOBAL_LOG_ENABLE) {
            originalConsoleLog.apply(console, args);
        }
    };

    //begin main--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    console.log("cq.help.main.logTime:" + new Date().toLocaleString());
    var intervalIdPYMain = null;
    var para_globalBool = true;
    let para_yabiaoCount = 0;
    var para_mochaoCount = 0;
    function beginTimer() {
        console.log("benginTime-Main" + new Date().toLocaleString());
        if (intervalIdPYMain != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Main");
            p_alert_success('运行中...');
            return;
        }

        intervalIdPYMain = setInterval(async () => {
            console.log("time-intervalIdPYMain:" + intervalIdPYMain);
            if (para_globalBool) {
                const nowHourPY = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
                console.log("logServerTime:" + new Date(DateUtil.serverNow()).toLocaleString());
                try {
                    para_mochaoCount++;
                    if (para_mochaoCount % 10 == 0) {
                        uim.show(503, new UIData(null, 3));
                        await new Promise(resolve => setTimeout(resolve, 500));
                        uim.hide(503);
                    }
                    findMochao_Occupy();
                }
                catch (error) { }  //auto occupy MoChao
                if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                    clickCanvasAt(1130, 400);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    console.log("deadClickTime:" + new Date().toLocaleString());
                }
                if (emIns.firstPlayer.fighterObject.delayhp < emIns.firstPlayer.fighterObject.maxHp * 0.9
                    && [81, 200018, 200029, 200043, 200049, 200076, 10000, 9994].includes(gd.map.curMapId)) {//biqi 2+
                    Logic.deliverToFindNpc(600300);//biqi1
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    gd.map.gotoStagePoint(137, 120, gd.map.curMapId, false);
                    await new Promise(resolve => setTimeout(resolve, 4000));
                    net.CureModel.ins().send2(0);    //click cure
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                if (nowHourPY >= 1145 && nowHourPY < 1150 && gd.map.curMapId != 6077 && para_yabiaoCount == 0) {
                    // if(nowHourPY >= 2131 && nowHourPY < 2136 ){
                    Logic.deliverToFindNpc(506083);
                    if (gd.yabiao.emsNumKf < 2) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        gd.yabiao.requestStart(18, 2);//gd.yabiao.requestStart(17, 2);
                        para_yabiaoCount++;
                        console.log("gotoMapTime-yabiao:" + new Date().toLocaleString());
                    }
                }
                if (nowHourPY >= 1150 && nowHourPY < 1155 && para_yabiaoCount == 1) {
                    // if(nowHourPY >= 2136 && nowHourPY < 2141){
                    Logic.deliverToFindNpc(506083);
                    if (gd.yabiao.emsNumKf < 2) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        gd.yabiao.requestStart(18, 2);//gd.yabiao.requestStart(17, 2);
                        para_yabiaoCount++;
                        console.log("gotoMapTime-yabiao:" + new Date().toLocaleString());
                    }
                }
                if ((nowHourPY > 1155 || nowHourPY < 1145) && para_yabiaoCount != 0) {
                    para_yabiaoCount = 0;
                }

                if (nowHourPY >= 1200 && nowHourPY < 1230 && para_IntervalId_wzzb == null) {
                    beginTimer_f_Wzzb();
                }

                const config = GM_getValue("p_MapSelectConfig");
                if (config != null && config.length > 0) {
                    eval(p_TimeGotoMap(config).replace(/:/g, ''));
                }

                if (gd.arpgInst.autoFightType == 3 && gd.map.curMapId != 6077) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    gd.arpgInst.setAutoFight(1);
                    console.log("arpgClickTime:" + new Date().toLocaleString());
                }
            }
        }, 60000);
        p_alert_success('开始辅助（主线）');
    }
    function stopTimer() {
        if (intervalIdPYMain) {
            clearInterval(intervalIdPYMain);
            intervalIdPYMain = null;
            console.log('定时器已关闭time-cq.help.main:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-cq.help.main:' + new Date().toLocaleString());
        }
        p_alert_success('已关闭辅助（主线）');
    }

    //main-ui----------------------------------------------------------------------------------------------------
    const p_timeList = [
        { time: "0-10:00" },
        { time: "10:00-11:00" },
        { time: "11:00-11:43" },
        { time: "12:20-14:30" },
        { time: "14:30-15:00" },
        { time: "15:00-18:00" },
        { time: "18:00-18:45" },
        { time: "19:00-19:30" },
        { time: "20:00-20:30" },
        { time: "20:30-21:59" },
        { time: "22:00-23:59" }
    ];
    const p_mapList = [
        { name: "比奇", mapId: 81, deliverId: 600300 },
        { name: "喜魄1", mapId: 6126, deliverId: 400104 },
        { name: "怒魄1", mapId: 6127, deliverId: 400105 },
        { name: "哀魄1", mapId: 6128, deliverId: 400106 },
        { name: "惧魄1", mapId: 6133, deliverId: 400111 },
        { name: "爱魄1", mapId: 6134, deliverId: 400112 },
        { name: "恶魄1", mapId: 6135, deliverId: 400113 },
        { name: "无尽", mapId: 200090, deliverId: 200090 },
        { name: "盘恒", mapId: 200056, deliverId: 600100 },
        { name: "铜台", mapId: 200059, deliverId: 600103 },
        { name: "降妖12", mapId: 200079, deliverId: 600181 },
        { name: "降妖13", mapId: 200080, deliverId: 600182 },
        { name: "降妖14", mapId: 200081, deliverId: 600183 },
        { name: "降妖15", mapId: 200082, deliverId: 600184 },
        { name: "降妖16", mapId: 200083, deliverId: 600185 },
        { name: "降妖17", mapId: 200084, deliverId: 600186 },
        { name: "降妖18", mapId: 200085, deliverId: 600187 },
        { name: "降妖19", mapId: 200086, deliverId: 600188 },
        { name: "降妖20", mapId: 200087, deliverId: 600189 },
        { name: "无限试炼1", mapId: 5613, deliverId: 800210 },
        { name: "无限试炼2", mapId: 5614, deliverId: 800211 },
        { name: "无限试炼3", mapId: 5615, deliverId: 800212 },
        { name: "造化2", mapId: 6268, deliverId: 600149 },
        { name: "造化3", mapId: 5570, deliverId: 600150 },
        { name: "造化4", mapId: 5568, deliverId: 600151 },
        { name: "镇狱1", mapId: 6122, deliverId: 400101 },
        { name: "镇狱2", mapId: 6123, deliverId: 400102 },
        { name: "福地1", mapId: 200072, deliverId: 600141 },
        { name: "福地2", mapId: 200074, deliverId: 600143 },
        { name: "白骨1", mapId: 60, deliverId: 600027 },
        { name: "白骨2", mapId: 600, deliverId: 600136 },
        { name: "圣地5", mapId: 7128, deliverId: 600176 },
        { name: "圣地6", mapId: 7129, deliverId: 600177 },
        { name: "圣地5el", mapId: 7155, deliverId: 600276 },
        { name: "圣地6el", mapId: 7156, deliverId: 600277 },
        { name: "灵魂1", mapId: 1621, deliverId: 1497 },
        { name: "灵魂2", mapId: 1622, deliverId: 1498 },
        { name: "灵魂3", mapId: 1623, deliverId: 1499 }
    ];
    let p_selectElements = [];
    function saveMapConfig() {
        const config = p_selectElements.map((sel, index) => ({
            time: p_timeList[index].time == "00:00-11:00" ? "0-11:00" : p_timeList[index].time,
            value: sel.value
        }));
        GM_setValue("p_MapSelectConfig", config);
    }

    function loadMapConfig() {
        const config = GM_getValue("p_MapSelectConfig");
        if (!config) return;

        config.forEach((item, index) => {
            if (p_selectElements[index]) {
                p_selectElements[index].value = item.value;
            }
        });
    }

    function p_CreateMapSelector(top, right) {
        const wrap = document.createElement("div");
        wrap.style.cssText = `position: fixed;top: 32px;right: 70px;z-index: 9999;`;

        const btn = document.createElement("div");
        btn.innerText = "请选择";
        btn.style.cssText = `position: fixed;top: ${top}px;right: ${right}px; padding: 6px 12px;background: #ff4444;color: #fff;border-radius: 4px;cursor: pointer;font-size: 10px;user-select: none;`;

        const panel = document.createElement("div");
        panel.style.cssText = `position: absolute;top: 105%;right: 0;background: #fff;border: 1px solid #ddd;border-radius: 4px;padding: 10px;display: none;min-width: 220px;box-shadow: 0 2px 10px rgba(0,0,0,0.1);`;

        const ul = document.createElement("ul");
        ul.style.cssText = `list-style: none;margin: 0;padding: 0;display: flex;flex-direction: column;gap: 6px;`;

        p_timeList.forEach(item => {
            const li = document.createElement("li");
            li.style.cssText = `display: flex;align-items: center;justify-content: space-between;gap: 10px;font-size: 12px;`;

            const timeText = document.createElement("span");
            timeText.textContent = item.time;
            timeText.style.width = "110px";

            const sel = document.createElement("select");
            sel.style.cssText = `padding: 3px 6px; font-size:12px; flex:1;`;

            p_mapList.forEach((item, i) => {
                const opt = document.createElement("option");
                opt.value = item.mapId + ';' + item.deliverId;
                opt.innerText = item.name;
                sel.append(opt);
            });

            p_selectElements.push(sel);
            sel.addEventListener("change", saveMapConfig);

            li.append(timeText, sel);
            ul.append(li);

        });

        panel.append(ul);
        wrap.append(btn, panel);
        document.body.append(wrap);

        btn.addEventListener("click", e => {
            e.stopPropagation();
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", () => panel.style.display = "none");
        panel.addEventListener("click", e => e.stopPropagation());

    }

    p_CreateMapSelector(5, 75);
    loadMapConfig();

    //begin child--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //child wzzb------------------------------------------------------------------------------------------------------
    var para_IntervalId_wzzb = null;
    function beginTimer_f_Wzzb() {
        console.log("benginTime-Wzzb:" + new Date().toLocaleString());
        if (para_IntervalId_wzzb != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Wzzb");
            p_alert_success('运行中...');
            return;
        }
        para_IntervalId_wzzb = setInterval(async () => {//wzzb 12:00-12:20    21:00-21:30
            var nowDate = new Date().getHours() * 100 + new Date().getMinutes();
            if ((nowDate > 1200 && nowDate < 1220) && para_IntervalId_wzzb != null) {
                // if((nowDate > 2100 && nowDate < 2130) && para_IntervalId_wzzb != null){
                if (gd.map.curMapId != 3601) {
                    uim.show(318);
                }
                else {
                    uim.hide(318);
                }
                await new Promise(resolve => setTimeout(resolve, 400));
                if (gd.map.curMapId != 3601 && gd.honourbattle.wzzbCountInfo.leftCount > 0) {//&& gd.honourbattle.wzzbCountInfo.matchState == 0
                    await new Promise(resolve => setTimeout(resolve, 400));
                    net.GamepvpModel.ins().send1(DaKuafuType.wzzb);
                }
                if (gd.arpgInst.autoFightType == 3) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    gd.arpgInst.setAutoFight(1);
                }
                if (new Date().getHours() * 100 + new Date().getMinutes() > 1220) {
                    // if(new Date().getHours() * 100 + new Date().getMinutes() > 2130){
                    clearInterval(para_IntervalId_wzzb);
                    uim.hide(318);//wzzb
                    console.log("clearIntervalTime-Wzzb:" + new Date().toLocaleString());
                }
            }
        }, 3000);
        p_alert_success('开始辅助（王者）');
    }
    function stopTimer_f_Wzzb() {
        if (para_IntervalId_wzzb != null) {
            clearInterval(para_IntervalId_wzzb);
            para_IntervalId_wzzb = null;
            console.log('定时器已关闭time-Wzzb:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-Wzzb:' + new Date().toLocaleString());
        }
        p_alert_success('已关闭');
    }

    //child blood------------------------------------------------------------------------------------------------------
    var para_intervalIdBlood = null;
    var para_IntervalId = null;
    var innerPY = false;
    function beginTimer_f_Blood() {
        console.log("benginTime-Blood:" + new Date().toLocaleString());
        if (para_intervalIdBlood != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Blood");
            p_alert_success('运行中...');
            return;
        }
        para_intervalIdBlood = setInterval(async () => {
            console.log("time-para_intervalIdBlood:" + para_intervalIdBlood);
            const nowHourPY = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if (nowHourPY >= 1930 && nowHourPY <= 1949 && gd.map.curMapId != 700 && !innerPY) {
                console.log("gotoMapTimeKuafu:" + new Date().toLocaleString());
                net.CrazebattleModel.ins().send7(3);
                await new Promise(resolve => setTimeout(resolve, 200));
                gd.inst.sendReqEnterArpgMapMessaged(700);//Kuafu
                await new Promise(resolve => setTimeout(resolve, 200));
                if (gd.map.curMapId == 700) {
                    innerPY = true;
                    para_globalBool = false;
                    f_Child_Blood();
                }
            }
            if (nowHourPY >= 1930 && nowHourPY <= 1949 && gd.map.curMapId == 700 && para_IntervalId == null) {
                para_globalBool = false;
                f_Child_Blood();
            }
            if (nowHourPY > 1950) {
                stopTimer_f_Blood();
            }
        }, 30000);
        p_alert_success('开始辅助（血火）');
    }
    async function f_Child_Blood() {
        para_IntervalId = setInterval(async () => {//Kuafu
            if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                await new Promise(resolve => setTimeout(resolve, 400));
                clickCanvasAt(1206, 400);
            }
            if (gd.arpgInst.autoFightType == 3) {
                await new Promise(resolve => setTimeout(resolve, 100));
                gd.arpgInst.setAutoFight(1);
            }
            if (new Date().getHours() * 100 + new Date().getMinutes() > 1950) {
                clearInterval(para_IntervalId);
                clearInterval(para_intervalIdBlood);
                console.log("clearIntervalTime-blood:" + new Date().toLocaleString());
            }
        }, 1000);
    }

    function stopTimer_f_Blood() {
        if (para_intervalIdBlood != null) {
            clearInterval(para_intervalIdBlood);
            para_intervalIdBlood = null;
            console.log('定时器已关闭time-Blood:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-Blood:' + new Date().toLocaleString());
        }
        para_globalBool = true;
        p_alert_success('已关闭');
    }

    //child yiji------------------------------------------------------------------------------------------------------
    var para_intervalIdYiji = null;
    var para_yiji = [670, 470, 270];//670--------------------
    var para_yiji_mapid = [8036, 8024, 8012];//mapid------------------
    function beginTimer_f_Yiji() {
        console.log("benginTime-Yiji:" + new Date().toLocaleString());
        if (para_intervalIdYiji != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Yiji");
            p_alert_success('运行中...');
            return;
        }
        para_globalBool = true;
        para_intervalIdYiji = setInterval(async () => {
            var p_option_yji1 = document.getElementById("selectdivText");
            if (p_option_yji1 && p_option_yji1.innerHTML != "请选择") {
                para_yiji = p_option_yji1.innerHTML.split(',');
                para_yiji_mapid = document.getElementById("selectdivValue").innerHTML.split(',');
            }
            console.log("time-para_intervalIdYiji:" + para_intervalIdYiji);
            if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                await new Promise(resolve => setTimeout(resolve, 400));
                clickCanvasAt(1206, 400);
                await new Promise(resolve => setTimeout(resolve, 400));
            }
            if (gd.arpgInst.autoFightType == 3 && !para_globalBool) {
                await new Promise(resolve => setTimeout(resolve, 100));
                gd.arpgInst.setAutoFight(1);
            }
            for (var i = 0; i < para_yiji.length; i++) {
                var timeRelive = gd.boss.arpgBossTimeDic[para_yiji_mapid[i]];
                // var timeRelive = gd.boss.arpgBossInfoDic[para_yiji_mapid[i]].reliveTime;
                console.log("Time-test:" + new Date().toLocaleString() + "--" + para_yiji[i] + "--" + para_yiji_mapid[i] + "--" + timeRelive + "--" + para_globalBool);
                if (timeRelive === undefined) { timeRelive = 0; }
                if (timeRelive == 0) { net.PlayModel.ins().send9(36); }
                if (para_globalBool && timeRelive < 30 && gd.map.curMapId != para_yiji_mapid[i]) {
                    net.PlayModel.ins().send3(para_yiji_mapid[i]);
                    await new Promise(resolve => setTimeout(resolve, 400));
                    if (gd.map.curMapId == para_yiji_mapid[i]) {
                        para_globalBool = false;
                    }
                    break;
                }
                if (timeRelive > 300 && gd.map.curMapId == para_yiji_mapid[i]) {// > 5 min
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    net.PlayModel.ins().send24();  //exit
                    para_globalBool = true;
                    break;
                }
            }
            /*
            //if(guishu == 0 && xiezhu == 0)  {//-----not impl
            //clearInterval(para_intervalIdYiji);
            //console.log("clearIntervalTime:"+new Date().toLocaleString());
            //}
            */
        }, 6000);
        p_alert_success('开始辅助（遗迹）');
    }
    function stopTimer_f_Yiji() {
        para_globalBool = true;
        if (para_intervalIdYiji) {
            clearInterval(para_intervalIdYiji);
            para_intervalIdYiji = null;
            console.log('定时器已关闭time-Yiji:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-Yiji:' + new Date().toLocaleString());
        }
        p_alert_success('已关闭');
    }

    //child sifang--------------------------------------------------------------------------------------------------------------
    var para_intervalIdSifang = null;
    var rewardBool_Sifang = false;
    function beginTimer_f_Sifang() {
        console.log("benginTime-Sifang:" + new Date().toLocaleString());
        if (para_intervalIdSifang != null) {
            console.log("Time:" + new Date().toLocaleString() + "-Sifang");
            p_alert_success('运行中...');
            return;
        }
        para_intervalIdSifang = setInterval(async () => {//20:00  curMapId=4901
            const nowHourPY = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if (nowHourPY >= 2000 && nowHourPY < 2220 && gd.map.curMapId != 4901) {
                await new Promise(resolve => setTimeout(resolve, 400));
                net.PlayModel.ins().send3(4901);    //gotomap
                await new Promise(resolve => setTimeout(resolve, 400));
                gd.map.gotoStagePoint(55, 58, gd.map.curMapId, false);
            }
            if (gd.map.curMapId == 4901 && emIns.firstPlayer.fighterObject.delayhp == 0) {
                await new Promise(resolve => setTimeout(resolve, 10200));
                clickCanvasAt(1130, 400);
                await new Promise(resolve => setTimeout(resolve, 500));
                gd.map.gotoStagePoint(55, 58, gd.map.curMapId, false);
            }
            if (gd.arpgInst.autoFightType == 3) {
                gd.arpgInst.setAutoFight(1);
            }
            if (new Date().getHours() * 100 + new Date().getMinutes() > 2017 && !rewardBool_Sifang) {
                rewardBool_Sifang = true;
                for (i = 1; i < 11; i++) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    net.FairyislandModel.ins().send3(i); //reward  1-10
                }                
            }
            if (new Date().getHours() * 100 + new Date().getMinutes() > 2020) {
                clearInterval(para_intervalIdSifang);
                console.log("clearIntervalTime-Sifang:" + new Date().toLocaleString());
            }
        }, 2000);
        p_alert_success('开始辅助（四方）');
    }
    function stopTimer_f_Sifang() {
        if (para_intervalIdSifang) {
            clearInterval(para_intervalIdSifang);
            para_intervalIdSifang = null;
            console.log('定时器已关闭time-Sifang:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-Sifang:' + new Date().toLocaleString());
        }
        p_alert_success('已关闭');
    }

    //child cjzc-----------------------------------------------------------------------------------------------------------
    var para_IntervalId_cjzc = null;
    function beginTimer_f_Cjzc() {
        console.log("benginTime-Cjzc:" + new Date().toLocaleString());
        if (para_IntervalId_cjzc != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Cjzc");
            p_alert_success('运行中...');
            return;
        }
        para_IntervalId_cjzc = setInterval(async () => {//cjzc 16:00-16:30    18:30-19:00
            var nowDate = new Date().getHours() * 100 + new Date().getMinutes();
            if ((nowDate > 1845 && nowDate < 1900) && para_IntervalId_cjzc != null) {
                if (gd.map.curMapId != 37001) {
                    uim.show(318, new UIData(null, 6));//cjzc
                }
                await new Promise(resolve => setTimeout(resolve, 400));
                if (gd.map.curMapId != 37001 && gd.honourbattle.dfData.leftCount > 0) {
                    await new Promise(resolve => setTimeout(resolve, 400));
                    net.GamepvpModel.ins().send1(DaKuafuType.dfzc);
                }
                if (gd.arpgInst.autoFightType == 3) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    gd.arpgInst.setAutoFight(1);
                }
                if (new Date().getHours() * 100 + new Date().getMinutes() > 1900) {
                    clearInterval(para_IntervalId_cjzc);
                    uim.hide(318);//cjzc
                    console.log("clearIntervalTime-Cjzc:" + new Date().toLocaleString());
                }
            }
        }, 3000);
        p_alert_success('开始辅助（刺激）');
    }

    function stopTimer_f_Cjzc() {
        if (para_IntervalId_cjzc != null) {
            clearInterval(para_IntervalId_cjzc);
            para_IntervalId_cjzc = null;
            console.log('定时器已关闭time-Cjzc:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-Cjzc:' + new Date().toLocaleString());
        }
        p_alert_success('已关闭');
    }
    //child shenmo-----------------------------------------------------------------------------------------------------------
    var para_intervalIdShenmo = null;
    var para_lastX //emIns.firstPlayer.fighterObject.gridX;
    var para_lastY //emIns.firstPlayer.fighterObject.gridY;
    var p_iCount = 0;
    function beginTimer_f_Shenmo() {
        console.log("benginTime-Shemo:" + new Date().toLocaleString());
        if (para_intervalIdShenmo != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Shemo");
            p_alert_success('运行中...');
            return;
        }
        para_intervalIdShenmo = setInterval(async () => {//21:30  curMapId=53001
            if (para_globalBool == true && gd.map.curMapId == 53001) {
                para_globalBool = false;  //全局优先
            }
            const nowHourPY = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if (nowHourPY >= 2131 && nowHourPY < 2141 && gd.map.curMapId != 53001) {
                await new Promise(resolve => setTimeout(resolve, 400));
                net.GamepvpModel.ins().send1(DaKuafuType.qdjd); //gotomap
                await new Promise(resolve => setTimeout(resolve, 400));
                gd.map.gotoStagePoint(63, 68, gd.map.curMapId, false);//center xy
            }
            if (nowHourPY >= 2143 && nowHourPY < 2153 && gd.map.curMapId != 53001) {
                await new Promise(resolve => setTimeout(resolve, 400));
                net.GamepvpModel.ins().send1(DaKuafuType.qdjd); //gotomap
                await new Promise(resolve => setTimeout(resolve, 400));
                gd.map.gotoStagePoint(63, 68, gd.map.curMapId, false);//center xy
            }
            if (gd.map.curMapId == 53001 && emIns.firstPlayer.fighterObject.delayhp == 0) {
                await new Promise(resolve => setTimeout(resolve, 3200));
                clickCanvasAt(1206, 400);
                await new Promise(resolve => setTimeout(resolve, 500));
                gd.map.gotoStagePoint(63, 68, gd.map.curMapId, false);//center xy
            }
            p_iCount++;
            if (p_iCount % 15 == 0 && gd.map.curMapId == 53001) {
                // clickCanvasAt(222, 247);//get reward
                const rewardNum = 0;
                if (gd.honourbattle.nowqzjdkillnum > 9 && gd.honourbattle.nowqzjdkillnum % 2 != 0) {
                    rewardNum = gd.honourbattle.nowqzjdkillnum - 1;
                } else {
                    rewardNum = gd.honourbattle.nowqzjdkillnum;
                }
                net.CanyonHegemonyModel.ins().send16(rewardNum);//get reward

                var para_nowX = emIns.firstPlayer.fighterObject.gridX;
                var para_nowY = emIns.firstPlayer.fighterObject.gridY;
                if (para_nowX == para_lastX && para_nowY == para_lastY) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    gd.map.gotoStagePoint(63, 68, gd.map.curMapId, false);//center xy
                }
                para_lastX = para_nowX;
                para_lastY = para_nowY;
            }
            if (gd.arpgInst.autoFightType == 3) {
                gd.arpgInst.setAutoFight(1);
            }
            if (new Date().getHours() * 100 + new Date().getMinutes() > 2155) {
                clearInterval(para_intervalIdShenmo);
                para_globalBool = true;
                console.log("clearIntervalTime-Shenmo:" + new Date().toLocaleString());
            }
        }, 2000);
        p_alert_success('开始辅助（神魔）');
    }
    function stopTimer_f_Shenmo() {
        if (para_intervalIdShenmo != null) {
            clearInterval(para_intervalIdShenmo);
            para_intervalIdShenmo = null;
            console.log('定时器已关闭time-Shemo:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-Shemo:' + new Date().toLocaleString());
        }
        para_globalBool = true;
        p_alert_success('已关闭');
    }

    //child qunxiong------------------------------------------------------------------------------------------------------
    var para_intervalIdQunxiong = null;
    var rewardBool_Qunxiong = false;
    function beginTimer_f_Qunxiong() {
        console.log("benginTime-Qunxiong:" + new Date().toLocaleString());
        if (para_intervalIdQunxiong != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Qunxiong");
            p_alert_success('运行中...');
            return;
        }
        para_intervalIdQunxiong = setInterval(async () => {//20:30  curMapId=4002,4001
            const nowHourPY = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if (nowHourPY >= 2000 && nowHourPY < 2030 && (gd.map.curMapId != 4001 && gd.map.curMapId != 4002)) {
                await new Promise(resolve => setTimeout(resolve, 400));
                net.PvpShabakeModel.ins().send4();    //gotomap
                await new Promise(resolve => setTimeout(resolve, 400));
                gd.map.gotoStagePoint(90, 84, gd.map.curMapId, false);
            }
            if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                console.log("ClickTime:" + new Date().toLocaleString());
                await new Promise(resolve => setTimeout(resolve, 5200));
                if (gd.map.curMapId == 4002) {
                    clickCanvasAt(1130, 400);
                }
                if (gd.map.curMapId == 4001) {//King
                    clickCanvasAt(1206, 400);
                }
                await new Promise(resolve => setTimeout(resolve, 500));
                gd.map.gotoStagePoint(90, 84, gd.map.curMapId, false);
            }
            if (gd.arpgInst.autoFightType == 3) {
                gd.arpgInst.setAutoFight(1);
            }
            if (new Date().getHours() * 100 + new Date().getMinutes() > 2028 && !rewardBool_Qunxiong) {
                rewardBool_Qunxiong = true;
                for (i = 1; i < 12; i++) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    net.PvpShabakeModel.ins().send7(i); //reward  1-11
                }                
            }
            if (new Date().getHours() * 100 + new Date().getMinutes() > 2030) {
                clearInterval(para_intervalIdQunxiong);
                console.log("clearIntervalTime-Qunxiong:" + new Date().toLocaleString());
            }
        }, 2000);
        p_alert_success('开始辅助（群雄）');
    }
    function stopTimer_f_Qunxiong() {
        if (para_intervalIdQunxiong) {
            clearInterval(para_intervalIdQunxiong);
            para_intervalIdQunxiong = null;
            console.log('定时器已关闭time-Qunxiong:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-Qunxiong:' + new Date().toLocaleString());
        }
        p_alert_success('已关闭');
    }
    //child yanhuo---------------------------------------------------------------------------------------------------
    var para_IntervalId_yanhuo = null;
    function beginTimer_f_Yanhuo() {
        console.log("benginTime-Yanhuo:" + new Date().toLocaleString());
        if (para_IntervalId_yanhuo != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Yanhuo");
            p_alert_success('运行中...');
            return;
        }
        var p_arr_yanhuo = 20044;//[20044,20045,20046,20047,20048,20049,20050,20051,20052,20053,20054,20055,20056,20057,20058];
        var p_arr_yanhuo_mapid = 5446;//[5446,5447,5448,5449,5450,5451,5452,5453,5454,5455,5456,5457,5458,5459,5460];
        para_IntervalId_yanhuo = setInterval(async () => {//yanhuo
            if (gd.map.curMapId == 200043) {//biqi3.5   !p_arr_yanhuo.includes(gd.map.curMapId) &&
                uim.show(798, new UIData({ dupId: p_arr_yanhuo, lookOtherTeam: false }));
                gd.nest.doJionIn(2, p_arr_yanhuo, null);//create team
                await new Promise(resolve => setTimeout(resolve, 1000));
                net.SpiritmonsterModel.ins().send13(p_arr_yanhuo, gd.nest.teamData.teamId, false);//gotomap

                await new Promise(resolve => setTimeout(resolve, 200));
                p_arr_yanhuo++;
                p_arr_yanhuo_mapid++;
            }
            if (gd.arpgInst.autoFightType == 3) {
                await new Promise(resolve => setTimeout(resolve, 100));
                gd.arpgInst.setAutoFight(1);
            }
        }, 10000);
        p_alert_success('开始辅助（焰火）');
    }
    function stopTimer_f_Yanhuo() {
        if (para_IntervalId_yanhuo) {
            clearInterval(para_IntervalId_yanhuo);
            para_IntervalId_yanhuo = null;
            console.log('定时器已关闭time-Yanhuo:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-Yanhuo:' + new Date().toLocaleString());
        }
        p_alert_success('已关闭');
    }

    var para_IntervalId_Xian = null;
    function beginTimer_f_Xian(mapid, deliverId) {
        console.log("benginTime-xian:" + new Date().toLocaleString());
        if (para_IntervalId_Xian != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-xian");
            p_alert_success('运行中...');
            return;
        }
        para_IntervalId_Xian = setInterval(async () => {//xian 17:00-17:15
            var nowDate = new Date().getHours() * 100 + new Date().getMinutes();
            if ((nowDate > 1700 && nowDate < 1715)) {
                if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                    await new Promise(resolve => setTimeout(resolve, 400));
                    clickCanvasAt(1130, 400);
                    //console.log("deadClickTime:" + new Date().toLocaleString());
                }
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                if (gd.map.curMapId != mapid) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    Logic.deliverToFindNpc(deliverId);
                }
            }
            if (nowDate > 1715) {
                clearInterval(para_IntervalId_Xian);
                para_IntervalId_Xian = null;
                para_globalBool = true;
                console.log('定时器已关闭time-xian:' + new Date().toLocaleString());
            }
        }, 3000);
        p_alert_success('开始辅助（xian）');
    }

    function stopTimer_f_Xian() {
        if (para_IntervalId_Xian != null) {
            clearInterval(para_IntervalId_Xian);
            para_IntervalId_Xian = null;
            para_globalBool = true;
            console.log('定时器已关闭time-xian:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-xian:' + new Date().toLocaleString());
        }
        p_alert_success('已关闭');
    }

    var para_IntervalId_Ice3 = null;
    function beginTimer_f_Ice3(mapid, deliverId) {
        console.log("benginTime-Ice3:" + new Date().toLocaleString());
        if (para_IntervalId_Ice3 != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Ice3");
            p_alert_success('运行中...');
            return;
        }
        para_IntervalId_Ice3 = setInterval(async () => {//Ice3 11:30-11:45
            var nowDate = new Date().getHours() * 100 + new Date().getMinutes();
            if ((nowDate > 1130 && nowDate < 1145) && para_IntervalId_Ice3 != null) {
                if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                    await new Promise(resolve => setTimeout(resolve, 400));
                    clickCanvasAt(1130, 400);
                    //console.log("deadClickTime:" + new Date().toLocaleString());
                }
                if (emIns.firstPlayer.fighterObject.delayhp < emIns.firstPlayer.fighterObject.maxHp * 0.9
                    && [81, 200018, 200029, 200043, 200049, 200076, 10000, 9994].includes(gd.map.curMapId)) {
                    Logic.deliverToFindNpc(600300);//biqi1  81
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    gd.map.gotoStagePoint(137, 120, gd.map.curMapId, false);
                    await new Promise(resolve => setTimeout(resolve, 4000));
                    net.CureModel.ins().send2(0);    //click cure
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    Logic.deliverToFindNpc(600089);      //bingong3  200052
                    console.log("gotoMapTime:" + new Date().toLocaleString());
                }
                if (gd.map.curMapId != 200052) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    Logic.deliverToFindNpc(600089);
                }
                if (gd.arpgInst.autoFightType == 3) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowDate > 1145) {
                stopTimer_f_Ice3();
            }
        }, 2000);
        p_alert_success('开始（Ice3）');
    }

    function stopTimer_f_Ice3() {
        if (para_IntervalId_Ice3 != null) {
            clearInterval(para_IntervalId_Ice3);
            para_IntervalId_Ice3 = null;
            console.log('定时器已关闭time-Ice3:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-Ice3:' + new Date().toLocaleString());
        }
        p_alert_success('已关闭');
    }

    var para_IntervalId_Hot = null;
    function beginTimer_f_Hot(mapid, deliverId) {
        console.log("benginTime-Hot:" + new Date().toLocaleString());
        if (para_IntervalId_Hot != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Hot");
            p_alert_success('运行中...');
            return;
        }
        para_IntervalId_Hot = setInterval(async () => {//Hot 17:30-17:40
            var nowDate = new Date().getHours() * 100 + new Date().getMinutes();
            if ((nowDate > 1729 && nowDate < 1740) && para_IntervalId_Hot != null) {
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                    await new Promise(resolve => setTimeout(resolve, 400));
                    clickCanvasAt(1130, 400);
                }
                if (emIns.firstPlayer.fighterObject.delayhp < emIns.firstPlayer.fighterObject.maxHp * 0.9
                    && [81, 200018, 200029, 200043, 200049, 200076, 10000, 9994].includes(gd.map.curMapId)) {
                    Logic.deliverToFindNpc(600300);//biqi1  81
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    gd.map.gotoStagePoint(137, 120, gd.map.curMapId, false);
                    await new Promise(resolve => setTimeout(resolve, 4000));
                    net.CureModel.ins().send2(0);    //click cure
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    net.PlayModel.ins().send3(5618);      //hot  5618  
                    await new Promise(resolve => setTimeout(resolve, 400));
                    gd.map.gotoStagePoint(78, 23, gd.map.curMapId, false); //(78,23)  (78,87) (17,88) (16,25)
                }
                if (gd.map.curMapId != 5618) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    net.PlayModel.ins().send3(5618);//5618 5618  
                    await new Promise(resolve => setTimeout(resolve, 400));
                    gd.map.gotoStagePoint(78, 23, gd.map.curMapId, false); //(78,23)  (78,87) (17,88) (16,25)
                }
                if (gd.arpgInst.autoFightType == 3) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowDate > 1740) {
                stopTimer_f_Hot();
            }
        }, 6000);
        p_alert_success('开始（Hot）');
    }

    function stopTimer_f_Hot() {
        if (para_IntervalId_Hot != null) {
            clearInterval(para_IntervalId_Hot);
            para_IntervalId_Hot = null;
            para_globalBool = true;
            console.log('定时器已关闭time-Hot:' + new Date().toLocaleString());
        } else {
            console.log('暂无运行中的定时器time-Hot:' + new Date().toLocaleString());
        }
        p_alert_success('已关闭');
    }

    //child shentai mochao---------------------------------------------------------------------------------------------------
    function findMochao(start, end) {//auto-MoChao(Shentai)
        for (let i = start; i <= end; i++) {
            if (gd.mochao.moChaoInfo[i].status == 0) { return i; }
        }
        return null;
    }
    var rewardBool_Mochao = false;
    function findMochao_Occupy() {//auto occupy MoChao(Shentai)              
        if (new Date().getDay() == 1 && new Date().toLocaleTimeString() >= '10:02:00' && new Date().toLocaleTimeString() < '10:03:00') {
            var para_Shentai1 = findMochao(810, 999);
            net.MochaoModel.ins().send3(para_Shentai1, 0);
            console.log("moChaoTimeOccupy:" + new Date().toLocaleString());
        }
        if (new Date().getDay() != 1 || (new Date().getDay() == 1 && new Date().toLocaleTimeString() >= '10:00:00')) {
            var para_mc = gd.mochao.getMyMoChaoData();
            if (!para_mc || Object.keys(para_mc).length > 0) {
                console.log("moChaoTimelog:" + new Date().toLocaleString() + gd.mochao.moChaoInfo[para_mc.moChaoId].occupyRoleName + "----" + para_mc.moChaoId);
            }
            if (!para_mc || Object.keys(para_mc).length === 0 || (DateUtil.serverNow() - para_mc.occupyStartTime.toNumber() > 28800000)) {
                var para_Shentai = findMochao(810, 999);//findMochao(704, 751) || findMochao(804, 999);
                if (para_Shentai) {
                    net.MochaoModel.ins().send3(para_Shentai, 0);
                    console.log("moChaoTimeOccupy:" + new Date().toLocaleString());
                }
            }
            if (!rewardBool_Mochao && new Date().getDay() == 0 && new Date().toLocaleTimeString() >= '22:25:00') {
                rewardBool_Mochao = true;
                for (i = 1; i < 12; i++) {                   
                    //net.MochaoModel.ins().send11(i);  //reward 1-n
                }                
            }
        }
    }

    //Common UI------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    function f_CreateButton(top, right, cName, onClickFn) {
        const btn = document.createElement('button');
        btn.style.cssText = `position: fixed;top: ${top}px;right: ${right}px;padding: 5px 5px;background: #ff4444;color: white;border: none;border-radius: 4px;cursor: pointer;z-index: 9000;font-size: 10px;`;
        btn.innerText = cName;
        btn.onclick = onClickFn;
        document.body.appendChild(btn);
    }

    function f_CreateSelect(top, right, p_list) {
        const sel = document.createElement("select");
        sel.id = "select1";
        sel.style.cssText = `position: fixed;top: ${top}px;right: ${right}px;padding: 5px 5px;background: #ff4444;color: white;border: none;border-radius: 4px;cursor: pointer;z-index: 9000;font-size: 10px;`;
        p_list.forEach((item, i) => {
            const opt = document.createElement("option");
            opt.value = item.value;
            opt.innerText = item.text;
            sel.append(opt);
        });
        document.body.appendChild(sel);
    }

    function stopTimer_f_Common() {
        var p_select = document.getElementById("select1").value;
        switch (parseInt(p_select)) {
            case 0: stopTimer_f_Blood(); break;
            case 1: stopTimer_f_Sifang(); break;
            case 2: stopTimer_f_Qunxiong(); break;
            case 3: stopTimer_f_Shenmo(); break;
            case 4: stopTimer_f_Wzzb(); break;
            case 5: stopTimer_f_Yanhuo(); break;
            case 6: stopTimer_f_Cjzc(); break;
            case 7: stopTimer_f_Ice3(); break;
            case 8: stopTimer_f_Hot(); break;

            case 21: stopTimer_f_Xian(31001, 6101); break;
            case 22: stopTimer_f_Xian(31002, 6102); break;
            case 23: stopTimer_f_Xian(31003, 6103); break;
            case 24: stopTimer_f_Xian(31004, 6104); break;
        }
    }

    function beginTimer_f_Common() {
        var p_select = document.getElementById("select1").value;
        switch (parseInt(p_select)) {
            case 0: beginTimer_f_Blood(); break;
            case 1: beginTimer_f_Sifang(); break;
            case 2: beginTimer_f_Qunxiong(); break;
            case 3: beginTimer_f_Shenmo(); break;
            case 4: beginTimer_f_Wzzb(); break;
            case 5: beginTimer_f_Yanhuo(); break;
            case 6: beginTimer_f_Cjzc(); break;
            case 7: beginTimer_f_Ice3(); break;
            case 8: beginTimer_f_Hot(); break;

            case 21: beginTimer_f_Xian(31001, 6101); break;
            case 22: beginTimer_f_Xian(31002, 6102); break;
            case 23: beginTimer_f_Xian(31003, 6103); break;
            case 24: beginTimer_f_Xian(31004, 6104); break;
        }
    }

    f_CreateButton(5, 5, "关闭", stopTimer);
    f_CreateButton(30, 5, "关闭", stopTimer_f_Yiji);
    f_CreateButton(55, 5, "关闭", stopTimer_f_Common);
    // f_CreateButton(80, 5, "relive", f_globalRelive);

    f_CreateButton(5, 40, "开始", beginTimer);
    f_CreateButton(30, 40, "遗迹", beginTimer_f_Yiji);
    f_CreateButton(55, 40, "开始", beginTimer_f_Common);

    const p_option1 = [
        { value: 0, text: '血火' },
        { value: 1, text: '四方' },
        { value: 2, text: '群雄' },
        { value: 3, text: '神魔' },
        { value: 4, text: '王者' },
        { value: 5, text: '焰火' },
        { value: 6, text: '刺激' },
        { value: 7, text: '冰宫3' },
        { value: 8, text: '炽热' },
        // { value: 11, text: '猴1' },
        // { value: 12, text: '猴2' },
        // { value: 13, text: '猴3' },
        // { value: 14, text: '猴4' },
        { value: 21, text: '仙1' },
        { value: 22, text: '仙2' },
        { value: 23, text: '仙3' },
        { value: 24, text: '仙4' }
    ];
    f_CreateSelect(57, 75, p_option1);

    //多选下拉菜单yiji---------------------------------------------------------------------------------------------------------------------
    let checkboxList = [];
    function f_CreateSelect1(top, right, p_list) {
        // 1. 创建外层容器
        const container = document.createElement("div");
        container.style.cssText = `position: fixed;top: ${top}px;right: ${right}px;z-index: 9000;font-size: 10px;`;
        // 2. 创建点击显示框（模拟你的select外观）
        const inputBox1 = document.createElement("div");
        inputBox1.id = 'selectdivValue';
        inputBox1.style.cssText = `display: none`;
        const inputBox = document.createElement("div");
        inputBox.style.cssText = `padding: 5px 10px;background: #ff4444;color: white;border: none;border-radius: 4px;cursor: pointer;min-width: 80px;user-select: none;`;
        inputBox.innerText = "请选择";
        inputBox.id = 'selectdivText';
        // 3. 创建下拉面板（默认隐藏）
        const dropdown = document.createElement("div");
        dropdown.style.cssText = `position: absolute;top: 105%;right: 0;background: #fff;border: 1px solid #ddd;border-radius: 4px;min-width: 100px;max-height: 200px;overflow-y: auto;display: none;color: #333;`;

        // 保存所有 checkbox，方便后面获取值
        // const checkboxList = [];

        // 4. 循环生成多选选项
        p_list.forEach((item, i) => {
            const label = document.createElement("label");
            label.style.cssText = `display: flex;align-items: center;padding: 6px 10px;gap: 6px;cursor: pointer;`;
            label.onmouseover = () => (label.style.background = "#f5f5f5");
            label.onmouseout = () => (label.style.background = "#fff");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = item.value;
            checkboxList.push(checkbox); // 存入数组

            const text = document.createElement("span");
            text.innerText = item.text;

            label.append(checkbox, text);
            dropdown.append(label);

            checkbox.addEventListener("change", updateSelectedText);
        });

        // 组装
        container.append(inputBox, dropdown, inputBox1);
        document.body.append(container);

        // 展开/关闭
        inputBox.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });

        // 空白关闭
        document.addEventListener("click", () => {
            dropdown.style.display = "none";
        });
        dropdown.addEventListener("click", (e) => e.stopPropagation());

        // 更新显示文本
        function updateSelectedText() {
            const selected = checkboxList.filter(cb => cb.checked).map(cb => cb.nextElementSibling.innerText);
            const selected1 = checkboxList.filter(cb => cb.checked).map(cb => cb.value);
            inputBox.innerText = selected.length ? selected.join(",") : "请选择";
            inputBox1.innerText = selected1.length ? selected1.join(",") : "";

            saveYijiConfig();
            //GM_setValue("p_YijiijiConfig", selected1);
        }
    }

    const p_list_yiji = [
        { value: "8036", text: "670" },
        { value: "8035", text: "660" },
        { value: "8030", text: "570" },
        { value: "8029", text: "560" },
        { value: "8024", text: "470" },
        { value: "8023", text: "460" },
        { value: "8018", text: "370" },
        // { value: "8017", text: "360" },
        { value: "8012", text: "270" }
    ];

    f_CreateSelect1(32, 75, p_list_yiji);

    function saveYijiConfig() {
        const config = checkboxList.filter(cb => cb.checked).map(cb => ({
            text: cb.nextElementSibling.innerText,
            value: cb.value
        }));
        GM_setValue("p_YijiijiConfig", config);
    }

    function loadYijiConfig() {
        const config = GM_getValue("p_YijiijiConfig");
        if (!config) return;

        config.forEach(item => {
            checkboxList.forEach(cb => {
                if (cb.value == item.value) {
                    cb.checked = true;
                }
            });
        });
        document.getElementById("selectdivText").innerHTML = config.map(item => item.text).join(",");
        document.getElementById("selectdivValue").innerHTML = config.map(item => item.value).join(",");
    }
    loadYijiConfig();

    //Common function---------------------------------------------------------------------------------------------------------------------
    //提示框success error
    const style = document.createElement('style');
    style.textContent = `
        .custom-toast {
            position: fixed;top: 20px;right: 20px;padding: 12px 20px;border-radius: 6px;color: #fff;font-size: 13px;z-index: 999999;opacity: 0;transform: translateY(-20px);transition: all 0.3s ease;max-width: 300px;word-break: break-all;
        }
        .custom-toast.show {opacity: 1; transform: translateY(0);}
        .custom-toast.success {background-color: #00b42a;}
        .custom-toast.error {background-color: #ff4d4f;}
    `;
    document.head.appendChild(style);
    window.p_alert = function (type, msg) {
        const oldToast = document.querySelector('.custom-toast');// 移除旧的提示
        if (oldToast) oldToast.remove();
        const toast = document.createElement('div');
        toast.className = `custom-toast ${type}`;
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);// 显示
        setTimeout(() => {// 3秒后消失
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
    window.p_alert_error = (msg) => window.p_alert('error', msg);
    window.p_alert_success = (msg) => window.p_alert('success', msg);

    //gotomap
    function p_TimeGotoMap(config) {
        let code = '';
        config.forEach((item, index) => {
            const p_time = item.time.split('-');
            const p_vaule = item.value.split(';');
            if (p_vaule[0] != "81") {
                code += `if (nowHourPY >= ${p_time[0]} && nowHourPY < ${p_time[1]} && gd.map.curMapId != ${p_vaule[0]}) {Logic.deliverToFindNpc(${p_vaule[1]});}`;
            }
        });
        return code;
    }

    //模拟Canvas坐标点击
    window.clickCanvasAt = function (x, y) {
        const canvas = document.querySelector('canvas');
        if (!canvas) {
            console.log('等待Canvas加载...');
            return;
        }
        const rect = canvas.getBoundingClientRect();
        // x = f_ConvertXY(x, y, canvas.width, canvas.height).x;
        // y = f_ConvertXY(x, y, canvas.width, canvas.height).y;
        // if (x == 1130) { x = 800; y = 300; } //1024*768  tencent001-windows 
        // if (x == 1206) { x = 845; y = 300; } //1024*768  tencent001-windows
        if (x == 1130) { x = 815; y = 305; } //1024*768  aliyun001-linux
        if (x == 1206) { x = 860; y = 305; } //1024*768  aliyun001-linux
        const clientX = rect.left + x;
        const clientY = rect.top + y;
        canvas.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX, clientY }));
        canvas.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX, clientY }));
        canvas.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX, clientY }));
        //console.log(`模拟点击 Canvas 坐标 (${x}, ${y})`);
    };

    //坐标转换
    function f_ConvertXY(x, y, tarW, tarH) {
        const newX = Math.round(x * (tarW / 2160));
        const newY = Math.round(y * (tarH / 1149));
        return { x: newX, y: newY };
    }
    // clickCanvasAt(f_ConvertXY(1130, 400, 800, 600).x, f_ConvertXY(1130, 400, 800, 600).y);//main sifang  qunxiong
    // clickCanvasAt(f_ConvertXY(1206, 400, 800, 600).x, f_ConvertXY(1206, 400, 800, 600).y);//blood  yiji  shenmo

    //aoto relive-------------------------------------------------------------------------------------------------------------testtesttesttest
    function f_globalRelive() {
        var para_Relive;
        if (!para_Relive) {
            para_Relive = {//var myEntity = emIns.getEntity("1610424320_2128603008");
                lid: emIns.firstPlayer.fighterObject.id._string,
                hp: emIns.firstPlayer.fighterObject.maxHp,
                inner: emIns.firstPlayer.fighterObject.maxInner,
                x: 78,
                y: 16
            };
        }
        var e = para_Relive;
        // GameSceneManager.Instance.curInstance.relive(para_Relive);
        var t = emIns.getEntity(e.lid.toString());
        if (t && t.fighterObject) {
            t.fighterObject.isDead = false;
            t.fighterObject.delayhp = t.fighterObject.truehp = e.hp;//e.hp.toNumber();
            t.fighterObject.maxInner = t.fighterObject.delayInner = t.fighterObject.trueInner = e.inner;
            t._entityAI.relive(t);
            t.x = e.x * GameDefine.MAP_GRID_WIDTH + 0.5 * GameDefine.MAP_GRID_WIDTH;
            t.y = e.y * GameDefine.MAP_GRID_HEIGHT + 0.5 * GameDefine.MAP_GRID_HEIGHT;
            t.setPosition(e.x, e.y);
            if (gd.map.config.cls === 58 || gd.map.config.cls === 88) {
                var i = gd.honourbattle.myCamp;
                t.fighterObject.league !== i ? t.setNameColor(Html.New165) : t.setNameColor(14277081);
            }
            if (gd.map.config.cls === 36) {
                t.fighterObject.league !== gd.arpgInst.biqiMyGroup ? t.setNameColor(Html.New165) : t.setNameColor(14277081);
            }
            if (t.uid === emIns.firstPlayer.uid) {
                if (!gd.player.slBuff.shenlong) {
                    t.fighterObject.droganBuff = false;
                }
                if (gd.map.config && gd.map.config.duplicate !== 1) {
                    var r = cm.global[20001].value;
                    if (parseInt(r) >= gd.player.level) {
                        //var a = new CallBack3(context.reliveCallBack, context);
                        //AlertDialog.showAlertById(98, a);
                    }
                }
                gd.skill.clearNextSkill();
                if (gd.map.config.cls === 58 || gd.map.config.cls === 88) {
                    var n = gd.honourbattle.wzzbrolearr;
                    if (gd.map.config.cls === 88) {
                        n = gd.tvt.duplicateArr;
                    }
                    for (var o in n) {
                        if (n[o].rid.toString() === gd.player.uid.toString() && n[o].reliveCount === 0) {
                            gd.honourbattle.sendNotif(469);
                            break;
                        }
                    }
                }
                gd.arpgInst.shiftKey = false;
                Logic.hideReliveDialog();
                gd.arpgInst.sendNotif(315);
            }
        }
    }

    /*监听点击事件
    function listenCanvasClick(canvas) {// 监听点击事件（真正可用的方法）
        // 全局捕获模式，优先级最高，不会被页面拦截
        document.addEventListener('click', function(e) {
            // 判断点击的是不是 canvas
            if (e.target === canvas || e.composedPath().includes(canvas)) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                console.log('time-Canvas 点击位置：'+'X:'+'Y:', x.toFixed(0)+','+y.toFixed(0));
            }
        }, true); //关键：true = 最高优先级捕获
    }

    function watchCanvas() {// 监听 Canvas 出现
        // 监听页面所有新增元素
        const observer = new MutationObserver(mutations => {
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (node.tagName === 'CANVAS') {
                        console.log("找到 Canvas，开始监听点击");
                        listenCanvasClick(node);
                    }
                });
            });
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    watchCanvas();   // 启动
    */

})();

