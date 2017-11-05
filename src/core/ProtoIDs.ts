/**
 *
 * 协议映射表
 */

class ProtoIDs{
	static getMap():any{
        let protoIDs = {}

        protoIDs[2001] = "game.GameStartNtf"
        protoIDs["game.GameStartNtf"] = 2001

        protoIDs[2002] = "game.QuitGameReq"
        protoIDs["game.QuitGameReq"] = 2002
        protoIDs[2003] = "game.QuitGameRep"
        protoIDs["game.QuitGameRep"] = 2003
        protoIDs[2004] = "game.SelfMessageNtf"
        protoIDs["game.SelfMessageNtf"] = 2004
        protoIDs[2005] = "game.GameMessageNtf"
        protoIDs["game.GameMessageNtf"] = 2005

        protoIDs[1001] = "user.UserInfoRequest"
        protoIDs["user.UserInfoRequest"] = 1001
        
        protoIDs[1002] = "user.UserInfoResonpse"
        protoIDs["user.UserInfoResonpse"] = 1002
        protoIDs[1003] = "user.JoinReq"
        protoIDs["user.JoinReq"] = 1003
        protoIDs[1003] = "user.JoinRep"
        protoIDs["user.JoinRep"] = 1003


        return protoIDs
	}
}