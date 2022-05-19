const PolyToken = artifacts.require("PolyToken");
// const Polymarket = artifacts.require("Polymarket");

module.exports = async function (deployer) {
  await deployer.deploy(PolyToken);
  const polyToken = await PolyToken.deployed();
  console.log(`polyToken.address`, polyToken.address)
  // await deployer.deploy(Polymarket, polyToken.address);
};
