var os = require('os');
if (os.platform() == 'win32') {  
    if (os.arch() == 'ia32') {
        console.log("m asukif");
        var chilkat = require('@chilkat/ck-node11-win-ia32');
    } else {
        console.log("m asuk else");
        var chilkat = require('@chilkat/ck-node20-win64'); 
    }
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('@chilkat/ck-node11-arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('@chilkat/ck-node11-linux32');
    } else {
        var chilkat = require('@chilkat/ck-node11-linux64');
    }
} else if (os.platform() == 'darwin') {
    var chilkat = require('@chilkat/ck-node11-macosx');
}

function chilkatExample() {

    // This example assumes the Chilkat HTTP API to have been previously unlocked.
    // See Global Unlock Sample for sample code.

    var http = new chilkat.Http();

    // Using a SOCKS5 proxy is just a matter of setting a few properties.
    // Once these properties are set, all other coding is the same as when
    // the connection is direct to the HTTP server.

    // Set the SocksVersion property = 5 for SOCKS5
    http.SocksVersion = 5;

    // Set the SocksHostname to the SOCKS proxy domain name or IP address, 
    // which may be IPv4 (dotted notation) or IPv6.
    http.SocksHostname = "syd.socks.ipvanish.com";

    // The port where the SOCKS5 proxy is listening.
    http.SocksPort = 1080;

    // If the SOCKS5 proxy itself requires authentication, set the username/password 
    // like this.  (otherwise leave the username/password empty)
    http.SocksUsername = "G1emUVl36Ed4";
    http.SocksPassword = "Pq6PT1LY";

    // Now do whatever it is you need to do.  All communications will go through the proxy.
    var html = http.QuickGetStr("https://api.ipify.org/?format=json");
    if (http.LastMethodSuccess !== true) {
        console.log("GGL");
        console.log(http.LastErrorText);
        return;
    }else{
        console.log("Success!");

    }

    // console.log(html);
    // console.log("----");
    // console.log("Success!");

}

chilkatExample();