// entry-server.js
import { createSSRApp } from "vue";
// 服务器端路由与客户端使用不同的历史记录
import { createMemoryHistory } from "vue-router";
import createRouter from "./router";
import App from "./App.vue";

export default function () {
  const app = createSSRApp(App);
  const router = createRouter(createMemoryHistory());

  app.use(router);

  return {
    app,
    router,
  };
}
