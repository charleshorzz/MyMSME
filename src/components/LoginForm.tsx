import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Eye, EyeOff, Shield, CreditCard } from "lucide-react";

interface LoginFormProps {
  onLogin: (icNumber: string, enterpriseLevel: 'micro' | 'small' | 'medium') => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const { t } = useTranslation();
  const [icNumber, setIcNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo logic - determine enterprise level based on IC number
    let level: 'micro' | 'small' | 'medium' = 'micro';
    if (icNumber.endsWith('1') || icNumber.endsWith('2')) level = 'small';
    if (icNumber.endsWith('3') || icNumber.endsWith('4')) level = 'medium';
    
    onLogin(icNumber, level);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-large">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t('appName')}</h1>
            <p className="text-muted-foreground">{t('appTagline')}</p>
          </div>
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-large glass-effect">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{t('login')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ic">{t('icNumber')}</Label>
                <Input
                  id="ic"
                  type="text"
                  placeholder="e.g., 123456-78-9012"
                  value={icNumber}
                  onChange={(e) => setIcNumber(e.target.value)}
                  required
                  className="transition-fast"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 transition-fast"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full transition-fast"
                disabled={isLoading}
              >
                {isLoading ? t('loading') : t('login')}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Don't have an account? <Button variant="link" className="p-0 h-auto">Register here</Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="shadow-soft glass-effect">
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <h3 className="text-sm font-semibold">eKYC Verified</h3>
              <p className="text-xs text-muted-foreground">Secure identity verification</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft glass-effect">
            <CardContent className="p-4 text-center">
              <CreditCard className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <h3 className="text-sm font-semibold">United MSME ID</h3>
              <p className="text-xs text-muted-foreground">One ID for all services</p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Instructions */}
        <Card className="shadow-soft bg-muted/50">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-2">Demo Instructions:</h3>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p>• IC ending with 0: Micro Enterprise</p>
              <p>• IC ending with 1-2: Small Enterprise</p>
              <p>• IC ending with 3-4: Medium Enterprise</p>
              <p>• Use any password to login</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}