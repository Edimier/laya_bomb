/**
 *
 * 协议映射表
 */

class ProtoIDs{
	static getMap():any{
        let protoIDs = {}

        protoIDs[2001] = "game.GameStartNtf"
        protoIDs["game.GameStartNtf"] = 2001

        protoIDs[1001] = "user.UserInfoRequest"
        protoIDs["user.UserInfoRequest"] = 1001
        protoIDs[1002] = "user.UserInfoResonpse"
        protoIDs["user.UserInfoResonpse"] = 1002
        return protoIDs
	}
}