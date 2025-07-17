import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
      notifications: "Notifications",

      // Authentication
      login: "Login",
      register: "Register",
      icNumber: "IC Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      loginSuccess: "Login Successful",
      welcomeBack: "Welcome back to MyMSME",
      loginFailed: "Login Failed",
      invalidCredentials: "Invalid credentials. Please try again.",
      error: "Error",
      pleaseEnterIC: "Please enter your IC number",
      pleaseEnterPassword: "Please enter your password",

      // Verification
      idVerification: "ID Verification",
      uploadIdDescription: "Please upload clear photos of your ID card",
      frontId: "Front of ID",
      backId: "Back of ID",
      clickToUpload: "Click to upload",
      supportedFormats: "JPG, PNG, or PDF up to 5MB",
      retake: "Retake",
      fileTooLarge: "File is too large. Maximum size is 5MB.",

      // Face Verification
      faceVerification: "Face Verification",
      faceVerificationDescription:
        "Please position your face in the frame for verification",
      faceVerificationInstructions:
        "Position your face within the circle and look directly at the camera",
      faceVerificationStart: "Click to start camera for face verification",
      faceVerificationComplete: "Face verification complete",
      clickToStartCamera: "Click to start camera",
      capture: "Capture",
      back: "Back",
      continue: "Continue",
      complete: "Complete",
      cameraPermissionDenied:
        "Camera permission denied. Please allow camera access to continue.",

      // Common
      welcome: "Welcome",
      loading: "Loading...",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      download: "Download",
      name: "Name",
      type: "Type",
      date: "Date",
      size: "Size",
      actions: "Actions",

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
      description:
        "Streamline your business operations with Malaysia's digital financial ecosystem",

      // Dashboard
      quickStats: "Quick Stats",
      todaysSales: "Today's Sales",
      recentActivity: "Recent Activity",
      viewAll: "View All",
      getStarted: "Get Started",
      downloadQrCode: "Download QR Code",
      shareQrCode:
        "Share this QR code for quick payments and business identification",

      // Business metrics
      monthlyRevenue: "Monthly Revenue",
      invoicesSent: "Invoices Sent",
      activeClients: "Active Clients",
      growthRate: "Growth Rate",
      thisMonth: "This month",
      newClients: "new clients",
      yearOverYear: "Year over year",

      // E-invoicing
      createNewInvoice: "Create New Invoice",
      invoiceId: "Invoice ID",
      client: "Client",
      amount: "Amount",
      status: "Status",
      paid: "Paid",
      pending: "Pending",
      overdue: "Overdue",

      // Website
      buildYourWebsite: "Build Your Website",
      createProfessionalWebsite:
        "Create a professional website for your business",
      websiteVisits: "Website visits this month",
      pageViews: "Page views",

      // Analytics
      businessAnalytics: "Business Analytics",
      analyticsCharts: "Analytics charts will be displayed here",

      // Services
      basicReports: "Basic Reports",
      acceptDigitalPayments: "Accept digital payments",
      simpleBusinessReports: "View simple business reports",
      trackBusinessRecords: "Track your business records",
      fullAccountingSuite: "Full accounting suite",
      automatedInvoicing: "Automated invoicing",
      professionalHosting: "Professional hosting",
      aiPoweredInsights: "AI-powered insights",

      // Demo
      demoInstructions: "Demo Instructions:",
      microEnterpriseDemo: "IC ending with 0: Micro Enterprise",
      smallEnterpriseDemo: "IC ending with 1-2: Small Enterprise",
      mediumEnterpriseDemo: "IC ending with 3-4: Medium Enterprise",
      useAnyPassword: "Use any password to login",

      // Registration
      dontHaveAccount: "Don't have an account?",
      registerHere: "Register here",
      registerSuccess: "Registration Successful",

      // Security
      ekycVerified: "eKYC Verified",
      secureIdentityVerification: "Secure identity verification",
      unitedMsmeId: "United MSME ID",
      oneIdAllServices: "One ID for all services",

      // Services page
      qrPaymentGateway: "QR Payment Gateway",
      acceptPaymentsViaQr: "Accept digital payments via QR codes",
      basicBusinessRecord: "Basic business record management",
      digitalSsmCertificate: "Digital SSM certificate and documents",
      automatedEInvoicing: "Automated e-invoicing system",
      professionalWebsiteTemplates: "Professional website templates",
      fullAccountingBookkeeping: "Full accounting and bookkeeping",
      aiPoweredCreditScore: "AI-powered credit score analysis",

      // Enterprise services
      enterpriseCrm: "Enterprise CRM",
      advancedCustomerRelationship: "Advanced customer relationship management",
      businessIntelligence: "Business Intelligence",
      advancedAnalyticsReporting: "Advanced analytics and reporting",
      projectManagementSuite: "Project Management Suite",
      comprehensiveProjectManagement: "Comprehensive project management tools",
      multiLocationManagement: "Multi-Location Management",
      manageMultipleBusinessLocations: "Manage multiple business locations",
      businessAutomation: "Business Automation",
      workflowAutomationIntegration: "Workflow automation and integration",
      enterpriseCloudBackup: "Enterprise Cloud Backup",
      secureCloudStorageBackup: "Secure cloud storage and backup",

      // Categories
      paymentCategory: "Payment",
      accountingCategory: "Accounting",
      documentsCategory: "Documents",
      marketingCategory: "Marketing",
      financeCategory: "Finance",
      managementCategory: "Management",
      analyticsCategory: "Analytics",
      operationsCategory: "Operations",
      automationCategory: "Automation",
      infrastructureCategory: "Infrastructure",

      // Service pricing
      free: "Free",
      availableFor: "Available for:",
      servicesAvailableFor: "Services available for",
      package: "Package",
      unlockMoreServices: "Unlock More Services",
      upgradeYourPlan:
        "Upgrade your plan to access advanced enterprise features and services",
      upgradeToSmallEnterprise: "Upgrade to Small Enterprise",
      upgradeToMediumEnterprise: "Upgrade to Medium Enterprise",
      needCustomService: "Need a Custom Service?",
      cantFindWhatLookingFor:
        "Can't find what you're looking for? Our team can create custom solutions tailored to your business needs.",
      requestCustomService: "Request Custom Service",

      // AI Advisor
      aiAdvisorWelcome:
        "Hello! I'm your AI advisor. How can I help you with your business today?",
      typeYourMessage: "Type your message...",
      aiDemoResponse:
        "Thank you for your message. I'm here to help you navigate the MyMSME platform and provide business guidance. This is a demo response.",

      // Medium Enterprise Dashboard
      advancedToolsEstablished: "Advanced tools for growing businesses",
      enterpriseGradeTools: "Enterprise-grade tools for established businesses",
      annualRevenue: "Annual Revenue",
      monthlyGrowth: "Monthly Growth",
      activeProjects: "Active Projects",
      teamMembers: "Team Members",
      clientSatisfaction: "Client Satisfaction",
      invoicesProcessed: "Invoices Processed",

      // Tabs
      overview: "Overview",
      projects: "Projects",
      operationsTab: "Operations",

      // Project management
      revenueOverview: "Revenue Overview",
      revenueChart: "Revenue Chart",
      projectStatus: "Project Status",
      active: "Active",
      planning: "Planning",
      completed: "Completed",
      teamPerformance: "Team Performance",
      productivity: "Productivity",
      efficiency: "Efficiency",
      satisfaction: "Satisfaction",
      progress: "Progress",

      // Profile Page
      manageYourProfile: "Manage your personal and company information",
      personalInformation: "Personal Information",
      companyInformation: "Company Information",
      communicationPreferences: "Communication Preferences",
      saveChanges: "Save Changes",
      savePreferences: "Save Preferences",
      phone: "Phone Number",
      position: "Position",
      owner: "Owner",
      companyName: "Company Name",
      businessId: "Business ID",
      address: "Address",
      industry: "Industry",
      retail: "Retail",
      emailNotifications: "Email Notifications",
      smsNotifications: "SMS Notifications",
      marketingEmails: "Marketing Emails",

      // Documents Page
      manageYourDocuments: "Manage your business documents and files",
      searchDocuments: "Search documents...",
      uploadDocument: "Upload Document",
      allDocuments: "All Documents",
      recentlyViewed: "Recently Viewed",
      invoice: "Invoice",
      contract: "Contract",
      tax: "Tax Document",
      handbook: "Handbook",
      plan: "Business Plan",
    },
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
      description:
        "Urus operasi perniagaan anda dengan ekosistem kewangan digital Malaysia",

      // All other translations - using same keys but in Malay
      quickStats: "Statistik Pantas",
      todaysSales: "Jualan Hari Ini",
      recentActivity: "Aktiviti Terkini",
      viewAll: "Lihat Semua",
      getStarted: "Mulakan",
      downloadQrCode: "Muat Turun Kod QR",
      shareQrCode:
        "Kongsi kod QR ini untuk pembayaran pantas dan pengenalan perniagaan",

      monthlyRevenue: "Hasil Bulanan",
      invoicesSent: "Invois Dihantar",
      activeClients: "Pelanggan Aktif",
      growthRate: "Kadar Pertumbuhan",
      thisMonth: "bulan ini",
      newClients: "pelanggan baru",
      yearOverYear: "tahun ke tahun",

      createNewInvoice: "Cipta Invois Baru",
      invoiceId: "ID Invois",
      client: "Pelanggan",
      amount: "Jumlah",
      status: "Status",
      paid: "Dibayar",
      pending: "Menunggu",
      overdue: "Tertunggak",

      buildYourWebsite: "Bina Laman Web Anda",
      createProfessionalWebsite:
        "Cipta laman web profesional untuk perniagaan anda",
      websiteVisits: "Lawatan laman web bulan ini",
      pageViews: "Paparan halaman",

      businessAnalytics: "Analitik Perniagaan",
      analyticsCharts: "Carta analitik akan dipaparkan di sini",

      paymentGateway: "Gateway Pembayaran",
      basicReports: "Laporan Asas",
      acceptDigitalPayments: "Terima pembayaran digital",
      simpleBusinessReports: "Lihat laporan perniagaan mudah",
      trackBusinessRecords: "Jejaki rekod perniagaan anda",
      fullAccountingSuite: "Suite perakaunan penuh",
      automatedInvoicing: "Invois automatik",
      professionalHosting: "Pengehosan profesional",
      aiPoweredInsights: "Wawasan berkuasa AI",

      demoInstructions: "Arahan Demo:",
      microEnterpriseDemo: "IC berakhir 0: Perusahaan Mikro",
      smallEnterpriseDemo: "IC berakhir 1-2: Perusahaan Kecil",
      mediumEnterpriseDemo: "IC berakhir 3-4: Perusahaan Sederhana",
      useAnyPassword: "Gunakan sebarang kata laluan untuk log masuk",

      dontHaveAccount: "Tiada akaun?",
      registerHere: "Daftar di sini",

      ekycVerified: "eKYC Disahkan",
      secureIdentityVerification: "Pengesahan identiti selamat",
      unitedMsmeId: "ID MSME Bersatu",
      oneIdAllServices: "Satu ID untuk semua perkhidmatan",

      paymentCategory: "Pembayaran",
      accountingCategory: "Perakaunan",
      documentsCategory: "Dokumen",
      marketingCategory: "Pemasaran",
      financeCategory: "Kewangan",
      managementCategory: "Pengurusan",
      analyticsCategory: "Analitik",
      operationsCategory: "Operasi",
      automationCategory: "Automasi",
      infrastructureCategory: "Infrastruktur",

      free: "Percuma",
      availableFor: "Tersedia untuk:",
      servicesAvailableFor: "Perkhidmatan tersedia untuk",
      package: "Pakej",
      unlockMoreServices: "Buka Lebih Banyak Perkhidmatan",
      upgradeYourPlan:
        "Naik taraf pelan anda untuk mengakses ciri dan perkhidmatan perusahaan maju",
      upgradeToSmallEnterprise: "Naik taraf ke Perusahaan Kecil",
      upgradeToMediumEnterprise: "Naik taraf ke Perusahaan Sederhana",
      needCustomService: "Perlukan Perkhidmatan Kustom?",
      cantFindWhatLookingFor:
        "Tidak jumpa apa yang dicari? Pasukan kami boleh cipta penyelesaian kustom sesuai keperluan perniagaan anda.",
      requestCustomService: "Minta Perkhidmatan Kustom",

      aiAdvisorWelcome:
        "Hello! Saya penasihat AI anda. Bagaimana saya boleh bantu perniagaan anda hari ini?",
      typeYourMessage: "Taip mesej anda...",
      aiDemoResponse:
        "Terima kasih atas mesej anda. Saya di sini untuk bantu anda navigasi platform MyMSME dan berikan panduan perniagaan. Ini respons demo.",

      advancedToolsEstablished: "Alat maju untuk perniagaan berkembang",
      enterpriseGradeTools: "Alat gred perusahaan untuk perniagaan mantap",
      annualRevenue: "Hasil Tahunan",
      monthlyGrowth: "Pertumbuhan Bulanan",
      activeProjects: "Projek Aktif",
      teamMembers: "Ahli Pasukan",
      clientSatisfaction: "Kepuasan Pelanggan",
      invoicesProcessed: "Invois Diproses",

      overview: "Ringkasan",
      projects: "Projek",
      operationsTab: "Operasi",

      revenueOverview: "Ringkasan Hasil",
      revenueChart: "Carta Hasil",
      projectStatus: "Status Projek",
      active: "Aktif",
      planning: "Merancang",
      completed: "Selesai",
      teamPerformance: "Prestasi Pasukan",
      productivity: "Produktiviti",
      efficiency: "Kecekapan",
      satisfaction: "Kepuasan",
      progress: "Kemajuan",

      financialOverview: "Ringkasan Kewangan",
      totalAssets: "Jumlah Aset",
      monthlyExpenses: "Perbelanjaan Bulanan",
      netProfit: "Keuntungan Bersih",
      excellentCreditRating: "Rating Kredit Cemerlang",
      paymentHistory: "Sejarah Pembayaran",
      creditUtilization: "Penggunaan Kredit",
      businessStability: "Kestabilan Perniagaan",
      excellent: "Cemerlang",
      applyForBusinessLoan: "Mohon Pinjaman Perniagaan",

      documentManagement: "Pengurusan Dokumen",
      centralizedDocumentSystem: "Sistem dokumen terpusat",
      multiSiteManagement: "Pengurusan Multi-Tapak",
      manageMultipleLocations: "Urus pelbagai lokasi",
      automationSuite: "Suite Automasi",
      workflowAutomation: "Automasi aliran kerja",
      resourcePlanning: "Perancangan Sumber",
      erpIntegration: "Integrasi ERP",

      advancedAnalyticsDashboard: "Papan Pemuka Analitik Maju",
      advancedAnalytics: "Analitik Maju",
      realtimeBusinessIntelligence:
        "Risikan perniagaan masa nyata dan analitik ramalan",

      // Registration steps and fields
      personalInfo: "Maklumat Peribadi",
      companyInfo: "Maklumat Syarikat",
      paymentGateway: "Gerbang Pembayaran",
      fullName: "Nama Penuh",
      email: "Emel",
      phone: "Nombor Telefon",
      companyName: "Nama Syarikat",
      companyReg: "No. Pendaftaran Syarikat",
      companyAddress: "Alamat Syarikat",
      bankName: "Nama Bank",
      accountNumber: "Nombor Akaun",
      swiftCode: "Kod SWIFT",
      back: "Kembali",
      next: "Seterusnya",

      // IC and Face Verification
      icVerification: "Pengesahan IC",
      uploadICDescription:
        "Sila muat naik gambar yang jelas untuk bahagian depan dan belakang IC anda",
      frontIC: "Depan IC",
      backIC: "Belakang IC",
      clickToUpload: "Klik untuk muat naik",
      supportedFormats: "PNG, JPG, atau JPEG (maksimum 5MB)",
      continue: "Teruskan",
      faceVerification: "Pengesahan Wajah",
      faceVerificationDescription:
        "Sila letakkan wajah anda dalam bingkai untuk pengesahan",
      faceVerificationInstructions:
        "Pastikan wajah anda diterangi dengan baik dan jelas kelihatan",
      complete: "Selesai Pengesahan",

      // Camera and Face Verification
      clickToStartCamera: "Klik untuk mulakan kamera",
      capture: "Ambil Gambar",
      retake: "Ambil Semula",
      faceVerificationStart: "Klik ikon kamera untuk mulakan",
      faceVerificationComplete: "Pengesahan wajah berjaya",
      cameraPermissionDenied:
        "Akses kamera ditolak. Sila aktifkan kebenaran kamera.",
    },
  },
  zh: {
    translation: {
      // Navigation
      dashboard: "仪表板",
      services: "服务",
      documents: "文档",
      profile: "个人资料",
      logout: "退出登录",
      notifications: "通知",

      // Authentication
      login: "登录",
      register: "注册",
      icNumber: "身份证号码",
      password: "密码",
      confirmPassword: "确认密码",
      rememberMe: "记住我",
      forgotPassword: "忘记密码？",
      loginSuccess: "登录成功",
      welcomeBack: "欢迎回到MyMSME",
      loginFailed: "登录失败",
      invalidCredentials: "无效的凭据。请重试。",
      error: "错误",
      pleaseEnterIC: "请输入您的身份证号码",
      pleaseEnterPassword: "请输入您的密码",

      // Common
      welcome: "欢迎",
      loading: "加载中...",
      submit: "提交",
      cancel: "取消",
      save: "保存",
      edit: "编辑",
      delete: "删除",
      download: "下载",
      name: "名称",
      type: "类型",
      date: "日期",
      size: "大小",
      actions: "操作",

      // Enterprise levels
      micro: "微型企业",
      small: "小型企业",
      medium: "中型企业",

      // Features
      qrCode: "二维码",
      transactions: "交易",
      eInvoicing: "电子发票",
      websiteBuilder: "网站构建器",
      ssmCertificate: "SSM证书",
      creditAnalysis: "信用分析",

      // Services
      accountingServices: "会计服务",
      recordKeeping: "记录保存",
      invoiceManagement: "发票管理",
      websiteHosting: "网站托管",
      aiAdvisor: "AI顾问",

      // App info
      appName: "MyMSME",
      appTagline: "您的数字商业平台",
      description: "通过马来西亚的数字金融生态系统简化您的业务运营",

      // Dashboard
      quickStats: "快速统计",
      todaysSales: "今日销售",
      recentActivity: "最近活动",
      viewAll: "查看全部",
      getStarted: "开始使用",
      downloadQrCode: "下载二维码",
      shareQrCode: "分享此二维码以进行快速支付和业务识别",

      // Business metrics
      monthlyRevenue: "月收入",
      invoicesSent: "已发送发票",
      activeClients: "活跃客户",
      growthRate: "增长率",
      thisMonth: "本月",
      newClients: "新客户",
      yearOverYear: "同比",

      // E-invoicing
      createNewInvoice: "创建新发票",
      invoiceId: "发票ID",
      client: "客户",
      amount: "金额",
      status: "状态",
      paid: "已付款",
      pending: "待处理",
      overdue: "逾期",

      // Website
      buildYourWebsite: "构建您的网站",
      createProfessionalWebsite: "为您的业务创建专业网站",
      websiteVisits: "本月网站访问量",
      pageViews: "页面浏览量",

      // Analytics
      businessAnalytics: "业务分析",
      analyticsCharts: "分析图表将显示在此处",

      // Services
      basicReports: "基本报告",
      acceptDigitalPayments: "接受数字支付",
      simpleBusinessReports: "查看简单业务报告",
      trackBusinessRecords: "跟踪您的业务记录",
      fullAccountingSuite: "完整会计套件",
      automatedInvoicing: "自动发票",
      professionalHosting: "专业托管",
      aiPoweredInsights: "AI驱动的洞察",

      // Profile Page
      manageYourProfile: "管理您的个人和公司信息",
      personalInformation: "个人信息",
      companyInformation: "公司信息",
      communicationPreferences: "通信偏好",
      saveChanges: "保存更改",
      savePreferences: "保存偏好",
      phone: "电话号码",
      position: "职位",
      owner: "所有者",
      companyName: "公司名称",
      businessId: "商业ID",
      address: "地址",
      industry: "行业",
      retail: "零售",
      emailNotifications: "电子邮件通知",
      smsNotifications: "短信通知",
      marketingEmails: "营销邮件",

      // Documents Page
      manageYourDocuments: "管理您的业务文档和文件",
      searchDocuments: "搜索文档...",
      uploadDocument: "上传文档",
      allDocuments: "所有文档",
      recentlyViewed: "最近查看",
      invoice: "发票",
      contract: "合同",
      tax: "税务文件",
      handbook: "手册",
      plan: "业务计划",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
