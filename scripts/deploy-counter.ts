import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat"

async function deploy() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();;

    await counter.deployed();

    return counter;
}

// @ts-ignore
// async function count(counter) {
//     const res = await counter.count()
//     console.log(res);
// }


async function getCounter(counter) {
    await counter.count();
    console.log("Counter ", await counter.getCounter())
}

deploy().then(getCounter);