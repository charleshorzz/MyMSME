import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Users, Building2, Briefcase, Search, Globe, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface MarketplacePageProps {
  userLevel: "micro" | "small" | "medium";
}

// More robust mock business data
const mockBusinesses = [
  {
    id: "b1",
    name: "Alpha Micro Solutions",
    type: "micro",
    category: "IT",
    email: "contact@alphamicro.com",
    phone: "+60 12-345 6789",
    address: "12 Jalan Teknologi, Cyberjaya, Selangor",
    website: "https://alphamicro.com",
    yearFounded: 2018,
    logo: "A",
    description: "Affordable IT solutions for micro businesses.",
  },
  {
    id: "b2",
    name: "Beta Small Retailers",
    type: "small",
    category: "Retail",
    email: "info@betasmall.com",
    phone: "+60 13-222 3344",
    address: "88 Jalan Pasar, Kuala Lumpur",
    website: "https://betasmall.com",
    yearFounded: 2015,
    logo: "B",
    description: "Retail products for small enterprises.",
  },
  {
    id: "b3",
    name: "Gamma Medium Manufacturing",
    type: "medium",
    category: "Manufacturing",
    email: "hello@gammamedium.com",
    phone: "+60 16-888 9999",
    address: "Lot 5, Kawasan Perindustrian, Penang",
    website: "https://gammamedium.com",
    yearFounded: 2010,
    logo: "G",
    description: "Manufacturing services for B2B clients.",
  },
  {
    id: "b4",
    name: "Delta Micro Marketing",
    type: "micro",
    category: "Marketing",
    email: "delta@micromarketing.com",
    phone: "+60 11-123 4567",
    address: "23 Jalan Pemasaran, Johor Bahru",
    website: "https://micromarketing.com",
    yearFounded: 2021,
    logo: "D",
    description: "Digital marketing for micro businesses.",
  },
  {
    id: "b5",
    name: "Epsilon Small Logistics",
    type: "small",
    category: "Logistics",
    email: "contact@epsilonsmall.com",
    phone: "+60 17-555 6666",
    address: "19 Jalan Logistik, Shah Alam",
    website: "https://epsilonsmall.com",
    yearFounded: 2017,
    logo: "E",
    description: "Logistics and delivery for small businesses.",
  },
  {
    id: "b6",
    name: "Zeta Medium Consulting",
    type: "medium",
    category: "Consulting",
    email: "zeta@mediumconsult.com",
    phone: "+60 18-777 8888",
    address: "Suite 10, Menara Konsultan, KL",
    website: "https://mediumconsult.com",
    yearFounded: 2012,
    logo: "Z",
    description: "Business consulting for medium enterprises.",
  },
  {
    id: "b7",
    name: "Orion Micro Foods",
    type: "micro",
    category: "Food & Beverage",
    email: "orion@microfoods.com",
    phone: "+60 19-101 2020",
    address: "7 Jalan Makanan, Ipoh",
    website: "https://microfoods.com",
    yearFounded: 2020,
    logo: "O",
    description: "Healthy snacks for micro businesses and events.",
  },
  {
    id: "b8",
    name: "Sigma Small Design Studio",
    type: "small",
    category: "Design",
    email: "sigma@smalldesign.com",
    phone: "+60 12-303 4040",
    address: "55 Jalan Seni, Melaka",
    website: "https://smalldesign.com",
    yearFounded: 2016,
    logo: "S",
    description: "Branding and design for small businesses.",
  },
  {
    id: "b9",
    name: "Lambda Medium Tech",
    type: "medium",
    category: "IT",
    email: "lambda@mediumtech.com",
    phone: "+60 14-505 6060",
    address: "101 Jalan Teknologi, Cyberjaya",
    website: "https://mediumtech.com",
    yearFounded: 2008,
    logo: "L",
    description: "Enterprise IT solutions for medium businesses.",
  },
  {
    id: "b10",
    name: "Phoenix Small Events",
    type: "small",
    category: "Events",
    email: "phoenix@smallevents.com",
    phone: "+60 15-707 8080",
    address: "88 Jalan Acara, Seremban",
    website: "https://smallevents.com",
    yearFounded: 2019,
    logo: "P",
    description: "Event management for small enterprises.",
  },
  {
    id: "b11",
    name: "Nova Medium Finance",
    type: "medium",
    category: "Finance",
    email: "nova@mediumfinance.com",
    phone: "+60 13-909 1010",
    address: "12 Jalan Kewangan, KL",
    website: "https://mediumfinance.com",
    yearFounded: 2011,
    logo: "N",
    description: "Financial services for medium businesses.",
  },
  {
    id: "b12",
    name: "Vega Micro Crafts",
    type: "micro",
    category: "Crafts",
    email: "vega@microcrafts.com",
    phone: "+60 10-111 2222",
    address: "3 Jalan Kraf, Kota Bharu",
    website: "https://microcrafts.com",
    yearFounded: 2022,
    logo: "V",
    description: "Handmade crafts for micro businesses and gifts.",
  },
];

const categories = [
  "All",
  ...Array.from(new Set(mockBusinesses.map((b) => b.category))),
];

export function MarketplacePage({ userLevel }: MarketplacePageProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Filter businesses by search and category
  const filtered = mockBusinesses.filter((b) => {
    const matchesCategory = category === "All" || b.category === category;
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group by type
  const grouped = filtered.reduce((acc, b) => {
    if (!acc[b.type]) acc[b.type] = [];
    acc[b.type].push(b);
    return acc;
  }, {} as Record<string, typeof mockBusinesses>);

  const typeIcon = (type: string) => {
    if (type === "micro") return <Users className="h-5 w-5 text-primary" />;
    if (type === "small") return <Briefcase className="h-5 w-5 text-secondary" />;
    return <Building2 className="h-5 w-5 text-accent" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">{t("Marketplace") || "Marketplace"}</h1>
        <p className="text-muted-foreground">
          {t("Find Businesses To Collaborate") || "Find businesses for B2B collaboration and networking."}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="flex-1 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("Search Businesses") || "Search businesses..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={cat === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>
      {Object.entries(grouped).map(([type, businesses]) => (
        <div key={type} className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {typeIcon(type)} {t(type) || type.charAt(0).toUpperCase() + type.slice(1)} {t("Businesses") || "Businesses"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => (
              <Card key={b.id} className="shadow-soft hover:shadow-medium transition-all group">
                <CardHeader className="pb-3 flex items-center gap-3">
                  {/* Logo */}
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    {b.logo}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {b.name}
                      <Badge variant="outline" className="mt-1">{b.category}</Badge>
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {typeIcon(b.type)}
                      <span className="text-xs text-muted-foreground capitalize">{t(b.type) || b.type}</span>
                      <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{b.yearFounded}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-2 min-h-[40px]">{b.description}</p>
                  <div className="flex flex-col gap-1 text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{b.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{b.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{b.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={b.website} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">{b.website.replace(/^https?:\/\//, "")}</a>
                    </div>
                  </div>
                  <Button asChild variant="gradient" size="sm" className="w-full mt-2">
                    <a href={`mailto:${b.email}`}>
                      {t("Contact") || "Contact"}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
      {filtered.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          {t("No Businesses Found") || "No businesses found."}
        </div>
      )}
    </div>
  );
}
