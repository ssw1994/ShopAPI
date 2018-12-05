const webpush = require('web-push');
var express = require('express');
var router = express.Router();

const vapidKeys = {
    "publicKey":"BF_K0ldEyLZqRbH6LXeWo7zbOhvy2Xnk4rNu0lkUxg-brIIA4PoNC7M2aC5wC-EU0BIhx7c0ZC2g4FoXiG6DyAA",
    "privateKey":"NlXg_73fHatWPxMYuEIe7GDXYlCe-xIM5J677tQqBkk"
};

webpush.setVapidDetails(
    'mailto:waghmare.sachin1994@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

router.post('/notification',function(req,res,next){
    const allSubscriptions = [{"endpoint":"https://fcm.googleapis.com/fcm/send/fynLAQxgH0U:APA91bGfnAHyH57jVEa0-b0LRDJCVZ7RApUoq2W9ZvJKOTBEyU3Khmcljm6FfPAME3bidzXJKz3V-8J0_WCCajACpAqfvxWT-_QQDqYa3mU70PwYixa9JQSluM693iX2YbjsJWsjPBOy","expirationTime":null,"keys":{"p256dh":"BA_U82JA0pyu37Eqj7Ob5L0FQmMcZ0k4PZB2_oMn1RUWtrmUulEAgwvbdFwcZWw7Rv4hHKgaR7K0UJFc_hyrm3o","auth":"AyV6WSUXpSKvIYC2DMYzOA"}},{"endpoint":"https://fcm.googleapis.com/fcm/send/fynLAQxgH0U:APA91bGfnAHyH57jVEa0-b0LRDJCVZ7RApUoq2W9ZvJKOTBEyU3Khmcljm6FfPAME3bidzXJKz3V-8J0_WCCajACpAqfvxWT-_QQDqYa3mU70PwYixa9JQSluM693iX2YbjsJWsjPBOy","expirationTime":null,"keys":{"p256dh":"BA_U82JA0pyu37Eqj7Ob5L0FQmMcZ0k4PZB2_oMn1RUWtrmUulEAgwvbdFwcZWw7Rv4hHKgaR7K0UJFc_hyrm3o","auth":"AyV6WSUXpSKvIYC2DMYzOA"}},
    {"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABcB7zoflMWtVdK_lnIXY7XIlwYHGgCpoSx-4rO_dYuu6PCZQ0tLqJlQiOemYgoqoe0CljfEP739H1JfDkXHod3KCgZsbSR6qOr7z6bcTVXdBP4jpTV_0HzavpuZd4pjWGHRY1VkjENO2kx8V_AqTYXgcmljxv1P057phWSLVjaavBGR_s","keys":{"auth":"AaDKfGoFSzlv2-VDHz3pDg","p256dh":"BC-9kaBKGXyrVdJyLSjh9rkotKw2wlgge3v4_kGPgLhkNTBrpTzNBr9o2-jtJ3mWzux4-8iMYw2aSr3nIWQavrE"}}];
    console.log(req);  
    console.log('Total subscriptions', allSubscriptions.length);

    const notificationPayload = {
        "notification": {
            "title": req.body.name,
            "body": "Newsletter Available!",
            "icon": "https://www.dropbox.com/s/kq6cxxwbbtjhr3d/Sachin%20Photo.JPG?dl=0",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };

    Promise.all(allSubscriptions.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
});

module.exports = router;
