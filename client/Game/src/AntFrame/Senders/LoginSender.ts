import AntFrame from "../AntFrame";
import Game from '../../Game';

export default class LoginSender
{
    async login(userName: string, password: string)
    {
        if(isNullOrEmpty(userName))
            userName = AntFrame.RandName(2, 7);

        let s2c = await AntFrame.platform.Login(userName, password);
        if(s2c.error)
        {
            Game.launch.onNetError(s2c.error);
            return;
        } 
        
        Game.localStorage.username = userName;
        Game.localStorage.password = password;
        Game.localStorage.addUseraccount(userName, password);

        // 请求角色初始数据
        s2c = await Game.net.AsyncGamerLoginGetDataC2S();
        // if(s2c.error) return;

        // 请求背包数据
        if(! await Game.sender.item.getItemList()) 1;
        //伪装剧本库数据
        // Game.moduleModel.story.Test();
        // 请求艺人数据
        await Game.sender.actor.actorList();
        // 请求情报数据
        await Game.sender.infoSender.myInformationList();
        
        // 登录了并且获取了用户数据
        Game.user.isLoginAndGetUserData = true;
        // 请求引导进度
        await Game.sender.guide.getGuideProgress();

        Game.launch.enterGame();
    }

}