import {browser, by, protractor, By, until, element} from 'protractor';
import { blockStack } from './utils/blockStack';

const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;

module.exports=function RecoverAccount(){
    this.setDefaultTimeout(60 * 1000);

 this.Given(/^load browser initial page$/,async()=>{
    browser.waitForAngularEnabled(false);
    await browser.get("https://browser.blockstack.org/");
    await browser.element(By.xpath('//*[contains(.,"Create your Blockstack ID")]'));
  })
  this.Then(/^load browser sign in page$/,async()=>{
    await browser.element(By.xpath('//a[contains(.,"Sign in with an existing ID")]')).click();;
  });
  this.Then(/^enter blockstack secret recovery key$/,async()=>{
      browser.sleep(10000);
    await browser.element(By.css('textarea[name="recoveryKey"]')).sendKeys('layer decrease junk moral access kid say model enter rigid spend simple');
    await browser.element(By.css('button[type="submit"]')).click();
  });
  this.Then(/^create blockstack password$/,async()=>{
    await browser.element(By.css('input[name="password"]')).sendKeys('7p7M4vu89xMn964AE6T7');
    await browser.element(By.css('input[name="passwordConfirm"]')).sendKeys('7p7M4vu89xMn964AE6T7');
    await browser.element(By.css('button[type="submit"]')).click();
  });

  this.Then(/^enter blockstack browser email$/,async()=>{
      try{
        await browser.element(By.css('input[name="email"]')).sendKeys('test_e2e_recovery@mail-apps.com');
        browser.sleep(5000);
        await browser.click(By.css('button[type="submit"]')).click();
      }catch(err){}
     
  });
  this.Then(/^wait for blockstack Restoring your Blockstack ID$/,async()=>{
    browser.sleep(10000);
    try {
      // first check if message is still showing (it may have been quick and already closed)
      await browser.wait(until.elementLocated(By.xpath('//*[contains(text(), "Restoring your Blockstack ID")]')), 2500);
    } catch (err) {
      console.warn(`Ignoring error checking for "Restoring your Blockstack ID" spinner: ${err}`);
    }
    // wait for next page to load
    browser.sleep(150000);
    await browser.element(By.xpath('//*[contains(.,"Go to Blockstack")]'));
  });

  this.Then(/^load blockstack main page as authenticated user$/,async()=>{
    await browser.executeScript(blockStack());
    await browser.element(By.xpath('//*[text()="Top Apps"]'));
  });
}