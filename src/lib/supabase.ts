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
  createdAt: string;
  updatedAt: string;
};

export type Company = {
  id: number;
  nameType: string;
  businessName: string;
  businessStartDate: string;
  incentiveSource: string;
  registrationPeriod: number;
  businessInfo: boolean;
  businessAddress: string;
  businessContact: string;
  businessEmail: string;
  businessType: string;
  businessCode: number[];
  ownerIC: string | null;
  createdAt: string;
  updatedAt: string;
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
