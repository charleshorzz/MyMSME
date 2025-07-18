import { supabase, User } from "@/lib/supabase";

/**
 * 用户服务 - 处理与 Supabase 用户表的交互
 */
export const userService = {
  /**
   * 通过 IC 号码获取用户
   */
  async getUserByIcNo(icNo: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("icNo", icNo)
      .single();

    if (error) {
      console.error("获取用户失败:", error);
      return null;
    }

    return data as User;
  },

  /**
   * 创建新用户
   */
  async createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          ...userData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("创建用户失败:", error);
      return null;
    }

    return data as User;
  },

  /**
   * 更新用户信息
   */
  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...userData,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("更新用户失败:", error);
      return null;
    }

    return data as User;
  },

  /**
   * 更新用户 KYC 验证状态
   */
  async updateKycStatus(id: number, isVerified: boolean): Promise<boolean> {
    const { error } = await supabase
      .from("users")
      .update({
        isKycVerified: isVerified,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("更新 KYC 状态失败:", error);
      return false;
    }

    return true;
  },
};
