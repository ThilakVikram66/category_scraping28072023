function starter(page,asin,obj)
{
    return new Promise(res=>
        {
            main(page,asin,obj,res);
        })
}

async function main(page,asin,obj,res)
{
try
    {
    await page.goto(`https://www.amazon.com/dp/${asin}`,{waitUntil:"domcontentloaded"});
    let return_obj = await page.evaluate((obj)=>
    {
        obj['Title'] = document.querySelector("#productTitle").textContent.trim();
        document.querySelectorAll('.prodDetSectionEntry').forEach(ele=>
        {
            let key = ele.textContent.trim();
            if(key!=="Customer Reviews"&&key!=="Best Sellers Rank")
            {
            let value = ele.parentElement.querySelector('.prodDetAttrValue').textContent.trim();
                obj[key] = value;
            }
        });
        return obj;
    },obj);
    return res(return_obj);
}
catch(err)
{
    if(err)
    {
        console.log("Spec error");
        main(page,asin,obj,res);
    }
}
}

module.exports = starter;