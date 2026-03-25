export interface StyleConfig {
  gradients: {
    header: string;
    button: string;
    icon: string;
  };
}

export interface ThemeConfig {
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
    creamLight: string;
  };
}

export interface CartConfig {
  title: string;
  labels: {
    module: string;
    price: string;
    action: string;
    orderSummary: string;
    license: string;
    support: string;
    total: string;
    checkout: string;
    keepBrowsing: string;
    recommended: string;
  };
}

export interface CheckoutConfig {
  title: string;
  sections: {
    accountInfo: string;
    paymentMethod: string;
    cardDetails: string;
    yourModules: string;
    orderSummary: string;
  };
  labels: {
    fullName: string;
    email: string;
    creditCard: string;
    paypal: string;
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
    securityNote: string;
    termsAgreement: string;
    getAccess: string;
    editCart: string;
  };
}

export interface Module {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
}

export interface AppConfig {
  theme: ThemeConfig;
  cart: CartConfig;
  checkout: CheckoutConfig;
  modules: Module[];
}

export const APP_CONFIG: AppConfig = {
  theme: {
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
      creamLight: "#F8F4DF",
    },
  },
  cart: {
    title: "Your Cart",
    labels: {
      module: "Module Name",
      price: "Price",
      action: "Action",
      orderSummary: "Order Summary",
      license: "License Type",
      support: "Support Plan",
      total: "Total",
      checkout: "Check Out Now",
      keepBrowsing: "Keep Browsing",
      recommended: "Recommended Modules",
    },
  },
  checkout: {
    title: "Checkout",
    sections: {
      accountInfo: "Account Information",
      paymentMethod: "Payment Method",
      cardDetails: "Card Details",
      yourModules: "Your Modules",
      orderSummary: "Order Summary",
    },
    labels: {
      fullName: "Full Name",
      email: "Email Address",
      creditCard: "Credit / Debit Card",
      paypal: "PayPal",
      cardNumber: "Card Number",
      cardholderName: "Cardholder Name",
      expiryDate: "MM/YY",
      cvv: "CVV",
      securityNote: "Your payment is secure and encrypted",
      termsAgreement: "I agree to the Terms & Conditions and License Agreement",
      getAccess: "Get Instant Access",
      editCart: "Edit Cart",
    },
  },
  modules: [
    {
      id: 1,
      name: 'Face Recognition Auth',
      type: 'Backend',
      price: 25,
      description: 'Authenticate users using facial recognition technology.'
    },
    {
      id: 2,
      name: 'JWT Authentication',
      type: 'Backend',
      price: 20,
      description: 'Secure login system using JSON Web Tokens.'
    },
    {
      id: 3,
      name: 'Admin Dashboard UI',
      type: 'Frontend',
      price: 35,
      description: 'Interactive dashboard for managing users and data.'
    },
    {
      id: 4,
      name: 'Email & Push Notifications',
      type: 'Backend',
      price: 15,
      description: 'Send real-time alerts via email and push notifications.'
    },
  ]
};

export default APP_CONFIG;
export const THEME_CONFIG: ThemeConfig = APP_CONFIG.theme;
export const CART_CONFIG: CartConfig = APP_CONFIG.cart;
export const CHECKOUT_CONFIG: CheckoutConfig = APP_CONFIG.checkout;
export const MODULES_CONFIG: Module[] = APP_CONFIG.modules;