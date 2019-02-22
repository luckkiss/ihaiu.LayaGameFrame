namespace Games
{
    //======================
    // 加载界面--进入游戏
    //----------------------
    export class LoaderEnterPanel extends LoaderPanel
    {
        loader: fgui.System.LoaderEnterGame;
        tips: string[] = [];


        public constructor() 
        {
            super();
        }


        protected onInit(): void
        {
            this.loader = fgui.System.LoaderEnterGame.createInstance();
            this.contentPane = this.loader;
            // this.center();

            //弹出窗口的动效已中心为轴心
            // this.setPivot(0.5, 0.5);
            super.onInit();
            this.tips = LoadingStateTxt.tips;
            this.setVersion();

        }


        // 显示完成
        protected onShown(): void
        {
            super.onShown();
            this.beginTips();
            this.setVersion();
            gameApplication.sInfo.add(this.setVersion, this);
        }

        // 隐藏完成
        protected onHide(): void
        {
            super.onHide();
            this.stopTips();
            gameApplication.sInfo.remove(this.setVersion, this);
        }

        beginTips()
        {
            this.stopTips();
            if (this.tips && this.tips.length > 0)
            {
                this.__setTipHandler();
            }
        }

        stopTips()
        {
            if (this.__setTipHandlerTimer > 0)
            {
                clearTimeout(this.__setTipHandlerTimer);
                this.__setTipHandlerTimer = -1;
            }
        }

        private __setTipHandlerTimer = -1;
        private __setTipHandler()
        {
            this.loader.m_help.text = this.tips[Random.range(0, this.tips.length)];
            this.__setTipHandlerTimer = setTimeout(() =>
            {
                this.__setTipHandler();
            }, Random.range(100, 400));
        }


        // 设置最大值
        setMax(value: number)
        {
            // console.log("LoaderEnterPanel.setMax  value=" + value);
            this.loader.m_progressBar.max = value;
        }


        // 设置加载进度
        setValue(value: number)
        {
            // console.log("LoaderEnterPanel.setValue  value=" + value);
            this.loader.m_progressBar.value = value;

        }

        // 设置Tip
        setTip(tip: string)
        {
            this.loader.m_title.text = tip;
        }

        setTips(tips: string[])
        {
            // this.loader.m_help.text = tips[0];
        }

        // 设置版本号
        setVersion()
        {
            this.loader.m_txt_gamever.text = "GameVersion:" + GameVersions.Manager.Instance.localAppVersionData.toString();
            this.loader.m_txt_resVer.text = "ResVersion:" + GameVersions.Manager.Instance.localResVersionData.toString();
        }
    }
}