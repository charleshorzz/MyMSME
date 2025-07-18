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
      basicReports: "Basic Reports",
      acceptDigitalPayments: "Accept digital payments",
      simpleBusinessReports: "View simple business reports",
      trackBusinessRecords: "Track your business records",
      fullAccountingSuite: "Full accounting suite",
      automatedInvoicing: "Automated invoicing",
      professionalHosting: "Professional hosting",
      aiPoweredInsights: "AI-powered insights",

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

      // Demo
      demoInstructions: "Demo Instructions:",
      microEnterpriseDemo: "IC 010101010101: Micro Enterprise",
      smallEnterpriseDemo: "IC 020202020202: Small Enterprise",
      mediumEnterpriseDemo: "IC 030303030303: Medium Enterprise",
      useAnyPassword: "Use any password Qwerty123! to log in",

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

      // Company Setup Page
      companySetup: "Company Setup",
      companySetupDescription: "Create a new company or join an existing one",
      setupYourCompany: "Setup Your Company",
      createOrJoinCompany: "Create a new company or join an existing one",
      createNewCompany: "Create New Company",
      joinExistingCompany: "Join Existing Company",
      registrationNumber: "Registration Number",
      companyAddress: "Company Address",
      employeeCount: "Number of Employees",
      enterpriseLevel: "Enterprise Level",
      selectEnterpriseLevel: "Select enterprise level",
      creating: "Creating...",
      createCompany: "Create Company",
      companyCode: "Company Code",
      enterCompanyCode: "Enter company code",
      companyCodeDescription: "Ask your company administrator for the code",
      yourPositionInCompany: "Your position in the company",
      joining: "Joining...",
      joinCompany: "Join Company",
      companyCreated: "Company Created",
      companyCreatedDescription: "Your company has been successfully created",
      companyJoined: "Company Joined",
      companyJoinedDescription: "You have successfully joined the company",
      createCompanyError: "Failed to create company. Please try again.",
      joinCompanyError: "Failed to join company. Please try again.",
      companyNotFound:
        "Company not found. Please check the code and try again.",
    },
  },
  zh: {
    translation: {
      // Navigation
      dashboard: "仪表盘",
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
      basicReports: "基本报告",
      acceptDigitalPayments: "接受数字支付",
      simpleBusinessReports: "查看简单业务报告",
      trackBusinessRecords: "跟踪您的业务记录",
      fullAccountingSuite: "完整会计套件",
      automatedInvoicing: "自动发票",
      professionalHosting: "专业托管",
      aiPoweredInsights: "AI驱动的洞察",

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

      // Company Setup Page
      companySetup: "公司设置",
      companySetupDescription: "创建新公司或加入现有公司",
      setupYourCompany: "设置您的公司",
      createOrJoinCompany: "创建新公司或加入现有公司",
      createNewCompany: "创建新公司",
      joinExistingCompany: "加入现有公司",
      registrationNumber: "注册号",
      companyAddress: "公司地址",
      employeeCount: "员工数量",
      enterpriseLevel: "企业级别",
      selectEnterpriseLevel: "选择企业级别",
      creating: "创建中...",
      createCompany: "创建公司",
      companyCode: "公司代码",
      enterCompanyCode: "输入公司代码",
      companyCodeDescription: "向您的公司管理员询问代码",
      yourPositionInCompany: "您在公司中的职位",
      joining: "加入中...",
      joinCompany: "加入公司",
      companyCreated: "公司已创建",
      companyCreatedDescription: "您的公司已成功创建",
      companyJoined: "公司已加入",
      companyJoinedDescription: "您已成功加入公司",
      createCompanyError: "创建公司失败。请重试。",
      joinCompanyError: "加入公司失败。请重试。",
      companyNotFound: "未找到公司。请检查代码并重试。",
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
