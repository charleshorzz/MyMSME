import { createClient } from "@supabase/supabase-js";

// 这些环境变量需要在 .env 文件中设置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// 创建 Supabase 客户端实例
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 类型定义
export type User = {
  id: number;
  icNo: string;
  fullName: string;
  isKycVerified: boolean;
  contact: string;
  email: string;
  password?: string; // 添加密码字段
  level?: "micro" | "small" | "medium" | null; // 添加用户级别字段，可以为null
  createdAt: string;
  updatedAt: string;
};

export type Company = {
  id: number;
  nameType: string;
  businessName: string;
  businessStartDate: string;
  incentiveSource: string;
  businessInfo: boolean;
  businessAddress: string;
  businessEmail: string;
  businessType: string;
  businessCode: number[];
  businessContact: string;
  registrationPeriod: number; // 用作员工数量的代理
  companyCode?: string; // 唯一公司代码，用于邀请其他用户加入
  ownerIC: string;
  createdAt: string;
  updatedAt: string;
  level: "micro" | "small" | "medium" | null;
  password?: string; // 添加公司密码字段，用于公司登录
  status?: "pending" | "approved" | "rejected" | "review"; // 公司状态
  rejectionReason?: string; // 拒绝原因
};

export type BusinessCode = {
  id: number;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  id: number;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};
