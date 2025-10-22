import arcjet,{tokenBucket,shield,detectBot} from 'arcjet';


import "dotenv/config";

const logger = {
  info: (...args) => console.log("[INFO]", ...args),
  warn: (...args) => console.warn("[WARN]", ...args),
  error: (...args) => console.error("[ERROR]", ...args),
  debug: (...args) => console.debug("[DEBUG]", ...args),
};
const client = {
  id: "product-store-backend", // just a unique identifier
  version: "1.0.0",
};
// init arcjet
export const aj=arcjet({client,
    key:process.env.ARCJET_KEY,
      log: logger, // REQUIRED!
    characteristics:["ip.src"],
    rules:[
        // shield protects your server from DDoS attacks,eg: sql injection ,cross site scripting ,xss;
        shield({mode:"LIVE"}),
        detectBot({mode:"LIVE",
            // block all bots except google bot(search engine)
            allow:["CATEGORY:SEARCH_ENGINE"
                //  see the full list at https://arcjet.com/doc/bot-list
            ]
        }),
        // rate limit
        tokenBucket({mode:"LIVE",
            // each ip can make 10 requests per 10 seconds
            // if exceed the limit,block the ip for 5 minutes
            // blockDuration:300,
            refillRate:5,
            interval:10,
            capacity:10,
})
    ]

})