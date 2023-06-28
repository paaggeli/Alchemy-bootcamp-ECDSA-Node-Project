const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");



// Create the Private Key
const privateKey = secp256k1.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));


// Create the Public Key
const publicKey = secp256k1.getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));


// Create an eth address
console.log(publicKey); 
const ethereumAddress =  `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`;
console.log('the address is: ', ethereumAddress);


// Hashing the message
const message = 'transfer data';
const hashMessage = keccak256(utf8ToBytes(message));


// Sign the message
const signature = secp256k1.sign(hashMessage, privateKey);
console.log(signature);


// Recover the public key
const recoverPublicKey = signature.recoverPublicKey(hashMessage).toHex();
console.log("the recoverd public key:", recoverPublicKey);

// Verify the signature
const isSigned = secp256k1.verify(signature, hashMessage, publicKey);
console.log('isSigned');
console.log(isSigned);