import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { supabase, User } from "@/lib/supabase";
import { userService } from "@/services/userService";
import { companyService } from "@/services/companyService";

// 扩展用户数据类型，包含 Supabase 用户信息
export type UserData = {
  id: number;
  icNumber: string;
  fullName: string;
  enterpriseLevel: "micro" | "small" | "medium";
  isKycVerified: boolean;
  contact?: string;
  email?: string;
  lastLogin?: string;
} | null;

// 定义上下文类型
interface AuthContextType {
  user: UserData;
  login: (
    icNumber: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; message: string }>;
  register: (userData: {
    icNo: string;
    fullName: string;
    email: string;
    contact: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUserProfile: (userData: Partial<User>) => Promise<boolean>;
}

// 创建上下文，设置默认值
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({ success: false, message: "" }),
  register: async () => ({ success: false, message: "" }),
  logout: async () => {},
  isAuthenticated: false,
  isLoading: true,
  updateUserProfile: async () => false,
});

// 本地存储密钥
const USER_STORAGE_KEY = "mymsme-user-data";
const SESSION_STORAGE_KEY = "mymsme-session";

// Auth provider 组件
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 初始化状态
  const [user, setUser] = useState<UserData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 派生的认证状态
  const isAuthenticated = user !== null;

  // 初始化时检查会话状态
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);

      try {
        // 检查本地存储的会话
        const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
        if (savedSession) {
          const { icNumber } = JSON.parse(savedSession);

          // 从 Supabase 获取用户数据
          const userData = await userService.getUserByIcNo(icNumber);
          if (userData) {
            // 如果找到用户，获取公司信息以确定企业级别
            const companyData = await companyService.getCompanyByOwnerIC(
              userData.icNo
            );
            const enterpriseLevel = companyData
              ? companyService.getEnterpriseLevel(
                  companyData.registrationPeriod, // 用作员工数量的代理
                  0 // 由于没有年收入字段，默认为 0
                )
              : "micro";

            setUser({
              id: userData.id,
              icNumber: userData.icNo,
              fullName: userData.fullName,
              enterpriseLevel,
              isKycVerified: userData.isKycVerified,
              contact: userData.contact,
              email: userData.email,
              lastLogin: new Date().toISOString(),
            });
          } else {
            // 如果找不到用户，清除会话
            localStorage.removeItem(SESSION_STORAGE_KEY);
            localStorage.removeItem(USER_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("初始化认证失败:", error);
        localStorage.removeItem(SESSION_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // 保存用户数据到本地存储
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  // 登录函数
  const login = async (
    icNumber: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // 在实际应用中，这里应该使用 Supabase Auth，但现在我们模拟认证
      // 从 Supabase 获取用户
      const userData = await userService.getUserByIcNo(icNumber);

      if (!userData) {
        return { success: false, message: "用户不存在" };
      }

      // 在实际应用中，这里应该验证密码
      // 但现在我们简单地接受任何密码

      // 获取公司信息以确定企业级别
      const companyData = await companyService.getCompanyByOwnerIC(
        userData.icNo
      );
      const enterpriseLevel = companyData
        ? companyService.getEnterpriseLevel(
            companyData.registrationPeriod, // 用作员工数量的代理
            0 // 由于没有年收入字段，默认为 0
          )
        : "micro";

      // 创建用户数据对象
      const userDataObj = {
        id: userData.id,
        icNumber: userData.icNo,
        fullName: userData.fullName,
        enterpriseLevel,
        isKycVerified: userData.isKycVerified,
        contact: userData.contact,
        email: userData.email,
        lastLogin: new Date().toISOString(),
      };

      // 设置用户状态
      setUser(userDataObj);

      // 如果选择了"记住我"，保存会话到本地存储
      if (rememberMe) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ icNumber }));
      }

      return { success: true, message: "登录成功" };
    } catch (error) {
      console.error("登录失败:", error);
      return { success: false, message: "登录失败，请稍后再试" };
    }
  };

  // 注册函数
  const register = async (userData: {
    icNo: string;
    fullName: string;
    email: string;
    contact: string;
    password: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      // 检查用户是否已存在
      const existingUser = await userService.getUserByIcNo(userData.icNo);
      if (existingUser) {
        return { success: false, message: "该身份证号码已注册" };
      }

      // 创建新用户
      const newUser = await userService.createUser({
        icNo: userData.icNo,
        fullName: userData.fullName,
        email: userData.email,
        contact: userData.contact,
        isKycVerified: false,
      });

      if (!newUser) {
        return { success: false, message: "注册失败，请稍后再试" };
      }

      return { success: true, message: "注册成功，请登录" };
    } catch (error) {
      console.error("注册失败:", error);
      return { success: false, message: "注册失败，请稍后再试" };
    }
  };

  // 登出函数
  const logout = async () => {
    setUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  // 更新用户资料
  const updateUserProfile = async (
    userData: Partial<User>
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      const updatedUser = await userService.updateUser(user.id, userData);
      if (updatedUser) {
        setUser({
          ...user,
          ...userData,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("更新用户资料失败:", error);
      return false;
    }
  };

  // 提供上下文值
  const contextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    isLoading,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// 使用认证上下文的自定义钩子
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
