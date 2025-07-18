import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function AIAdvisor() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content: t("aiAdvisorWelcome"),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessages = [...messages, { type: "user", content: message }];
    setMessages(newMessages);
    setMessage("");

    // 检查消息是否包含电子发票相关内容
    const lowerCaseMessage = message.toLowerCase();
    if (
      lowerCaseMessage.includes("e-invoice") ||
      lowerCaseMessage.includes("einvoice") ||
      lowerCaseMessage.includes("电子发票") ||
      lowerCaseMessage.includes("e-invoices")
    ) {
      // 获取用户级别，默认为micro
      const userLevel = user?.enterpriseLevel || user?.level || "micro";

      // 跳转到电子发票页面并添加create=true参数
      navigate(`/${userLevel}-enterprise/e-invoice?create=true`);

      // 添加AI回复，告知用户已跳转
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: t(
              "aiNavigatingToEInvoice",
              "Navigating to E-invoices tab, ready to create new invoice."
            ),
          },
        ]);
      }, 500);

      return;
    }

    // 模拟AI响应延迟
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: t("aiDemoResponse"),
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating AI Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-large gradient-primary animate-pulse z-50"
          size="icon"
        >
          <Bot className="h-6 w-6 text-white" />
          <span className="sr-only">{t("openAIAdvisor")}</span>
        </Button>
      )}

      {/* AI Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[350px] h-[450px] shadow-xl z-50 flex flex-col overflow-hidden border-primary/10">
          <CardHeader className="pb-3 bg-primary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                {t("aiAdvisor")}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">{t("closeAIAdvisor")}</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-3 rounded-lg text-sm max-w-[80%]",
                    msg.type === "ai"
                      ? "bg-muted/80 text-foreground self-start rounded-bl-none"
                      : "bg-primary text-primary-foreground self-end rounded-br-none ml-auto"
                  )}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("typeYourMessage")}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="h-10 w-10 rounded-full gradient-primary"
                >
                  <Send className="h-4 w-4 text-white" />
                  <span className="sr-only">{t("sendMessage")}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
