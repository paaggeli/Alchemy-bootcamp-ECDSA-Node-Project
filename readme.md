## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### My Solution

**Front-end**

My solution uses the `ethereum-cryptography` version 2 JS library.

When you run the application, you will see an Ethereum address to test, which has a balance of 100 credits, along with its private key.

When you make a transfer, a JavaScript prompt will appear, asking you to enter the private key.

We use the private key to sign the message. The private key is not saved or sent to the server for security reasons.

The signature, along with the rest of the data, is then sent to the server.

**Server-side**

On the server side, we recover the public key from the signature, verify the signature, and recreate the Ethereum address.

We compare the sender address with the recreated address, and if they match, we continue the process of transferring the credits, provided there is enough balance.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.