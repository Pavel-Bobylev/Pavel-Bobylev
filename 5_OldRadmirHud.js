const oldRadmirHud = {
    data: {
        hudEl: null,
        moneyEl: null,
        hpEl: { value: null, progress: null },
        armourEl: { value: null, progress: null },
        hungerEl: { value: null, progress: null },
        breathEl: { wrapper: null, value: null, progress: null },
        wanted: { wrapper: null, els: [] },
        weaponEl: { ammoEl: null, icon: null },
        server: { wrapper: null, image: null },
        freeze: { wrapper: null, value: null },
        radar: null,
        bonusEl: null,
        greenZoneEl: null
    },
    createHud(e) {
        this.data.hudEl = e.querySelector(".old-top");
        this.data.moneyEl = e.querySelector(".old-money span");
        [this.data.hpEl.progress, this.data.hpEl.value] = [e.querySelector(".health .old-progress__value"), e.querySelector(".health .old-param__value")];
        [this.data.armourEl.progress, this.data.armourEl.value] = [e.querySelector(".armour .old-progress__value"), e.querySelector(".armour .old-param__value")];
        [this.data.hungerEl.progress, this.data.hungerEl.value] = [e.querySelector(".hunger .old-progress__value"), e.querySelector(".hunger .old-param__value")];
        [this.data.breathEl.wrapper, this.data.breathEl.progress, this.data.breathEl.value] = [e.querySelector(".old-param.breath"), e.querySelector(".breath .old-progress__value"), e.querySelector(".breath .old-param__value")];
        [this.data.wanted.wrapper, this.data.wanted.els] = [e.querySelector(".old-wanted"), e.querySelector(".old-wanted__row").children];
        this.data.weaponEl.ammoEl = e.querySelector(".old-weapon__ammo").children;
        this.data.server.wrapper = e.querySelector(".old-logo");
        this.data.server.image = this.data.server.wrapper.children[0];
        this.data.bonusEl = e.querySelector(".old-bonus");
        this.data.greenZoneEl = e.querySelector(".old-zz");
        this.data.weaponEl.icon = e.querySelector(".old-weapon__icon");
        this.data.freeze.wrapper = e.querySelector(".old-param__freeze");
        this.data.freeze.value = e.querySelector(".old-freeze__value");
        this.data.freeze.wrapper.style.display = "none";
    },
    formatMoney(e) { return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); },
    onInfoChange(e, a) {
        if (e === "isShowFreeze" && a) {
            this.data.freeze.wrapper.style.display = "";
        }
        if (e === "isShowFreeze" && !a) {
            this.data.freeze.wrapper.style.display = "none";
        }
        if (e == "freeze") {
            this.data.freeze.value.innerHTML = `${a}%`;
        }
        if ((e == "show" || e == "showBars") && +a >= 1) {
            this.data.hudEl.style.display = "";
            if (window.interface('Hud').info.isShowFreeze) this.data.freeze.wrapper.style.display = "";
        }
        if ((e == "show" || e == "showBars") && +a == 0) {
            this.data.hudEl.style.display = "none";
            this.data.freeze.wrapper.style.display = "none";
        }
        if (e == "weapon") {
            this.data.weaponEl.icon.src = window.loaderModuleHudAssets.weapon[a];
        }
        if (e === "weapon" && a >= 16) {
            this.data.weaponEl.ammoEl[0].style.display = "";
            this.data.weaponEl.ammoEl[1].style.display = "";
        }
        if (e === "weapon" && a < 16) {
            this.data.weaponEl.ammoEl[0].style.display = "none";
            this.data.weaponEl.ammoEl[1].style.display = "none";
        }
        if (e == "showGreenZoneTab") {
            this.data.greenZoneEl.style.display = "";
        }
        if (e == "hideGreenZoneTab") {
            this.data.greenZoneEl.style.display = "none";
        }
        if (e == "health") {
            this.data.hpEl.progress.style.width = `${a}%`;
            this.data.hpEl.value.innerHTML = a;
        }
        if (e == "armour") {
            this.data.armourEl.progress.style.width = `${a}%`;
            this.data.armourEl.value.innerHTML = a;
        }
        if (e == "hunger") {
            this.data.hungerEl.progress.style.width = `${a}%`;
            this.data.hungerEl.value.innerHTML = a;
        }
        if (e == "breath") {
            this.data.breathEl.wrapper.style.display = a < 99 ? "" : "none";
            this.data.breathEl.progress.style.width = `${a}%`;
            this.data.breathEl.value.innerHTML = a;
        }
        if (e == "money") {
            this.data.moneyEl.innerHTML = this.formatMoney(a);
        }
        if (e == "wanted") {
            if (a === 0) {
                this.data.wanted.wrapper.style.display = "none";
                return;
            }
            this.data.wanted.wrapper.style.display = "";
            for (let e = 0; e < 6; e += 1) {
                if ((5 - e) / a >= 1 || 5 - e == 0 && a == 0) {
                    this.data.wanted.els[e].src = window.loaderModuleHudAssets.icons.inactive_wanted;
                    this.data.wanted.els[e].className = "old-wanted__inactive";
                } else {
                    this.data.wanted.els[e].src = window.loaderModuleHudAssets.icons.active_wanted;
                    this.data.wanted.els[e].className = "old-wanted__active";
                }
            }
        }
        if (e == "ammoInClip") {
            this.data.weaponEl.ammoEl[0].innerHTML = a;
        }
        if (e == "totalAmmo") {
            this.data.weaponEl.ammoEl[1].innerHTML = a;
        }
        if (e == "setBonus") {
            this.data.bonusEl.style.display = a <= 1 ? "none" : "";
            this.data.bonusEl.innerHTML = `x${a}`;
        }
        if (e == "setServer") {
            if (a <= 0) {
                return this.data.server.wrapper.style.display = "none";
            }
            if (a > 0 && this.data.server.wrapper.style.display == "none") {
                this.data.server.wrapper.style.display = "";
            }
            this.data.server.image.src = window.loaderModuleHudAssets.logo[a];
        }
    },
    setStyles() {
        let e = `#app .modal-container-wrapper{border:0;background:linear-gradient(45deg,#000000ef);box-shadow:none;transform:scale(.8);border-radius:2vh}#app .modal-container{border:none;background:0 0}#app .inventory-main__after,#app .inventory-main__before,#app .modal__pattern-wrapper{display:none}#app .modal__title{font-family:"Open Sans",var(--fallback-font);font-style:normal;letter-spacing:normal;text-transform:none;font-weight:600;font-size:2vh;border-bottom:1px solid #ffffff99;padding-bottom:1.5vh}#app .window-table__item{height:4.3vh;color:#fff;border-radius:2vh;border:none;background:#5f5f5f51;box-shadow:none;transition:.25s}#app .input-field_hoverable:hover,#app .window-table__item:hover{background:#5f5f5f7d}#app .window-table__item.selected{background:#fff;color:#000;transition:.25s}#app .window-table__col{font-size:1.55vh}#app .admin-menu__item.active .text,#app .window-table__item.selected .window-table__col p,.admin-menu__item.active:hover .text{color:#000!important}#app .player-interaction__title,.player-interaction__title_active{color:#fff!important}#app .input-field{border:none;background:rgba(95,95,95,.316);box-shadow:none;transition:.25s}.old-hud{color:#fff;width:100vw;height:100vh;position:relative}.hud-hassle-map .map-mask{border:10px solid #000}.old-logo img,.old-top{transform-origin:top right}.old-ammo__in-clip{font-family:'GothamPro Black Italic';font-weight:900;font-style:italic}.old-top{position:absolute;right:1vw;top:3vh;display:flex;flex-direction:column;align-items:flex-end}.old-logo{position:relative;margin-bottom:3vh}.old-logo img{width:18.52vh;height:6.2vh;margin-right:2vh}.old-bonus{position:absolute;right:1.2vw;top:4vh;width:2.96vh;height:2.96vh;border-radius:10vh;background:radial-gradient(93.1% 93.1% at 126.72% 6.9%,#eb00ff 0,#eb00ff00 100%),linear-gradient(129.39deg,#f5be09 30.88%,#e9651b 98.06%);display:flex;align-items:center;justify-content:center;font-family:'GothamPro Black';font-weight:900;font-size:1.3vh}.old-main,.old-money,.old-wanted__row{align-items:center;display:flex}.old-main{margin-top:.46vh;margin-right:3.46vh}.old-weapon{width:16.6vh;height:16.6vh;position:relative;display:flex;justify-content:flex-end;margin-left:-.93vh;margin-right:.46vh}.old-ammo__in-clip,.old-param__icon{margin-right:1.11vh}.old-weapon__back{position:absolute;right:-1.4vh;top:-1.6vh;z-index:-1}.old-weapon__icon{width:37vh;height:16.6vh}.old-weapon__ammo{position:absolute;bottom:5vh;right:5vh;display:flex;align-items:flex-end}.old-ammo__in-clip{font-size:2.31vh;line-height:1;text-shadow:0 0 .46vh #00000080}.old-ammo__total{font-family:'GothamPro Light Italic';font-weight:300;font-style:italic;font-size:1.67vh;text-shadow:0 0 .46vh #000000b3}.old-params{height:13.5vh;position:relative;z-index:1}.old-money{justify-content:flex-end;font-family:"GothamPro Black Italic";font-weight:900;font-style:italic;font-size:2.59vh;text-shadow:0 0 .46vh #00000080}.old-money img{width:2.5vh;height:2.5vh;margin-right:1.2vh}.old-params__content{margin-top:1vh}.old-param{display:flex;align-items:center;margin-top:.95vh}.old-param.health{margin-top:0;margin-left:1.85vh}.old-param.armour,.old-param__value{margin-left:.93vh}.old-param__progress,.old-progress__value{width:9.26vh;height:.46vh;background-color:#0000004d;border-radius:.46vh}.old-progress__value{display:flex;justify-content:flex-end}.old-progress__value .circle{width:.85vh;height:.93vh;margin-top:-.23vh;margin-right:-.28vh}.old-param__value{font-family:"GothamPro Light Italic";font-weight:300;font-style:italic;width:3.24vh;font-size:1.67vh;text-shadow:0 0 .46vh #000000b3}.old-freeze__value{font-family:"GothamPro Black";font-weight:900;color:#c3e6ff;text-shadow:0 0 2vh #000;font-size:2vh}.old-param.hunger{margin-left:.09vh}.old-param.breath{margin-left:-1vh;margin-top:1.5vh}.old-param.health .old-progress__value{background-color:#ed2e2e;box-shadow:#ed2e2e80 0 0 .46vh 0}.old-param.armour .old-progress__value{background-color:#526ee6;box-shadow:#526ee680 0 0 .46vh 0}.old-param.hunger .old-progress__value{background-color:#ff872e;box-shadow:#ff892e4d 0 0 .46vh 0}.old-param.breath .old-progress__value{background-color:#fff;box-shadow:#ffffff80 0 0 .46vh 0}.old-param.health .old-param__icon{width:1.4vh;height:1.2vh}.old-param.armour .old-param__icon{width:1.4vh;height:1.4vh}.old-param.hunger .old-param__icon{width:.9vh;height:1.4vh}.old-param.breath .old-param__icon{width:.85vh;height:.95vh}.old-wanted{position:relative;margin-right:6vh;margin-top:-1.6vh}.old-wanted__back{position:absolute;right:-1.2vh;top:-.66vh;z-index:-1}.old-wanted__row>img{width:1.35vw;height:2vh;padding:.19vh .28vh}.old-hud__wanted--always-show .old-wanted__inactive{opacity:.3}.old-radar{position:absolute;left:6.58vh;bottom:4.68vh;width:26.93vh;height:25.93vh;display:flex;justify-content:center;align-items:flex-start}.old-zz{position:absolute;left:-4.8vh;bottom:.5vh}.old-zz__icon{width:3.5vh;height:4.5vh}.old-param__freeze{position:absolute;bottom:-3vh;left:-4.5vh;display:flex;align-items:center}.old-freeze__icon{width:2.4vh;height:2.6vh;margin-right:.9vh;filter:drop-shadow(0 0 1vh #000)}#app .radmir-chat_opened .radmir-chat__before{opacity:.5!important}#app .radmir-chat-input__input{background:rgb(0 0 0 / 80%)!important;border-radius:11px!important}#app .radmir-chat-input__input input{margin-left:.9vh!important}#app .radmir-chat-input__input-lang{margin-right:1vh!important}#app .admin-menu__item.active,.admin-menu__item.active:hover{background:#fff!important}#app .admin-bottom__tabs .tab.active,body .admin-bottom__tabs .tab:hover{background:#fff!important;color:#000}.admin-menu__item.active svg,.admin-menu__item.active:hover img,.admin-menu__item.active:hover svg .admin-menu__item.active img{fill:#000!important}#app .admin-bottom__data .data-name .id{background:#222;color:#fff}#app .admin-info__head .data-meta{color:silver}#app .controls-button{border-radius:.5vh}#app .inventory-extra__container,#app .inventory-main{padding:2vh;background:rgb(0 0 0 / 80%);border-radius:1.1vh;border:0}#app .inventory-player{border:none}#app .inventory-extra{margin-bottom:0}#app .inventory__container,#app .inventory__controls{justify-content:center}#app .inventory-capacity,#app .inventory-container__box{border-radius:.8vh;border:.1vh solid #ffffff26;background:radial-gradient(#00000003,#ffffff26 150%)}#app .inventory-container__slot{border-radius:.8vh;background:radial-gradient(#00000003,#ffffff33)}#app .inventory-capacity__bar__fill,#app .inventory-wear__bar__fill{border-radius:1vh}#app .inventory-capacity__bar,#app .inventory-wear__bar{background:#f4f1e133;border-radius:1vh;width:100%;left:1.5vh;bottom:1vh}#app .inventory-extra__content{padding-bottom:.833vw}#app .inventory-container__slot:before{border-radius:.8vh;border:.1vh solid #f4f1e1;background:radial-gradient(#00000003,#ffffffcc 150%)}.inventory-container__info__container{border:none!important;padding-top:.8vh!important;background:rgb(0 0 0 / 80%)!important;border-radius:1.1vh!important;overflow:hidden}.inventory-item-value,.inventory-wear{height:4vh!important;border-radius:.8vh!important;border:.1vh solid #ffffff26!important;background:radial-gradient(#00000003,#ffffff26)!important}#app .inventory-wear__bar{bottom:.8vh}#app .inventory-action__modal{padding:2vh;background:rgb(0 0 0 / 80%);border-radius:1.1vh}#app .inventory-action__item__icon{border-radius:.8vh}#app .inventory-wear__content{margin:.5vh 1vh 0}#app .inventory-item-value{padding:0 2vh}#app .inventory-container__count,#app .inventory-container__slot-image{z-index:1}#app .inventory-container__actions{border-bottom-left-radius:.8vh;border-bottom-right-radius:.8vh;overflow:hidden}#app .player-interaction__inner{background:#00000080;border:.09vh solid #f4f1e18c}#app .player-interaction-favorite,#app .player-interaction-layer,#app .player-interaction__container{background:rgb(0 0 0 / 80%)}#app .info-card,#app .info-card__data{background:rgb(0 0 0 / 70%)}#app .player-interaction__icon,.player-interaction__icon_active{fill:white!important}.player-interaction__container::after,.player-interaction__container::before{display:none!important}#app .player-interaction-favorite:hover{background:rgba(63,63,63,.8)}#app .info-card__data{border-radius:31px}#app .info-card .text{color:#cfcfcf}#app .capture-table{background:#00000061;box-shadow:0 0 5vh 0 #00000044;border-radius:1vh;transform:scale(.9);padding:1.5vh 1.8vh}#app .capture-table__col-kills,#app .capture-table__col-kills.my,#app .capture-table__timer{background:#272727;color:#fff;font-style:normal;font-weight:900;font-size:1.8vh;font-family:'GothamPro Bold';border-radius:.5vh}#app .capture-table__timer{width:7.5vh;height:3.7vh}#app .capture-table__col-kills{margin:0 0 0 1.3vh;width:3.5vh;height:3.5vh}#app .capture-table__col .name{font-family:'GothamPro Bold';font-style:normal;font-weight:700;text-transform:none}#app .capture-table__col-kills.my{margin-right:1.3vh;margin-left:0!important}`;
        e += ".hud-radmir-radar__map{border-radius:100%;border:7px solid #000}.hud-hassle-map .map-mask{border:none!important}#app .hud-radmir-radar__radar-border{display:none}#app .hud-radmir-radar__radar-border_new-year{display:none}#app .hud-radmir-radar__radar-border_helloween {display:none}#app .hud-radmir-radar__radar-bats {display:none}#app .vignette {display:none}";
        if (window.loaderModuleHudAssets.speedometer !== undefined) {
            if (window.loaderModuleHudAssets.speedometer.secondary.length) {
                e += `#app .hud-radmir-speedometer-secondary {background-image: url(${window.loaderModuleHudAssets.speedometer.secondary});}`;
            }
            if (window.loaderModuleHudAssets.speedometer.main.length) {
                e += `#app .hud-radmir-speedometer-main__speed {background-image: url(${window.loaderModuleHudAssets.speedometer.main});}`;
            }
        }
        if (window.loaderModuleHudAssets.capture !== undefined) {
            if (window.loaderModuleHudAssets.capture.my.length) {
                e += `#app .capture-table__col-kills.my {background-image: url(${window.loaderModuleHudAssets.capture.my});}`;
            }
            if (window.loaderModuleHudAssets.capture.enemyies.length) {
                e += `#app .capture-table__col-kills {background-image: url(${window.loaderModuleHudAssets.capture.enemyies});}`;
            }
            if (window.loaderModuleHudAssets.capture.timer.length) {
                e += `#app .capture-table__timer {background-image: url(${window.loaderModuleHudAssets.capture.timer});}`;
            }
        }
        if (window.loaderModuleHudAssets.scripts !== undefined) {
            if (window.loaderModuleHudAssets.scripts.some(script => script.includes("radarrect.js"))) {
                e += `body #app .hud-hassle-map{width:32vh!important;height:32vh!important}body #app .hud-radmir-radar__radar{width:26.3vh;border-radius:2vh}body #app .hud-radmir-radar__map{width:26.3vh!important;height:16.9vh!important;overflow:hidden;display:flex;justify-content:center;align-items:center;border-radius:2vh;border:0.65vh solid #000000ff}body #app .map-mask{border-radius:2vh}body #app .hud-radmir-radar{left:11.3vh;bottom:4.03vh}.hud-hassle-map .map-mask{border: none!important}`;
            }
        }
        this.setNewStyles(e);
        this.setNewStyles(window.loaderModuleHudAssets.style);
    },
    setNewStyles(e) {
        const a = document.createElement("style");
        a.innerHTML = e;
        document.head.appendChild(a);
    },
    init() {
        if (window.loaderModuleHudAssets.length === 0) {
            loaderModule.notification.show(window.loaderModuleScriptName, "error", 2500);
            loaderModule.logger.createLog("Old Hud SEVER", `(init) Assets not found!`);
            return;
        }

        // show radar in interior
        window.interface("Hud").$.components.HudRadmir.components.HudRadar.components.HudMap.computed.tilesContainerStyle = () => { return { ...(this.playerIsInInterior && { display: "block" }) } };

        this.setStyles();
        // player interaction fix
        setInterval(() => {
            if (App.components.PlayerInteraction.open.status) {
                const sectors = document.querySelectorAll('.player-interaction__sector')
                sectors.forEach(sector => {
                    if (sector && sector.src.includes('data:image/png')) sector.style = "display: none";
                    if (sector && sector.src.includes('option_active')) sector.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQ1IiBoZWlnaHQ9IjE3MSIgdmlld0JveD0iMCAwIDI0NSAxNzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF84Nl8yKSI+CjxwYXRoIGQ9Ik0xODIuOTg2IDE3MEMxNjYuOTEgMTYzLjM0MyAxNDkuOTYyIDE1OS40MjYgMTMyLjg1OCAxNTguMjUxTDEyMi4yMzEgMTQ1TDExMS42NDggMTU4LjE5NkM5NC4zODkgMTU5LjI5NCA3Ny4yNzQ0IDE2My4xODEgNjEuMDQxIDE2OS44NTkiIHN0cm9rZT0idXJsKCNwYWludDBfbGluZWFyXzg2XzIpIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNDQuNTM3IDI0LjQ1NTFMMTg5Ljg0NiAxNTYuMDc4TDE4OS44MyAxNTYuMTUzQzE3MS45ODQgMTQ4Ljc0NSAxNTMuMTY5IDE0NC4zODYgMTM0LjE4MyAxNDMuMDc3TDEyMi4zODYgMTI4LjMzMUwxMTAuNjM3IDE0My4wMTdDOTEuNDc4MyAxNDQuMjM4IDcyLjQ3OTQgMTQ4LjU2NCA1NC40NTg4IDE1NS45OTdMNTQuNDEzNSAxNTUuOTAzTDAuMDI1MTE2NiAyNC4xODM0TDAgMjQuMTAzNUM3OC4xNTQgLTguMTI5ODQgMTY2LjQ5MSAtOC4wMjk0NiAyNDQuNTY5IDI0LjM3NkwyNDQuNTM3IDI0LjQ1NTFaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfODZfMikiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzg2XzIiIHgxPSIxMjIiIHkxPSIxMjIuNjM3IiB4Mj0iMTUxLjI5MSIgeTI9IjE2MS4zNzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0id2hpdGUiLz4KPHN0b3Agb2Zmc2V0PSIwLjI4MTI1IiBzdG9wLWNvbG9yPSIjQzlDOUM5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzg1ODU4NSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfODZfMiIgeDE9IjEyMi4yODQiIHkxPSItMTM5LjY4MSIgeDI9IjI1OS4wNzEiIHkyPSItODEuNjE2OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSJ3aGl0ZSIvPgo8c3RvcCBvZmZzZXQ9IjAuMjgxMjUiIHN0b3AtY29sb3I9IiNDOUM5QzkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjODU4NTg1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxjbGlwUGF0aCBpZD0iY2xpcDBfODZfMiI+CjxyZWN0IHdpZHRoPSIyNDUiIGhlaWdodD0iMTcxIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
                })
            }
        }, 100)
        const e = `<div class="old-top"><div class="old-logo"><img src="${window.loaderModuleHudAssets.logo[0]}"><div class="old-bonus">x3</div></div><div class="old-main"><div class="old-params"><div class="old-money"><img src="${window.loaderModuleHudAssets.icons.cash}"><span>2.000.000</span></div><div class="old-params__content"><div class="old-param health"><img src="${window.loaderModuleHudAssets.icons.health}" class="old-param__icon"><div class="old-param__progress"><div class="old-progress__value" style="width:100%"><img src="${window.loaderModuleHudAssets.icons.circle}" class="circle"></div></div><span class="old-param__value">100</span></div><div class="old-param armour"><img src="${window.loaderModuleHudAssets.icons.armour}" class="old-param__icon"><div class="old-param__progress"><div class="old-progress__value" style="width:50%"><img src="${window.loaderModuleHudAssets.icons.circle}" class="circle"></div></div><span class="old-param__value">50</span></div><div class="old-param hunger"><img src="${window.loaderModuleHudAssets.icons.hunger}" class="old-param__icon"><div class="old-param__progress"><div class="old-progress__value" style="width:0%"><img src="${window.loaderModuleHudAssets.icons.circle}" class="circle"></div></div><span class="old-param__value">0</span></div><div class="old-param breath"><img src="${window.loaderModuleHudAssets.icons.breath}" class="old-param__icon"><div class="old-param__progress"><div class="old-progress__value" style="width:99%"><img src="${window.loaderModuleHudAssets.icons.circle}" class="circle"></div></div><span class="old-param__value">99</span></div></div></div><div class="old-weapon"><img src="${window.loaderModuleHudAssets.icons.weapon_back}" class="old-weapon__back"> <img src="${window.loaderModuleHudAssets.weapon[0]}" class="old-weapon__icon"><div class="old-weapon__ammo"><span class="old-ammo__in-clip">1</span><span class="old-ammo__total">1</span></div></div></div><div class="old-wanted"><img src="${window.loaderModuleHudAssets.icons.wanted_back}" class="old-wanted__back"><div class="old-wanted__row"><img src="${window.loaderModuleHudAssets.icons.inactive_wanted}" class="old-wanted__inactive"> <img src="${window.loaderModuleHudAssets.icons.inactive_wanted}" class="old-wanted__inactive"> <img src="${window.loaderModuleHudAssets.icons.inactive_wanted}" class="old-wanted__inactive"> <img src="${window.loaderModuleHudAssets.icons.active_wanted}" class="old-wanted__active"> <img src="${window.loaderModuleHudAssets.icons.active_wanted}" class="old-wanted__active"> <img src="${window.loaderModuleHudAssets.icons.active_wanted}" class="old-wanted__active"></div></div></div><div class="old-radar"><div class="old-zz"><img src="${window.loaderModuleHudAssets.icons.zone}" class="old-zz__icon"></div><div class="old-param__freeze"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCAzOCA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzkyXzIpIj4KPHBhdGggZD0iTTM3LjMxMyAyMi45NDZDMzYuODU0IDIyLjE1MiAzNS44MzcgMjEuODc5IDM1LjA0MiAyMi4zMzhMMjkuOTM5IDI1LjI4NUwyMi4zNzEgMjAuOTE0TDI5LjkzOSAxNi41NDRMMzUuMDQyIDE5LjQ4OUMzNS4zMDUgMTkuNjQgMzUuNTkgMTkuNzEyIDM1Ljg3MiAxOS43MTJDMzYuNDQ1IDE5LjcxMiAzNy4wMDUgMTkuNDE0IDM3LjMxMiAxOC44ODFDMzcuNzcxIDE4LjA4NyAzNy40OTkgMTcuMDcgMzYuNzA0IDE2LjYxMkwzMy4yNjQgMTQuNjI1TDM2LjQ5NSAxMi43NTlDMzcuMjkgMTIuMyAzNy41NiAxMS4yODQgMzcuMTAzIDEwLjQ4OUMzNi42NDQgOS42OTQgMzUuNjI3IDkuNDIyIDM0LjgzMiA5Ljg4MUwzMS42MDEgMTEuNzQ3VjcuNzczQzMxLjYwMSA2Ljg1NiAzMC44NTcgNi4xMTEgMjkuOTM5IDYuMTExQzI5LjAyMSA2LjExMSAyOC4yNzkgNi44NTUgMjguMjc5IDcuNzczVjEzLjY2NkwyMC43MDkgMTguMDM2VjkuMjk2TDI1LjgxMyA2LjM1QzI2LjYwOCA1Ljg5MiAyNi44NzkgNC44NzUgMjYuNDIxIDQuMDgxQzI1Ljk2MSAzLjI4NiAyNC45NDUgMy4wMTQgMjQuMTUgMy40NzNMMjAuNzA5IDUuNDU5VjEuNzI3QzIwLjcwOSAwLjgwOTAwMSAxOS45NjYgMC4wNjUwMDI0IDE5LjA0OCAwLjA2NTAwMjRDMTguMTMxIDAuMDY1MDAyNCAxNy4zODcgMC44MDkwMDEgMTcuMzg3IDEuNzI3VjUuNDU5TDEzLjk0NiAzLjQ3M0MxMy4xNTMgMy4wMTQgMTIuMTM1IDMuMjg1IDExLjY3NSA0LjA4MUMxMS4yMTggNC44NzUgMTEuNDg4IDUuODkyIDEyLjI4NCA2LjM1TDE3LjM4NyA5LjI5NlYxOC4wMzZMOS44MTY5OSAxMy42NjZMOS44MTg5OCA3Ljc3M0M5LjgxODk4IDYuODU2IDkuMDc1OTkgNi4xMTEgOC4xNTY5OSA2LjExMUM3LjIzODk5IDYuMTExIDYuNDk2OTkgNi44NTUgNi40OTY5OSA3Ljc3M0w2LjQ5NTk4IDExLjc0N0wzLjI2NDk4IDkuODgxQzIuNDY4OTggOS40MjIgMS40NTE5OCA5LjY5NCAwLjk5Mzk4NCAxMC40ODhDMC41MzU5ODQgMTEuMjgzIDAuODA3OTg1IDEyLjI5OSAxLjYwMjk5IDEyLjc1OEw0LjgzMzk4IDE0LjYyNUwxLjM5Mjk5IDE2LjYxMkMwLjU5Njk4NiAxNy4wNyAwLjMyNTk4NiAxOC4wODcgMC43ODI5ODYgMTguODgxQzEuMDkxOTkgMTkuNDEzIDEuNjUwOTkgMTkuNzEyIDIuMjI2OTkgMTkuNzEyQzIuNTA3OTkgMTkuNzEyIDIuNzkxOTkgMTkuNjQgMy4wNTQ5OSAxOS40ODlMOC4xNTc5OSAxNi41NDRMMTUuNzMzIDIwLjkxN0w4LjE2ODk4IDI1LjI4NUwzLjA2Njk5IDIyLjMzOEMyLjI3MTk5IDIxLjg3OSAxLjI1Mjk4IDIyLjE1MiAwLjc5Mzk4NCAyMi45NDZDMC4zMzQ5ODQgMjMuNzQxIDAuNjA2OTg1IDI0Ljc1NyAxLjQwMTk5IDI1LjIxNkw0Ljg0NDk5IDI3LjIwMkwxLjYxMjk4IDI5LjA2OUMwLjgxNTk4NCAyOS41MjkgMC41NDM5ODYgMzAuNTQ0IDEuMDAzOTkgMzEuMzM5QzEuMzEyOTkgMzEuODcyIDEuODcxOTggMzIuMTY5IDIuNDQ0OTggMzIuMTY5QzIuNzI1OTggMzIuMTY5IDMuMDEyOTkgMzIuMDk4IDMuMjc0OTkgMzEuOTQ3TDYuNTA1OTkgMzAuMDhWMzQuMDU1QzYuNTA1OTkgMzQuOTczIDcuMjQ5OTggMzUuNzE1IDguMTY3OTggMzUuNzE1QzkuMDg0OTggMzUuNzE1IDkuODI4OTggMzQuOTczIDkuODI4OTggMzQuMDU1VjI4LjE2MUwxNy4zOTcgMjMuNzkxVjMyLjUzMUwxMi4yOTQgMzUuNDc4QzExLjQ5OSAzNS45MzcgMTEuMjI3IDM2Ljk1MyAxMS42ODYgMzcuNzQ4QzExLjk5NCAzOC4yNzkgMTIuNTUyIDM4LjU3OCAxMy4xMjUgMzguNTc4QzEzLjQwOCAzOC41NzggMTMuNjkxIDM4LjUwNyAxMy45NTQgMzguMzU1TDE3LjM5NCAzNi4zNjdWNDAuMTAxQzE3LjM5NCA0MS4wMTkgMTguMTQgNDEuNzYxIDE5LjA1NiA0MS43NjFDMTkuOTc0IDQxLjc2MSAyMC43MTYgNDEuMDE5IDIwLjcxNiA0MC4xMDFWMzYuMzY3TDI0LjE1OCAzOC4zNTVDMjQuNDIgMzguNTA1IDI0LjcwNyAzOC41NzggMjQuOTg3IDM4LjU3OEMyNS41NjEgMzguNTc4IDI2LjExOSAzOC4yNzkgMjYuNDI2IDM3Ljc0OEMyNi44ODUgMzYuOTUzIDI2LjYxNCAzNS45MzcgMjUuODE5IDM1LjQ3OEwyMC43MTUgMzIuNTMxVjIzLjc5N0wyOC4yNzggMjguMTYxVjM0LjA1NUMyOC4yNzggMzQuOTczIDI5LjAyIDM1LjcxNSAyOS45MzggMzUuNzE1QzMwLjg1NiAzNS43MTUgMzEuNiAzNC45NzMgMzEuNiAzNC4wNTVWMzAuMDhMMzQuODMxIDMxLjk0N0MzNS4wOTQgMzIuMDk3IDM1LjM3OCAzMi4xNjkgMzUuNjYgMzIuMTY5QzM2LjIzNCAzMi4xNjkgMzYuNzkzIDMxLjg3MiAzNy4wOTkgMzEuMzM5QzM3LjU1OCAzMC41NDQgMzcuMjg3IDI5LjUyOSAzNi40OTIgMjkuMDY5TDMzLjI2MiAyNy4yMDJMMzYuNzAxIDI1LjIxNkMzNy40OTkgMjQuNzU3IDM3Ljc3MSAyMy43NDEgMzcuMzEzIDIyLjk0NloiIGZpbGw9IiNDM0U2RkYiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF85Ml8yIj4KPHJlY3Qgd2lkdGg9IjM4IiBoZWlnaHQ9IjQyIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=" class="old-freeze__icon"><span class="old-freeze__value">100</span></div></div>`;
        const a = loaderModule.addNewInterfaces.addNewHud(e, "old-hud", (e, a) => { this.onInfoChange(e, a) });
        this.createHud(a);
        window.interface("Hud").setBonus(window.interface("Hud").bonus);
        window.interface("Hud").setServer(window.interface("Hud").server);
        window.interface("Hud").info.health = window.interface("Hud").info.health;
        window.interface("Hud").info.armour = window.interface("Hud").info.armour;
        window.interface("Hud").info.hunger = window.interface("Hud").info.hunger;
        window.interface("Hud").info.breath = window.interface("Hud").info.breath;
        window.interface("Hud").info.ammoInClip = window.interface("Hud").info.ammoInClip;
        window.interface("Hud").info.totalAmmo = window.interface("Hud").info.totalAmmo;
        window.interface("Hud").info.money = window.interface("Hud").info.money;
        window.interface("Hud").info.wanted = 0;
        window.interface("Hud").info.weapon = window.interface("Hud").info.weapon;
        window.interface("Hud").info.show = 0;
        window.interface("Hud").hideGreenZoneTab();
        loaderModule.game.chat.sendInput("/hudscalefix");
        loaderModule.notification.show(window.loaderModuleScriptName, "success", 2500);
    }
};

setTimeout(() => {
    oldRadmirHud.init();
}, 400);