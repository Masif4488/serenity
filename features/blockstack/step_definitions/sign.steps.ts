import {browser, by, protractor, By, until, element} from 'protractor';

import chai = require('chai');
import { async } from 'q';
const fs = require('fs');
const path = require('path');

chai.use(require('chai-as-promised'));
const expect = chai.expect;
const LOCAL_STORAGE_DATA="{\"account\":{\"accountCreated\":true,\"promptedForEmail\":false,\"email\":\"test_e2e_recovery@mail-apps.com\",\"encryptedBackupPhrase\":\"d91fa4ece7417c78f7ff22d4a93c519f0b6786e91348ec88b407dfb99a4463122d7049225bad239f39cb7720d21187a0631c6524b6077453bca6705d1f7a014e7b6c9f85474e5af104f3210681606f1d\",\"identityAccount\":{\"publicKeychain\":\"xpub6BD5AWkvt1ZPPvT7hbYw7mBU2fnsBZaw7q3ojAvnsGBPJLGLwuCJj7jLVi6XGhkz5cpLqRW9rnVBw1U41ckdZdS1bVYqTcnjKMUuRq45a88\",\"addresses\":[\"1NDsatzAEqrErxkB1osfJXouADgrHXuDs1\"],\"keypairs\":[{\"key\":\"2680e401fe670c15c43ad9686395177dea7a5f006848eb8eaf4729fc9ec289ee\",\"keyID\":\"03221818a0a3b3f9e3b0b369f085904c63c6caa506a3e1d28dcbc0d6a9aa7a82d2\",\"address\":\"1NDsatzAEqrErxkB1osfJXouADgrHXuDs1\",\"appsNodeKey\":\"xprvA2FnvytPSbUWyyrt3Bwxfaf6urjgAPHqaZZbNiXvE8HUZ4kRAvwNC1hkpjzsf1YnzR8e9SC8CXNBiLG4ZF1oPy3i5eVE5iEVU6YZVspN6tE\",\"salt\":\"19bc80bb27060f30fa4f05b07c92069c3633d6a70b089046f5605329fcdec798\"}],\"addressIndex\":1},\"bitcoinAccount\":{\"publicKeychain\":\"xpub6D1QcTvSqDXUsFF6n35HTohhgzov6LY9fRzNZF17MRTPzdvvN5NTtpUHPXujBEg1i1LFFcbdaFhiQiMgeWkjbCgZaAEB2cdcDxenpwnwpqd\",\"addresses\":[\"16ZsuXRZUipZHdrNPpkpDCJF8ZcwsssGbE\"],\"addressIndex\":0,\"balances\":{\"total\":0}},\"coreWallet\":{\"address\":null,\"balance\":0,\"withdrawal\":{\"txHex\":null,\"isBuilding\":false,\"isBroadcasting\":false,\"inProgress\":false,\"error\":null,\"recipientAddress\":null,\"success\":false}},\"viewedRecoveryCode\":false,\"recoveryCodeVerified\":false,\"connectedStorageAtLeastOnce\":true},\"auth\":{\"appManifest\":null,\"appManifestLoaded\":false,\"appManifestLoading\":false,\"appManifestLoadingError\":null,\"coreSessionTokens\":{},\"loggedIntoApp\":false},\"profiles\":{\"availability\":{\"names\":{},\"lastNameEntered\":null},\"identity\":{\"default\":0,\"localIdentities\":[{\"username\":\"test_e2e_recovery.id.blockstack\",\"usernameOwned\":true,\"usernamePending\":false,\"profile\":{\"@type\":\"Person\",\"@context\":\"http:\/\/schema.org\",\"api\":{\"gaiaHubConfig\":{\"url_prefix\":\"https:\/\/gaia.blockstack.org\/hub\/\"},\"gaiaHubUrl\":\"https:\/\/hub.blockstack.org\"},\"name\":\"Alice Devname\"},\"verifications\":[],\"trustLevel\":0,\"registered\":false,\"ownerAddress\":\"1NDsatzAEqrErxkB1osfJXouADgrHXuDs1\",\"zoneFile\":\"$ORIGIN test_e2e_recovery.id.blockstack\\n$TTL 3600\\n_http._tcp\\tIN\\tURI\\t10\\t1\\t\\\"https:\/\/gaia.blockstack.org\/hub\/1NDsatzAEqrErxkB1osfJXouADgrHXuDs1\/profile.json\\\"\\n\\n\"}],\"publicIdentities\":{},\"nameTransfers\":[],\"zoneFileUpdates\":[],\"createProfileError\":null,\"isProcessing\":false},\"pgp\":{\"publicKeys\":{}},\"registration\":{},\"search\":{\"query\":\"\",\"results\":[]}},\"sanity\":{\"coreApiRunning\":true,\"coreApiPasswordValid\":true},\"settings\":{\"api\":{\"apiCustomizationEnabled\":true,\"nameLookupUrl\":\"https:\/\/core.blockstack.org\/v1\/names\/{name}\",\"searchServiceUrl\":\"https:\/\/core.blockstack.org\/v1\/search?query={query}\",\"registerUrl\":\"https:\/\/core.blockstack.org\/v1\/names\",\"bitcoinAddressLookupUrl\":\"https:\/\/core.blockstack.org\/v1\/addresses\/bitcoin\/{address}\",\"zeroConfBalanceUrl\":\"https:\/\/core.blockstack.org\/v1\/wallet\/balance\/0\",\"insightUrl\":\"https:\/\/utxo.blockstack.org\/insight-api\/addr\/{address}\",\"btcBalanceUrl\":\"https:\/\/blockchain.info\/q\/addressbalance\/\",\"broadcastUrl\":\"https:\/\/utxo.blockstack.org\/insight-api\/tx\/send\",\"priceUrl\":\"https:\/\/core.blockstack.org\/v1\/prices\/names\/{name}\",\"networkFeeUrl\":\"https:\/\/bitcoinfees.21.co\/api\/v1\/fees\/recommended\",\"walletPaymentAddressUrl\":\"https:\/\/core.blockstack.org\/v1\/wallet\/payment_address\",\"pendingQueuesUrl\":\"https:\/\/core.blockstack.org\/v1\/blockchains\/bitcoin\/pending\",\"coreWalletWithdrawUrl\":\"https:\/\/core.blockstack.org\/v1\/wallet\/balance\",\"bitcoinAddressUrl\":\"https:\/\/explorer.blockstack.org\/address\/{identifier}\",\"ethereumAddressUrl\":\"https:\/\/tradeblock.com\/ethereum\/account\/{identifier}\",\"pgpKeyUrl\":\"https:\/\/pgp.mit.edu\/pks\/lookup?search={identifier}&op=vindex&fingerprint=on\",\"btcPriceUrl\":\"https:\/\/www.bitstamp.net\/api\/v2\/ticker\/btcusd\/?cors=1\",\"corePingUrl\":\"https:\/\/core.blockstack.org\/v1\/node\/ping\",\"zoneFileUrl\":\"https:\/\/core.blockstack.org\/v1\/names\/{name}\/zonefile\",\"nameTransferUrl\":\"https:\/\/core.blockstack.org\/v1\/names\/{name}\/owner\",\"subdomains\":{\"foo.id\":{\"registerUrl\":\"http:\/\/localhost:7103\/register\"},\"test-personal.id\":{\"registerUrl\":\"https:\/\/test-registrar.blockstack.org\/register\"},\"id.blockstack\":{\"registerUrl\":\"https:\/\/registrar.blockstack.org\/register\"}},\"browserServerUrl\":\"https:\/\/blockstack-browser-server.appartisan.com\",\"hostedDataLocation\":\"gaia-hub\",\"coreHost\":\"localhost\",\"corePort\":6270,\"coreAPIPassword\":\"PretendPasswordAPI\",\"logServerPort\":\"\",\"regTestMode\":false,\"storageConnected\":true,\"gaiaHubConfig\":{\"url_prefix\":\"https:\/\/gaia.blockstack.org\/hub\/\"},\"gaiaHubUrl\":\"https:\/\/hub.blockstack.org\",\"btcPrice\":\"1000.00\",\"distinctEventId\":\"063b145bc3f59dca962d585947f89d7a\",\"hasDisabledEventTracking\":false}},\"notifications\":[]}";
const helloServerPort = 5790;
const loopbackHost='localhost';
const  error: any=""
const  result:any="";

