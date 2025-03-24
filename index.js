import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

const API_URL = "https://api.coinranking.com/v2/";
const api_key= "coinrankinge4c51e1d5e09ecacdacc603a9aef91662752243e2ee6949e";
const config = {
  headers: {"x-access-token": api_key},
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  // console.log("trying.... ");
  try {
    const response = await axios.get(API_URL + "coins?limit=20", config);
    const result = response.data.data;
    // console.log("loading... ");
      try{
        const trendingResponse = await axios.get(API_URL + "coins?limit=3&orderBy=24hVolume&orderDirection=desc&tiers[]=1", config);
        const trendingResult = trendingResponse.data.data;
        try{
          const topGainersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change", config);
          const topGainersResult = topGainersResponse.data.data;
            try{
              const topLosersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change&orderDirection=asc", config);
              const topLosersResult = topLosersResponse.data.data;

              // console.log(result);
              console.log("Lumon has been activated... ");
              res.render("index.ejs", {
                crypto: result.coins,
                // coinUrl: result.coins.coinrankingUrl,
                trending: trendingResult.coins,
                topGainer: topGainersResult.coins,
                topLoser: topLosersResult.coins,
                sortColumn: 'null',
                sortDirection: 'null'
              });
             }catch(error){
                res.render("index.ejs", {error: error.message});
            }
          }catch(error){
            res.render("index.ejs", {error: error.message});
        }
      }catch(error){
        res.render("index.ejs", {error: error.message});
      } 
    }catch(error){
      res.render("index.ejs", {error: error.message});
  }
});


app.get('/page-:number', async(req, res) => {
  try{
    const pageNumber= parseInt(req.params.number, 10);
    
    if(isNaN(pageNumber)){
      throw new Error("Page does not exist!");
    }else{
      const offsetCalcIncrease = pageNumber * 20;

      try {
      const response = await axios.get(API_URL + `coins?limit=20&offset=${offsetCalcIncrease}`, config);
      const result = response.data.data;
      console.log("loading... ");
        try{
          const trendingResponse = await axios.get(API_URL + "coins?limit=3&orderBy=24hVolume&orderDirection=desc&tiers[]=1", config);
          const trendingResult = trendingResponse.data.data;
          try{
            const topGainersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change", config);
            const topGainersResult = topGainersResponse.data.data;
              try{
                const topLosersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change&orderDirection=asc", config);
                const topLosersResult = topLosersResponse.data.data;
  
                res.render("index.ejs", {
                  crypto: result.coins,
                  trending: trendingResult.coins,
                  topGainer: topGainersResult.coins,
                  topLoser: topLosersResult.coins,
                  sortColumn: 'null',
                  sortDirection: 'null'
                });
               }catch(error){
                  res.render("index.ejs", {error: error.message});
              }
            }catch(error){
              res.render("index.ejs", {error: error.message});
          }
        }catch(error){
          res.render("index.ejs", {error: error.message});
        } 
        }catch(error){
        res.render("index.ejs", {error: error.message});
      }

  }
    
  }catch(error){
    res.render("index.ejs", {error: error.message});
  }
  
});


app.post("/sort-rank-asc", async(req, res) => {
  try{
    const trendingResponse = await axios.get(API_URL + "coins?limit=3&orderBy=24hVolume&orderDirection=desc&tiers[]=1", config);
    const trendingResult = trendingResponse.data.data;
    try{
      const topGainersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change", config);
      const topGainersResult = topGainersResponse.data.data;
        try{
          const topLosersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change&orderDirection=asc", config);
          const topLosersResult = topLosersResponse.data.data;
          try{
            const response = await axios.get(API_URL + "coins?limit=20&orderDirection=desc", config);
            const result = response.data.data;

            console.log("sorting asc... ");
            // console.log("sorted... ", result);
  
            res.render("index.ejs", {
              crypto: result.coins,
              trending: trendingResult.coins,
              topGainer: topGainersResult.coins,
              topLoser: topLosersResult.coins,
              sortColumn: 'rank',
              sortDirection: 'asc'
            });
          }catch(error){
            res.render("index.ejs", {error: error.message});
          }
         }catch(error){
            res.render("index.ejs", {error: error.message});
        }
      }catch(error){
        res.render("index.ejs", {error: error.message});
    }
  }catch(error){
    res.render("index.ejs", {error: error.message});
  } 
});

