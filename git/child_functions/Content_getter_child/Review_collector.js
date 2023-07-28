



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
    await page.goto(`https://www.amazon.com/product-reviews/${asin}?formatType=current_format`,{waitUntil:"domcontentloaded"});
    let content = await page.evaluate((obj)=>
    {
        if(document.querySelector('[data-hook=cr-filter-info-review-rating-count]').textContent)
        {
            // console.log("entered");
            let rating_review_content = document.querySelector('[data-hook=cr-filter-info-review-rating-count]').textContent.trim();
            let rating_content = /[0-9,]+ (total ratin[gs]+)/.exec(rating_review_content)[0];
            let review_content = /[0-9,]+ (with revie[ws]+)/.exec(rating_review_content)[0];
            obj["Actual Rating"] = /[0-9,]+/.exec(rating_content)[0].replace(/[,]/g,'');
            obj["Actual Reviews"] = /[0-9,]+/.exec(review_content)[0].replace(/[,]/g,'');
            // console.log("Success End");
            return obj;
        }
        else
        {
            throw new Error();
        }
    },obj);
    return res(content);
}
catch(err)
{
    if(err)
    {
        console.log("Review error");
        // console.log(err);
        main(page,asin,obj,res);
    }
}
}

module.exports = starter;