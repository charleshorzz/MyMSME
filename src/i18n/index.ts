import InvoiceDetails from "@/components/InvoiceDetails";
import { companyService } from "@/services/companyService";
import { sub } from "date-fns";
import i18n from "i18next";
import { Search } from "lucide-react";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  zh: {
    translation: {
      // Navigation
      dashboard: "仪表盘",
      services: "服务",
      documents: "文档",
      profile: "个人资料",
      logout: "登出",

      // Authentication
      login: "登录",
      register: "注册",
      icNumber: "身份证号码",
      password: "密码",
      confirmPassword: "确认密码",
      rememberMe: "记住我",
      forgotPassword: "忘记密码？",

      // Common
      welcome: "欢迎",
      to: "到",
      loading: "加载中...",
      submit: "提交",
      cancel: "取消",
      save: "保存",
      edit: "编辑",
      delete: "删除",
      email: "电子邮箱",

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
      aiAdvisor: "人工智能顾问",
      basicReports: "基础报告",
      acceptDigitalPayments: "接受数字支付",
      simpleBusinessReports: "查看简单商业报告",
      trackBusinessRecords: "跟踪您的商业记录",
      fullAccountingSuite: "完整会计套件",
      automatedInvoicing: "自动发票",
      professionalHosting: "专业托管",
      aiPoweredInsights: "人工智能驱动的洞察",

      // App info
      appName: "MyMSME",
      appTagline: "您的数字商业平台",

      // All other translations
      quickStats: "快速统计",
      todaysSales: "今日销售",
      recentActivity: "近期活动",
      viewAll: "查看全部",
      getStarted: "开始",
      downloadQrCode: "下载二维码",
      shareQrCode: "分享此二维码以进行快速支付和业务介绍",

      monthlyRevenue: "月收入",
      invoicesSent: "已发送发票",
      activeClients: "活跃客户",
      growthRate: "增长率",
      thisMonth: "本月",
      newClients: "新客户",
      yearOverYear: "同比",

      buildYourWebsite: "构建您的网站",
      createProfessionalWebsite: "为您的业务创建专业网站",
      websiteVisits: "本月网站访问量",
      pageViews: "页面浏览量",

      businessAnalytics: "商业分析",
      analyticsCharts: "分析图表将显示在此处",

      demoInstructions: "演示说明：",
      microEnterpriseDemo: "身份证号码 010101010101：微型企业",
      smallEnterpriseDemo: "身份证号码 020202020202：小型企业",
      mediumEnterpriseDemo: "身份证号码 030303030303：中型企业",
      useAnyPassword: "使用密码 Qwerty123! 登录",

      dontHaveAccount: "没有账户？",
      registerHere: "在此注册",

      ekycVerified: "eKYC 已验证",
      secureIdentityVerification: "安全的身份验证",
      unitedMsmeId: "统一 MSME ID",
      oneIdAllServices: "一个 ID 满足所有服务",

      free: "免费",
      availableFor: "适用于：",
      servicesAvailableFor: "可用服务",
      package: "套餐",
      unlockMoreServices: "解锁更多服务",
      upgradeYourPlan: "升级您的计划以访问高级企业和功能",
      upgradeToSmallEnterprise: "升级到小型企业",
      upgradeToMediumEnterprise: "升级到中型企业",
      needCustomService: "需要定制服务？",
      cantFindWhatLookingFor:
        "找不到您想要的？我们的团队可以创建适合您业务需求的定制解决方案。",
      requestCustomService: "请求定制服务",

      aiAdvisorWelcome:
        "您好！我是您的人工智能顾问。今天我可以如何帮助您的业务？",
      typeYourMessage: "输入您的消息...",
      aiDemoResponse:
        "感谢您的消息。我在这里帮助您导航 MyMSME 平台并提供业务指导。这是演示响应。",
      aiNavigatingToEInvoice:
        "Navigating to E-invoices tab, ready to create new invoice.",

      basicToolsEstablished: "为新兴型企业提供基本工具",
      advancedToolsEstablished: "为成长型企业提供高级工具",
      enterpriseGradeTools: "为成熟企业提供企业级工具",
      annualRevenue: "年收入",
      monthlyGrowth: "月增长",
      activeProjects: "活跃项目",
      teamMembers: "团队成员",
      clientSatisfaction: "客户满意度",
      invoicesProcessed: "已处理发票",

      // 登录相关
      personalLogin: "个人登录",
      companyLogin: "公司登录",
      companyID: "公司ID",
      icNumberPlaceholder: "例如: 123456-78-9012",
      companyIDPlaceholder: "例如: C123456",
      enterPassword: "输入密码",
      pleaseEnterCompanyID: "请输入公司ID",

      // 注册相关
      createYourAccount: "创建您的账户",
      personalAndCompanyInfo: "个人和公司信息",
      securityInfo: "安全信息",

      // 错误信息
      error: "错误",

      // 公司信息
      companyName: "公司名称",
      companyAddress: "公司地址",
      ekycVerificationRequired: "请完成电子身份验证以激活您的账户",

      // 公司设置页面
      companySetup: "公司设置",
      companySetupDescription: "设置您的公司信息或加入现有公司",
      setupYourCompany: "设置您的公司",
      createOrJoinCompany: "创建新公司或加入现有公司",
      createCompanyTab: "创建公司",
      joinCompanyTab: "加入公司",

      // 公司表单字段
      nameType: "名称类型",
      selectNameType: "选择名称类型",
      personalName: "个人名称",
      tradeName: "商业名称",
      businessType: "业务类型",
      registrationPeriod: "注册期限(年)",
      contactNumber: "联系电话 (+60)",
      businessCode: "业务代码",
      enterBusinessCode: "输入业务代码",
      businessStartDate: "业务开始日期",
      incentiveSource: "激励来源",
      businessInfo: "业务信息",

      // 按钮和状态
      creating: "创建中...",
      createCompany: "创建公司",
      joining: "加入中...",
      joinCompany: "加入公司",

      // Services page
      qrPaymentGateway: "二维码支付网关",
      acceptPaymentsViaQr: "通过二维码接受数字支付",
      basicBusinessRecord: "基础业务记录管理",
      digitalSsmCertificate: "数字 SSM 证书和文档",
      automatedEInvoicing: "自动化电子发票系统",
      professionalWebsiteTemplates: "专业网站模板",
      fullAccountingBookkeeping: "完整会计和簿记",
      aiPoweredCreditScore: "人工智能驱动的信用评分分析",

      // Enterprise services
      enterpriseCrm: "企业 CRM",
      advancedCustomerRelationship: "高级客户关系管理",
      businessIntelligence: "商业智能",
      advancedAnalyticsReporting: "高级分析和报告",
      projectManagementSuite: "项目管理套件",
      comprehensiveProjectManagement: "全面项目管理",
      multiLocationManagement: "多地点管理",
      manageMultipleBusinessLocations: "管理多个业务地点",
      businessAutomation: "业务自动化",
      workflowAutomationIntegration: "工作流程自动化集成",
      enterpriseCloudBackup: "企业云备份",
      secureCloudStorageBackup: "安全云存储和备份",

      monthlyInvoices: "月度发票",
      paidRate: "支付率",
      digitalTransformation: "数字化转型",
      ecommercePlatform: "电子商务平台",
      mobileAppDevelopment: "移动应用开发",
      planning: "规划",
      exellentCreditRating: "优秀信用评级",
      businessLoanApplication: "商业贷款申请",
      centralizedDocumentSystem: "集中式文档系统",
      contracts: "合同",
      invoice: "发票",
      reports: "报告",
      legal: "法律文件",
      headquarters: "总部",
      branchOffice: "分支机构",
      workflowAutomation: "工作流程自动化",
      invoiceProcessing: "发票处理",
      inventoryManagement: "库存管理",
      customerOnboarding: "客户入职",
      setup: "设置",
      humanResources: "人力资源",
      supplyChain: "供应链",
      financialManagement: "财务管理",
      integrated: "集成",
      advancedAnalyticsDashboard: "高级分析仪表盘",
      realTimeBusinessIntelligenceAndPredictiveAnalytics:
        "实时商业智能和预测分析",
      advancedAnalyticsChartsAndVisualizations: "高级分析图表和可视化",
      month: "月",
      download: "下载",
      name: "名称",
      type: "类型",
      date: "日期",
      size: "大小",
      actions: "操作",

      // E-invoice
      manageYourElectronicInvoices: "管理您的电子发票 -- 手动支付和二维码生成",
      createManualInvoice: "创建手动发票",
      exportAll: "全部导出",
      manualInvoice: "手动发票",
      totalInvoices: "总发票数",
      totalValue: "总价值",
      sent: "已发送",
      invoiced: "已开票",

      Received: "已接收",
      received: "已接收",
      filter: "筛选",
      Filter: "筛选",
      filterBy: "按交易类型、角色、状态或搜索词筛选发票。",
      "Filter By": "按交易类型、角色、状态或搜索词筛选发票",
      search: "搜索",
      Search: "搜索...",
      searchInvoices: "搜索发票",
      "Search Invoices": "搜索发票",
      allTypes: "所有类型",
      "All Types": "所有类型",
      transactionType: "交易类型",
      "Transaction Type": "交易类型",

      role: "角色",
      allRoles: "所有角色",
      senderOutgoing: "发送者（发出）",
      receiverIncoming: "接收者（接收）",
      status: "状态",
      Status: "状态",
      allStatuses: "所有状态",
      "All Status": "所有状态",
      paid: "已支付",
      Paid: "已支付",
      pending: "待处理",
      Pending: "待处理",
      overdue: "逾期",
      Overdue: "逾期",
      createInvoice: "创建发票",
      viewInvoices: "查看发票",
      invoiceId: "发票 ID",
      client: "客户",
      amount: "金额",
      Invoices: "所有发票",
      recipient: "收件人",
      sender: "发送者",
      dueDate: "到期日期",
      noInvoicesFound: "未找到发票。请创建新发票。",

      // QR Invoice
      invoiceDetails: "发票详情",
      customer: "客户",
      qrPaymentInvoice: "二维码支付发票",
      auttomaticallyGeneratedInvoice: "从二维码支付自动生成的发票",
      export: "导出",
      totalTransactions: "总交易数",
      totalAmount: "总金额",
      autoGenerated: "自动生成",
      searchAndFilter: "搜索和筛选",
      searchBy: "按客户名称、交易 ID 或发票 ID 搜索",
      qrPaymentInvoices: "二维码支付发票",
      transactionId: "交易 ID",
      paymentTime: "支付时间",
      items: "项目",
      description: "描述",
      quantity: "数量",
      unitPrice: "单价",
      noItemAddedYet: "尚未添加项目",
      totalPrice: "总价",
      subtotal: "小计",
      tax: "税",
      total: "总计",
      paymentCompleted: "支付完成",
      paymentReceivedOn: "支付接收于",

      // Create Invoice
      createNewInvoice: "创建新发票",
      InvoiceDetails: "发票详情",
      select: "选择",
      orEnterManually: "或手动输入",
      b2cManualInvoice: "B2C 手动发票",
      noteInvoice:
        "注意：二维码支付发票在客户付款时自动生成。\n仅将此功能用于手动 B2C 账单。",
      customerName: "客户名称",
      invoiceDate: "发票日期",
      addItems: "添加项目",
      itemDescription: "项目描述",
      invoiceSummary: "发票摘要",
      saveAsDraft: "保存为草稿",
      sendInvoice: "发送发票",
      invoiceItem: "发票项目",
      company: "公司",

      // Marketplace
      findBusinessesToCollaborate: "寻找合作企业",
      searchBusinesses: "搜索企业",
      marketplace: "市场",

      // Documents
      manageYourDocuments: "管理您的商业文档",
      searchDocuments: "搜索文档...",
      uploadDocument: "上传文档",
      allDocuments: "所有文档",
      recentlyViewed: "最近查看",
      contract: "合同",
      taxDoc: "税务文件",
      handbook: "手册",
      plan: "商业计划",

      // Profile Page
      manageYourProfile: "管理您的个人和公司信息",
      personalInformation: "个人信息",
      companyInformation: "公司信息",
      communicationPreferences: "通信偏好",
      saveChanges: "保存更改",
      savePreferences: "保存偏好",
      position: "职位",
      owner: "所有者",
      businessId: "业务 ID",
      address: "地址",
      industry: "行业",
      retail: "零售",
      emailNotifications: "电子邮件通知",
      smsNotifications: "短信通知",
      marketingEmails: "营销电子邮件",
      viewAllInvoices: "查看所有发票",
      manageInvoices: "管理您的发票",
      createAndManageInvoices: "创建和管理发票",

      // 公司代码
      companyCode: "公司代码",
      enterCompanyCode: "输入公司代码",
      companyCodeDescription: "向公司管理员索取公司代码",
      yourPositionInCompany: "您在公司中的职位",

      // 成功和错误消息
      companyCreated: "公司已创建",
      companyCreatedDescription: "您的公司已成功创建",
      createCompanyError: "创建公司时出错",
      companyJoined: "已加入公司",
      companyJoinedDescription: "您已成功加入公司",
      companyNotFound: "未找到公司",
      joinCompanyError: "加入公司时出错",

      // 支付网关
      paymentGateway: "支付网关",
      paymentDescription: "请完成注册费用支付以继续",
      registrationFee: "注册费用",
      selectPaymentMethod: "请选择支付方式",
      registrationFeeAmount: "公司注册费",
      duitnowDescription: "使用DuitNow支付，安全便捷",
      payNow: "立即支付",
      processing: "处理中...",
      paymentComplete: "支付完成",
      paymentCompleteDescription: "您的注册费用已成功支付",
      continueToStatus: "继续查看注册状态",
      paymentSuccessful: "支付成功",
      paymentSuccessfulDescription: "您的注册费用已成功支付",

      // 公司状态页面
      companyRegistrationStatus: "公司注册状态",
      companyRegistrationStatusDescription: "查看您的公司注册申请状态",
      companyStatusPending: "您的公司注册申请正在处理中",
      companyStatusApproved: "您的公司注册申请已获批准",
      companyStatusRejected: "您的公司注册申请已被拒绝",
      companyStatusReview: "您的公司注册申请正在审核中",
      companyStatusUnknown: "未知状态",
      statusPending: "待处理",
      statusApproved: "已批准",
      statusRejected: "已拒绝",
      statusReview: "审核中",
      registrationNumber: "注册号码",
      rejectionReason: "拒绝原因",
      noReasonProvided: "未提供原因",
      estimatedProcessingTime: "预计处理时间",
      processingTimeMessage: "处理您的申请通常需要1-3个工作日",
      approvalMessage: "恭喜！",
      approvalInstructions: "您现在可以访问您的企业仪表板",
      backToHome: "返回首页",
      goToDashboard: "前往仪表板",
      companyNotFoundDescription: "未找到与您的账户关联的公司信息",

      companyFound: "找到公司",
      companyFoundDescription: "我们发现与您的身份证号码关联的公司",
      companyDetails: "公司详情",
      verifyInformation: "请验证信息",
      verifyCompanyInformationDescription: "请确认以下信息是否属于您的公司",
      bankAccount: "银行账户",
      confirmThisIsMyCompany: "确认这是我的公司",
      thisIsNotMyCompany: "这不是我的公司",
      companyConfirmed: "公司已确认",
      companyConfirmationSuccess: "您已成功确认公司所有权",
      companyConfirmationError: "确认公司所有权时出错",
      companyRejected: "已拒绝公司",
      companyRejectionSuccess: "您已拒绝此公司的所有权",

      // 公司确认相关
      companyFoundByIC: "找到公司",
      companyFoundByICDescription: "我们发现与您的身份证号码关联的公司",
      companyDetailsHeader: "公司详情",
      verifyCompanyInfo: "请验证信息",
      verifyCompanyInfoDescription: "请确认以下信息是否属于您的公司",
      ssmCertificateNumber: "SSM证书号码",
      bankAccountInfo: "银行账户",
      confirmCompanyOwnership: "确认这是我的公司",
      rejectCompanyOwnership: "这不是我的公司",
      companyOwnershipConfirmed: "公司已确认",
      companyOwnershipSuccess: "您已成功确认公司所有权",
      companyOwnershipError: "确认公司所有权时出错",
      companyOwnershipRejected: "已拒绝公司",
      companyOwnershipRejectionSuccess: "您已拒绝此公司的所有权",
    },
  },
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
      rememberMe: "Remember Me",
      forgotPassword: "Forgot Password?",

      // Common
      welcome: "Welcome",
      to: "to",
      loading: "Loading...",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      email: "Email",

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
      financeCategory: "Finance",
      analyticsCategory: "Analytics",
      monthlyInvoices: "Monthly Invoices",
      paidRate: "Paid Rate",
      accountingServices: "Accounting Services",
      recordKeeping: "Record Keeping",
      invoiceManagement: "Invoice Management",
      websiteHosting: "Website Hosting",
      aiAdvisor: "AI Advisor",
      basicReports: "Basic Reports",
      acceptDigitalPayments: "Accept digital payments",
      simpleBusinessReports: "View simple business reports",
      trackBusinessRecords: "Track your business records",
      fullAccountingSuite: "Full Accounting Suite",
      automatedInvoicing: "Automated Invoicing",
      professionalHosting: "Professional Hosting",
      aiPoweredInsights: "AI-Powered Insights",

      // App info
      appName: "MyMSME",
      appTagline: "Your Digital Business Platform",

      // All other translations
      quickStats: "Quick Stats",
      todaysSales: "Today's Sales",
      recentActivity: "Recent Activity",
      viewAll: "View All",
      getStarted: "Get Started",
      downloadQrCode: "Download QR Code",
      shareQrCode:
        "Share this QR code for fast payments and business introduction",

      monthlyRevenue: "Monthly Revenue",
      invoicesSent: "Invoices Sent",
      activeClients: "Active Clients",
      growthRate: "Growth Rate",
      thisMonth: "this month",
      newClients: "new clients",
      yearOverYear: "year over year",

      buildYourWebsite: "Build Your Website",
      createProfessionalWebsite:
        "Create a professional website for your business",
      websiteVisits: "Website visits this month",
      pageViews: "Page views",

      businessAnalytics: "Business Analytics",
      analyticsCharts: "Analytics charts will be displayed here",

      demoInstructions: "Demo Instructions:",
      microEnterpriseDemo: "IC 010101010101: Micro Enterprise",
      smallEnterpriseDemo: "IC 020202020202: Small Enterprise",
      mediumEnterpriseDemo: "IC 030303030303: Medium Enterprise",
      useAnyPassword: "Use password Qwerty123! to login",

      dontHaveAccount: "Don't have an account?",
      registerHere: "Register here",

      ekycVerified: "eKYC Verified",
      secureIdentityVerification: "Secure identity verification",
      unitedMsmeId: "United MSME ID",
      oneIdAllServices: "One ID for all services",

      free: "Free",
      availableFor: "Available for:",
      servicesAvailableFor: "Services available for",
      package: "Package",
      unlockMoreServices: "Unlock More Services",
      upgradeYourPlan:
        "Upgrade your plan to access advanced features and enterprise services",
      upgradeToSmallEnterprise: "Upgrade to Small Enterprise",
      upgradeToMediumEnterprise: "Upgrade to Medium Enterprise",
      needCustomService: "Need Custom Service?",
      cantFindWhatLookingFor:
        "Can't find what you're looking for? Our team can create custom solutions tailored to your business needs.",
      requestCustomService: "Request Custom Service",

      aiAdvisorWelcome:
        "Hello! I'm your AI advisor. How can I help your business today?",
      typeYourMessage: "Type your message...",
      aiDemoResponse:
        "Thank you for your message. I'm here to help you navigate the MyMSME platform and provide business guidance. This is a demo response.",

      basicToolsEstablished: "Basic tools for emerging businesses",
      advancedToolsEstablished: "Advanced tools for growing businesses",
      enterpriseGradeTools: "Enterprise-grade tools for established businesses",
      annualRevenue: "Annual Revenue",
      monthlyGrowth: "Monthly Growth",
      activeProjects: "Active Projects",
      teamMembers: "Team Members",
      clientSatisfaction: "Client Satisfaction",
      invoicesProcessed: "Invoices Processed",

      overview: "Overview",
      projects: "Projects",
      operationsTab: "Operations",

      // Project management
      revenueOverview: "Revenue Overview",
      revenueChart: "Revenue Chart",
      projectStatus: "Project Status",
      active: "Active",
      completed: "Completed",
      teamPerformance: "Team Performance",
      productivity: "Productivity",
      efficiency: "Efficiency",
      satisfaction: "Satisfaction",
      progress: "Progress",

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

      // 登录相关
      personalLogin: "Personal Login",
      companyLogin: "Company Login",
      companyID: "Company ID",
      icNumberPlaceholder: "e.g., 123456-78-9012",
      companyIDPlaceholder: "e.g., C123456",
      enterPassword: "Enter your password",
      pleaseEnterCompanyID: "Please enter company ID",

      //Profile
      personalInformation: "Personal Information",
      manageYourProfile: "Manage Your Profile",
      companyInformation: "Company Information",
      bankInformation: "Bank Information",
      fullName: "Full Name",
      phone: "Contact Number",
      companyName: "Company Name",
      communicationPreferences: "Communication Preferences",
      emailNotifications: "Email Notifications",
      smsNotifications: "SMS Notifications",
      pushNotifications: "Push Notifications",
      marketingEmails: "Marketing Emails",
      saveChanges: "Save Changes",
      savePreferences: "Save Preferences",
      position: "Position",
      owner: "Owner",
      businessId: "Business ID",
      address: "Address",
      industry: "Industry",
      retail: "Retail",
      viewAllInvoices: "View All Invoices",
      manageInvoices: "Manage Your Invoices",

      //Documents
      manageYourDocuments: "Manage Your Business Documents",
      searchDocuments: "Search Documents...",
      uploadDocument: "Upload Document",
      allDocuments: "All Documents",
      recentlyViewed: "Recently Viewed",
      contract: "Contract",
      taxDoc: "Tax Document",
      handbook: "Handbook",
      plan: "Business Plan",
      // Categories
      paymentCategory: "Payment",
      accountingCategory: "Accounting",
      documentsCategory: "Documents",
      marketingCategory: "Marketing",
      managementCategory: "Management",
      operationsCategory: "Operations",
      automationCategory: "Automation",
      infrastructureCategory: "Infrastructure",

      // Services page
      qrPaymentGateway: "QR Payment Gateway",
      acceptPaymentsViaQr: "Accept payments via QR code",
      basicBusinessRecord: "Basic Business Record Management",
      digitalSsmCertificate: "Digital SSM Certificate and Documents",
      automatedEInvoicing: "Automated E-Invoicing System",
      professionalWebsiteTemplates: "Professional Website Templates",
      fullAccountingBookkeeping: "Full Accounting and Bookkeeping",
      aiPoweredCreditScore: "AI-Powered Credit Score Analysis",

      // Enterprise services
      enterpriseCrm: "Enterprise CRM",
      advancedCustomerRelationship: "Advanced Customer Relationship Management",
      businessIntelligence: "Business Intelligence",
      advancedAnalyticsReporting: "Advanced Analytics and Reporting",
      projectManagementSuite: "Project Management Suite",
      comprehensiveProjectManagement: "Comprehensive Project Management",
      multiLocationManagement: "Multi-Location Management",
      manageMultipleBusinessLocations: "Manage Multiple Business Locations",
      businessAutomation: "Business Automation",
      workflowAutomationIntegration: "Workflow Automation Integration",
      enterpriseCloudBackup: "Enterprise Cloud Backup",
      secureCloudStorageBackup: "Secure Cloud Storage and Backup",

      digitalTransformation:
        "Digital Transformation Solutions for Modern Businesses",

      ecommercePlatform: "E-commerce Platform Development and Integration",

      mobileAppDevelopment:
        "Mobile App Development for Enhanced Customer Engagement",

      planning: "Strategic Planning and Consultation Services",

      companyFound: "Company Found",
      companyFoundDescription:
        "We found a company associated with your IC number",
      companyDetails: "Company Details",
      verifyInformation: "Verify Information",
      verifyCompanyInformationDescription:
        "Please confirm if the following information belongs to your company",
      bankAccount: "Bank Account",
      confirmThisIsMyCompany: "Confirm This Is My Company",
      thisIsNotMyCompany: "This Is Not My Company",
      companyConfirmed: "Company Confirmed",
      companyConfirmationSuccess:
        "You have successfully confirmed company ownership",
      companyConfirmationError: "Error confirming company ownership",
      companyRejected: "Company Rejected",
      companyRejectionSuccess: "You have rejected ownership of this company",

      // 公司确认相关
      companyFoundByIC: "Company Found",
      companyFoundByICDescription:
        "We found a company associated with your IC number",
      companyDetailsHeader: "Company Details",
      verifyCompanyInfo: "Verify Information",
      verifyCompanyInfoDescription:
        "Please confirm if the following information belongs to your company",
      ssmCertificateNumber: "SSM Certificate Number",
      bankAccountInfo: "Bank Account",
      confirmCompanyOwnership: "Confirm This Is My Company",
      rejectCompanyOwnership: "This Is Not My Company",
      companyOwnershipConfirmed: "Company Confirmed",
      companyOwnershipSuccess:
        "You have successfully confirmed company ownership",
      companyOwnershipError: "Error confirming company ownership",
      companyOwnershipRejected: "Company Rejected",
      companyOwnershipRejectionSuccess:
        "You have rejected ownership of this company",

      appDescription:
        "Streamline your business operations through Malaysia's digital financial ecosystem",

      advancedAnalytics: "Advanced Analytics",
      realtimeBusinessIntelligence:
        "Real-time business intelligence and predictive analytics",

      // Registration steps and fields
      personalInfo: "Personal Info",
      companyInfo: "Company Info",
      paymentGateway: "Payment Gateway",
      contact: "Contact Number",
      companyReg: "Company Registration No.",
      companyAddress: "Company Address",
      bankName: "Bank Name",
      accountNumber: "Account Number",
      swiftCode: "SWIFT Code",
      back: "Back",
      next: "Next",

      icVerification: "IC Verification",
      uploadICDescription:
        "Please upload clear images of the front and back of your IC",
      frontIC: "Front IC",
      backIC: "Back IC",
      clickToUpload: "Click to upload",
      supportedFormats: "PNG, JPG, or JPEG (max 5MB)",
      continue: "Continue",
      faceVerification: "Face Verification",
      faceVerificationDescription:
        "Please place your face within the frame for verification",
      faceVerificationInstructions:
        "Ensure your face is well-lit and clearly visible",
      complete: "Complete Verification",

      clickToStartCamera: "Click to start camera",
      capture: "Capture",
      retake: "Retake",
      faceVerificationStart: "Click the camera icon to start",
      faceVerificationComplete: "Face verification successful",

      Received: "Received",
      received: "received",
      filter: "Filter",
      filterBy:
        "Filter invoices by transaction type, role, status, or search term.",
      search: "Search",
      Search: "Search...",
      allTypes: "All Types",

      role: "Role",
      allRoles: "All Roles",
      senderOutgoing: "Sender (Outgoing)",
      receiverIncoming: "Receiver (Incoming)",
      status: "Status",
      allStatuses: "All Statuses",
      paid: "Paid",
      pending: "Pending",
      overdue: "Overdue",
      createInvoice: "Create Invoice",
      viewInvoices: "View Invoices",
      invoiceId: "Invoice ID",
      client: "Client",
      amount: "Amount",
      Invoices: "All Invoices",
      recipient: "Recipient",
      sender: "Sender",
      dueDate: "Due Date",
      noInvoicesFound: "No invoices found. Please create a new invoice.",
      searchInvoices: "Search invoices",

      // QR Invoice
      invoiceDetails: "Invoice Details",
      customer: "Customer",
      auttomaticallyGeneratedInvoice:
        "Invoice automatically generated from QR code payment",
      export: "Export",
      totalTransactions: "Total Transactions",
      totalAmount: "Total Amount",
      autoGenerated: "Auto-Generated",
      searchAndFilter: "Search and Filter",
      searchBy: "Search by customer name, transaction ID, or invoice ID",
      qrPaymentInvoices: "QR Payment Invoices",
      transactionId: "Transaction ID",
      paymentTime: "Payment Time",
      items: "Items",
      description: "Description",
      quantity: "Quantity",
      unitPrice: "Unit Price",
      noItemAddedYet: "No items added yet",
      totalPrice: "Total Price",
      subtotal: "Subtotal",
      tax: "Tax",
      total: "Total",
      paymentCompleted: "Payment Completed",
      paymentReceivedOn: "Payment Received On",

      // Create Invoice
      createNewInvoice: "Create New Invoice",
      InvoiceDetails: "Invoice Details",
      transactionType: "Transaction Type",
      select: "Select",
      orEnterManually: "Or enter manually",
      b2cManualInvoice: "B2C Manual Invoice",
      noteInvoice:
        "Note: QR payment invoices are automatically generated when a customer makes a payment.\nUse this function only for manual B2C billing.",
      customerName: "Customer Name",
      invoiceDate: "Invoice Date",
      addItems: "Add Items",
      itemDescription: "Item Description",
      invoiceSummary: "Invoice Summary",
      saveAsDraft: "Save as Draft",
      sendInvoice: "Send Invoice",
      invoiceItem: "Invoice Item",
      company: "Company",

      // Marketplace
      findBusinessesToCollaborate: "Find Businesses to Collaborate",
      searchBusinesses: "Search Businesses",
      marketplace: "Marketplace",

      createAndManageInvoices: "Create and Manage Invoices",
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
      rememberMe: "Ingat Saya",
      forgotPassword: "Lupa Kata Laluan?",

      // Common
      welcome: "Selamat Datang",
      to: "ke",
      loading: "Memuatkan...",
      submit: "Hantar",
      cancel: "Batal",
      save: "Simpan",
      edit: "Edit",
      delete: "Padam",
      email: "E-mel",

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
      basicReports: "Laporan Asas",
      acceptDigitalPayments: "Terima pembayaran digital",
      simpleBusinessReports: "Lihat laporan perniagaan mudah",
      trackBusinessRecords: "Jejaki rekod perniagaan anda",
      fullAccountingSuite: "Suite Perakaunan Penuh",
      automatedInvoicing: "Invois Automatik",
      professionalHosting: "Pengehosan Profesional",
      aiPoweredInsights: "Wawasan Berkuasa AI",

      // App info
      appName: "MyMSME",
      appTagline: "Platform Perniagaan Digital Anda",

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

      buildYourWebsite: "Bina Laman Web Anda",
      createProfessionalWebsite:
        "Cipta laman web profesional untuk perniagaan anda",
      websiteVisits: "Lawatan laman web bulan ini",
      pageViews: "Paparan halaman",

      businessAnalytics: "Analitik Perniagaan",
      analyticsCharts: "Carta analitik akan dipaparkan di sini",

      demoInstructions: "Arahan Demo:",
      microEnterpriseDemo: "IC  010101010101: Perusahaan Mikro",
      smallEnterpriseDemo: "IC 020202020202: Perusahaan Kecil",
      mediumEnterpriseDemo: "IC 030303030303: Perusahaan Sederhana",
      useAnyPassword: "Gunakan  kata laluan Qwerty123! untuk log masuk",

      dontHaveAccount: "Tiada akaun?",
      registerHere: "Daftar di sini",
      registerSuccess: "Pendaftaran Berjaya",
      registrationSuccess: "Pendaftaran Berjaya!",
      registrationFailed: "Pendaftaran Gagal",
      emailVerificationRequired:
        "Sila semak e-mel anda dan klik pautan pengesahan untuk melengkapkan pendaftaran",
      pleaseCompleteForm: "Sila lengkapkan semua medan yang diperlukan",
      passwordsDoNotMatch: "Kata laluan tidak sepadan",
      success: "Berjaya",
      understood: "Saya Faham",

      ekycVerified: "eKYC Disahkan",
      secureIdentityVerification: "Pengesahan identiti selamat",
      unitedMsmeId: "ID MSME Bersatu",
      oneIdAllServices: "Satu ID untuk semua perkhidmatan",

      free: "Percuma",
      availableFor: "Tersedia untuk:",
      servicesAvailableFor: "Perkhidmatan tersedia untuk",
      package: "Pakej",
      unlockMoreServices: "Buka Lebih Banyak Perkhidmatan",
      upgradeYourPlan:
        "Naik taraf pelan anda untuk mengakses ciri dan perkhidmatan perusahaan maju",
      upgradeToSmallEnterprise: "Naik taraf ke Perusahaan Kecil",
      upgradeToMediumEnterprise: "Naik taraf ke Perusahaan Sederhana",

      // 登录相关
      personalLogin: "Log Masuk Peribadi",
      companyLogin: "Log Masuk Syarikat",
      companyID: "ID Syarikat",
      icNumberPlaceholder: "cth., 123456-78-9012",
      companyIDPlaceholder: "cth., C123456",
      enterPassword: "Masukkan kata laluan anda",
      pleaseEnterCompanyID: "Sila masukkan ID syarikat",

      // 注册相关
      createYourAccount: "Cipta Akaun Anda",
      personalAndCompanyInfo: "Maklumat Peribadi & Syarikat",
      securityInfo: "Maklumat Keselamatan",

      // 错误信息
      error: "Ralat",

      // 公司信息
      companyName: "Nama Syarikat",
      companyAddress: "Alamat Syarikat",
      ekycVerificationRequired:
        "Sila lengkapkan pengesahan eKYC untuk mengaktifkan akaun anda",

      // 公司设置页面
      companySetup: "Persediaan Syarikat",
      companySetupDescription:
        "Sediakan maklumat syarikat anda atau sertai syarikat sedia ada",
      setupYourCompany: "Sediakan Syarikat Anda",
      createOrJoinCompany: "Cipta syarikat baru atau sertai yang sedia ada",
      createCompanyTab: "Cipta Syarikat",
      joinCompanyTab: "Sertai Syarikat",

      // 公司表单字段
      nameType: "Jenis Nama",
      selectNameType: "Pilih jenis nama",
      personalName: "Nama Peribadi",
      tradeName: "Nama Perdagangan",
      businessType: "Jenis Perniagaan",
      registrationPeriod: "Tempoh Pendaftaran (Tahun)",
      contactNumber: "Nombor Hubungan (+60)",
      businessCode: "Kod Perniagaan",
      enterBusinessCode: "Masukkan kod perniagaan",
      businessStartDate: "Tarikh Mula Perniagaan",
      incentiveSource: "Sumber Insentif",
      businessInfo: "Maklumat Perniagaan",

      // 按钮和状态
      creating: "Mencipta...",
      createCompany: "Cipta Syarikat",
      joining: "Menyertai...",
      joinCompany: "Sertai Syarikat",

      // 公司代码
      companyCode: "Kod Syarikat",
      enterCompanyCode: "Masukkan kod syarikat",
      companyCodeDescription:
        "Tanya pentadbir syarikat anda untuk kod syarikat",
      position: "Jawatan",
      owner: "Pemilik",
      businessId: "ID Perniagaan",
      address: "Alamat",
      industry: "Industri",
      retail: "Runcit",
      emailNotifications: "Notifikasi E-mel",
      smsNotifications: "Notifikasi SMS",
      marketingEmails: "E-mel Pemasaran",
      viewAllInvoices: "Lihat Semua Invois",
      manageInvoices: "Urus Invois Anda",
      createAndManageInvoices: "Cipta dan Urus Invois",

      yourPositionInCompany: "Jawatan anda dalam syarikat",

      // 成功和错误消息
      companyCreated: "Syarikat Dicipta",
      companyCreatedDescription: "Syarikat anda telah berjaya dicipta",
      createCompanyError: "Ralat mencipta syarikat",
      companyJoined: "Syarikat Disertai",
      companyJoinedDescription: "Anda telah berjaya menyertai syarikat",
      companyNotFound: "Syarikat tidak dijumpai",
      joinCompanyError: "Ralat menyertai syarikat",

      // 支付网关
      paymentGateway: "Gerbang Pembayaran",
      paymentDescription:
        "Sila selesaikan pembayaran yuran pendaftaran untuk meneruskan",
      registrationFee: "Yuran Pendaftaran",
      selectPaymentMethod: "Sila pilih kaedah pembayaran",
      registrationFeeAmount: "Yuran Pendaftaran Syarikat",
      duitnowDescription: "Bayar dengan DuitNow, selamat dan mudah",
      payNow: "Bayar Sekarang",
      processing: "Memproses...",
      paymentComplete: "Pembayaran Selesai",
      paymentCompleteDescription:
        "Yuran pendaftaran anda telah berjaya dibayar",
      continueToStatus: "Teruskan ke Status Pendaftaran",
      paymentSuccessful: "Pembayaran Berjaya",
      paymentSuccessfulDescription:
        "Yuran pendaftaran anda telah berjaya dibayar",

      // 公司状态页面
      companyRegistrationStatus: "Status Pendaftaran Syarikat",
      companyRegistrationStatusDescription:
        "Lihat status permohonan pendaftaran syarikat anda",
      companyStatusPending:
        "Permohonan pendaftaran syarikat anda sedang diproses",
      companyStatusApproved:
        "Permohonan pendaftaran syarikat anda telah diluluskan",
      companyStatusRejected:
        "Permohonan pendaftaran syarikat anda telah ditolak",
      companyStatusReview:
        "Permohonan pendaftaran syarikat anda sedang dalam semakan",
      companyStatusUnknown: "Status tidak diketahui",
      statusPending: "Tertunda",
      statusApproved: "Diluluskan",
      statusRejected: "Ditolak",
      statusReview: "Dalam Semakan",
      registrationNumber: "Nombor Pendaftaran",
      rejectionReason: "Sebab Penolakan",
      noReasonProvided: "Tiada sebab diberikan",
      estimatedProcessingTime: "Anggaran Masa Pemprosesan",
      processingTimeMessage:
        "Pemprosesan permohonan anda biasanya mengambil masa 1-3 hari bekerja",
      approvalMessage: "Tahniah!",
      approvalInstructions:
        "Anda kini boleh mengakses papan pemuka perusahaan anda",
      backToHome: "Kembali ke Laman Utama",
      goToDashboard: "Pergi ke Papan Pemuka",
      companyNotFoundDescription:
        "Tiada maklumat syarikat yang ditemui berkaitan dengan akaun anda",

      companyFound: "Syarikat Dijumpai",
      companyFoundDescription:
        "Kami menemui syarikat yang dikaitkan dengan nombor IC anda",
      companyDetails: "Butiran Syarikat",
      verifyInformation: "Sahkan Maklumat",
      verifyCompanyInformationDescription:
        "Sila sahkan jika maklumat berikut adalah milik syarikat anda",
      bankAccount: "Akaun Bank",
      confirmThisIsMyCompany: "Sahkan Ini Adalah Syarikat Saya",
      thisIsNotMyCompany: "Ini Bukan Syarikat Saya",
      companyConfirmed: "Syarikat Disahkan",
      companyConfirmationSuccess:
        "Anda telah berjaya mengesahkan pemilikan syarikat",
      companyConfirmationError: "Ralat mengesahkan pemilikan syarikat",
      companyRejected: "Syarikat Ditolak",
      companyRejectionSuccess: "Anda telah menolak pemilikan syarikat ini",

      // 公司确认相关
      companyFoundByIC: "Syarikat Dijumpai",
      companyFoundByICDescription:
        "Kami menemui syarikat yang dikaitkan dengan nombor IC anda",
      companyDetailsHeader: "Butiran Syarikat",
      verifyCompanyInfo: "Sahkan Maklumat",
      verifyCompanyInfoDescription:
        "Sila sahkan jika maklumat berikut adalah milik syarikat anda",
      ssmCertificateNumber: "Nombor Sijil SSM",
      bankAccountInfo: "Akaun Bank",
      confirmCompanyOwnership: "Sahkan Ini Adalah Syarikat Saya",
      rejectCompanyOwnership: "Ini Bukan Syarikat Saya",
      companyOwnershipConfirmed: "Syarikat Disahkan",
      companyOwnershipSuccess:
        "Anda telah berjaya mengesahkan pemilikan syarikat",
      companyOwnershipError: "Ralat mengesahkan pemilikan syarikat",
      companyOwnershipRejected: "Syarikat Ditolak",
      companyOwnershipRejectionSuccess:
        "Anda telah menolak pemilikan syarikat ini",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
