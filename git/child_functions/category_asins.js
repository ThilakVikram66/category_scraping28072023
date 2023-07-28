const {chromium} = require('playwright');

function starter(url)
{
    return new Promise(res=>
        {
            main(url,res);
        })
}
async function main(url,res)
{
    try
    {
        let returner = {};

        let browser = await chromium.launch();
        let context = await browser.newContext();
        let page = await context.newPage();
        await page.goto(url);
        let content = await page.evaluate(()=>
        {
            return document.querySelector('.p13n-desktop-grid').getAttribute('data-client-recs-list');
        })
        browser.close();
        // console.log(JSON.parse(content));
        let asins_obj = JSON.parse(content)
        asins_obj.forEach(obj => {
            // let temp = {};
            returner[obj.id] = obj["metadataMap"]["render.zg.rank"];
            // returner.push(temp);
        });
        // console.log(returner);
        return res(returner);
    }
    catch(err)
    {
        console.log(err);
        main(url,res);
    }
}

// promise_limiter();
module.exports = starter;