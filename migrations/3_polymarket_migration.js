const Polymarket = artifacts.require("Polymarket");

module.exports = async function (deployer) {
  await deployer.deploy(
    Polymarket,
    "0x0c8eBa727441C477f2bbFAB01cB7dC7d2c29f3F9"
  );
};
