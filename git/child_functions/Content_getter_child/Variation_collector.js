function starter(page,asin)
{
    return new Promise(res=>
        {
            main(page,asin,res);
        })
}

async function main(page,asin,res)
{
try
    {
    await page.goto(`https://www.amazon.com/dp/${asin}`,{waitUntil:"domcontentloaded"});
    let V_asin = await page.evaluate((asin)=>
    {
        if(isTwisterPage == 1)
        {
            let all_variation_obj = window.Twister.dimensionalSummaryModule.dimensionCombinationToASINMap;
            return Object.values(all_variation_obj);
        }
        if(isTwisterPage == 0)
        {
            return [asin];
        }
    },asin);
    return res(V_asin);
}
catch(err)
{
    if(err)
    {
        console.log("Spec error");
        main(page,asin,res);
    }
}
}

module.exports = starter;