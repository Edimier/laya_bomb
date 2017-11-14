/**
 *
 * 协议映射表
 */

class ProtoIDs{
	static getMap():any{
        let protoIDs = {}

        protoIDs[1000]="game.QuitGameReq"
        protoIDs["game.QuitGameReq"]=1000
        protoIDs[1001]="game.QuitGameRep"
        protoIDs["game.QuitGameRep"]=1001
        protoIDs[1002]="game.MapNtf"
        protoIDs["game.MapNtf"]=1002
        protoIDs[1003]="game.SelfMessageNtf"
        protoIDs["game.SelfMessageNtf"]=1003
        protoIDs[1004]="game.GameMessageNtf"
        protoIDs["game.GameMessageNtf"]=1004
        protoIDs[1005]="game.OperateReq"
        protoIDs["game.OperateReq"]=1005
        protoIDs[1006]="game.OperateNtf"
        protoIDs["game.OperateNtf"]=1006
        protoIDs[1007]="game.GameEndNtf"
        protoIDs["game.GameEndNtf"]=1007
        protoIDs[1008]="game.SetSession"
        protoIDs["game.SetSession"]=1008
        protoIDs[2000]="user.UserInfoRequest"
        protoIDs["user.UserInfoRequest"]=2000
        protoIDs[2001]="user.UserInfoResonpse"
        protoIDs["user.UserInfoResonpse"]=2001
        protoIDs[2002]="user.JoinReq"
        protoIDs["user.JoinReq"]=2002
        protoIDs[2003]="user.JoinRep"
        protoIDs["user.JoinRep"]=2003
        protoIDs[2004]="user.NotifyKickout"
        protoIDs["user.NotifyKickout"]=2004

        return protoIDs
	}
}