app.post("/sort-rank-desc", async(req, res) => {
  try{
    const trendingResponse = await axios.get(API_URL + "coins?limit=3&orderBy=24hVolume&orderDirection=desc&tiers[]=1", config);
    const trendingResult = trendingResponse.data.data;
    try{
      const topGainersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change", config);
      const topGainersResult = topGainersResponse.data.data;
        try{
          const topLosersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change&orderDirection=asc", config);
          const topLosersResult = topLosersResponse.data.data;
          try{
            const response = await axios.get(API_URL + "coins?limit=20&orderDirection=asc", config);
            const result = response.data.data;
            console.log("sorting desc... ");
        
            console.log("sorted... ", result);
        
            res.render("index.ejs", {
              crypto: result.coins,
              trending: trendingResult.coins,
              topGainer: topGainersResult.coins,
              topLoser: topLosersResult.coins,
              sortColumn: 'rank',
              sortDirection: 'desc'
            });
          }catch(error){
            res.render("index.ejs", {error: error.message});
          }
         }catch(error){
            res.render("index.ejs", {error: error.message});
        }
      }catch(error){
        res.render("index.ejs", {error: error.message});
    }
  }catch(error){
    res.render("index.ejs", {error: error.message});
  } 
});

app.post("/sort-price-asc", async(req, res) => {
  try{
    const trendingResponse = await axios.get(API_URL + "coins?limit=3&orderBy=24hVolume&orderDirection=desc&tiers[]=1", config);
    const trendingResult = trendingResponse.data.data;
    try{
      const topGainersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change", config);
      const topGainersResult = topGainersResponse.data.data;
        try{
          const topLosersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change&orderDirection=asc", config);
          const topLosersResult = topLosersResponse.data.data;
          try{
            const response = await axios.get(API_URL + "coins?limit=20&orderBy=price&orderDirection=desc", config);
            const result = response.data.data;
            console.log("sorting desc... ");
        
            console.log("sorted... ", result);
        
            res.render("index.ejs", {
              crypto: result.coins,
              trending: trendingResult.coins,
              topGainer: topGainersResult.coins,
              topLoser: topLosersResult.coins,
              sortColumn: 'price',
              sortDirection: 'asc'
            });
          }catch(error){
            res.render("index.ejs", {error: error.message});
          }
         }catch(error){
            res.render("index.ejs", {error: error.message});
        }
      }catch(error){
        res.render("index.ejs", {error: error.message});
    }
  }catch(error){
    res.render("index.ejs", {error: error.message});
  } 
});


app.post("/sort-price-desc", async(req, res) => {
  try{
    const trendingResponse = await axios.get(API_URL + "coins?limit=3&orderBy=24hVolume&orderDirection=desc&tiers[]=1", config);
    const trendingResult = trendingResponse.data.data;
    try{
      const topGainersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change", config);
      const topGainersResult = topGainersResponse.data.data;
        try{
          const topLosersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change&orderDirection=asc", config);
          const topLosersResult = topLosersResponse.data.data;
          try{
            const response = await axios.get(API_URL + "coins?limit=20&orderBy=price&orderDirection=asc", config);
            const result = response.data.data;
            console.log("sorting desc... ");
        
            console.log("sorted... ", result);
        
            res.render("index.ejs", {
              crypto: result.coins,
              trending: trendingResult.coins,
              topGainer: topGainersResult.coins,
              topLoser: topLosersResult.coins,
              sortColumn: 'price',
              sortDirection: 'desc'
            });
          }catch(error){
            res.render("index.ejs", {error: error.message});
          }
         }catch(error){
            res.render("index.ejs", {error: error.message});
        }
      }catch(error){
        res.render("index.ejs", {error: error.message});
    }
  }catch(error){
    res.render("index.ejs", {error: error.message});
  } 
});

app.post("/sort-mc-asc", async(req, res) => {
  try{
    const trendingResponse = await axios.get(API_URL + "coins?limit=3&orderBy=24hVolume&orderDirection=desc&tiers[]=1", config);
    const trendingResult = trendingResponse.data.data;
    try{
      const topGainersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change", config);
      const topGainersResult = topGainersResponse.data.data;
        try{
          const topLosersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change&orderDirection=asc", config);
          const topLosersResult = topLosersResponse.data.data;
          try{
            const response = await axios.get(API_URL + "coins?limit=20&orderBy=marketCap&orderDirection=desc", config);
            const result = response.data.data;
            console.log("sorting desc... ");
        
            console.log("sorted... ", result);
        
            res.render("index.ejs", {
              crypto: result.coins,
              trending: trendingResult.coins,
              topGainer: topGainersResult.coins,
              topLoser: topLosersResult.coins,
              sortColumn: 'mc',
              sortDirection: 'asc'
            });
          }catch(error){
            res.render("index.ejs", {error: error.message});
          }
         }catch(error){
            res.render("index.ejs", {error: error.message});
        }
      }catch(error){
        res.render("index.ejs", {error: error.message});
    }
  }catch(error){
    res.render("index.ejs", {error: error.message});
  } 
});

