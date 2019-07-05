import {browser, by, protractor, By, until, element} from 'protractor';
import { blockStack } from './utils/blockStack';

const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;

module.exports = function MagicAccount () {
    this.setDefaultTimeout(60 * 1000);
 //account-recovery-via-magic-recovery-code
 this.Given(/^load browser page$/,async()=>{
    browser.waitForAngularEnabled(false);
    await browser.get("https://browser.blockstack.org/sign-up?redirect=%2F");
    await browser.element(By.xpath('//*[contains(.,"Create your Blockstack ID")]'));
  })
  this.Given(/^load sign in page$/,async()=>{
    browser.sleep(10000);
    await browser.element(By.xpath('//a[contains(.,"Sign in with an existing ID")]')).click();
  });
  this.Then(/^enter secret recovery key$/,async()=>{
    browser.sleep(20000);
    await browser.element(By.css('textarea[name="recoveryKey"]')).sendKeys('6SEAA7SaeQKTnrkcr2CBxRpD8ZeFj7oYLeysPG9Mv7Ibp7Jq5Wie1vLn3fX2ZSMEcs8aXDrSlx6Eso3TWiM+DJA3C9/EabxQqeXvyjcolok=',);
    await browser.element(By.css('button[type="submit"]')).click();
  });
  this.Then(/^enter blockstack password$/,async()=>{
    browser.sleep(2000);
    await browser.element(By.css('input[name="password"]')).sendKeys('7p7M4vu89xMn964AE6T7');
    await browser.element(By.css('button[type="submit"]')).click();
  })
  this.Then(/^wait for Loading spinner$/,async()=>{
    try {
      browser.sleep(10000);
      // first check if message is still showing (it may have been quick and already closed)
      await browser.wait(until.elementLocated(By.xpath('//*[contains(text(), "Loading")]')), 2500);
    } catch (err) {
      console.warn(`Ignoring error checking for "Loading" spinner: ${err}`);
    }
    // wait for next page to load
     await browser.element(By.xpath('//*[contains(text(), "What is your email")]'));
     browser.sleep(5000);
  })
  this.Given(/^enter blockstack email$/,async()=>{
    await browser.element(By.css('input[name="email"]')).sendKeys('test_e2e_recovery@mail-apps.com');
    await browser.element(By.css('button[type="submit"]')).click();
  });
  this.Then(/^wait for Restoring your Blockstack ID$/,async()=>{
    try {
      browser.sleep(10000);
      // first check if message is still showing (it may have been quick and already closed)
      await browser.wait(until.elementLocated(By.xpath('//*[contains(text(), "Restoring your Blockstack ID")]')), 2500);
    } catch (err) {
      console.warn(`Ignoring error checking for "Restoring your Blockstack ID" spinner: ${err}`);
    }
    // wait for next page to load
    await browser.element(By.xpath('//*[contains(.,"Go to Blockstack")]'));
    browser.sleep(5000);
  });
  this.Then(/^load main page as authenticated user$/,async()=>{
    browser.sleep(5000);
    await browser.executeScript(blockStack());
    browser.sleep(20000);
  await browser.element(By.xpath('//*[text()="Top Apps"]'));
  });
}
