/**
 *
 * 协议映射表
 */
var ProtoIDs = /** @class */ (function () {
    function ProtoIDs() {
    }
    ProtoIDs.getMap = function () {
        var protoIDs = {};
        protoIDs[1000] = "game.QuitGameReq";
        protoIDs["game.QuitGameReq"] = 1000;
        protoIDs[1001] = "game.QuitGameRep";
        protoIDs["game.QuitGameRep"] = 1001;
        protoIDs[1002] = "game.MapNtf";
        protoIDs["game.MapNtf"] = 1002;
        protoIDs[1003] = "game.Info";
        protoIDs["game.Info"] = 1003;
        protoIDs[1004] = "game.SelfMessageNtf";
        protoIDs["game.SelfMessageNtf"] = 1004;
        protoIDs[1005] = "game.GameMessageNtf";
        protoIDs["game.GameMessageNtf"] = 1005;
        protoIDs[1006] = "game.OperateReq";
        protoIDs["game.OperateReq"] = 1006;
        protoIDs[1007] = "game.OperateNtf";
        protoIDs["game.OperateNtf"] = 1007;
        protoIDs[1008] = "game.GameEndNtf";
        protoIDs["game.GameEndNtf"] = 1008;
        protoIDs[1009] = "game.SetSession";
        protoIDs["game.SetSession"] = 1009;
        protoIDs[1010] = "game.LeaveTable";
        protoIDs["game.LeaveTable"] = 1010;
        protoIDs[2000] = "user.UserInfoRequest";
        protoIDs["user.UserInfoRequest"] = 2000;
        protoIDs[2001] = "user.UserInfoResonpse";
        protoIDs["user.UserInfoResonpse"] = 2001;
        protoIDs[2002] = "user.JoinReq";
        protoIDs["user.JoinReq"] = 2002;
        protoIDs[2003] = "user.JoinRep";
        protoIDs["user.JoinRep"] = 2003;
        protoIDs[2004] = "user.NotifyKickout";
        protoIDs["user.NotifyKickout"] = 2004;
        return protoIDs;
    };
    return ProtoIDs;
}());
//# sourceMappingURL=ProtoIDs.js.map