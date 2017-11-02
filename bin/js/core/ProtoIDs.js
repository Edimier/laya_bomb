/**
 *
 * 协议映射表
 */
var ProtoIDs = /** @class */ (function () {
    function ProtoIDs() {
    }
    ProtoIDs.getMap = function () {
        var protoIDs = {};
        protoIDs[2001] = "game.GameStartNtf";
        protoIDs["game.GameStartNtf"] = 2001;
        protoIDs[1001] = "user.UserInfoRequest";
        protoIDs["user.UserInfoRequest"] = 1001;
        return protoIDs;
    };
    return ProtoIDs;
}());
//# sourceMappingURL=ProtoIDs.js.map