// checker.js

const os = require('os');

if (os.platform() == 'win32') {  
    if (os.arch() == 'ia32') {
        var chilkat = require('@chilkat/ck-node20-win32');
    } else {
        var chilkat = require('@chilkat/ck-node20-win64'); 
    }
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('@chilkat/ck-node20-arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('@chilkat/ck-node20-linux32');
    } else {
        var chilkat = require('@chilkat/ck-node20-linux64');
    }
} else if (os.platform() == 'darwin') {
    var chilkat = require('@chilkat/ck-node20-macosx');
}

function checkProxy() {
    var http = new chilkat.Http();
    http.SocksVersion = 5;
    http.SocksHostname = "syd.socks.ipvanish.com";
    http.SocksPort = 1080;
    http.SocksUsername = "G1emUVl36Ed4";
    http.SocksPassword = "Pq6PT1LY";

    var html = http.QuickGetStr("https://api.ipify.org/?format=json");
    if (http.LastMethodSuccess !== true) {
        return "Proxy is not working.";
    } else {
        return "Proxy is working fine!";
    }
}

module.exports = {
    checkProxy,
};
