
class IMDC_cas{
    loginUrl: string
    validateUrl: string
    logoutUrl: string
    cas_url: string
    service_url: string
    ticket:string
    user:string
    logout:string
    constructor(conn_params:{
        cas_url:string,
        service_url:string
    }){
        this.cas_url = conn_params.cas_url
        this.service_url = conn_params.service_url 
        this.loginUrl = this.cas_url+'/login?service='+this.service_url
        this.logoutUrl = this.cas_url+'/logout?service='+this.service_url
        this.validateUrl = this.cas_url+'/p3/serviceValidate'
        
        this.ticket = get('ticket')
        this.logout = get('logout')
        if (this.logout){
            localStorage.removeItem('session')
            window.location.replace(this.logoutUrl)
            return
        }
        this.user = localStorage.getItem('session')
        if (this.ticket){

            console.log('got ticket: '+this.ticket)
            let req = new XMLHttpRequest();
            req.open('get',this.validateUrl+'?ticket='+this.ticket+'&service='+this.service_url)
            req.onload = ()=>{
                let parser = new DOMParser()
                let xmlDoc = parser.parseFromString(req.response, 'text/xml')
                if (xmlDoc.getElementsByTagName('authenticationSuccess')) {
                    let user = xmlDoc.getElementsByTagName('user')[0].textContent
                    localStorage.setItem('session',user)
                    console.log('Access was validated for user '+user)
                } else {
                    window.location.replace(this.loginUrl)
                }
                console.log(req.response)
            }
            req.send()

        } else if (this.user){
            console.log('was already authenticated')
        } else {
            // redirect
            window.location.replace(this.loginUrl)
        }

    }
}

function get(name:any){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}