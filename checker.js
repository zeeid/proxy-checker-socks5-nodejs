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

function checkProxy(proxy) {
    return new Promise((resolve, reject) => {
        var http = new chilkat.Http();
        http.SocksVersion = 5;

        // Gunakan detail proxy dari parameter
        http.SocksHostname = proxy.hostname;
        http.SocksPort = proxy.port;

        // Atur username dan password jika ada
        if (proxy.username) {
            http.SocksUsername = proxy.username;
        }
        if (proxy.password) {
            http.SocksPassword = proxy.password;
        }

        try {
            const responseText = http.QuickGetStr("https://api.ipify.org/?format=json");
            resolve({ proxy: proxy, result: "Proxy is working fine!" });
        } catch (error) {
            resolve({ proxy: proxy, result: "Proxy is not working." });
        } finally {
            // Tutup koneksi secara eksplisit
            http.CloseAllConnections();
        }
    });
}

async function checkProxies() {
    const promises = proxyDetailsArray.map(checkProxy);
    return Promise.all(promises);
}

module.exports = {
    setProxyDetailsArray,
    checkProxies,
};
