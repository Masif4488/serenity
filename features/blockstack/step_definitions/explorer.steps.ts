import {browser, by, protractor, By, until, element} from 'protractor';
import { async } from 'q';
const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
module.exports = function myStepDefinitions () {
  this.setDefaultTimeout(60 * 1000);
  let randomUsername;
    this.Given(/^load initial page$/,async ()=> {  
      browser.waitForAngularEnabled(false);  
      await browser.get("https://browser.blockstack.org/");
      await browser.wait(protractor.ExpectedConditions.presenceOf(element(By.xpath('//*[contains(.,"Create your Blockstack ID")]'))), 10000);
   });
    // this.Then(/^set test-registrar.blockstack.org as API endpoint for ID registration $/,async ()=>{
    //   try{
    //       browser.sleep(2500);
    //       await browser.executeScript(`window.SUBDOMAIN_SUFFIX_OVERRIDE = "test-personal.id";`);
    //   }catch(err){}
    // });

    this.Given(/^load create new ID page$/,async()=>{
      await browser.element(By.xpath('//div[text()="Create new ID"]')).click();
    });
    this.Given(/^enter unique username$/,async()=>{
// tslint:disable-next-line: no-bitwise
      randomUsername = `test_e2e_${Date.now() / 100000 | 0}_${Math.floor(Math.random() * (99999999999 - 1000000000)) + 1000000000}`;
       await browser.element(By.css('input[type="text"][name="username"]')).sendKeys(randomUsername);
       await browser.element(By.xpath('//button[contains(., "Check Availability")]')).click();
       browser.sleep(5000);
       await browser.element(By.xpath('//button[contains(., "Continue")]')).click();
    });
    this.Given(/^enter password$/,async()=>{
      const randomPassword = Math.random().toString(36).substr(2);
      await browser.element(By.css('input[type="password"][name="password"]')).sendKeys(randomPassword);
      await browser.element(By.css('input[type="password"][name="passwordConfirm"]')).sendKeys(randomPassword);
       await browser.element(By.xpath('//button[contains(., "Register ID")]')).click();
    })

    this.Given(/^wait for creating Blockstack ID spinner$/,async()=>{
      await browser.wait(until.elementLocated(By.xpath('//*[contains(text(), "Creating your Blockstack ID")]')), 2500);
      browser.sleep(20000);
      await browser.findElement(By.xpath('//*[contains(text(), "What is your email")]'));
      browser.sleep(5000);
    });

    this.Given(/^enter email$/,async()=>{ 
      await browser.element(By.css('input[type="email"][name="email"]')).sendKeys(`${randomUsername}@none.test`);  
      await browser.element(By.xpath('//button[contains(., "Next")]')).click();
      browser.sleep(1000);
    });
    this.Given(/^expect recovery email to fail$/,async()=>{
      await browser.element(By.xpath('//*[contains(., "email failed")]'));
    });
    this.Given(/^check username registration failed$/,async()=>{
      try{
      await browser.wait(until.elementLocated(By.xpath('//*[text()="Username Registration Failed"]')), 2500);
      const el = await browser.element(By.xpath('//*[text()="Username Registration Failed"]/parent::div/following-sibling::div/descendant::span'));
      el.click();
      await browser.wait(until.elementIsNotVisible(el));
      }
      catch(err){}
    });

    this.Given(/^acknowledge saving recovery key phrase$/,async()=>{
      try{
        browser.sleep(5000);
        await browser.element(By.xpath('//div[text()="Secret Recovery Key"]/parent::div')).click();
        await browser.element(By.xpath('//div[contains(.,"Save your Secret Recovery")]'));
        await browser.element(By.xpath('//div[text()="Secret Recovery Key"]/parent::div')).click();
      }catch(err){}  
    });
    this.Then(/^wait for unlocking recovery key$/,async()=>{
      try{
      await browser.wait(until.elementLocated(By.xpath('//*[contains(text(), "Unlocking Recovery Key")]')), 2500);
      browser.sleep(5000);
      await browser.element(By.xpath('//*[text()="Your Secret Recovery Key"]/following-sibling::*'));
      }catch(err){}
    });
    let keyWords;

    this.Given(/^get secret recovery key phrase$/,async()=>{
      try{
        const  keyEl = await browser.element(By.xpath('//*[text()="Your Secret Recovery Key"]/following-sibling::*')).getText();
        keyWords = keyEl.trim().split(' ');
        expect(keyWords).lengthOf(12, 'Recovery key phrase should be 12 words');
        await browser.element(By.xpath('//div[text()="Continue"]/parent::div')).click();
      }catch(err){}
    });
    this.Given(/^perform recovery key phrase verification instructions$/,async()=>{
      browser.sleep(10000);
      const selectWordsEl = await browser.element(By.xpath('//*[contains(text(), "Select words #")]'));
      await browser.sleep(2500);
      const  selectWords = await selectWordsEl.getText();
      // Parse the phrase word numbers to validate
// tslint:disable-next-line: radix
      const  selectWordes = selectWords.match(/#([0-9]+)/g).map(s => keyWords[parseInt(s.slice(1)) - 1]);
      await browser.sleep(2500);
      for (const selectWord of selectWordes) {
        await browser.element(By.xpath(`//div[span[text()="${selectWord}"]]`)).click();
      }

    });
    this.Then(/^load main page as authenticated user$/,async()=>{
      browser.sleep(50000);
      await browser.element(By.xpath('//div[text()="Go to Blockstack"]')).click();
      await browser.element(By.xpath('//*[text()="Top Apps"]'));
      browser.sleep(10000);
    });
    
}

