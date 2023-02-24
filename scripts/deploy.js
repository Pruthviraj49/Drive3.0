
const hre = require("hardhat");

async function main() {


  const Drive = await hre.ethers.getContractFactory("Drive");
  const drive = await Drive.deploy();

  await drive.deployed();

  console.log(
    "Lock with 1 ETH and unlock timestamp "
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
