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

let proxyDetailsArray = [];

function setProxyDetailsArray(proxies) {
    proxyDetailsArray = proxies;
}

function checkProxies() {
    const results = [];

    for (const proxy of proxyDetailsArray) {
        var http = new chilkat.Http();
        http.SocksVersion = 5;

        // Use proxy details from the array
        http.SocksHostname = proxy.hostname;
        http.SocksPort = proxy.port;
        http.SocksUsername = proxy.username;
        http.SocksPassword = proxy.password;

        var html = http.QuickGetStr("https://api.ipify.org/?format=json");
        if (http.LastMethodSuccess !== true) {
            results.push({ proxy: proxy, result: "Proxy is not working." });
        } else {
            results.push({ proxy: proxy, result: "Proxy is working fine!" });
        }
         // Close the connection explicitly
         http.CloseAllConnections();
    }

    return results;
}

module.exports = {
    setProxyDetailsArray,
    checkProxies,
};
