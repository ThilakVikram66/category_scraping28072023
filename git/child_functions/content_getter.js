const {chromium} = require('playwright');


const variation_collector = require('./Content_getter_child/Variation_collector');
const spec_collector = require('./Content_getter_child/Spec_collector');
const review_getter = require('./Content_getter_child/Review_collector');

// let asin = "B07V37GVY9";
// starter(asin);
function starter(asin)
{
    return new Promise(res=>
        {
            main(asin,res);
        })
}
async function main(asin,res)
{
    let Final_obj_arr = [];
    let browser = await chromium.launch();
    let context = await browser.newContext({userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"});
    let page = await context.newPage();
    let V_asins =await variation_collector(page,asin);
    let obj;
    for(let i=0;i<V_asins.length;i++)
    {

        obj = await spec_collector(page,V_asins[i],{"Parent Asin":asin});
        obj = await review_getter(page,V_asins[i],obj);
        Final_obj_arr.push(obj);
    }

    browser.close();
    return res(Final_obj_arr);
}

// promise_limiter();
module.exports = starter;