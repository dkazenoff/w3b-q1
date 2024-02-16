"use strict";
exports.__esModule = true;
var web3_js_1 = require("@solana/web3.js");
//Generate a new keypair
var kp = web3_js_1.Keypair.generate();
console.log("You've generated a new Solana wallet: ".concat(kp.publicKey.toBase58()));
console.log("The private key is: ".concat(kp.secretKey));
