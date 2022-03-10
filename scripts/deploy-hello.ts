import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat"

async function deploy() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy();;

    await hello.deployed();

    return hello;
}

// @ts-ignore
async function sayHello(hello) {
    const res = await hello.hello()
    console.log(`SAY ${res}}`);
}


deploy().then(sayHello);