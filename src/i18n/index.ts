import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      services: "Services",
      documents: "Documents",
      profile: "Profile",
      logout: "Logout",
      
      // Authentication
      login: "Login",
      register: "Register",
      icNumber: "IC Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      
      // Common
      welcome: "Welcome",
      loading: "Loading...",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      
      // Enterprise levels
      micro: "Micro Enterprise",
      small: "Small Enterprise", 
      medium: "Medium Enterprise",
      
      // Features
      qrCode: "QR Code",
      transactions: "Transactions",
      eInvoicing: "E-Invoicing",
      websiteBuilder: "Website Builder",
      ssmCertificate: "SSM Certificate",
      creditAnalysis: "Credit Analysis",
      
      // Services
      accountingServices: "Accounting Services",
      recordKeeping: "Record Keeping",
      invoiceManagement: "Invoice Management",
      websiteHosting: "Website Hosting",
      aiAdvisor: "AI Advisor",
      
      // App info
      appName: "MyMSME",
      appTagline: "Your Digital Business Platform",
      description: "Streamline your business operations with Malaysia's digital financial ecosystem"
    }
  },
  ms: {
    translation: {
      // Navigation
      dashboard: "Papan Pemuka",
      services: "Perkhidmatan",
      documents: "Dokumen",
      profile: "Profil",
      logout: "Log Keluar",
      
      // Authentication
      login: "Log Masuk",
      register: "Daftar",
      icNumber: "Nombor IC",
      password: "Kata Laluan",
      confirmPassword: "Sahkan Kata Laluan",
      
      // Common
      welcome: "Selamat Datang",
      loading: "Memuatkan...",
      submit: "Hantar",
      cancel: "Batal",
      save: "Simpan",
      edit: "Edit",
      delete: "Padam",
      
      // Enterprise levels
      micro: "Perusahaan Mikro",
      small: "Perusahaan Kecil",
      medium: "Perusahaan Sederhana",
      
      // Features
      qrCode: "Kod QR",
      transactions: "Transaksi",
      eInvoicing: "E-Invois",
      websiteBuilder: "Pembina Laman Web",
      ssmCertificate: "Sijil SSM",
      creditAnalysis: "Analisis Kredit",
      
      // Services
      accountingServices: "Perkhidmatan Perakaunan",
      recordKeeping: "Penyimpanan Rekod",
      invoiceManagement: "Pengurusan Invois",
      websiteHosting: "Pengehosan Laman Web",
      aiAdvisor: "Penasihat AI",
      
      // App info
      appName: "MyMSME",
      appTagline: "Platform Perniagaan Digital Anda",
      description: "Urus operasi perniagaan anda dengan ekosistem kewangan digital Malaysia"
    }
  },
  zh: {
    translation: {
      // Navigation
      dashboard: "仪表板",
      services: "服务",
      documents: "文件",
      profile: "资料",
      logout: "登出",
      
      // Authentication
      login: "登录",
      register: "注册",
      icNumber: "身份证号码",
      password: "密码",
      confirmPassword: "确认密码",
      
      // Common
      welcome: "欢迎",
      loading: "加载中...",
      submit: "提交",
      cancel: "取消",
      save: "保存",
      edit: "编辑",
      delete: "删除",
      
      // Enterprise levels
      micro: "微型企业",
      small: "小型企业",
      medium: "中型企业",
      
      // Features
      qrCode: "二维码",
      transactions: "交易",
      eInvoicing: "电子发票",
      websiteBuilder: "网站建设器",
      ssmCertificate: "SSM证书",
      creditAnalysis: "信用分析",
      
      // Services
      accountingServices: "会计服务",
      recordKeeping: "记录保持",
      invoiceManagement: "发票管理",
      websiteHosting: "网站托管",
      aiAdvisor: "AI顾问",
      
      // App info
      appName: "MyMSME",
      appTagline: "您的数字商业平台",
      description: "通过马来西亚数字金融生态系统简化您的业务运营"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;