export interface StyleConfig {
  gradients: {
    header: string;
    button: string;
    icon: string;
  };
}

export interface ChatConfig {
  style: StyleConfig;
  colors: {
    primaryText: string;
    secondaryText: string;
    mutedText: string;
    black: string;
    pureBlack: string;
    cream: string;
    tan: string;
    border: string;
    bgGray: string;
    wordsGray: string;
    successGreen: string;
    progressGold: string;
  };
}

export interface AppConfig {
  chat: ChatConfig;
}

export const APP_CONFIG: AppConfig = {
  
  chat: {
    style: {
      gradients: {
        header: "linear-gradient(360deg, #DDD8BB -68.13%, #858B89 15.94%, #37475C 100%)",
        button: "linear-gradient(270deg, #DDD8BB 0%, #858B89 50%, #37475C 100%)",
        icon: "linear-gradient(90deg, #DBD6BA 0%, #949791 15.87%, #3A495E 68.27%)",
      }
    },

    colors: {
      primaryText: "#2B3D55",
      secondaryText: "#737373",
      mutedText: "#7E8CA0",
      black: "#0C161F",
      pureBlack: "#000000",
      cream: "#F2E9C3",
      tan: "#F2DCB3",
      border: "#DEDEDE",
      bgGray: "#D9D9D9",
      wordsGray: "#949791",
      successGreen: "#00642F",
      progressGold: "#9C6F46",
    },
  }
};

export default APP_CONFIG;
export const CHAT_CONFIG: ChatConfig = APP_CONFIG.chat;