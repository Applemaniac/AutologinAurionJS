const request = require('request');
const puppeteer = require('puppeteer');
const config = require('./config');

let HTMLtoURL = str => {
    if (str.length > 200){
        str = "";
    }else{
        let regex = /^<html><body><script language="JavaScript">window\.location="(?:[^"]|"")*";<\/script><\/body><\/html>$/i;
        str = str.replace('<html><body><script language="JavaScript">window.location="https://wifi-students.junia.com:1003/fgtauth?', "");
        str = str.replace('";</script></body></html>', "");
        console.log("Got token!");
    }
    return str;
}

async function startBrowser() {
    const options = {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu'
        ],
        headless: false
    }

    return puppeteer.launch(options)
}

const connection = async (page, key) => {
    await page.goto('https://wifi-students.junia.com:1003/fgtauth?' + key);
    await page.focus('#ft_un');
    await page.keyboard.type(config.user);
    console.log("username typed");
    await page.focus('#ft_pd');
    await page.keyboard.type(config.password);
    console.log("password typed");
    page.click("body > div.oc:nth-child(1) > div.ic:nth-child(1) > form:nth-child(1) > div.fer:nth-child(7) > input");
}

let promise = new Promise((resolve, reject) => {
    request('http://junia.com', function (error, response, body) {
        if (error) reject(error);
        console.log('statusCode:', response && response.statusCode);
        resolve(HTMLtoURL(body));
    });
});



(async () => {
    let key = await promise;
    // On se connecte à Aurion
    if (key !== "") {
        console.log('https://wifi-students.junia.com:1003/fgtauth?' + key);
        const browser = await startBrowser();
        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'fr'
        });
        // On met le timeout à 0
        await page.setDefaultNavigationTimeout(0);
        await connection(page, key);
    }else{
        console.error("Already connected or cannot reach wifi page!");
    }

})();


