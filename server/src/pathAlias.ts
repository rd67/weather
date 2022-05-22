import ModuleAlias from "module-alias";

ModuleAlias.addAliases({
  "@apiV1": `${__dirname}/apiV1`,
  "@config": `${__dirname}/config`,
  "@constants": `${__dirname}/constants`,
  "@helpers": `${__dirname}/helpers`,
  "@interfaces": `${__dirname}/interfaces`,
  "@middlewares": `${__dirname}/middlewares`,
  "@models": `${__dirname}/models`,
  "@packages": `${__dirname}/packages`,
});
