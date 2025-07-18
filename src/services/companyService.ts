import { supabase, Company } from "@/lib/supabase";

/**
 * 公司服务 - 处理与 Supabase 公司表的交互
 */
export const companyService = {
  /**
   * 通过所有者 IC 号码获取公司
   */
  async getCompanyByOwnerIC(ownerIC: string): Promise<Company | null> {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("ownerIC", ownerIC)
      .single();

    if (error) {
      console.error("获取公司失败:", error);
      return null;
    }

    return data as Company;
  },

  /**
   * 通过公司代码获取公司
   * 公司代码可以是注册号码或自定义代码
   */
  async getCompanyByCode(code: string): Promise<Company | null> {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .or(`companyCode.eq.${code}`)
      .single();

    if (error) {
      console.error("通过代码获取公司失败:", error);
      return null;
    }

    return data as Company;
  },

  /**
   * 创建新公司
   */
  async createCompany(
    companyData: Omit<Company, "id" | "createdAt" | "updatedAt">
  ): Promise<Company | null> {
    // 生成唯一的公司代码
    const companyCode = `C${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          ...companyData,
          companyCode, // 添加公司代码
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("创建公司失败:", error);
      return null;
    }

    return data as Company;
  },

  /**
   * 更新公司信息
   */
  async updateCompany(
    id: number,
    companyData: Partial<Company>
  ): Promise<Company | null> {
    const { data, error } = await supabase
      .from("companies")
      .update({
        ...companyData,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("更新公司失败:", error);
      return null;
    }

    return data as Company;
  },

  /**
   * 获取公司业务代码
   */
  async getBusinessCodes(): Promise<
    { id: number; code: string; description: string }[]
  > {
    const { data, error } = await supabase
      .from("business_codes")
      .select("id, code, description");

    if (error) {
      console.error("获取业务代码失败:", error);
      return [];
    }

    return data;
  },

  /**
   * 根据公司规模获取公司类型
   */
  getEnterpriseLevel(
    employeeCount: number,
    annualRevenue: number
  ): "micro" | "small" | "medium" {
    // 根据马来西亚中小企业发展局 (SME Corp) 的定义
    if (employeeCount <= 5 || annualRevenue <= 300000) {
      return "micro";
    } else if (employeeCount <= 75 || annualRevenue <= 15000000) {
      return "small";
    } else {
      return "medium";
    }
  },
};
