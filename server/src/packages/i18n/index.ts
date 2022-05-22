import { Application } from "express";
import i18n from "i18n";

export default (app: Application) => {
  i18n.configure({
    locales: ["en", "hi"],
    defaultLocale: "en",
    cookie: "locale",
    directory: __dirname + "/locales",
    directoryPermissions: "755",
    autoReload: true,
    updateFiles: true,
    syncFiles: true,
    objectNotation: true,
    api: {
      __: "__", //now req.__ becomes req.__
      __n: "__n", //and req.__n can be called as req.__n
    },
  });

  app.use(i18n.init);
};

export const localize = i18n;
