function alert(message) {
    // Your alert function implementation here
}

var ls = require("lightstreamer-client");
var fs = require('fs');
var lsClient = new ls.LightstreamerClient("http://push.lightstreamer.com", "ISSLIVE");

lsClient.connectionOptions.setSlowingEnabled(false);

// Create a Subscription for the items you want to track
var subscription = new ls.Subscription("MERGE", ["NODE3000004", "NODE3000005"], ["Value"]);

lsClient.subscribe(subscription);
lsClient.connect();

subscription.addListener({
    onItemUpdate: function (update) {
        var itemName = update.getItemName();
        var value = update.getValue("Value");

        // Get the current time
        var now = new Date();
        var currentTime = now.toISOString().slice(0, 19).replace("T", "-");


        console.log(`Received update for ${itemName}: TimeStamp=${currentTime}, Value=${value}`);

        // Handle the data as needed (e.g., write to a file)
        fs.appendFile(`${itemName}.txt`, `${currentTime} ${value}\n`, function (err) {
            if (err) {
                console.error(`Error writing to ${itemName}.txt: ${err}`);
            } else {
                console.log(`Data written to ${itemName}.txt`);
            }
        const UpdateEvent = Event("updateEvent");
        });
    }
});
