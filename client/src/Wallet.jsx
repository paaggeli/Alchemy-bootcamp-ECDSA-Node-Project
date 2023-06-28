import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>

      <fieldset>
        <legend>For Testing </legend>
        <p>Private Key: <em>7c22e06dcfad99a04365908859cf1f89b3e23e5c45d604ce348e21e601094a63</em></p>
        <p>Ethereum Address(sender): <em>0x85410693b9d0fb0380990190e1955325fcc17755</em></p>
      </fieldset>
    </div>
  );
}

export default Wallet;
