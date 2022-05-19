const Polymarket = artifacts.require("Polymarket");

module.exports = async function (deployer) {
  await deployer.deploy(
    Polymarket,
    "0xe450830A28e479F8bd6f8C1706B1CAB160Cb313F"
  );
};
