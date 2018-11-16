const webpush = require('web-push');
var express = require('express');
var router = express.Router();

const vapidKeys = {
	"publicKey":"BA08CYw1WPNcMruNuGLWG29Di94jEkp3W_U_IFKqpIOflwVCOJvsf5nC7aCk_sYNkt_nRVauxzminUH_bNyk8Oc",
	"privateKey":"jHc13PNhonvwe9B9RLRjOMKTcI7TjokWElbAOXKjYVg"
};

webpush.setVapidDetails(
    'mailto:waghmare.sachin1994@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

router.post('/notification',function(req,res,next){
    const allSubscriptions = [];
    console.log(req);  
    console.log('Total subscriptions', allSubscriptions.length);

    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "assets/main-page-logo-small-hat.png",
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
