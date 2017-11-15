var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var gamebgUI = /** @class */ (function (_super) {
        __extends(gamebgUI, _super);
        function gamebgUI() {
            return _super.call(this) || this;
        }
        gamebgUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.gamebgUI.uiView);
        };
        gamebgUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bt_game_bg", "skin": "comp/bg2.png", "name": "gamebg" } }, { "type": "Label", "props": { "y": 130, "x": 15, "width": 67, "var": "m_score1", "text": "0", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#01000b", "borderColor": "#40e20d", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 130, "x": 521, "width": 67, "var": "m_score2", "text": "0", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#88100e", "borderColor": "#40e20d", "align": "center" } }, { "type": "Button", "props": { "y": 245, "x": 73, "width": 40, "var": "m_up", "skin": "comp/button.png", "name": "up", "label": "up", "height": 40, "alpha": 0.5 } }, { "type": "Button", "props": { "y": 322, "x": 73, "width": 40, "var": "m_down", "skin": "comp/button.png", "name": "down", "label": "down", "height": 40, "alpha": 0.5 } }, { "type": "Button", "props": { "y": 284, "x": 112, "width": 40, "var": "m_right", "skin": "comp/button.png", "name": "right", "label": "right", "height": 40, "alpha": 0.5 } }, { "type": "Button", "props": { "y": 284, "x": 35, "width": 40, "var": "m_left", "skin": "comp/button.png", "name": "left", "label": "left", "height": 40, "alpha": 0.5 } }, { "type": "Button", "props": { "y": 29, "x": 521, "width": 44, "var": "bt_close", "skin": "comp/button.png", "label": "back", "height": 23, "alpha": 0.5 } }, { "type": "Button", "props": { "y": 277, "x": 477, "width": 50, "var": "bt_bomb", "skin": "comp/button.png", "name": "bomb", "label": "bomb", "height": 50, "alpha": 0.5 } }, { "type": "Label", "props": { "y": 91, "x": 15, "width": 67, "var": "m_lable1", "height": 25 } }, { "type": "Label", "props": { "y": 91, "x": 521, "width": 67, "var": "m_lable2", "height": 25 } }] };
        return gamebgUI;
    }(View));
    ui.gamebgUI = gamebgUI;
})(ui || (ui = {}));
(function (ui) {
    var loginUI = /** @class */ (function (_super) {
        __extends(loginUI, _super);
        function loginUI() {
            return _super.call(this) || this;
        }
        loginUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.loginUI.uiView);
        };
        loginUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "comp/loginBg.png", "height": 400 } }, { "type": "Label", "props": { "y": 327, "x": 389, "width": 190, "var": "bt_login", "text": "游客登陆", "height": 45, "fontSize": 40, "align": "center" } }, { "type": "Image", "props": { "y": 11, "x": 5, "skin": "comp/bomb_word.png" } }] };
        return loginUI;
    }(View));
    ui.loginUI = loginUI;
})(ui || (ui = {}));
(function (ui) {
    var promptUI = /** @class */ (function (_super) {
        __extends(promptUI, _super);
        function promptUI() {
            return _super.call(this) || this;
        }
        promptUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.promptUI.uiView);
        };
        promptUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "comp/bg.png", "sizeGrid": "30,5,5,5", "height": 400 } }, { "type": "Button", "props": { "y": 267, "x": 223, "width": 153, "var": "bt_return", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "label": "RETURN", "height": 69 } }, { "type": "Label", "props": { "y": 109, "x": 146, "width": 324, "var": "bt_prompt", "height": 113, "align": "center" } }] };
        return promptUI;
    }(View));
    ui.promptUI = promptUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map