cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-sqlite-ext/www/SQLitePlugin.js",
        "id": "cordova-sqlite-ext.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/me.rahul.plugins.sqlDB/www/sqlDB.js",
        "id": "me.rahul.plugins.sqlDB.sqlDB",
        "clobbers": [
            "window.plugins.sqlDB"
        ]
    },
    {
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{}
// BOTTOM OF METADATA
});