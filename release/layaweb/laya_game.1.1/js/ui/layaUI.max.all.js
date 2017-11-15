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
        gamebgUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bt_game_bg", "skin": "comp/bg2.png", "name": "gamebg" } }, { "type": "Label", "props": { "y": 50, "x": 202, "width": 67, "var": "m_score1", "text": "0", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#01000b", "borderColor": "#40e20d", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 50, "x": 146, "width": 47, "var": "m_scoreLable1", "skin": "comp/score.png", "name": "scoreLable1", "height": 39 } }, { "type": "Label", "props": { "y": 50, "x": 370, "width": 67, "var": "m_score2", "text": "0", "height": 25, "fontSize": 20, "font": "SimHei", "color": "#88100e", "borderColor": "#40e20d", "align": "center" } }, { "type": "Image", "props": { "y": 50, "x": 314, "width": 47, "var": "m_scoreLable2", "skin": "comp/score.png", "name": "scoreLable2", "height": 39 } }, { "type": "Button", "props": { "y": 278, "x": 56, "width": 30, "var": "m_up", "skin": "comp/button.png", "name": "up", "label": "up", "height": 30, "alpha": 0.5 } }, { "type": "Button", "props": { "y": 333, "x": 56, "width": 30, "var": "m_down", "skin": "comp/button.png", "name": "down", "label": "down", "height": 30, "alpha": 0.5 } }, { "type": "Button", "props": { "y": 307, "x": 87, "width": 30, "var": "m_right", "skin": "comp/button.png", "name": "right", "label": "right", "height": 30, "alpha": 0.5 } }, { "type": "Button", "props": { "y": 307, "x": 25, "width": 30, "var": "m_left", "skin": "comp/button.png", "name": "left", "label": "left", "height": 30, "alpha": 0.5 } }, { "type": "Button", "props": { "y": 29, "x": 480, "var": "bt_close", "skin": "comp/button.png", "label": "back" } }, { "type": "Button", "props": { "y": 307, "x": 516, "width": 40, "var": "bt_bomb", "skin": "comp/button.png", "name": "bomb", "label": "bomb", "height": 40, "alpha": 0.5 } }] };
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
        loginUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "comp/bg.png", "sizeGrid": "30,5,5,5", "height": 400 } }, { "type": "Label", "props": { "y": 170, "x": 125, "width": 160, "text": "请输入uid:", "height": 30, "fontSize": 30, "font": "楷体", "color": "#0b0707", "bold": true } }, { "type": "TextInput", "props": { "y": 172, "x": 288, "width": 200, "var": "bt_input", "skin": "comp/textinput.png", "sizeGrid": "4,4,4,4", "restrict": "0123456789", "prompt": "请输入1~100之间的整数", "height": 30 } }, { "type": "Button", "props": { "y": 267, "x": 223.5, "width": 153, "var": "bt_login", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "label": "LOGIN", "height": 69 } }] };
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