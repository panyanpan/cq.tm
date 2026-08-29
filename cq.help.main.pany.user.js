// ==UserScript==
// @name         cq.help.main.pany
// @namespace    http://tampermonkey.net/
// @version      1.10
// @description  try to take over the world!
// @author       pany
// @match        *://rk.hlxy.db9x.com/*
// @match        *://sdk.zwnet.cn/*
// @icon         https://sdk.zwnet.cn/favicon.ico
// @grant        GM_setValue
// @grant        GM_getValue
// @downloadURL https://cdn.jsdelivr.net/gh/panyanpan/cq.tm@main/cq.help.main.pany.user.js
// @updateURL https://cdn.jsdelivr.net/gh/panyanpan/cq.tm@main/cq.help.main.pany.user.js
// ==/UserScript==

(function () {
    'use strict';

    function checkIframeOpen(maxRetry = 10, current = 0) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
            const src = iframe.getAttribute('src')?.trim();
            if (src) { window.location.href = src; return; }
        }
        current++;
        if (current >= maxRetry) return;
        setTimeout(() => checkIframeOpen(maxRetry, current), 3000);
    }

    if (window.location.href.includes('sdk.zwnet.cn')) {
        checkIframeOpen();
        // setTimeout(() => {
        //     const iframe = document.querySelector('iframe');
        //     window.open(iframe.getAttribute('src'));
        // }, 5000);
    }

    let GLOBAL_ENABLE = true;  //全局开关
    // 全局日志开关（生产环境改为 false）
    const GLOBAL_LOG_ENABLE = false;
    const originalConsoleLog = console.log;
    console.log = function (...args) {
        if (GLOBAL_LOG_ENABLE) {
            originalConsoleLog.apply(console, args);
        }
    };
    console.log1 = function (...args) {
        originalConsoleLog.apply(console, args);
    };
    const f_Sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    var p_timerObj = {
        Main: null, Wzzb: null, Blood: null, BloodChild: null, Yiji: null, Chechi: null
        , Ice3: null, Sifang: null, Qunxiong: null, Cjzc: null, Shenmo: null, Yanhuo: null
        , Jilin: null, Xian: null, Hot: null, Ronglian: null, Dianfeng: null, Shentai: null, Common: null
    };
    function stopTimer_f_Com(keyName) {
        const timerId = p_timerObj[keyName];
        if (timerId != null) {
            clearInterval(timerId);
            p_timerObj[keyName] = null;
            console.log(`定时器已关闭 [${keyName}] at ${new Date().toLocaleString()}`);
            para_globalBool = true;
            p_alert_error(`已关闭 [${keyName}]`);
        } else {
            console.log(`定时器 [${keyName}] 未运行`);
            p_alert_error(` [${keyName}] 未运行`);
        }
    }
    //begin main--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    console.log("cq.help.main.logTime:" + new Date().toLocaleString());
    var para_globalBool = true;
    let para_yabiaoCount = 0;
    var para_mochaoCount = 0;
    function beginTimer() {
        console.log("benginTime-Main" + new Date().toLocaleString());
        if (p_timerObj.Main != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Main");
            p_alert_success('运行中...');
            return;
        }

        p_timerObj.Main = setInterval(async () => {
            console.log("time-Main:" + Main);
            if (para_globalBool) {
                const nowHourPY = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
                console.log("logServerTime:" + new Date(DateUtil.serverNow()).toLocaleString());
                // try {
                //     findMochao_Occupy();
                //     para_mochaoCount++;
                //     if (para_mochaoCount % 5 == 0) {
                //         var t = uim.show(503); await f_Sleep(500);
                //         t.onRadioSelected(3);
                //         t.page.radioGroup.selectedValue = 8;
                //         t.page.selectType = parseInt(8);
                //         t.page.updateShow(); await f_Sleep(500);
                //         uim.hide(503); await f_Sleep(500);
                //     }
                // }
                // catch (error) { console.error("time-findMochao_Occupy-error:" + error.message); }  //auto occupy MoChao
                if (p_timerObj.Shentai == null) {
                    beginTimer_f_Shentai();
                }
                if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                    net.MapModel.ins().send25(1);//clickCanvasAt(1130, 400);
                    await f_Sleep(2000);
                    console.log("deadClickTime:" + new Date().toLocaleString());
                }
                if (emIns.firstPlayer.fighterObject.delayhp < emIns.firstPlayer.fighterObject.maxHp * 0.9
                    && [81, 200018, 200029, 200043, 200049, 200076, 10000, 9994].includes(gd.map.curMapId)) {//biqi 2+
                    Logic.deliverToFindNpc(600300);//biqi1
                    await f_Sleep(1000); gd.map.gotoStagePoint(137, 120, gd.map.curMapId, false);
                    await f_Sleep(15000); net.CureModel.ins().send2(0);    //click cure
                    await f_Sleep(1000);
                }
                if (GLOBAL_ENABLE && nowHourPY >= 1145 && nowHourPY < 1150 && gd.map.curMapId != 6077 && para_yabiaoCount == 0) {
                    Logic.deliverToFindNpc(506083);
                    if (gd.yabiao.emsNumKf < 2) {
                        await f_Sleep(1000); gd.yabiao.requestStart(18, 2);//gd.yabiao.requestStart(17, 2);
                        para_yabiaoCount++;
                        console.log("gotoMapTime-yabiao:" + new Date().toLocaleString());
                    }
                }
                if (GLOBAL_ENABLE && nowHourPY >= 1150 && nowHourPY < 1155 && para_yabiaoCount == 1) {
                    Logic.deliverToFindNpc(506083);
                    if (gd.yabiao.emsNumKf < 2) {
                        await f_Sleep(1000); gd.yabiao.requestStart(18, 2);//gd.yabiao.requestStart(17, 2);
                        para_yabiaoCount++;
                        console.log("gotoMapTime-yabiao:" + new Date().toLocaleString());
                    }
                }
                if ((nowHourPY > 1155 || nowHourPY < 1145) && para_yabiaoCount != 0) {
                    para_yabiaoCount = 0;
                }
                if (GLOBAL_ENABLE && nowHourPY >= 1200 && nowHourPY < 1205 && p_timerObj.Wzzb == null) {
                    beginTimer_f_Wzzb();
                }

                const config = GM_getValue("p_MapSelectConfig");
                if (config != null && config.length > 0) {
                    await eval(p_TimeGotoMap(config).replace(/:/g, ''));
                }
                if (GLOBAL_ENABLE && ((new Date().getDay() != 0 && (nowHourPY < 1000 || nowHourPY > 1220))
                    || (new Date().getDay() == 0 && nowHourPY < 1750))) {
                    if (p_timerObj.Dianfeng == null && gd.tianti.tiantiInfo?.leftCount > 7) {
                        beginTimer_f_Dianfeng();
                    }
                }
                if (gd.arpgInst.autoFightType == 3 && gd.map.curMapId != 6077) {
                    await f_Sleep(1000); gd.arpgInst.setAutoFight(1);
                    console.log("arpgClickTime:" + new Date().toLocaleString());
                }
            }
        }, 60 * 1e3);
        p_alert_success('开始（主线）');
    }

    //main-ui----------------------------------------------------------------------------------------------------
    const p_timeList = [
        { time: "0-2:00" },
        { time: "2:00-10:00" },
        { time: "10:00-11:00" },
        { time: "11:00-11:40" },
        { time: "12:05-14:30" },
        { time: "14:30-15:00" },
        { time: "15:00-18:00" },
        { time: "18:00-18:45" },
        { time: "19:00-19:30" },
        { time: "20:00-20:30" },
        { time: "20:30-21:59" },
        { time: "22:00-23:59" }
    ];
    const p_mapList = [//cm.deliver[deliverId].toMapId
        { name: "比奇", mapId: 81, deliverId: 600300 },
        { name: "喜魄1", mapId: 6126, deliverId: 400104 },
        { name: "怒魄1", mapId: 6127, deliverId: 400105 },
        { name: "哀魄1", mapId: 6128, deliverId: 400106 },
        { name: "惧魄1", mapId: 6133, deliverId: 400111 },
        { name: "爱魄1", mapId: 6134, deliverId: 400112 },
        { name: "恶魄1", mapId: 6135, deliverId: 400113 },
        { name: "无尽", mapId: 200090, deliverId: 200090 },
        { name: "无量", mapId: 200091, deliverId: 200091 },
        { name: "无极", mapId: 200092, deliverId: 200092 },
        { name: "狮驼", mapId: 200039, deliverId: 600054, deliverIdNpc: 600082 },
        { name: "清华", mapId: 200040, deliverId: 600060, deliverIdNpc: 600083 },
        { name: "无底", mapId: 200041, deliverId: 600061, deliverIdNpc: 600084 },
        { name: "盘恒", mapId: 200056, deliverId: 600100, deliverIdNpc: 600110 },
        { name: "玄英", mapId: 200057, deliverId: 600101, deliverIdNpc: 600111 },
        { name: "毛颖", mapId: 200058, deliverId: 600102, deliverIdNpc: 600112 },
        { name: "铜台", mapId: 200059, deliverId: 600103, deliverIdNpc: 600113 },
        { name: "降妖4", mapId: 200047, deliverId: 600067 },
        { name: "降妖5", mapId: 200048, deliverId: 600068 },
        { name: "降妖9", mapId: 200067, deliverId: 600118 },
        { name: "降妖10", mapId: 200068, deliverId: 600119 },
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
        { name: "黄金1", mapId: 200077, deliverId: 600159 },
        { name: "镇狱0", mapId: 6124, deliverId: 400103 },
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
            time: p_timeList[index].time,// == "00:00-11:00" ? "0-11:00" : p_timeList[index].time,
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
    function beginTimer_f_Wzzb() {
        console.log("benginTime-Wzzb:" + new Date().toLocaleString());
        if (p_timerObj.Wzzb != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Wzzb");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Wzzb = setInterval(async () => {//wzzb 12:00-12:20    21:00-21:30
            var nowDate = new Date().getHours() * 100 + new Date().getMinutes();
            if ((nowDate > 1200 && nowDate < 1220) && p_timerObj.Wzzb != null) {
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                if (gd.map.curMapId != 3601) {
                    uim.show(318);
                }
                else {
                    uim.hide(318);
                }
                await f_Sleep(400);
                if (gd.map.curMapId != 3601 && gd.honourbattle.wzzbCountInfo.leftCount > 0) {//&& gd.honourbattle.wzzbCountInfo.matchState == 0
                    await f_Sleep(400); net.GamepvpModel.ins().send1(DaKuafuType.wzzb);
                }
                if (gd.arpgInst.autoFightType == 3) {
                    await f_Sleep(100); gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowDate > 1220 || gd.honourbattle.wzzbCountInfo?.leftCount == 0) {
                uim.hide(318);//wzzb
                stopTimer_f_Com("Wzzb");
            }
        }, 3000);
        p_alert_success('开始（王者）');
    }

    //child blood------------------------------------------------------------------------------------------------------
    var innerPY = false;
    function beginTimer_f_Blood() {
        console.log("benginTime-Blood:" + new Date().toLocaleString());
        if (p_timerObj.Blood != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Blood");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Blood = setInterval(async () => {
            console.log("time-Blood:" + p_timerObj.Blood);
            const nowHourPY = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if (nowHourPY >= 1930 && nowHourPY <= 1949 && gd.map.curMapId != 700 && !innerPY) {
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                console.log("gotoMapTimeKuafu:" + new Date().toLocaleString());
                net.CrazebattleModel.ins().send7(3);
                await f_Sleep(200); gd.inst.sendReqEnterArpgMapMessaged(700);//gotomap
                await f_Sleep(200);
                // if (gd.map.curMapId == 700) {
                //     innerPY = true;
                //     para_globalBool = false;
                //     f_Child_Blood();
                // }
            }
            if (gd.map.curMapId == 700 && p_timerObj.BloodChild == null) {
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                f_Child_Blood();
            }
            if (nowHourPY > 1950) {
                stopTimer_f_Com("Blood");
                stopTimer_f_Com("BloodChild");
            }
        }, 30000);
        p_alert_success('开始（血火）');
    }
    async function f_Child_Blood() {
        p_timerObj.BloodChild = setInterval(async () => {
            if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                await f_Sleep(400); net.MapModel.ins().send25(1);//clickCanvasAt(1206, 400);
            }
            if (gd.arpgInst.autoFightType == 3) {
                await f_Sleep(100); gd.arpgInst.setAutoFight(1);
            }
        }, 1000);
    }

    //child yiji------------------------------------------------------------------------------------------------------
    var para_yiji = [670, 470, 270];//670--------------------
    var para_yiji_mapid = [8036, 8024, 8012];//mapid------------------
    function beginTimer_f_Yiji() {
        console.log("benginTime-Yiji:" + new Date().toLocaleString());
        if (p_timerObj.Yiji != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Yiji");
            p_alert_success('运行中...');
            return;
        }
        para_globalBool = true;
        p_timerObj.Yiji = setInterval(async () => {
            var p_option_yji1 = document.getElementById("selectdivText");
            if (p_option_yji1 && p_option_yji1.innerHTML != "请选择") {
                para_yiji = p_option_yji1.innerHTML.split(',');
                para_yiji_mapid = document.getElementById("selectdivValue").innerHTML.split(',');
            }
            console.log("time-Yiji:" + p_timerObj.Yiji);
            if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                await f_Sleep(400); net.MapModel.ins().send25(1);//clickCanvasAt(1206, 400); 
                await f_Sleep(400);
            }
            if (gd.arpgInst.autoFightType == 3 && !para_globalBool) {
                await f_Sleep(100); gd.arpgInst.setAutoFight(1);
            }
            for (var i = 0; i < para_yiji.length; i++) {
                var timeRelive = gd.boss.arpgBossTimeDic[para_yiji_mapid[i]];
                // var timeRelive = gd.boss.arpgBossInfoDic[para_yiji_mapid[i]].reliveTime;
                console.log("Time-test:" + new Date().toLocaleString() + "--" + para_yiji[i] + "--" + para_yiji_mapid[i] + "--" + timeRelive + "--" + para_globalBool);
                if (timeRelive === undefined) { timeRelive = 0; }
                if (timeRelive == 0) { net.PlayModel.ins().send9(36); }
                if (para_globalBool && timeRelive < 30 && gd.map.curMapId != para_yiji_mapid[i]) {
                    net.PlayModel.ins().send3(para_yiji_mapid[i]);
                    await f_Sleep(400);
                    if (gd.map.curMapId == para_yiji_mapid[i]) {
                        para_globalBool = false;
                    }
                    break;
                }
                if (timeRelive > 300 && gd.map.curMapId == para_yiji_mapid[i]) {// > 5 min
                    await f_Sleep(2000); net.PlayModel.ins().send24();  //exit
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
        p_alert_success('开始（遗迹）');
    }

    //child sifang--------------------------------------------------------------------------------------------------------------
    var rewardBool_Sifang = false;
    function beginTimer_f_Sifang() {
        console.log("benginTime-Sifang:" + new Date().toLocaleString());
        if (new Date().getDay() != 2 && new Date().getDay() != 5) {
            p_alert_error('Sifang仅在周二和周五开放');
            return;
        }
        if (p_timerObj.Sifang != null) {
            console.log("Time:" + new Date().toLocaleString() + "-Sifang");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Sifang = setInterval(async () => {//20:00  curMapId=4901
            const nowHourPY = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if (nowHourPY >= 2000 && nowHourPY < 2020 && gd.map.curMapId != 4901) {
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                await f_Sleep(400); net.PlayModel.ins().send3(4901);    //gotomap                
                await f_Sleep(400); gd.map.gotoStagePoint(55, 58, gd.map.curMapId, false);
            }
            if (gd.map.curMapId == 4901 && emIns.firstPlayer.fighterObject.delayhp == 0) {
                await f_Sleep(10200); net.MapModel.ins().send25(1);//clickCanvasAt(1130, 400);
                await f_Sleep(500); gd.map.gotoStagePoint(55, 58, gd.map.curMapId, false);
            }
            if (nowHourPY >= 2000 && nowHourPY < 2020) {
                if (gd.arpgInst.autoFightType == 3) {
                    gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowHourPY > 2017 && !rewardBool_Sifang) {
                rewardBool_Sifang = true;
                for (i = 1; i < 11; i++) {
                    await f_Sleep(100); net.FairyislandModel.ins().send3(i); //reward  1-10
                }
            }
            if (nowHourPY > 2020) {
                stopTimer_f_Com("Sifang");
            }
        }, 2000);
        p_alert_success('开始（四方）');
    }

    //child cjzc-----------------------------------------------------------------------------------------------------------
    function beginTimer_f_Cjzc() {
        console.log("benginTime-Cjzc:" + new Date().toLocaleString());
        if (p_timerObj.Cjzc != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Cjzc");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Cjzc = setInterval(async () => {//cjzc 16:00-16:30    18:30-19:00
            var nowDate = new Date().getHours() * 100 + new Date().getMinutes();
            if ((nowDate > 1845 && nowDate < 1900) && p_timerObj.Cjzc != null) {
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                if (gd.map.curMapId != 37001) {
                    uim.show(318, new UIData(null, 6));//cjzc
                }
                await f_Sleep(400);
                if (gd.map.curMapId != 37001 && gd.honourbattle.dfData.leftCount > 0) {
                    await f_Sleep(400); net.GamepvpModel.ins().send1(DaKuafuType.dfzc);
                }
                if (gd.arpgInst.autoFightType == 3) {
                    await f_Sleep(100); gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowDate > 1900 || gd.honourbattle.dfData.leftCount == 0) {
                uim.hide(318);//cjzc
                stopTimer_f_Com("Cjzc");
            }
        }, 3000);
        p_alert_success('开始（刺激）');
    }

    //child shenmo-----------------------------------------------------------------------------------------------------------
    var p_iCount = 0;
    function beginTimer_f_Shenmo() {
        console.log("benginTime-Shemo:" + new Date().toLocaleString());
        if (p_timerObj.Shenmo != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Shemo");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Shenmo = setInterval(async () => {//21:30  curMapId=53001
            if (para_globalBool == true && gd.map.curMapId == 53001) {
                para_globalBool = false;
            }
            const nowHourPY = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if (nowHourPY >= 2131 && nowHourPY < 2135 && gd.map.curMapId != 53001
                // && 0 == gd.honourbattle.qzjdmatchState && gd.honourbattle.qzjdpanelinfo?.count > 0
            ) {
                await f_Sleep(400); net.GamepvpModel.ins().send1(DaKuafuType.qdjd); //gotomap
                await f_Sleep(10000);
                if (gd.map.curMapId == 53001) {
                    gd.map.gotoStagePoint(63, 68, gd.map.curMapId, false);//center xy
                }
            }
            if (nowHourPY >= 2145 && nowHourPY < 2150 && gd.map.curMapId != 53001
                // && 0 == gd.honourbattle.qzjdmatchState && gd.honourbattle.qzjdpanelinfo?.count > 0
            ) {
                await f_Sleep(400); net.GamepvpModel.ins().send1(DaKuafuType.qdjd); //gotomap
                await f_Sleep(10000);
                if (gd.map.curMapId == 53001) {
                    gd.map.gotoStagePoint(63, 68, gd.map.curMapId, false);//center xy
                }
            }
            if (gd.map.curMapId == 53001 && emIns.firstPlayer.fighterObject.delayhp == 0) {
                await f_Sleep(3200); net.MapModel.ins().send25(1);//clickCanvasAt(1206, 400);
                await f_Sleep(500); gd.map.gotoStagePoint(63, 68, gd.map.curMapId, false);//center xy
            }
            p_iCount++;
            if (p_iCount % 10 == 0 && gd.map.curMapId == 53001) {
                // clickCanvasAt(222, 247);//get reward
                try {
                    var t = cm.kuafuduodiankillrewards
                        , i = 0
                        , r = 0;
                    for (var a in t) {
                        if (t[a].needKill > gd.honourbattle.qzjdgetkillnum) {
                            i = t[a].id;
                            break
                        }
                        r = t[a].id
                    }
                    var n = cm.kuafuduodiankillrewards[i];
                    if (n.needKill <= gd.honourbattle.nowqzjdkillnum) {
                        net.CanyonHegemonyModel.ins().send16(n.needKill);
                    }
                } catch (error) {
                    console.error('time-shenmo-error:', new Date().toLocaleString() + "--" + error.message);
                }

                const currentX = emIns.firstPlayer.fighterObject.gridX;
                const currentY = emIns.firstPlayer.fighterObject.gridY;
                if (Math.abs(currentX - 63) > 10 || Math.abs(currentY - 68) > 10) {
                    gd.map.gotoStagePoint(63, 68, gd.map.curMapId, false);//center xy
                }
            }
            if (nowHourPY >= 2131 && nowHourPY < 2155) {
                if (gd.arpgInst.autoFightType == 3) {
                    gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowHourPY > 2158) {
                stopTimer_f_Com("Shenmo");
            }
        }, 2000);
        p_alert_success('开始（神魔）');
    }

    //child qunxiong------------------------------------------------------------------------------------------------------
    var rewardBool_Qunxiong = false;
    function beginTimer_f_Qunxiong() {
        console.log("benginTime-Qunxiong:" + new Date().toLocaleString());
        if (new Date().getDay() != 0) {
            p_alert_error('Qunxiong仅在周日开放');
            return;
        }
        if (p_timerObj.Qunxiong != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Qunxiong");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Qunxiong = setInterval(async () => {//20:30  curMapId=4002,4001
            const nowHourPY = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if (nowHourPY > 2000 && nowHourPY < 2030 && (gd.map.curMapId != 4001 && gd.map.curMapId != 4002)) {
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                await f_Sleep(400); net.PvpShabakeModel.ins().send4();    //gotomap
                await f_Sleep(400); gd.map.gotoStagePoint(90, 84, gd.map.curMapId, false);
            }
            if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                console.log("ClickTime:" + new Date().toLocaleString());
                await f_Sleep(5200);
                if (gd.map.curMapId == 4002) {
                    net.MapModel.ins().send25(1);//clickCanvasAt(1130, 400);
                }
                if (gd.map.curMapId == 4001) {//King
                    net.MapModel.ins().send25(1);//clickCanvasAt(1206, 400);
                }
                await f_Sleep(500); gd.map.gotoStagePoint(90, 84, gd.map.curMapId, false);
            }
            if (nowHourPY > 2000 && nowHourPY < 2030) {
                if (gd.arpgInst.autoFightType == 3) {
                    gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowHourPY > 2026 && !rewardBool_Qunxiong) {
                rewardBool_Qunxiong = true;
                for (i = 1; i < 12; i++) {
                    await f_Sleep(100); net.PvpShabakeModel.ins().send7(i); //reward  1-11
                }
            }
            if (nowHourPY > 2030) {
                stopTimer_f_Com("Qunxiong");
            }
        }, 2000);
        p_alert_success('开始（群雄）');
    }

    //child yanhuo---------------------------------------------------------------------------------------------------
    function beginTimer_f_Yanhuo() {
        console.log("benginTime-Yanhuo:" + new Date().toLocaleString());
        if (p_timerObj.Yanhuo != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Yanhuo");
            p_alert_success('运行中...');
            return;
        }
        var p_arr_yanhuo = 20044;//[20044,20045,20046,20047,20048,20049,20050,20051,20052,20053,20054,20055,20056,20057,20058];
        var p_arr_yanhuo_mapid = 5446;//[5446,5447,5448,5449,5450,5451,5452,5453,5454,5455,5456,5457,5458,5459,5460];
        var expireDate = new Date(Date.now() + 25 * 60 * 1000); //25 miniute
        p_timerObj.Yanhuo = setInterval(async () => {//yanhuo
            if (para_globalBool == true) {
                para_globalBool = false;
            }
            if (gd.map.curMapId == 200043) {//biqi3.5   !p_arr_yanhuo.includes(gd.map.curMapId) &&
                uim.show(798, new UIData({ dupId: p_arr_yanhuo, lookOtherTeam: false }));
                gd.nest.doJionIn(2, p_arr_yanhuo, null);//create team
                await f_Sleep(1000);
                net.SpiritmonsterModel.ins().send13(p_arr_yanhuo, gd.nest.teamData.teamId, false);//gotomap
                await f_Sleep(200);
                p_arr_yanhuo++;
                p_arr_yanhuo_mapid++;
            }
            if (gd.arpgInst.autoFightType == 3) {
                await f_Sleep(100); gd.arpgInst.setAutoFight(1);
            }
            if (new Date() > expireDate) {
                stopTimer_f_Com("Yanhuo");
            }
        }, 10000);
        p_alert_success('开始（焰火）');
    }

    function beginTimer_f_Xian(mapid, deliverId) {
        console.log("benginTime-xian:" + new Date().toLocaleString());
        if (p_timerObj.Xian != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-xian");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Xian = setInterval(async () => {//xian 17:00-17:15
            if (!mapid || !deliverId) {
                var t = uim.show(601); await f_Sleep(2000);
                t.onRadioSelected(1, 0);
                var curindex = t.page.page.bossInfo[t.page.page.selectBoss][0];
                deliverId = curindex.deliver;
                mapid = curindex.mapid;
                await f_Sleep(2000); uim.hide(601);
            }
            var nowDate = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if ((nowDate >= 1700 && nowDate < 1715)) {
                if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                    await f_Sleep(400); net.MapModel.ins().send25(1);//clickCanvasAt(1130, 400);
                }
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                if (gd.map.curMapId != mapid) {//![31001,31002,31003,31004,31005].includes(gd.map.curMapId)
                    await f_Sleep(200); Logic.deliverToFindNpc(deliverId);
                }
            }
            if (nowDate > 1715 || (nowDate > 1705 && gd.map.curMapId == mapid && gd.map.tombInfo.length == 1)) {
                stopTimer_f_Com("Xian");
            }
        }, 3000);
        p_alert_success('开始（xian）');
    }

    function beginTimer_f_Ice3() {
        console.log("benginTime-Ice3:" + new Date().toLocaleString());
        if (p_timerObj.Ice3 != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Ice3");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Ice3 = setInterval(async () => {//Ice3 11:30-11:45
            var nowDate = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if ((nowDate >= 1130 && nowDate < 1145) && p_timerObj.Ice3 != null) {
                if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                    await f_Sleep(400); net.MapModel.ins().send25(1);//clickCanvasAt(1130, 400);
                }
                if (emIns.firstPlayer.fighterObject.delayhp < emIns.firstPlayer.fighterObject.maxHp * 0.9
                    && [81, 200018, 200029, 200043, 200049, 200076, 10000, 9994].includes(gd.map.curMapId)) {
                    Logic.deliverToFindNpc(600300);//biqi1  81
                    await f_Sleep(1000); gd.map.gotoStagePoint(137, 120, gd.map.curMapId, false);
                    // await f_Sleep(4000); net.CureModel.ins().send2(0);    //click cure
                    await f_Sleep(1000); net.TianguanModel.ins().send3();    //mapid=70001
                    await f_Sleep(1000); net.DuplicateModel.ins().send3();   //exit  
                    await f_Sleep(1000);
                    if (emIns.firstPlayer.fighterObject.delayhp > emIns.firstPlayer.fighterObject.maxHp * 0.9) {
                        Logic.deliverToFindNpc(600089);      //bingong3  200052
                    }
                }
                if (gd.map.curMapId != 200052) {
                    await f_Sleep(200); Logic.deliverToFindNpc(600089);
                }
                if (gd.arpgInst.autoFightType == 3) {
                    await f_Sleep(100); gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowDate > 1145 || (nowDate > 1135 && gd.map.curMapId == 200052 && gd.map.tombInfo.length == 7)) {
                stopTimer_f_Com("Ice3");
            }
        }, 2000);
        p_alert_success('开始（Ice3）');
    }

    var para_boss_hot = [
        { mid: 9900101, x: 17, y: 87 },
        { mid: 9900102, x: 17, y: 23 },
        { mid: 9900103, x: 77, y: 23 },
        { mid: 9900104, x: 77, y: 86 }
    ];
    function beginTimer_f_Hot() {
        console.log("benginTime-Hot:" + new Date().toLocaleString());
        if (p_timerObj.Hot != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Hot");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Hot = setInterval(async () => {//Hot 17:30-17:40
            var nowDate = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if ((nowDate >= 1730 && nowDate < 1740) && p_timerObj.Hot != null) {
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                    await f_Sleep(400); net.MapModel.ins().send25(1);//clickCanvasAt(1130, 400);
                }
                if (emIns.firstPlayer.fighterObject.delayhp < emIns.firstPlayer.fighterObject.maxHp * 0.9
                    && [81, 200018, 200029, 200043, 200049, 200076, 10000, 9994].includes(gd.map.curMapId)) {
                    Logic.deliverToFindNpc(600300);//biqi1  81
                    await f_Sleep(1000); gd.map.gotoStagePoint(137, 120, gd.map.curMapId, false);
                    // await f_Sleep(4000); net.CureModel.ins().send2(0);    //click cure
                    await f_Sleep(1000); net.TianguanModel.ins().send3();    //mapid=70001
                    await f_Sleep(1000); net.DuplicateModel.ins().send3();   //exit  

                    await f_Sleep(1000); net.PlayModel.ins().send3(5618);      //hot  5618  
                    await f_Sleep(400); gd.map.gotoStagePoint(78, 23, gd.map.curMapId, false); //(78,23)  (78,87) (17,88) (16,25)
                }
                if (gd.map.curMapId != 5618) {
                    await f_Sleep(200); net.PlayModel.ins().send3(5618);//5618 5618  
                    await f_Sleep(400); gd.map.gotoStagePoint(78, 23, gd.map.curMapId, false); //(78,23)  (78,87) (17,88) (16,25)
                } else {
                    try {
                        for (const item of para_boss_hot) {
                            if (!gd.map.tombInfo.some(p => p.mid === item.mid)) {
                                var para_xy = emIns.firstPlayer.fighterObject;
                                if (Math.abs(item.x - para_xy.x) > 20 || Math.abs(item.y - para_xy.y) > 20) {
                                    gd.map.gotoStagePoint(item.x, item.y, gd.map.curMapId, false);
                                    break;
                                }
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
                if (gd.arpgInst.autoFightType == 3) {
                    await f_Sleep(100); gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowDate > 1740 || (nowDate > 1732 && gd.map.curMapId == 5618 && gd.map.tombInfo.length == 4)) {
                stopTimer_f_Com("Hot");
            }
        }, 6000);
        p_alert_success('开始（Hot）');
    }

    var para_boss_Chechi = [
        { mid: 41000002, x: 88, y: 80 },//deer
        { mid: 41000001, x: 20, y: 18 },//sheep        
        { mid: 41000003, x: 20, y: 83 } //tiger
    ];
    function beginTimer_f_Chechi() {
        console.log("benginTime-Chechi:" + new Date().toLocaleString());
        if (p_timerObj.Chechi != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Chechi");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Chechi = setInterval(async () => {//Chechi 22:00-22:15
            var nowDate = new Date(DateUtil.serverNow()).getHours() * 100 + new Date(DateUtil.serverNow()).getMinutes();
            if ((nowDate >= 2159 && nowDate < 2215) && p_timerObj.Chechi != null) {
                if (para_globalBool == true) {
                    para_globalBool = false;
                }
                if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                    await f_Sleep(400); net.MapModel.ins().send25(1);//clickCanvasAt(1130, 400);
                }
                if (emIns.firstPlayer.fighterObject.delayhp < emIns.firstPlayer.fighterObject.maxHp * 0.9
                    && [81, 200018, 200029, 200043, 200049, 200076, 10000, 9994].includes(gd.map.curMapId)) {
                    Logic.deliverToFindNpc(600300);//biqi1  81
                    await f_Sleep(1000); gd.map.gotoStagePoint(137, 120, gd.map.curMapId, false);
                    await f_Sleep(4000); net.CureModel.ins().send2(0);    //click cure

                    await f_Sleep(1000); gd.inst.sendReqEnterArpgMapMessaged(200069)   //gotomap chechi
                    await f_Sleep(400); gd.map.gotoStagePoint(88, 80, gd.map.curMapId, false); //88,80   20,18   20,83
                }
                if (gd.map.curMapId != 200069) {
                    await f_Sleep(200); gd.inst.sendReqEnterArpgMapMessaged(200069)   //gotomap chechi
                    await f_Sleep(400); gd.map.gotoStagePoint(88, 80, gd.map.curMapId, false); //88,80   20,18   20,83
                } else {
                    try {
                        for (const item of para_boss_Chechi) {
                            if (!gd.map.tombInfo.some(p => p.mid === item.mid)) {
                                var para_xy = emIns.firstPlayer.fighterObject;
                                if (Math.abs(item.x - para_xy.x) > 20 || Math.abs(item.y - para_xy.y) > 20) {
                                    gd.map.gotoStagePoint(item.x, item.y, gd.map.curMapId, false);
                                    break;
                                }
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }

                if (gd.arpgInst.autoFightType == 3) {
                    await f_Sleep(100); gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowDate > 2215 || (nowDate > 2202 && gd.map.curMapId == 200069 && gd.map.tombInfo.length == 3)) {
                stopTimer_f_Com("Chechi");
            }
        }, 12 * 1e3);
        p_alert_success('开始（车迟）');
    }

    function beginTimer_f_Dianfeng() {
        console.log("benginTime-Dianfeng:" + new Date().toLocaleString());
        if (p_timerObj.Dianfeng != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Dianfeng");
            p_alert_success('运行中...');
            return;
        }
        var expireDate = new Date(Date.now() + 4 * 60 * 1000);
        p_timerObj.Dianfeng = setInterval(async () => {
            if (para_globalBool == true) {
                para_globalBool = false;
            }
            var nowDate = new Date().getHours() * 100 + new Date().getMinutes();
            if (gd.tianti.tiantiInfo.leftCount > 0) {
                if (gd.map.curMapId != 40004) {
                    await f_Sleep(200); net.TiantiModel.ins().send3();
                    await f_Sleep(400);
                }
                if (gd.arpgInst.autoFightType == 3) {
                    await f_Sleep(200); gd.arpgInst.setAutoFight(1);
                }
            }
            if (nowDate > expireDate || gd.tianti.tiantiInfo?.leftCount == 0) {
                await f_Sleep(10 * 1e3);
                stopTimer_f_Com("Dianfeng");
            }
        }, 2000);
        p_alert_success('开始（Dianfeng）');
    }

    function beginTimer_f_Jilin(id) {
        console.log("benginTime-jilin:" + new Date().toLocaleString());
        if (p_timerObj.Jilin != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-jilin");
            p_alert_success('运行中...');
            return;
        }
        var expireDate = new Date(Date.now() + 20 * 60 * 1000); //20 miniute
        p_timerObj.Jilin = setInterval(async () => {
            if (!id) {
                var t = uim.show(601); await f_Sleep(2000);
                id = t.page.listData.getItemAt(t.page.selIndex).id;
                await f_Sleep(2000); uim.hide(601);
            }
            var nowDate = new Date().getHours() * 100 + new Date().getMinutes();
            if (nowDate < 600 || nowDate > 2200) {
                return;
            }
            if (para_globalBool == true) {
                para_globalBool = false;
            }
            if (emIns.firstPlayer.fighterObject.delayhp == 0) {
                await f_Sleep(400); net.MapModel.ins().send25(1);//clickCanvasAt(1206, 400);
            }
            if (gd.map.curMapId != id) {//![32001,32002,32003,32004,32005,32006,32007,32008,32009].includes(gd.map.curMapId)
                uim.show(601);
                await f_Sleep(2000);
                if (gd.boss.dupCountData[id]?.count > 0) {
                    net.DuplicateModel.ins().send2(id);//32001;32002;32003;32004
                }
                uim.hide(601);
            }
            if (gd.arpgInst.autoFightType == 3) {
                gd.arpgInst.setAutoFight(1);
            }
            if (new Date() > expireDate || gd.boss.dupCountData[id]?.count == 0) {
                stopTimer_f_Com("Jilin");
            }
        }, 10000);
        p_alert_success('开始（jilin）');
    }

    //child shentai mochao---------------------------------------------------------------------------------------------------
    function findMochao(start, end) {//auto-MoChao(Shentai)
        if (gd.mochao.moChaoInfo != null) {
            // for (let i = start; i <= end; i++) {
            for (let i = end; i >= start; i--) {
                if (gd.mochao.moChaoInfo[i]?.status == 0) { return i; }
            }
        }
        console.log("moChaoTimeOccupy-find-status-null:" + new Date().toLocaleString());
        return null;
    }
    var rewardBool_Mochao = false;
    function findMochao_Occupy() {//auto occupy MoChao(Shentai)                      
        if (new Date().getDay() != 1 || (new Date().getDay() == 1 && new Date() > new Date().setHours(10, 0, 0, 0))) {
            var para_mc = gd.mochao.getMyMoChaoData();
            if (para_mc == null || (DateUtil.serverNow() - para_mc.occupyStartTime.toNumber() > 28800000)) {
                var para_Shentai = findMochao(711, 751) || findMochao(811, 999);//findMochao(704, 751) || findMochao(804, 999);
                if (para_Shentai) {
                    net.MochaoModel.ins().send3(para_Shentai, 0);
                }
            }
            if (!rewardBool_Mochao && new Date().getDay() == 0 && new Date() > new Date().setHours(22, 20, 0, 0)) {
                rewardBool_Mochao = true;
                for (var i = 1; i < 12; i++) {
                    //net.MochaoModel.ins().send11(i);  //reward 1-n
                }
            }
        }
    }
    function beginTimer_f_Shentai() {
        console.log("benginTime-Shentai:" + new Date().toLocaleString());
        if (p_timerObj.Shentai != null) {
            console.log("Time:" + new Date().toLocaleString() + "已有运行中的定时器-Shentai");
            p_alert_success('运行中...');
            return;
        }
        p_timerObj.Shentai = setInterval(async () => {
            if (para_mochaoCount % (5 * 10) == 0) {
                var t = uim.show(503); await f_Sleep(1000);
                t.onRadioSelected(3); await f_Sleep(1000);
                t.page.radioGroup.selectedValue = 8;
                t.page.selectType = parseInt(8);
                t.page.updateShow(); await f_Sleep(100);
                uim.hide(503);
            }
            try { findMochao_Occupy(); }
            catch (error) { console.error("time-findMochao_Occupy-error:" + error.message); }
            para_mochaoCount++;
        }, 6000);
        p_alert_success('开始（Shentai）');
    }

    async function f_Tianfu(type) {//type1-3
        const sendCount = 5;
        const delayMs = 100;

        const sendLoop = async (id) => {
            for (let s = 0; s < sendCount; s++) {
                net.NewtianfuModel.ins().send1(1, id);
                await f_Sleep(delayMs);
            }
        };
        try {
            net.NewtianfuModel.ins().send5(1);
            await f_Sleep(delayMs);
            switch (parseInt(type)) {
                case 1: {
                    for (let i = 1; i < 9; i++) {
                        await sendLoop(i);
                    }
                    break;
                }
                case 2: {
                    const skipList = [10, 14];
                    for (let i = 9; i < 19; i++) {
                        if (skipList.includes(i)) continue;
                        await sendLoop(i);
                    }
                    break;
                }
                case 3: {
                    const skipList = [19, 23];
                    for (let i = 19; i < 29; i++) {
                        if (skipList.includes(i)) continue;
                        await sendLoop(i);
                    }
                    break;
                }
                default:
                    console.warn("f_Tianfu: 未知的type值", type);
                    break;
            }
        } catch (err) {
            console.error("发包过程出现异常中断", err);
        }
    }

    function f_CheckPosition_Go(x, y, h = 20) {
        const currentX = emIns.firstPlayer.fighterObject.gridX;
        const currentY = emIns.firstPlayer.fighterObject.gridY;
        if (Math.abs(currentX - x) > h || Math.abs(currentY - y) > h) {
            gd.map.gotoStagePoint(x, y, gd.map.curMapId, false);//center xy
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

    function stopTimer_f_Select() {
        var p_select = document.getElementById("select1").value;
        switch (parseInt(p_select)) {
            case 0: stopTimer_f_Com("Blood"); stopTimer_f_Com("BloodChild"); break;
            case 1: stopTimer_f_Com("Sifang"); break;
            case 2: stopTimer_f_Com("Qunxiong"); break;
            case 3: stopTimer_f_Com("Shenmo"); break;
            case 4: stopTimer_f_Com("Wzzb"); break;
            case 5: stopTimer_f_Com("Yanhuo"); break;
            case 6: stopTimer_f_Com("Cjzc"); break;
            case 7: stopTimer_f_Com("Ice3"); break;
            case 8: stopTimer_f_Com("Hot"); break;
            case 9: stopTimer_f_Com("Chechi"); break;
            case 10: stopTimer_f_Com("Dianfeng"); break;

            case 21: stopTimer_f_Com("Xian"); break;

            case 31: stopTimer_f_Com("Jilin"); break;
        }
    }

    function beginTimer_f_Select() {
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
            case 9: beginTimer_f_Chechi(); break;
            case 10: beginTimer_f_Dianfeng(); break;

            case 21: beginTimer_f_Xian(); break;

            case 31: beginTimer_f_Jilin(); break;
        }
    }

    f_CreateButton(5, 5, "关闭", () => { stopTimer_f_Com("Main"); });
    f_CreateButton(30, 5, "关闭", () => { stopTimer_f_Com("Yiji"); });
    f_CreateButton(55, 5, "关闭", stopTimer_f_Select);
    // f_CreateButton(105, 5, "熔炼", beginTimer_f_Ronglian);    

    f_CreateButton(5, 40, "开始", beginTimer);
    f_CreateButton(30, 40, "遗迹", beginTimer_f_Yiji);
    f_CreateButton(55, 40, "开始", beginTimer_f_Select);

    f_CreateButton(80, 47, "怪", async () => { await f_Tianfu(1); });
    f_CreateButton(80, 26, "攻", async () => { await f_Tianfu(2); });
    f_CreateButton(80, 5, "防", async () => { await f_Tianfu(3); });
    // f_CreateButton(80, 40, "神台", findMochao_Occupy);

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
        { value: 9, text: '车迟' },
        // { value: 10, text: '巅峰' },
        // { value: 11, text: '猴1' },
        // { value: 12, text: '猴2' },
        // { value: 13, text: '猴3' },
        // { value: 14, text: '猴4' },
        { value: 21, text: '仙' },
        { value: 31, text: '棘林' }
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
        { value: "8012", text: "270" },
        { value: "8011", text: "260" }
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
            .custom-toast.error {background-color: #8605ff;}
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


    //auto ronglian
    function beginTimer_f_Ronglian() {
        console.log("beginTimer_f_Ronglian:" + new Date().toLocaleString());
        if (p_timerObj.Ronglian != null) {
            GLOBAL_ENABLE = true;
            clearInterval(p_timerObj.Ronglian);
            p_timerObj.Ronglian = null;
            p_alert_error('已关闭（Ronglian）');
        }
        else {
            GLOBAL_ENABLE = false;
            p_timerObj.Ronglian = setInterval(async () => {
                var t = uim.show(560, new UIData(null, 0));
                await f_Sleep(2000);
                var ids = [];
                for (var key in t.page.lids) {
                    ids.push(t.page.lids[key]);
                }
                if (ids.length > 0) {
                    net.BourseModel.ins().send21(ids);
                }
                await f_Sleep(2000); uim.hide(560);
                // clickCanvasAt(725, 517); //linux                
            }, 5 * 60 * 1e3);
            p_alert_success('已开始（Ronglian）');
        }
    }

    //check map valid
    function f_checkMapValid() {
        var e = gd.map.curMapId;
        return cm.duplicate[e] || cm.mapPlay[e] ? !1 : !0;
    }

    //gotomap
    function p_TimeGotoMap(config) {
        let code = '';
        var p_map = new Map(p_mapList.map(item => [item.deliverId, item.deliverIdNpc]));
        config.forEach((item, index) => {
            const p_time = item.time.split('-');
            const p_vaule = item.value.split(';');

            var p_deliverIdNpc = p_map.get(Number(p_vaule[1])) ?? '';

            if (p_vaule[0] != "81") {
                const arr_liupoDeliver = [400104, 400105, 400106, 400111, 400112, 400113];
                if (arr_liupoDeliver.includes(Number(p_vaule[1]))) {//random liupo
                    p_vaule[1] = arr_liupoDeliver[Math.floor(Math.random() * arr_liupoDeliver.length)];
                    const bool_go = [6126, 6127, 6128, 6133, 6134, 6135].includes(gd.map.curMapId);
                    code += `if (nowHourPY >= ${p_time[0]} && nowHourPY < ${p_time[1]} && ${!bool_go}) {`;
                } else {
                    code += `if (nowHourPY >= ${p_time[0]} && nowHourPY < ${p_time[1]} && gd.map.curMapId != ${p_vaule[0]}) {`;
                }
                if (p_deliverIdNpc != '') {
                    code += `Logic.deliverToFindNpc(${p_deliverIdNpc});`;   //go to npc
                    code += `(async function() {await f_Sleep(3000);Logic.deliverToFindNpc(${p_vaule[1]});})();}`;
                } else {
                    code += `Logic.deliverToFindNpc(${p_vaule[1]});}`;
                }
            }
        });
        return code;
    }


})();

