
const Web3 = require('web3');


const contractabi= require('../contractabi/contractabi.json')
const finalcontract= require('../build/contracts/ECOINNFT.json')
const finalcontractabi=finalcontract.abi;

//paste your contract address here
const contractaddress='0xF704279195B08bc973C955Fc9B6F7514A26e9508'

const address ='0xd9494bac9b7daf8cf468c68efaf95f3965e90987'
const privatekey ="2039c4b651fab88ffff9248266806683fedc1ef8700f52d82215b6f315e266f3"

//add your address and private key to start making transactions
const address2 ='0x6e196df2129195a8743691c98aa4bd1e9b3e45f1';
const account2privatekey2 ='11a7178d8bb973fb993b0c4b6b3847f8de829598c7d509da3798e879247146f8';

//add your second address and private key to start making transactions
//testnet url for sample deployment and testing our functions
const xdcurl='https://rpc.apothem.network'


const token={  
  //will mint a new NFT
    mintnft: async (req, res) => {
        console.log("check1");
        const {name,description,_tokenURI}=req.body;
        console.log(name);
        console.log(description);
        console.log(_tokenURI); 
        try {
            const web3= new Web3(xdcurl);
            const networkId = await web3.eth.net.getId();
            const tetherToken = await new web3.eth.Contract(
              finalcontractabi,
              contractaddress
         );

             const mint =await tetherToken.methods.mint(name,description,_tokenURI)
             const gas= await mint.estimateGas({from:address})
             const data=mint.encodeABI();
             console.log("check4");
             const nonce= await web3.eth.getTransactionCount(address)
             const signedTx = await web3.eth.accounts.signTransaction({
                      to:tetherToken.options.address,
                      data,
                      gas,
                      nonce:nonce,
                      chainId:networkId
                },privatekey
                )
             console.log("check 5");
             const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
             console.log(receipt,"transaction receipt");
             if(receipt.status==true){
                   return res.json({msg: `transaction sucess! Hash :${receipt.transactionHash}`})
               }
          res.status(400).json({msg: `error:${receipt.transactionHash}`})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
    },

    //will transfer NFT tokens to another account
    transfernft: async (req, res) => {
        console.log("check2");
        const {to,tokenId}=req.body;
        console.log(to);
        try {
            const web3= new Web3(xdcurl);
            const networkId = await web3.eth.net.getId();
            const tetherToken = await new web3.eth.Contract(
            finalcontractabi,
            contractaddress
             );
            const tx = await tetherToken.methods.transfer(to,tokenId).call();
            return res.status(200).json({msg:tx})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    setTokenURI: async (req, res) => {
        console.log("check3");
        const {tokenId,_tokenURI}=req.body;
        console.log(to);
        try {
            const web3= new Web3(xdcurl);
            const networkId = await web3.eth.net.getId();
            const tetherToken = await new web3.eth.Contract(
            finalcontractabi,
            contractaddress
             );
            const tx = await tetherToken.methods.setTokenURI(tokenId,_tokenURI).call();
            return res.status(200).json({msg:tx})
   } catch (err) {
            return res.status(500).json({msg: err.message})
    }
},






}  


module.exports = token