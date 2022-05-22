import { cyan } from "chalk";

import models from "@models/index";

export const bootstrapApp = async () => {
  //  Cities
  const cityCount = await models.City.count();
  if (!cityCount) {
    // models.Setting.create({
    //   versioning: DefaultAppVersioning,
    //   serviceFeePercents: DefaultServiceFeePercents,
    //   defaultCancellationFee: DefaultCancellationFee,
    // });
  }

  console.log(`${cyan("🌿 App Bootstrapped")} successfully.`);
};
