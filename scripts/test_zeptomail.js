const { SendMailClient } = require("zeptomail");

const url = "https://api.zeptomail.in/v1.1/email";
const token = "Zoho-enczapikey PHtE6r1bQ+293mEs8RRR5fDpRMGsMt9//uNjKVRP449HDqcCG01X+d16kzbi+kh5VaNCEqLJyY1rt+iftunUdGvtZ24YXmqyqK3sx/VYSPOZsbq6x00asFwTdULYVYDtcNFr1iTRvNmX";

let client = new SendMailClient({url, token});

async function test() {
  try {
    const res = await client.sendMail({
        "from": {
            "address": "hello@ajprworld.com",
            "name": "AJPR World"
        },
        "to": [
            {
                "email_address": {
                    "address": "hello@ajprworld.com",
                    "name": "AJPR World"
                }
            }
        ],
        "subject": "Test Email",
        "htmlbody": "<div><b> Test email sent successfully.</b></div>",
    });
    console.log("Success:", res);
  } catch(e) {
    console.error("Error:", JSON.stringify(e, null, 2));
  }
}

test();
