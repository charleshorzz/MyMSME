import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define the user data type
export type UserData = {
  icNumber: string;
  enterpriseLevel: "micro" | "small" | "medium";
  lastLogin?: string;
} | null;

// Define the context type
interface AuthContextType {
  user: UserData;
  login: (
    icNumber: string,
    enterpriseLevel: "micro" | "small" | "medium"
  ) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Key for storing user data in localStorage
const USER_STORAGE_KEY = "mymsme-user-data";

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize state from localStorage if available
  const [user, setUser] = useState<UserData>(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return null;
    }
  });

  // Derived authentication state
  const isAuthenticated = user !== null;

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  // Login function
  const login = (
    icNumber: string,
    enterpriseLevel: "micro" | "small" | "medium"
  ) => {
    const userData = {
      icNumber,
      enterpriseLevel,
      lastLogin: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  // Provide the context value
  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
