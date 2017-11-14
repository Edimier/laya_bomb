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
var promptView = /** @class */ (function (_super) {
    __extends(promptView, _super);
    function promptView(msg) {
        var _this = _super.call(this) || this;
        _this.pos((Laya.stage.width - 600) / 2, (Laya.stage.height - 400) / 2);
        _this.bt_return.on(Laya.Event.CLICK, _this, _this.handleClose);
        if (msg) {
            _this.bt_prompt.text = msg;
            _this.bt_prompt.fontSize = 15;
        }
        return _this;
    }
    promptView.prototype.handleClose = function () {
        this.removeSelf();
        this.destroy();
    };
    return promptView;
}(ui.promptUI));
//# sourceMappingURL=promptView.js.map