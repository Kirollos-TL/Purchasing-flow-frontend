export const en = {
  cart: {
    title: "Your Cart",
    labels: {
      module: "Module Name",
      price: "Price",
      action: "Action",
      orderSummary: "Order Summary",
      license: "License Type",
      support: "Access",
      total: "Total",
      checkout: "Check Out Now",
      keepBrowsing: "Keep Browsing",
      recommended: "Recommended Modules",
      regular: "Regular",
      lifetime: "Lifetime",
      emptyCart: "Your cart is empty",
      comingSoon: "Coming Soon"
    },
    confirmModal: {
      title: "Delete module?",
      message: "Are you sure you want to remove",
      fromCart: "from your cart?",
      cancel: "Cancel",
      delete: "Delete"
    }
  },
  checkout: {
    title: "Checkout",
    sections: {
      accountInfo: "Account Information",
      paymentMethod: "Payment Method",
      cardDetails: "Card Details",
      yourModules: "Your Modules",
      orderSummary: "Order Summary"
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
      regular: "Regular",
      lifetime: "Lifetime",
      total: "Total",
      processing: "Processing...",
      license: "License Type",
      support: "Access"
    },
    errors: {
      emailCheck: "Payment is still processing — check your email for confirmation.",
      paymentError: "Payment error:",
      checkoutError: "Checkout error:",
      initSessionFail: "Failed to initialize session",
      processError: "Something went wrong. Please try again later.",
      unknownError: "Unknown error"
    }
  },
  modules: [
    { id: 1, name: 'Face Recognition Auth', type: 'Backend', price: 25, description: 'Authenticate users using facial recognition technology.' },
    { id: 2, name: 'JWT Authentication', type: 'Backend', price: 20, description: 'Secure login system using JSON Web Tokens.' },
    { id: 3, name: 'Admin Dashboard UI', type: 'Frontend', price: 35, description: 'Interactive dashboard for managing users and data.' },
    { id: 4, name: 'Email & Push Notifications', type: 'Backend', price: 15, description: 'Send real-time alerts via email and push notifications.' }
  ]
};

export const ar = {
  cart: {
    title: "عربة التسوق",
    labels: {
      module: "اسم الوحدة",
      price: "السعر",
      action: "إجراء",
      orderSummary: "ملخص الطلب",
      license: "نوع الترخيص",
      support: "الوصول",
      total: "الإجمالي",
      checkout: "الدفع الآن",
      keepBrowsing: "متابعة التصفح",
      recommended: "وحدات مقترحة",
      regular: "عادي",
      lifetime: "مدى الحياة",
      emptyCart: "عربة التسوق فارغة",
      comingSoon: "قريباً"
    },
    confirmModal: {
      title: "حذف الوحدة؟",
      message: "هل أنت متأكد أنك تريد إزالة",
      fromCart: "من عربة التسوق؟",
      cancel: "إلغاء",
      delete: "حذف"
    }
  },
  checkout: {
    title: "الدفع",
    sections: {
      accountInfo: "معلومات الحساب",
      paymentMethod: "طريقة الدفع",
      cardDetails: "تفاصيل البطاقة",
      yourModules: "وحداتك",
      orderSummary: "ملخص الطلب"
    },
    labels: {
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      creditCard: "بطاقة ائتمان / خصم",
      paypal: "باي بال",
      cardNumber: "رقم البطاقة",
      cardholderName: "اسم حامل البطاقة",
      expiryDate: "شهر/سنة",
      cvv: "CVV",
      securityNote: "عملية الدفع آمنة ومشفرة",
      termsAgreement: "أوافق على الشروط والأحكام واتفاقية الترخيص",
      getAccess: "احصل على وصول فوري",
      editCart: "تعديل العربة",
      regular: "عادي",
      lifetime: "مدى الحياة",
      total: "الإجمالي",
      processing: "جاري المعالجة...",
      license: "نوع الترخيص",
      support: "الوصول"
    },
    errors: {
      emailCheck: "الدفعة قيد المعالجة — يرجى التحقق من بريدك الإلكتروني للتأكيد.",
      paymentError: "خطأ في الدفع:",
      checkoutError: "خطأ في الدفع:",
      initSessionFail: "فشل في تهيئة الجلسة",
      processError: "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا.",
      unknownError: "خطأ غير معروف"
    }
  },
  modules: [
    { id: 1, name: 'Face Recognition Auth', type: 'Backend', price: 25, description: 'مصادقة المستخدمين باستخدام تقنية التعرف على الوجه.' },
    { id: 2, name: 'JWT Authentication', type: 'Backend', price: 20, description: 'نظام تسجيل دخول آمن باستخدام رموز الويب JSON.' },
    { id: 3, name: 'Admin Dashboard UI', type: 'Frontend', price: 35, description: 'لوحة تحكم تفاعلية لإدارة المستخدمين والبيانات.' },
    { id: 4, name: 'Email & Push Notifications', type: 'Backend', price: 15, description: 'إرسال تنبيهات في الوقت الفعلي عبر البريد الإلكتروني وإشعارات الدفع.' }
  ]
};
