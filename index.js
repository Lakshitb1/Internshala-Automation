const puppeteer = require("puppeteer");
const data = require("./data");
let tab;
let id = "lbhansali.077@gmail.com";
let pass = "2024bhansali";
let internshala_link = "https://internshala.com/";
async function main() {
  let browserOpen = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  let pages = await browserOpen.pages();
  tab = pages[0];
  await tab.goto(internshala_link);
  await tab.click("button.login-cta");
  await tab.type("#modal_email", id, { delay: 50 });
  await tab.type("#modal_password", pass, { delay: 100 });
  await tab.click("#modal_login_submit");
  await tab.waitForNavigation({ waitUntil: "networkidle2" });

  console.log("Logged in successfully");

  let profile_options = await tab.$$(".profile_options a");
  let app_urls = [];
  for(let i = 0; i < 8; i++){
    let url = await tab.evaluate(function(ele){
      return ele.getAttribute("href");
    }, profile_options[i]);
    app_urls.push(url);
  }
  await new Promise(function(resolve, reject){
    return setTimeout(resolve, 2000);
  })
  tab.goto(internshala_link + app_urls[3]);
  console.log("Inside edit resume");
  await tab.waitForSelector('#education', {visible: true});
  await tab.click('#education');
  await tab.waitForSelector('#graduation-tab', {visible: true});
  await tab.click('#graduation-tab');
  await tab.type('#college', data.College, {delay:25});
  // const originalLink = "https://internshala.com/student/dashboard";
  // const links = await tab.$$eval(
  //   ".internships-jobs-section .card a",
  //   (anchors) => {
  //     return anchors.map((anchor) => anchor.href);
  //   }
  // );
  
  // console.log(links); 
  // for (let i = 1; i < links.length; i++) {
  //   await tab.goto(links[i]);
  //   // Wait for the "Proceed to application" button to appear
  //   //
  //   //// Click the "Proceed to application" button
  //   //

  //   // Wait for the "Apply now" button to appear
  //   await tab.waitForSelector('#easy_apply_button', { visible: true });
  //   // Click the "Apply now" button
  //   await tab.click('#easy_apply_button');
  //   // Wait for the text editor to appear
  //   await tab.waitForSelector('.ql-editor.ql-blank', { visible: true });
  //   await tab.type('.ql-editor.ql-blank', data.cover);
  //   // Submit the application
  //   await tab.click('input[type="submit"]');
  //   // Optional: Add a delay between applications to prevent overwhelming the server
  //   //await tab.waitForTimeout(2000);
  // }
  
  // // Close the browser if you want
  // await browserOpen.close();
}

main().catch(console.error);
