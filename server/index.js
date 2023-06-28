const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


app.use(cors());
app.use(express.json());

const balances = {
  "0x85410693b9d0fb0380990190e1955325fcc17755": 100,
  "0x2": 50,
  "0x3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, sign } = req.body;
  signature = JSON.parse(sign);
  signature.r = BigInt(signature.r);
  signature.s = BigInt(signature.s);

  signature = new secp256k1.Signature(signature.r, signature.s, signature.recovery);
  const hashMessage = keccak256(utf8ToBytes(amount.toString()));
  const recoverPublicKey = signature.recoverPublicKey(hashMessage);

  const isSigned = secp256k1.verify(signature, hashMessage, recoverPublicKey.toHex());

  if ( !isSigned ) res.status(400).send({message: "Not valid signature!"});

  const recoverEthereumAddress = `0x${toHex(keccak256(recoverPublicKey.toRawBytes().slice(1)).slice(-20))}`; 
  if ( recoverEthereumAddress !== sender ) res.status(400).send({message: "You don't own the sender's address"}); // TODO write better message

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
