const PolyToken = artifacts.require("PolyToken");
const Polymarket = artifacts.require("Polymarket");

module.exports = async function (deployer) {
  await deployer.deploy(PolyToken);
  const polyToken = await PolyToken.deployed();

  await deployer.deploy(Polymarket, polyToken.address);
};
