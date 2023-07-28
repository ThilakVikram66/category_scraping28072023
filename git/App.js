const fs = require('fs');
const category_asins = require('./child_functions/category_asins');
const content_getter = require('./child_functions/content_getter');
let url = "https://www.amazon.com/gp/bestsellers/home-garden/3732781/ref=pd_zg_hrsr_home-garden";
Main(url);
async function Main(url)
{
    let limit = 5;
    let asin_rank = await category_asins(url);
    let asins = Object.keys(asin_rank);
    await category_promiser(asins,limit);
}




function category_promiser(asins,limit)
{
    return new Promise(res=>
        {
            loop_limiter(asins,limit,res)
        })
}

async function loop_limiter(asins,limit,res)
{
    let Main_Json = [];
    let promise_container = [];
    let asins_len = asins.length;
    let value = asins_len/limit
    let trunc = Math.trunc(value);
    let loop = String(value).includes(".")?trunc+1:trunc;
    for(let m_loop = 0 ;m_loop<loop;m_loop++)
    {
        let s_loop = m_loop*limit;
        let s_limit = s_loop+limit;
        for(s_loop;s_loop<s_limit&&s_loop<asins_len;s_loop++)
        {
            console.log("Requested Asins: "+asins[s_loop]);
            promise_container.push(content_getter(asins[s_loop]).then(
                res=>
                {
                    res.forEach(value => {
                        Main_Json.push(value);
                    });
                    // Main_Json.push(res);
                }
            ));
        }
        // require('./Result_container/Result.json')
        await Promise.all(promise_container);
        console.clear();
        console.table([{"Asin_Index":s_loop,"Stored in container":Main_Json.length}])
        let result_string = JSON.stringify(Main_Json);
        
        fs.writeFile('./Result_container/Result.json',result_string,err=>
        {
            if(err)
            {
                console.log("err on fs")
            }
            else
            {
                console.log("Successfully Printed")
            }
        })
        // console.table(Main_Json);
    }
    return res(Main_Json);

}



