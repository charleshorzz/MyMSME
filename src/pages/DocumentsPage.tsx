import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Upload, Download, Trash2 } from "lucide-react";

export default function DocumentsPage() {
  const { t } = useTranslation();

  const documents = [
    {
      id: 1,
      name: "发票-2024-001.pdf",
      type: "invoice",
      date: "2024-01-15",
      size: "256 KB",
    },
    {
      id: 2,
      name: "合同-客户A.docx",
      type: "contract",
      date: "2024-01-10",
      size: "1.2 MB",
    },
    {
      id: 3,
      name: "税务报表-2023.xlsx",
      type: "tax",
      date: "2023-12-28",
      size: "780 KB",
    },
    {
      id: 4,
      name: "员工手册.pdf",
      type: "handbook",
      date: "2023-11-15",
      size: "3.5 MB",
    },
    {
      id: 5,
      name: "业务计划-2024.pptx",
      type: "plan",
      date: "2024-01-05",
      size: "2.1 MB",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">{t("documents")}</h1>
        <p className="text-muted-foreground">{t("manageYourDocuments")}</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("searchDocuments")} className="pl-8" />
        </div>
        <Button className="flex items-center gap-1">
          <Upload className="h-4 w-4" />
          <span>{t("uploadDocument")}</span>
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t("allDocuments")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{t("name")}</th>
                  <th className="text-left py-3 px-4">{t("type")}</th>
                  <th className="text-left py-3 px-4">{t("date")}</th>
                  <th className="text-left py-3 px-4">{t("size")}</th>
                  <th className="text-right py-3 px-4">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {doc.name}
                      </div>
                    </td>
                    <td className="py-3 px-4">{t(doc.type)}</td>
                    <td className="py-3 px-4">{doc.date}</td>
                    <td className="py-3 px-4">{doc.size}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title={t("download")}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title={t("delete")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>{t("recentlyViewed")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {documents.slice(0, 3).map((doc) => (
              <Card
                key={doc.id}
                className="hover:shadow-medium transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