module.exports=function signIn(){

    this.setDefaultTimeout(60 * 1000);

    this.Given(/^load browser blockstack initial page$/,async()=>{
       browser.waitForAngularEnabled(false);
       await browser.get("https://browser.blockstack.org/");
       await browser.element(By.xpath('//*[contains(.,"Create your Blockstack ID")]'));
     })
     this.Then(/^load app list$/,async()=>{
         browser.sleep(10000);
        await browser.wait(until.elementLocated(By.id('apps-loaded')),10000);   
      });

     this.Then(/^fast account recovery via localStorage update$/,async()=>{
        await browser.executeScript(`
      window.localStorage.setItem("BLOCKSTACK_STATE_VERSION", "ignore");
      var authedReduxObj = JSON.parse(arguments[0]);
      var localReduxObj = JSON.parse(window.localStorage.getItem("redux"));
      var mergedReduxState = Object.assign({}, localReduxObj, authedReduxObj);
      window.localStorage.setItem("redux", JSON.stringify(mergedReduxState));
    `, LOCAL_STORAGE_DATA);
    await browser.sleep(100);
     });

     this.Then(/^load page$/,async()=>{
        await browser.navigate().to(`http://${loopbackHost}:${helloServerPort}`);
     });
     this.Given(/^set blockstack auth host$/,async()=>{
         browser.sleep(10000);
        await browser.executeScript(`
        window.BLOCKSTACK_HOST = 'https://browser.blockstack.org/auth';
      `);
     })

     this.Then(/^click login button$/,async()=>{
         browser.sleep(5000);
        const windowHandle = await browser.getWindowHandle();
        await browser.element(By.css('#signin-button')).click();
        await browser.sleep(1500);
        if (await browser.isElementPresent(By.css('#signin-button'))) {
          // This closes the "Open app?" dialog on Edge.
          console.log('Performing window open & switch workaround for closing protocol handler dialog');
          await browser.executeScript(`window.open("about:config")`);
          await browser.sleep(1000);
          await browser.switchTo().window(windowHandle);
          await browser.sleep(4000);
        }
     });
     this.Given(/^wait for auth page to load$/,async()=>{
        await browser.element(By.xpath('//div[contains(.,"Select an ID")]'));
     });
     this.Then(/^click allow auth button$/,async()=>{
        await browser.element(By.xpath('//span[text()="test_e2e_recovery"]')).click();
     });
     this.Given(/^ensure logged into hello-blockstack app$/,async()=>{
        await browser.element(By.xpath('//div[contains(.,"Hello, Alice")]'));
     })
     let userData;
    this.Then(/^validate blockstack user data$/,async()=>{
        userData = await browser.executeScript(`return blockstack.loadUserData()`);
      await  expect(userData.appPrivateKey).to.have.lengthOf(64);
      await expect(userData.decentralizedID).to.equal("did:btc-addr:1NDsatzAEqrErxkB1osfJXouADgrHXuDs1");
        
      await expect(userData.hubUrl).to.equal("https://hub.blockstack.org");
      await expect(userData.username).to.equal("test_e2e_recovery.id.blockstack");
      await expect(userData.profile.name).to.equal("Alice Devname");
      await expect(userData.profile.api.gaiaHubUrl).to.equal("https://hub.blockstack.org");
      await expect(userData.profile.api.gaiaHubConfig.url_prefix).to.equal("https://gaia.blockstack.org/hub/");
      
     });
     let cipher;
    this.Then(/^ validate blockstack encryptContent and blockstack decryptContent with account key $/,async()=>{
        try{
            const exampleData = "example data";
            cipher = await browser.executeScript(`return blockstack.encryptContent(arguments[0])`, exampleData);
    // tslint:disable-next-line: no-unused-expression
          await  expect(JSON.parse(cipher)["wasString"]).to.be.true;
            const decrypted = await browser.executeScript(`return blockstack.decryptContent(arguments[0])`, cipher);
           await expect(decrypted).to.equal(exampleData);
             }catch(err){console.log(err)} 
     });
    this.Then(/^validate blockstack encryptContent and blockstack decryptContent and with specified keys$/,async()=>{
        const publicKey = "0420a5c99852eae2e51d2638564cb4eb1066ac0126a534b25c31a9386b0d97c55abf77ba60dd029be0414d082a2acbc1477ebb6e028d37bbe16c354532e9de61dc";
        const privateKey = "80e626ad4bf501f58be7a1c4763a4c544bb83cc334ebee122321e8f30e41770f";
        const exampleData = "example data";
         cipher = await browser.executeScript(
          `return blockstack.encryptContent(arguments[0], arguments[1])`, 
          exampleData, { publicKey: publicKey });
// tslint:disable-next-line: no-unused-expression
      await  expect(JSON.parse(cipher)["wasString"]).to.be.true;
        const decrypted = await browser.executeScript(
          `return blockstack.decryptContent(arguments[0], arguments[1])`, 
          cipher, { privateKey: privateKey });
       await expect(decrypted).to.equal(exampleData);
     })

    this.Then(/^validate blockstack getAppBucketUrl$/,async()=>{
        const appBucketUrl= await browser.executeAsyncScript(`
        let arguments=[
            'userData.hubUrl',
            'userData.appPrivateKey'
        ]
        var callback = arguments[arguments.length - 1];
        var files = [];
        const [error, result];
        blockstack.listFiles(function(/hello.txt) {
          files.push(/hello.txt);
          return true;
        })
          .then(result => callback([null, {files: files, count: result}]))
          .catch(error => callback([error.toString(), null]));
      `);
      await expect(appBucketUrl).to.match(new RegExp("https://gaia.blockstack.org/hub/[a-zA-Z0-9]{34}/"));
          
     });

     let gaiaFileData;

     this.Then(/^validate blockstack putFile$/,async()=>{
     gaiaFileData = Math.random().toString(36).substr(2);
     const putFileResult = await browser.executeAsyncScript(`
     var callback = arguments[gaiaFileData.length - 1];
     var files = [];
     const [error, result];
     blockstack.listFiles(function(/hello.txt) {
       files.push(/hello.txt);
       return true;
     })
       .then(result => callback([null, {files: files, count: result}]))
       .catch(error => callback([error.toString(), null]));
   `, gaiaFileData);
   await expect(putFileResult).to.match(new RegExp("https://gaia.blockstack.org/hub/[a-zA-Z0-9]{34}//hello.txt"));
     });

     
     this.Then(/^validate blockstack getFile$/,async()=>{
// tslint:disable-next-line: no-use-before-declare
         getFileResult = await browser.executeAsyncScript(`
         var callback = arguments[ arguments[0].length - 1];
            var files = [];
            const [error, result];
            blockstack.listFiles(function(/hello.txt) {
            files.push(/hello.txt);
            return true;
            })
       .then(result => callback([null, {files: files, count: result}]))
       .catch(error => callback([error.toString(), null]));`);
// tslint:disable-next-line: no-use-before-declare
await  expect(getFileResult).to.equal(gaiaFileData);
     })
     this.Then(/^validate blockstack listFiles$/,async()=>{
        await browser.executeAsyncScript(`
        var callback = arguments[arguments.length - 1];
        var files = [];
        blockstack.listFiles(function(/hello.txt) {
          files.push(/hello.txt);
          return true;
        })
          .then(result => callback([null, {files: files, count: result}]))
          .catch(error => callback([error.toString(), null]));
      `);
      if (error) {
        throw new Error(error);
      }
      await  expect(result.count).to.be.greaterThan(0);
      await expect(result.files).to.include('/hello.txt');
     });

     this.Given(/^validate blockstack getUserAppFileUrl$/,async()=>{
     const userAppFileUrl = await browser.executeAsyncScript(`
     let arguments=[
        'public/1547742731687.json',
        'mattlittle_test1.id.blockstack',
        'https://app.graphitedocs.com'
     ]
     var callback = arguments[arguments.length - 1];
     var files = [];
     blockstack.listFiles(function(/hello.txt) {
       files.push(/hello.txt);
       return true;
     })
       .then(result => callback([null, {files: files, count: result}]))
       .catch(error => callback([error.toString(), null]));
   `);
    expect(userAppFileUrl).to.equal("https://gaia.blockstack.org/hub/18e3diVDsRfq2ckqS56wYw9mQhS4kxC15F/public/1547742731687.json");
     })
     let getFileResult;
     this.Then(/^validate blockstack.getFile with multi-player storage$/,async()=>{
         getFileResult = await browser.executeAsyncScript(`
            blockstack.getFile(public/1547742731687.json, {username: 'mattlittle_test1.id.blockstack',
            app: 'https://app.graphitedocs.com',
            decrypt: false})`, 
            );
          // Sanity check on content..
          const resultJson = JSON.parse(getFileResult);
          await  expect(resultJson["shared"]).to.equal("2/21/2019");
     })
     this.Then(/^validate blockstack.signUserOut$/,async()=>{
        const redirectUrl = `http://${loopbackHost}:${helloServerPort}/?some=param`;
        await browser.executeScript(`blockstack.signUserOut(arguments[0])`, redirectUrl);
        await browser.sleep(50);
        await browser.el(By.css('#signin-button'));
        const windowLocation = await browser.getCurrentUrl();
        expect(windowLocation).to.equal(redirectUrl);
     })
     let localStorageSession;
     this.Then(/^validate localStorage user data is been cleared$/,async()=>{
         localStorageSession = await browser.executeScript(`return window.localStorage.getItem('blockstack-session')`);
        if (localStorageSession) {
          const sessionJson = JSON.parse(localStorageSession);
// tslint:disable-next-line: no-shadowed-variable
          const userData = sessionJson['userData'];
// tslint:disable-next-line: no-unused-expression
        await  expect(userData).to.not.exist;
        }
        else {
// tslint:disable-next-line: no-unused-expression
        await expect(localStorageSession).to.not.exist;
        }
     })
}