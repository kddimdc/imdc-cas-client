var IMDC_cas = (function () {
    function IMDC_cas(conn_params) {
        var _this = this;
        this.cas_url = conn_params.cas_url;
        this.service_url = conn_params.service_url;
        this.loginUrl = this.cas_url + '/login?service=' + this.service_url;
        this.logoutUrl = this.cas_url + '/logout?service=' + this.service_url;
        this.validateUrl = this.cas_url + '/p3/serviceValidate';
        this.ticket = get('ticket');
        this.logout = get('logout');
        if (this.logout) {
            localStorage.removeItem('session');
            window.location.replace(this.logoutUrl);
            return;
        }
        this.user = localStorage.getItem('session');
        if (this.ticket) {
            console.log('got ticket: ' + this.ticket);
            var req_1 = new XMLHttpRequest();
            req_1.open('get', this.validateUrl + '?ticket=' + this.ticket + '&service=' + this.service_url);
            req_1.onload = function () {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(req_1.response, 'text/xml');
                if (xmlDoc.getElementsByTagName('authenticationSuccess')) {
                    var user = xmlDoc.getElementsByTagName('user')[0].textContent;
                    localStorage.setItem('session', user);
                    console.log('Access was validated for user ' + user);
                }
                else {
                    window.location.replace(_this.loginUrl);
                }
                console.log(req_1.response);
            };
            req_1.send();
        }
        else if (this.user) {
            console.log('was already authenticated');
        }
        else {
            // redirect
            window.location.replace(this.loginUrl);
        }
    }
    return IMDC_cas;
}());
function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}
