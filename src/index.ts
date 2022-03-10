import { countReset } from "console";
import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json";


function getEth() {
    // @ts-ignore
    const eth = window.ethereum;
    if (!eth) {
        throw new Error('NO ETH')
    }
    return eth;
}

async function hasAccounts() {
    const eth = getEth();
    const accounts = await eth.request({
        method: "eth_accounts"
    }) as string;

    return accounts && accounts.length;
}

async function requestAccounts() {
    const eth = getEth();
    const accounts = await eth.request({
        method: "eth_requestAccounts"
    }) as string;

    return accounts && accounts.length;
}

async function run() {
    if (!await hasAccounts() && !await requestAccounts()) {
        throw new Error('NONONONON');
    }

    const count = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        Counter.abi,
        new ethers.providers.Web3Provider(getEth()).getSigner()
    )
    
    async function getCounter() {
        return count.getCounter();
    }

    
    const el = document.createElement('div');
    el.innerText = await getCounter();
    document.body.appendChild(el);

    async function updateCounter(val) {
        el.innerText = val || await getCounter();
    }

    const button = document.createElement('button');
    button.innerText = "increment";
    button.addEventListener('click', async (evt) => {
        evt.preventDefault();
        await count.count()
        
    })

    count.on(count.filters.CounterInc(), async (val) => {
        console.log('Received event', val)
        updateCounter(val)
    })

    document.body.appendChild(button);


}

run();