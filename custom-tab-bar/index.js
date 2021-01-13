Component({
  properties: {},
  data: {
    selected: 0,
    tabList: [{
        "pagePath": "pages/index/index",
        "iconPath": "/assets/homePage/home.png",
        "selectedIconPath": "/assets/homePage/home_active.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/find_page/index",
        "iconPath": "/assets/homePage/find.png",
        "selectedIconPath": "/assets/homePage/find_active.png",
        "text": "发现"
      },
      {
        "pagePath": "pages/campus_page/index",
        "iconPath": "/assets/homePage/campus.png",
        "selectedIconPath": "/assets/homePage/campus_active.png",
        "text": "校区"
      },
      {
        "pagePath": "pages/myInfo/myInfo",
        "iconPath": "/assets/homePage/me.png",
        "selectedIconPath": "/assets/homePage/me_active.png",
        "text": "我的"
      }
    ]
  },
  methods: {
    switchTab(e) {
      let key = Number(e.currentTarget.dataset.index);
      let tabList = this.data.tabList;
      let selected = this.data.selected;
      if (selected !== key) {
        this.setData({
          selected: key
        });
        wx.switchTab({
          url: `/${tabList[key].pagePath}`,
        })
      }
    }
  }
})