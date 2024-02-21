import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address (the "public key" printed from spl_init (?))
const mint = new PublicKey("MCFGShm7YTdn27o4Nj1svLDUiWxBn8ZzxewfsC1jVGw");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(
            connection, keypair, mint, keypair.publicKey)
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
// Mint a specific number of tokens to the ATA (e.g., 1 token, adjusted for decimals)
        // Make sure the minter (keypair) has minting authority for this operation
        const tokenDecimals = 1_000_000n; // Token's decimal - adjust if necessary
        const amountToMint = 1n * tokenDecimals; // E.g., 1 token * 10^6 decimals
        const mintTx = await mintTo(
            connection,
            keypair,
            mint,
            ata.address,
            keypair, // The mint authority
            amountToMint // The mint amount, adjust as necessary based on the token's decimal
        );
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
