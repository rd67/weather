import ModuleAlias from "module-alias";

ModuleAlias.addAliases({
  "@apiV1": `${__dirname}/apiV1`,
  "@config": `${__dirname}/config`,
  "@constants": `${__dirname}/constants`,
  "@helpers": `${__dirname}/helpers`,
  "@interfaces": `${__dirname}/interfaces`,
  "@middlewares": `${__dirname}/middlewares`,
  "@packages": `${__dirname}/packages`,
});
