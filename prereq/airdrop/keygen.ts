import { Keypair } from "@solana/web3.js";
// import bs58 from 'bs58'
// import prompt from 'prompt-sync'

//Generate a new keypair
let kp = Keypair.generate()
console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`)
console.log(`The private key is:\n ${kp.secretKey}`)
