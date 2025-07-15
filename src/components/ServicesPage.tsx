import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Globe, 
  Calculator, 
  Receipt, 
  Brain, 
  Building,
  CreditCard,
  Smartphone,
  Cloud,
  Zap,
  Shield,
  Users,
  BarChart3,
  Briefcase
} from "lucide-react";

interface ServicesPageProps {
  userLevel: 'micro' | 'small' | 'medium';
}

export function ServicesPage({ userLevel }: ServicesPageProps) {
  const { t } = useTranslation();

  const allServices = [
    // Basic Services (All levels)
    {
      id: 'qr-payments',
      title: 'QR Payment Gateway',
      description: 'Accept digital payments via QR codes',
      icon: Smartphone,
      levels: ['micro', 'small', 'medium'],
      price: 'RM 15/month',
      category: 'Payment'
    },
    {
      id: 'basic-records',
      title: t('recordKeeping'),
      description: 'Basic business record management',
      icon: FileText,
      levels: ['micro', 'small', 'medium'],
      price: 'RM 25/month',
      category: 'Accounting'
    },
    {
      id: 'ssm-documents',
      title: t('ssmCertificate'),
      description: 'Digital SSM certificate and documents',
      icon: Shield,
      levels: ['micro', 'small', 'medium'],
      price: 'Free',
      category: 'Documents'
    },
    
    // Small & Medium Services
    {
      id: 'e-invoicing',
      title: t('eInvoicing'),
      description: 'Automated e-invoicing system',
      icon: Receipt,
      levels: ['small', 'medium'],
      price: 'RM 50/month',
      category: 'Accounting'
    },
    {
      id: 'website-builder',
      title: t('websiteBuilder'),
      description: 'Professional website templates',
      icon: Globe,
      levels: ['small', 'medium'],
      price: 'RM 80/month',
      category: 'Marketing'
    },
    {
      id: 'accounting-suite',
      title: t('accountingServices'),
      description: 'Full accounting and bookkeeping',
      icon: Calculator,
      levels: ['small', 'medium'],
      price: 'RM 120/month',
      category: 'Accounting'
    },
    {
      id: 'credit-analysis',
      title: t('creditAnalysis'),
      description: 'AI-powered credit score analysis',
      icon: Brain,
      levels: ['small', 'medium'],
      price: 'RM 40/month',
      category: 'Finance'
    },
    
    // Medium Only Services
    {
      id: 'enterprise-crm',
      title: 'Enterprise CRM',
      description: 'Advanced customer relationship management',
      icon: Users,
      levels: ['medium'],
      price: 'RM 200/month',
      category: 'Management'
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence',
      description: 'Advanced analytics and reporting',
      icon: BarChart3,
      levels: ['medium'],
      price: 'RM 150/month',
      category: 'Analytics'
    },
    {
      id: 'project-management',
      title: 'Project Management Suite',
      description: 'Comprehensive project management tools',
      icon: Briefcase,
      levels: ['medium'],
      price: 'RM 180/month',
      category: 'Management'
    },
    {
      id: 'multi-location',
      title: 'Multi-Location Management',
      description: 'Manage multiple business locations',
      icon: Building,
      levels: ['medium'],
      price: 'RM 250/month',
      category: 'Operations'
    },
    {
      id: 'automation-suite',
      title: 'Business Automation',
      description: 'Workflow automation and integration',
      icon: Zap,
      levels: ['medium'],
      price: 'RM 300/month',
      category: 'Automation'
    },
    {
      id: 'cloud-backup',
      title: 'Enterprise Cloud Backup',
      description: 'Secure cloud storage and backup',
      icon: Cloud,
      levels: ['medium'],
      price: 'RM 100/month',
      category: 'Infrastructure'
    }
  ];

  const availableServices = allServices.filter(service => 
    service.levels.includes(userLevel)
  );

  const servicesByCategory = availableServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof availableServices>);

  const getLevelBadgeColor = (levels: string[]) => {
    if (levels.includes('medium')) return 'default';
    if (levels.includes('small')) return 'secondary';
    return 'outline';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">{t('services')}</h1>
        <p className="text-muted-foreground">
          Services available for {t(userLevel)} businesses
        </p>
        <Badge variant={getLevelBadgeColor([userLevel])} className="mt-2">
          {t(userLevel)} Package
        </Badge>
      </div>

      {/* Service Categories */}
      {Object.entries(servicesByCategory).map(([category, services]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {category} Services
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="shadow-soft hover:shadow-medium transition-all cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                          <Badge variant={getLevelBadgeColor(service.levels)} className="mt-1">
                            {service.price}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Available for:</span>
                        <div className="flex gap-1">
                          {service.levels.map(level => (
                            <Badge key={level} variant="outline" className="text-xs">
                              {t(level)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Get Started
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Upgrade Notice for Lower Tiers */}
      {userLevel !== 'medium' && (
        <Card className="shadow-soft bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">
              Unlock More Services
            </h3>
            <p className="text-muted-foreground mb-4">
              Upgrade your plan to access advanced enterprise features and services
            </p>
            <div className="flex justify-center gap-3">
              {userLevel === 'micro' && (
                <Button variant="outline">
                  Upgrade to Small Enterprise
                </Button>
              )}
              <Button>
                Upgrade to {userLevel === 'micro' ? 'Medium' : 'Medium'} Enterprise
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Service Request */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Need a Custom Service?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our team can create custom solutions tailored to your business needs.
          </p>
          <Button variant="outline" className="w-full md:w-auto">
            Request Custom Service
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}