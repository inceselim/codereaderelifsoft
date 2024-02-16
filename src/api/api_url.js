export const API_URL = {
    BASE_URL: "https://app.elifsoft.com.tr",
    DEV_URL: "https://dev.elifsoft.com.tr",
    REFRESH_TOKEN_URL: "/api/MobileAccountApi/Refresh",
    LOGIN_URL: "/api/MobileAccountApi/Login",
    ARIZA_LIST: "/api/ArizaApi/ArizaList",
    ARIZA_LIST_KAPI_NO: "/api/ArizaApi/ArizaListMobil",
    ARIZA_DETAIL_LIST: "/api/ArizaApi/ArizaMalzemeList",
    COMPANY_LIST: "",

    ARIZA_MALZEME_LISTELE: "/api/ArizaApi/LogoMaterialList",
    ARIZA_MALZEME_EKLE: "/api/ArizaApi/ArizaMalzemeAdd",
    ARIZA_MALZEME_SIL: "/api/ArizaApi/ArizaMalzemeDelete?key=6556773",
    ARIZA_TAMIRCI_LIST: "/api/ArizaApi/ArizaMalzemeTamirciList",
    ARIZA_GONDER_URL: "/api/ArizaApi/ArizaMalzemeAdd",

    AMBAR_LIST: "/api/WareHouseApi/CikisAmbarList",
    BARKOD_SAYIM_LIST: "/api/MaterialCountingApi/SayimFisList",
    BARKOD_SAYIM_CREATE: "/api/MaterialCountingApi/SayimFisAdd",
    BARKOD_SAYIM_UPDATE: "/api/MaterialCountingApi/SayimFisUpdate",
    BARKOD_SAYIM_DELETE: "/api/MaterialCountingApi/SayimFisDelete",

    SAYIM_DETAYLARI: "/api/MaterialCountingApi/SayimFisDetayList",
    SAYIM_DETAYLARI_DELETE: "/api/MaterialCountingApi/SayimFisDetayDelete",
    SAYIM_DETAYLARI_DELETE_ALL: "/api/MaterialCountingApi/SayimFisDetayAllDelete",
    SAYIM_DETAYLARI_AMOUNT_UPDATE: "/api/MaterialCountingApi/SayimFisDetayUpdate",

    SAYIM_DETAYLARI_MALZEME_BUL: "/api/MaterialCountingApi/BarcodeItemList",
    SAYIM_DETAYLARI_MALZEME_EKLE: "/api/MaterialCountingApi/SayimFisDetayAdd",
    SAYIM_DETAYLARI_SEND_MAIL: "/api/MaterialCountingApi/SayimSendMail"
}