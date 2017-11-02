/**
 * Created by rockyl on 15/12/8.
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
        
        return protoIDs
	}
}