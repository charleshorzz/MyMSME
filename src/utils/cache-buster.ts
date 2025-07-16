/**
 * 缓存清除工具
 * 这个脚本会在应用启动时清除浏览器缓存中的 CSS 和其他静态资源
 */

export const clearCache = () => {
  // 如果在生产环境中
  if (import.meta.env.PROD) {
    try {
      // 尝试清除缓存存储
      if ("caches" in window) {
        caches.keys().then((keyList) => {
          return Promise.all(
            keyList.map((key) => {
              return caches.delete(key);
            })
          );
        });
      }

      // 添加时间戳参数到 CSS 文件 URL
      const timestamp = new Date().getTime();
      const linkElements = document.querySelectorAll('link[rel="stylesheet"]');

      linkElements.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && !href.includes("?")) {
          link.setAttribute("href", `${href}?v=${timestamp}`);
        } else if (href && href.includes("?")) {
          link.setAttribute("href", `${href}&v=${timestamp}`);
        }
      });

      console.log("缓存已清除，CSS 已刷新");
    } catch (error) {
      console.error("清除缓存时出错:", error);
    }
  }
};

// 防止浏览器缓存 CSS 文件的 Meta 标签
export const addNoCacheMetaTags = () => {
  const meta1 = document.createElement("meta");
  meta1.setAttribute("http-equiv", "Cache-Control");
  meta1.setAttribute("content", "no-cache, no-store, must-revalidate");

  const meta2 = document.createElement("meta");
  meta2.setAttribute("http-equiv", "Pragma");
  meta2.setAttribute("content", "no-cache");

  const meta3 = document.createElement("meta");
  meta3.setAttribute("http-equiv", "Expires");
  meta3.setAttribute("content", "0");

  document.head.appendChild(meta1);
  document.head.appendChild(meta2);
  document.head.appendChild(meta3);
};