app.post("/sort-mc-desc", async(req, res) => {
  try{
    const trendingResponse = await axios.get(API_URL + "coins?limit=3&orderBy=24hVolume&orderDirection=desc&tiers[]=1", config);
    const trendingResult = trendingResponse.data.data;
    try{
      const topGainersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change", config);
      const topGainersResult = topGainersResponse.data.data;
        try{
          const topLosersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change&orderDirection=asc", config);
          const topLosersResult = topLosersResponse.data.data;
          try{
            const response = await axios.get(API_URL + "coins?limit=20&orderBy=marketCap&orderDirection=asc", config);
            const result = response.data.data;
            console.log("sorting desc... ");
        
            console.log("sorted... ", result);
        
            res.render("index.ejs", {
              crypto: result.coins,
              trending: trendingResult.coins,
              topGainer: topGainersResult.coins,
              topLoser: topLosersResult.coins,
              sortColumn: 'mc',
              sortDirection: 'desc'
            });
          }catch(error){
            res.render("index.ejs", {error: error.message});
          }
         }catch(error){
            res.render("index.ejs", {error: error.message});
        }
      }catch(error){
        res.render("index.ejs", {error: error.message});
    }
  }catch(error){
    res.render("index.ejs", {error: error.message});
  } 
});


app.post("/sort-24-asc", async(req, res) => {
  try{
    const trendingResponse = await axios.get(API_URL + "coins?limit=3&orderBy=24hVolume&orderDirection=desc&tiers[]=1", config);
    const trendingResult = trendingResponse.data.data;
    try{
      const topGainersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change", config);
      const topGainersResult = topGainersResponse.data.data;
        try{
          const topLosersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change&orderDirection=asc", config);
          const topLosersResult = topLosersResponse.data.data;
          try{
            const response = await axios.get(API_URL + "coins?limit=20&orderBy=change&orderDirection=desc", config);
            const result = response.data.data;
            console.log("sorting desc... ");
        
            console.log("sorted... ", result);
        
            res.render("index.ejs", {
              crypto: result.coins,
              trending: trendingResult.coins,
              topGainer: topGainersResult.coins,
              topLoser: topLosersResult.coins,
              sortColumn: '24',
              sortDirection: 'asc'
            });
          }catch(error){
            res.render("index.ejs", {error: error.message});
          }
         }catch(error){
            res.render("index.ejs", {error: error.message});
        }
      }catch(error){
        res.render("index.ejs", {error: error.message});
    }
  }catch(error){
    res.render("index.ejs", {error: error.message});
  } 
});


app.post("/sort-24-desc", async(req, res) => {
  try{
    const trendingResponse = await axios.get(API_URL + "coins?limit=3&orderBy=24hVolume&orderDirection=desc&tiers[]=1", config);
    const trendingResult = trendingResponse.data.data;
    try{
      const topGainersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change", config);
      const topGainersResult = topGainersResponse.data.data;
        try{
          const topLosersResponse = await axios.get(API_URL + "coins?limit=3&orderBy=change&orderDirection=asc", config);
          const topLosersResult = topLosersResponse.data.data;
          try{
            const response = await axios.get(API_URL + "coins?limit=20&orderBy=change&orderDirection=asc", config);
            const result = response.data.data;
            console.log("sorting desc... ");
        
            console.log("sorted... ", result);
        
            res.render("index.ejs", {
              crypto: result.coins,
              trending: trendingResult.coins,
              topGainer: topGainersResult.coins,
              topLoser: topLosersResult.coins,
              sortColumn: '24',
              sortDirection: 'desc'
            });
          }catch(error){
            res.render("index.ejs", {error: error.message});
          }
         }catch(error){
            res.render("index.ejs", {error: error.message});
        }
      }catch(error){
        res.render("index.ejs", {error: error.message});
    }
  }catch(error){
    res.render("index.ejs", {error: error.message});
  } 
});


app.get("/coin/:uuid", async (req, res) => {

  // const uuid= req.params.formattedLink;
  const uuid = req.params.uuid;
  // const name= req.params.name;
  // const symbol = req.params.symbol;
  try {
    const response = await axios.get(API_URL + `coin/${uuid}`, config);
    const result = response.data.data;
    console.log("loading... ");
    console.log("uuid object: ", uuid);
    
    try{
      const responseCoinHistory = await axios.get(API_URL + `coin/${uuid}/history`, config);
      const resultCoinHistory = responseCoinHistory.data.data.history;

      // console.log(resultCoinHistory.price);
      // console.log(resultCoinHistory.timestamp);

      console.log(result);
      res.render("coin.ejs", {
        coinDetails: result,
        prices: resultCoinHistory.map(item => item.price),
        timestamps: resultCoinHistory.map(item => {
          const date= new Date(item.timestamp * 1000);
          return date.toLocaleString('en-US');
        })
      });
    }catch(error){
      res.render("coin.ejs", {error: error.message});
  }
    // console.log(uuid);

   
    }catch(error){
      res.render("coin.ejs", {error: error.message});
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  