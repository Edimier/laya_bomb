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
protoIDs[1003]="game.Info"
protoIDs["game.Info"]=1003
protoIDs[1004]="game.EnterTable"
protoIDs["game.EnterTable"]=1004
protoIDs[1005]="game.SelfMessageNtf"
protoIDs["game.SelfMessageNtf"]=1005
protoIDs[1006]="game.GameMessageNtf"
protoIDs["game.GameMessageNtf"]=1006
protoIDs[1007]="game.OperateReq"
protoIDs["game.OperateReq"]=1007
protoIDs[1008]="game.OperateNtf"
protoIDs["game.OperateNtf"]=1008
protoIDs[1009]="game.GameEndNtf"
protoIDs["game.GameEndNtf"]=1009
protoIDs[1010]="game.SetSession"
protoIDs["game.SetSession"]=1010
protoIDs[1011]="game.LeaveTable"
protoIDs["game.LeaveTable"]=1011
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