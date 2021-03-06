// ----------------------------------------
//
//  MADE BY GENERATOR AT 2018-11-12 09:47:00,
//  PLEASE DO NOT REWRITE.
//
// ----------------------------------------


namespace StarForce.Mail
{
    [MessageHandler(URL = "Mail/MailDelete")]
    public class MailDeleteHandler : ResponsetHandlerBase
    {
        public override void Handle(object sender, ResponseEventArgs response)
        {
            var msg = response.GetData<ResponseMessage<OOBResponse<MailDeleteResponse>>>();
            var arg = new CommonEventArgs<MailDeleteResponse>(msg.errno,msg.errmsg,msg.data.data);
            msg.data.HandleOOB();
            SZUnityFramework.GameEntry.Event.Fire(CommonEventArgs<MailDeleteResponse>.EventId, arg);
        }   
    }
}