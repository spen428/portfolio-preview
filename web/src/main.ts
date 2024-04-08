import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import { createRouter, createWebHistory } from "vue-router";
import CvPage from "@/pages/cv/CvPage.vue";
import BusinessCardPage from "@/pages/business-card/BusinessCardPage.vue";
import BreakpointTestPage from "@/pages/test/breakpoints/BreakpointTestPage.vue";
import MyRouterView from "@/pages/MyRouterView.vue";
import ProjectsIndexPage from "@/pages/projects/ProjectsIndexPage.vue";
import HomePage from "@/pages/home/HomePage.vue";
import ConfigurationService from "@/services/configuration.service";
import { createI18n } from "vue-i18n";
import { messages } from "@/services/locale.service";
import ProjectPage from "@/pages/projects/ProjectPage.vue";
import CvJapaneseLayout from "@/pages/cv/CvJapaneseLayout.vue";
import CvRegularLayout from "@/pages/cv/CvRegularLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (_to, _from, savedPosition) => {
    return savedPosition ?? { top: 0 };
  },
  routes: [
    { path: "/", redirect: "/portfolio" },
    {
      path: "/portfolio",
      component: MyRouterView,
      children: [
        { path: "", component: HomePage },
        {
          path: "projects",
          component: ProjectsIndexPage,
          name: "Project Showcase",
        },
        {
          path: "projects/:projectId",
          component: ProjectPage,
          props: true,
          meta: { isPrintable: false },
        },
        {
          path: "cv",
          component: CvPage,
          meta: {
            isPrintable: true,
            isStyleable: false,
          },
          children: [
            {
              path: "",
              component: CvRegularLayout,
              name: "Curriculum Vitae",
            },
            {
              path: "jp",
              component: CvJapaneseLayout,
              name: "履歴書",
            },
          ],
        },
        {
          path: "business-card",
          component: BusinessCardPage,
          name: "Business Card",
          meta: { isPrintable: true },
        },
      ],
    },
    {
      path: "/test",
      children: [
        {
          path: "breakpoints",
          component: BreakpointTestPage,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.query.disableAnimation) {
    ConfigurationService.setAnimationEnabled(false);
  }
  next();
});

const app = createApp(App);
app.use(router);
app.use(
  createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en-GB",
    fallbackLocale: "en-GB",
    availableLocales: ["en-GB", "ja-JP"],
    messages,
  })
);

app.mount("#root");
