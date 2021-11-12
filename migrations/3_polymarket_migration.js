const Polymarket = artifacts.require("Polymarket");

module.exports = async function (deployer) {
  await deployer.deploy(
    Polymarket,
    "0x9fa44b39848d6FA67147B34FAF6f7cD1E542B7Be"
  );
};
