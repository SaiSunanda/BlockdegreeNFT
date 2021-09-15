
const Web3 = require('web3');
require('dotenv').config({path:'/Users/apple/Desktop/universal/blockdegree-marketplace/.env'});

const contractabi= require('../contractabi/contractabi.json')
const finalcontract= require('../build/contracts/ECOINNFT.json')
const finalcontractabi=finalcontract.abi;

//paste your contract address here
const contractaddress='0xF704279195B08bc973C955Fc9B6F7514A26e9508'

const address ='0xd9494bac9b7daf8cf468c68efaf95f3965e90987'
const privatekey = "";    //give the private Key of this account
console.log(privatekey);

//add your address and private key to start making transactions
const address2 ='0x6e196df2129195a8743691c98aa4bd1e9b3e45f1';
const account2privatekey2 = "";     //give the priate key of this account
console.log(account2privatekey2)
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

}  


module.exports = token