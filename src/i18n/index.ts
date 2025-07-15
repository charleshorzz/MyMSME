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
      description: "Streamline your business operations with Malaysia's digital financial ecosystem",
      
      // Dashboard
      quickStats: "Quick Stats",
      todaysSales: "Today's Sales",
      recentActivity: "Recent Activity",
      viewAll: "View All",
      getStarted: "Get Started",
      downloadQrCode: "Download QR Code",
      shareQrCode: "Share this QR code for quick payments and business identification",
      
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
      createProfessionalWebsite: "Create a professional website for your business",
      websiteVisits: "Website visits this month",
      pageViews: "Page views",
      
      // Analytics
      businessAnalytics: "Business Analytics",
      analyticsCharts: "Analytics charts will be displayed here",
      
      // Services
      paymentGateway: "Payment Gateway",
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
      upgradeYourPlan: "Upgrade your plan to access advanced enterprise features and services",
      upgradeToSmallEnterprise: "Upgrade to Small Enterprise",
      upgradeToMediumEnterprise: "Upgrade to Medium Enterprise",
      needCustomService: "Need a Custom Service?",
      cantFindWhatLookingFor: "Can't find what you're looking for? Our team can create custom solutions tailored to your business needs.",
      requestCustomService: "Request Custom Service",
      
      // AI Advisor
      aiAdvisorWelcome: "Hello! I'm your AI advisor. How can I help you with your business today?",
      typeYourMessage: "Type your message...",
      aiDemoResponse: "Thank you for your message. I'm here to help you navigate the MyMSME platform and provide business guidance. This is a demo response.",
      
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
      
      // Financial
      financialOverview: "Financial Overview",
      totalAssets: "Total Assets",
      monthlyExpenses: "Monthly Expenses",
      netProfit: "Net Profit",
      excellentCreditRating: "Excellent Credit Rating",
      paymentHistory: "Payment History",
      creditUtilization: "Credit Utilization",
      businessStability: "Business Stability",
      excellent: "Excellent",
      applyForBusinessLoan: "Apply for Business Loan",
      
      // Operations
      documentManagement: "Document Management",
      centralizedDocumentSystem: "Centralized document system",
      multiSiteManagement: "Multi-Site Management",
      manageMultipleLocations: "Manage multiple locations",
      automationSuite: "Automation Suite",
      workflowAutomation: "Workflow automation",
      resourcePlanning: "Resource Planning",
      erpIntegration: "ERP integration",
      
      // Analytics
      advancedAnalyticsDashboard: "Advanced Analytics Dashboard",
      advancedAnalytics: "Advanced Analytics",
      realtimeBusinessIntelligence: "Real-time business intelligence and predictive analytics"
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
      description: "Urus operasi perniagaan anda dengan ekosistem kewangan digital Malaysia",
      
      // All other translations - using same keys but in Malay
      quickStats: "Statistik Pantas",
      todaysSales: "Jualan Hari Ini",
      recentActivity: "Aktiviti Terkini",
      viewAll: "Lihat Semua",
      getStarted: "Mulakan",
      downloadQrCode: "Muat Turun Kod QR",
      shareQrCode: "Kongsi kod QR ini untuk pembayaran pantas dan pengenalan perniagaan",
      
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
      createProfessionalWebsite: "Cipta laman web profesional untuk perniagaan anda",
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
      upgradeYourPlan: "Naik taraf pelan anda untuk mengakses ciri dan perkhidmatan perusahaan maju",
      upgradeToSmallEnterprise: "Naik taraf ke Perusahaan Kecil",
      upgradeToMediumEnterprise: "Naik taraf ke Perusahaan Sederhana",
      needCustomService: "Perlukan Perkhidmatan Kustom?",
      cantFindWhatLookingFor: "Tidak jumpa apa yang dicari? Pasukan kami boleh cipta penyelesaian kustom sesuai keperluan perniagaan anda.",
      requestCustomService: "Minta Perkhidmatan Kustom",
      
      aiAdvisorWelcome: "Hello! Saya penasihat AI anda. Bagaimana saya boleh bantu perniagaan anda hari ini?",
      typeYourMessage: "Taip mesej anda...",
      aiDemoResponse: "Terima kasih atas mesej anda. Saya di sini untuk bantu anda navigasi platform MyMSME dan berikan panduan perniagaan. Ini respons demo.",
      
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
      realtimeBusinessIntelligence: "Risikan perniagaan masa nyata dan analitik ramalan"
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
      description: "通过马来西亚数字金融生态系统简化您的业务运营",
      
      // All Chinese translations
      quickStats: "快速统计",
      todaysSales: "今日销售",
      recentActivity: "最近活动",
      viewAll: "查看全部",
      getStarted: "开始使用",
      downloadQrCode: "下载二维码",
      shareQrCode: "分享此二维码进行快速支付和商业识别",
      
      monthlyRevenue: "月收入",
      invoicesSent: "已发送发票",
      activeClients: "活跃客户",
      growthRate: "增长率",
      thisMonth: "本月",
      newClients: "新客户",
      yearOverYear: "同比",
      
      createNewInvoice: "创建新发票",
      invoiceId: "发票ID",
      client: "客户",
      amount: "金额",
      status: "状态",
      paid: "已付",
      pending: "待付",
      overdue: "逾期",
      
      buildYourWebsite: "建设您的网站",
      createProfessionalWebsite: "为您的业务创建专业网站",
      websiteVisits: "本月网站访问量",
      pageViews: "页面浏览量",
      
      businessAnalytics: "商业分析",
      analyticsCharts: "分析图表将在此处显示",
      
      paymentGateway: "支付网关",
      basicReports: "基础报告",
      acceptDigitalPayments: "接受数字支付",
      simpleBusinessReports: "查看简单的业务报告",
      trackBusinessRecords: "追踪您的业务记录",
      fullAccountingSuite: "完整会计套件",
      automatedInvoicing: "自动开票",
      professionalHosting: "专业托管",
      aiPoweredInsights: "AI驱动的洞察",
      
      demoInstructions: "演示说明：",
      microEnterpriseDemo: "身份证以0结尾：微型企业",
      smallEnterpriseDemo: "身份证以1-2结尾：小型企业",
      mediumEnterpriseDemo: "身份证以3-4结尾：中型企业",
      useAnyPassword: "使用任何密码登录",
      
      dontHaveAccount: "没有账户？",
      registerHere: "在此注册",
      
      ekycVerified: "eKYC已验证",
      secureIdentityVerification: "安全身份验证",
      unitedMsmeId: "统一MSME ID",
      oneIdAllServices: "一个ID所有服务",
      
      paymentCategory: "支付",
      accountingCategory: "会计",
      documentsCategory: "文档",
      marketingCategory: "营销",
      financeCategory: "金融",
      managementCategory: "管理",
      analyticsCategory: "分析",
      operationsCategory: "运营",
      automationCategory: "自动化",
      infrastructureCategory: "基础设施",
      
      free: "免费",
      availableFor: "适用于：",
      servicesAvailableFor: "服务适用于",
      package: "套餐",
      unlockMoreServices: "解锁更多服务",
      upgradeYourPlan: "升级您的计划以访问高级企业功能和服务",
      upgradeToSmallEnterprise: "升级到小型企业",
      upgradeToMediumEnterprise: "升级到中型企业",
      needCustomService: "需要定制服务？",
      cantFindWhatLookingFor: "找不到您需要的？我们的团队可以创建适合您业务需求的定制解决方案。",
      requestCustomService: "请求定制服务",
      
      aiAdvisorWelcome: "您好！我是您的AI顾问。我今天可以如何帮助您的业务？",
      typeYourMessage: "输入您的消息...",
      aiDemoResponse: "感谢您的消息。我在这里帮助您导航MyMSME平台并提供商业指导。这是演示回复。",
      
      advancedToolsEstablished: "为成长企业提供的高级工具",
      enterpriseGradeTools: "为成熟企业提供的企业级工具",
      annualRevenue: "年收入",
      monthlyGrowth: "月增长",
      activeProjects: "活跃项目",
      teamMembers: "团队成员",
      clientSatisfaction: "客户满意度",
      invoicesProcessed: "已处理发票",
      
      overview: "概览",
      projects: "项目",
      operationsTab: "运营",
      
      revenueOverview: "收入概览",
      revenueChart: "收入图表",
      projectStatus: "项目状态",
      active: "活跃",
      planning: "规划中",
      completed: "已完成",
      teamPerformance: "团队表现",
      productivity: "生产力",
      efficiency: "效率",
      satisfaction: "满意度",
      progress: "进度",
      
      financialOverview: "财务概览",
      totalAssets: "总资产",
      monthlyExpenses: "月度费用",
      netProfit: "净利润",
      excellentCreditRating: "优秀信用评级",
      paymentHistory: "付款历史",
      creditUtilization: "信用利用率",
      businessStability: "业务稳定性",
      excellent: "优秀",
      applyForBusinessLoan: "申请商业贷款",
      
      documentManagement: "文档管理",
      centralizedDocumentSystem: "集中文档系统",
      multiSiteManagement: "多站点管理",
      manageMultipleLocations: "管理多个位置",
      automationSuite: "自动化套件",
      workflowAutomation: "工作流自动化",
      resourcePlanning: "资源规划",
      erpIntegration: "ERP集成",
      
      advancedAnalyticsDashboard: "高级分析仪表板",
      advancedAnalytics: "高级分析",
      realtimeBusinessIntelligence: "实时商业智能和预测分析"
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