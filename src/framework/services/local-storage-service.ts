import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ConstantAttributes } from '../attributes/constant-attributes';
import { UserBaseModel } from '../models/user-base-model';
import { ConfigService } from './config-service';
import { Storage } from '@ionic/storage';
import { NavParams, IonicPage, Platform, Events, AlertController} from 'ionic-angular';
//const STORAGE_KEY = 'appSecureStore';

@Injectable()
export class LocalStorageService {
        
    private isApp: boolean;
    //For App
    private sLang: string;
    private sUser: string;
    private sProj: string;
    private sPhase: string;
    private sFontSize: string;
    private sTC: string;
    private sPush: string;
    private sTheme: string;

    constructor(private cookieService: CookieService, private storage: Storage, private configSrv: ConfigService, public platform: Platform){
        this.isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080') 
        || document.URL.startsWith('http://localhost:8000') || document.URL.startsWith('http://localhost:7532'));//this.platform.is('core');//(!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080') || document.URL.startsWith('http://localhost:8000') || document.URL.startsWith('http://localhost:8001'));

        //if (this.platform.is('core'))

       
        if (this.isApp)
        {
            this.initAppStorage();
        }
        else
        {
            this.initWebStorage();
        }
         /*
        if(this.isApp)
        {
            this.initStorage();
        }
        */

    }

    private initStorage() {
        //console.log("Init Storage");
        this.storage.get(ConstantAttributes.COOKIE_LANG).then((lang: string) => {
            if(lang)
                this.sLang = lang;
            else
            {
                this.sLang = ConstantAttributes.LANG_CHI;
                this.storage.set(ConstantAttributes.COOKIE_LANG, ConstantAttributes.LANG_CHI);                
            }
        });
        ////console.log("User Storage");
        this.storage.get(ConstantAttributes.COOKIE_USER).then((user: string) => {

            if(user)
                this.sUser = user;
            else
            {
                this.sUser = JSON.stringify(this.configSrv.GUEST_MODEL);
                this.storage.set(ConstantAttributes.COOKIE_USER, JSON.stringify(this.configSrv.GUEST_MODEL));                
            }
        });

         //console.log("sUser");
         //console.log(ConstantAttributes.COOKIE_USER);
    }

    private initAppStorage() {
        //console.log("InitAppStorage");
         this.storage.get(ConstantAttributes.COOKIE_LANG).then((lang: string) => {
            if(lang)
                this.sLang = lang;
            else
            {
                this.sLang = ConstantAttributes.LANG_CHI;
                this.storage.set(ConstantAttributes.COOKIE_LANG, ConstantAttributes.LANG_CHI);                
            }
        });
        ////console.log("User Storage");
        this.storage.get(ConstantAttributes.COOKIE_USER).then((user: string) => {

            if(user)
                this.sUser = user;
            else
            {
                this.sUser = JSON.stringify(this.configSrv.GUEST_MODEL);
                this.storage.set(ConstantAttributes.COOKIE_USER, JSON.stringify(this.configSrv.GUEST_MODEL));                
            }
        });

        this.storage.get(ConstantAttributes.COOKIE_PROJ).then((proj: string) => {
            if(proj)
                this.sProj = proj;
            else
            {
                this.sProj = ConstantAttributes.DEFAULT_PROJ;
                this.storage.set(ConstantAttributes.COOKIE_PROJ, ConstantAttributes.DEFAULT_PROJ);                
            }
        });

        this.storage.get(ConstantAttributes.COOKIE_PHASE).then((phase: string) => {
            if(phase)
                this.sPhase = phase;
            else
            {
                this.sPhase = ConstantAttributes.DEFAULT_PHASE;
                this.storage.set(ConstantAttributes.COOKIE_PHASE, ConstantAttributes.DEFAULT_PHASE);                
            }
        });

         //console.log("sUser");
         //console.log(ConstantAttributes.COOKIE_USER);

        this.storage.get(ConstantAttributes.COOKIE_FONTSIZE).then((sfont: string) => {
            if(sfont)
                this.sFontSize = sfont;
            else
            {
                this.sFontSize = ConstantAttributes.DEFAULT_FONTSIZE;
                this.storage.set(ConstantAttributes.COOKIE_FONTSIZE, ConstantAttributes.DEFAULT_FONTSIZE);                
            }
        });

        this.storage.get(ConstantAttributes.COOKIE_THEME).then((st_theme: string) => {
            if(st_theme)
                this.sTheme = st_theme;
            else
            {
                this.sTheme = ConstantAttributes.DEFAULT_THEME;
                this.storage.set(ConstantAttributes.COOKIE_THEME, ConstantAttributes.DEFAULT_THEME);                
            }
        });

        this.storage.get(ConstantAttributes.COOKIE_LOADTC).then((st: string) => {
            if(st)
                this.sTC = st;
            else
            {
                this.sTC = "false";
                this.storage.set(ConstantAttributes.COOKIE_LOADTC, "false");                
            }
        });

        this.storage.get(ConstantAttributes.COOKIE_PUSH).then((setPush: string) => {
            if(setPush)
                this.sPush = setPush;
            else
            {
                this.sPush = "true";
                this.storage.set(ConstantAttributes.COOKIE_PUSH, "true");                
            }
        });
    }

    private async initWebStorage() {
        //console.log("initWebStorage");

        /*
        this.storage.get(ConstantAttributes.COOKIE_LANG).then((lang: string) => {
            if(lang)
                this.sLang = lang;
            else
            {
                this.sLang = ConstantAttributes.LANG_CHI;
                this.cookieService.set(ConstantAttributes.COOKIE_LANG, ConstantAttributes.LANG_CHI, 360);           
            }
        });
        */

        if(this.cookieService.check(ConstantAttributes.COOKIE_LANG))
        {
            this.sLang = this.cookieService.get(ConstantAttributes.COOKIE_LANG);            
        }
        else
        {
            this.sLang = ConstantAttributes.LANG_CHI;
            this.cookieService.set(ConstantAttributes.COOKIE_LANG, ConstantAttributes.LANG_CHI, 360);
        }

        ////console.log("User Storage");
        /*
        this.storage.get(ConstantAttributes.COOKIE_USER).then((user: string) => {

            if(user)
                this.sUser = user;
            else
            {
                this.sUser = JSON.stringify(this.configSrv.GUEST_MODEL);
                this.storage.set(ConstantAttributes.COOKIE_USER, JSON.stringify(this.configSrv.GUEST_MODEL));                
            }
        });
        */
        if(this.cookieService.check(ConstantAttributes.COOKIE_USER))
        {
            this.sUser = this.cookieService.get(ConstantAttributes.COOKIE_USER);            
        }
        else
        {
            this.sUser = JSON.stringify(this.configSrv.GUEST_MODEL);
            this.cookieService.set(ConstantAttributes.COOKIE_USER, JSON.stringify(this.configSrv.GUEST_MODEL), 360);
        }

        /*
        this.storage.get(ConstantAttributes.COOKIE_PROJ).then((proj: string) => {
            if(proj)
                this.sProj = proj;
            else
            {
                this.sProj = ConstantAttributes.DEFAULT_PROJ;
                this.storage.set(ConstantAttributes.COOKIE_PROJ, ConstantAttributes.DEFAULT_PROJ);                
            }
        });
        */

        if(this.cookieService.check(ConstantAttributes.COOKIE_PROJ))
        {
            this.sProj = this.cookieService.get(ConstantAttributes.COOKIE_PROJ);            
        }
        else
        {
            this.sProj = ConstantAttributes.DEFAULT_PROJ;
            this.cookieService.set(ConstantAttributes.COOKIE_PROJ, ConstantAttributes.DEFAULT_PROJ, 360);
        }
        /*
        this.storage.get(ConstantAttributes.COOKIE_PHASE).then((phase: string) => {
            if(phase)
                this.sPhase = phase;
            else
            {
                this.sPhase = ConstantAttributes.DEFAULT_PHASE;
                this.storage.set(ConstantAttributes.COOKIE_PHASE, ConstantAttributes.DEFAULT_PHASE);                
            }
        });
        */

        if(this.cookieService.check(ConstantAttributes.COOKIE_PHASE))
        {
            this.sPhase = this.cookieService.get(ConstantAttributes.COOKIE_PHASE);            
        }
        else
        {
            this.sPhase = ConstantAttributes.DEFAULT_PHASE;
            this.cookieService.set(ConstantAttributes.COOKIE_PHASE, ConstantAttributes.DEFAULT_PHASE, 360);
        }

         //console.log("sUser");
         //console.log(ConstantAttributes.COOKIE_USER);

         if(this.cookieService.check(ConstantAttributes.COOKIE_FONTSIZE))
        {
            this.sFontSize = this.cookieService.get(ConstantAttributes.COOKIE_FONTSIZE);            
        }
        else
        {
            this.sFontSize = ConstantAttributes.DEFAULT_FONTSIZE;
            this.cookieService.set(ConstantAttributes.COOKIE_FONTSIZE, ConstantAttributes.DEFAULT_FONTSIZE, 360);
        }

        if(this.cookieService.check(ConstantAttributes.COOKIE_THEME))
        {
            this.sTheme = this.cookieService.get(ConstantAttributes.COOKIE_THEME);            
        }
        else
        {
            this.sTheme = ConstantAttributes.DEFAULT_THEME;
            this.cookieService.set(ConstantAttributes.COOKIE_THEME, ConstantAttributes.DEFAULT_THEME, 360);
        }

        if(this.cookieService.check(ConstantAttributes.COOKIE_LOADTC))
        {
            this.sTC = this.cookieService.get(ConstantAttributes.COOKIE_LOADTC);            
        }
        else
        {
            this.sTC = "false";
            this.cookieService.set(ConstantAttributes.COOKIE_LOADTC, "false", 360);
        }

        if(this.cookieService.check(ConstantAttributes.COOKIE_PUSH))
        {
            this.sPush = this.cookieService.get(ConstantAttributes.COOKIE_PUSH);            
        }
        else
        {
            this.sPush = "true";
            this.cookieService.set(ConstantAttributes.COOKIE_PUSH, "true", 360);
        }
    }

    setLang(lang: string)
    {
        if(!this.isApp)
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_LANG))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_LANG);
            }

            this.cookieService.set(ConstantAttributes.COOKIE_LANG, lang, 360);
        }
        else
        {
            this.sLang = lang;
            this.storage.set(ConstantAttributes.COOKIE_LANG, lang);
        }  
        
    }

    getFontSize(): string
    {
        if(!this.isApp)
        {
            if(!this.cookieService.check(ConstantAttributes.COOKIE_FONTSIZE))
            {
                this.setFontSize(ConstantAttributes.DEFAULT_FONTSIZE);            
            }
            
            return this.cookieService.get(ConstantAttributes.COOKIE_FONTSIZE);
        }
        else
        {     
                
           if(!this.sFontSize)
           {
               this.setFontSize(ConstantAttributes.DEFAULT_FONTSIZE);
           }
           return this.sFontSize;
          

           /*             
           this.storage.get(ConstantAttributes.COOKIE_FONTSIZE).then((st_font: string) => {
            if(!st_font)
            {
                this.setFontSize(ConstantAttributes.DEFAULT_FONTSIZE); 
                this.sFontSize = ConstantAttributes.DEFAULT_FONTSIZE;
            }
            else
            {
                this.sFontSize = st_font;
            }
            return this.sFontSize;
            
            
        });
         */

        }
           

          
    }
    
    async setFontSize(size: string)
    {
        if(!this.isApp)
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_FONTSIZE))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_FONTSIZE);
            }
            ////console.log('set Font'+size);
            this.cookieService.set(ConstantAttributes.COOKIE_FONTSIZE, size, 360);
        }
        else
        {
            this.sFontSize = size;
            await this.storage.set(ConstantAttributes.COOKIE_FONTSIZE, size);
        }  
        
    }

    getTheme(): string
    {
        if(!this.isApp)
        {
            if(!this.cookieService.check(ConstantAttributes.COOKIE_THEME))
            {
                this.setTheme(ConstantAttributes.DEFAULT_THEME);            
            }
            
            return this.cookieService.get(ConstantAttributes.COOKIE_THEME);
        }
        else
        {     
                
           if(!this.sTheme)
           {
               this.setTheme(ConstantAttributes.DEFAULT_THEME);
           }
           return this.sTheme;
        }
           

          
    }

    async setTheme(theme: string)
    {
        if(!this.isApp)
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_THEME))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_THEME);
            }
            ////console.log('set Font'+size);
            this.cookieService.set(ConstantAttributes.COOKIE_THEME, theme, 360);
        }
        else
        {
            this.sTheme = theme;
            await this.storage.set(ConstantAttributes.COOKIE_THEME, theme);
        }  
        
    }

    getTAndC(): string
    {
        if(!this.isApp)
        {
            if(!this.cookieService.check(ConstantAttributes.COOKIE_LOADTC))
            {
                this.setTAndC("false");            
            }
            
            return this.cookieService.get(ConstantAttributes.COOKIE_LOADTC);
        }
        else
        {     
                
            if(!this.sTC)
           {
               this.setTAndC("false");
           }
           return this.sTC;
        
        }
           

          
    }

    async setTAndC(agree: string)
    {
        if(!this.isApp)
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_LOADTC))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_LOADTC);
            }
            ////console.log('set Font'+size);
            this.cookieService.set(ConstantAttributes.COOKIE_LOADTC, agree, 360);
        }
        else
        {
            this.sTC = agree;
            await this.storage.set(ConstantAttributes.COOKIE_LOADTC, agree);
        }  
        
    }

    async setPush(push: string)
    {
        if(!this.isApp)
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_PUSH))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_PUSH);
            }
            ////console.log('set Font'+size);
            this.cookieService.set(ConstantAttributes.COOKIE_PUSH, push, 360);
        }
        else
        {
            this.sPush = push;
            await this.storage.set(ConstantAttributes.COOKIE_PUSH, push);
        }  
        
    }

    getPush()
    {
        if(!this.isApp)
        {
            if(!this.cookieService.check(ConstantAttributes.COOKIE_PUSH))
            {
                this.setPush("true");            
            }
            
            return this.cookieService.get(ConstantAttributes.COOKIE_PUSH);
        }
        else
        {     
                
            if(!this.sPush)
           {
               this.setPush("true");
           }
           return this.sPush;
        
        }
        
    }


    getLang(): string
    {
        if(!this.isApp)
        {
            if(!this.cookieService.check(ConstantAttributes.COOKIE_LANG))
            {
                this.setLang(ConstantAttributes.LANG_CHI);            
            }
            
            return this.cookieService.get(ConstantAttributes.COOKIE_LANG);
        }
        else
        {           
           if(!this.sLang)
           {
               this.setLang(ConstantAttributes.LANG_CHI);
           }

           return this.sLang;
           /*
           this.storage.get(ConstantAttributes.COOKIE_LANG).then((st_lang: string) => {
            if(!st_lang)
            {
                this.setLang(ConstantAttributes.LANG_CHI); 
                this.sLang = ConstantAttributes.LANG_CHI;
            }
            else
            {
                this.sLang = st_lang;
            }
            return this.sLang;
            
        });
*/
          
        }
    }

    getProj(): string
    {
        if(!this.isApp)
        {
            if(!this.cookieService.check(ConstantAttributes.COOKIE_PROJ))
            {
                this.setProj(ConstantAttributes.DEFAULT_PROJ);                
            }
            
            return this.cookieService.get(ConstantAttributes.COOKIE_PROJ);
        }
        else
        {    
                  
           if(!this.sProj)
           {
               this.setProj(ConstantAttributes.DEFAULT_PROJ);
           }
           return this.sProj;
           /*
          this.storage.get(ConstantAttributes.COOKIE_PROJ).then((st_proj: string) => {
            if(!st_proj)
            {
                this.setProj(ConstantAttributes.DEFAULT_PROJ); 
                this.sLang = ConstantAttributes.DEFAULT_PROJ;
            }
            else
            {
                this.sProj = st_proj;
            }
           return this.sProj;
        });
        */
        
        }
    }


    getPhase(): string
    {
        if(!this.isApp)
        {
            if(!this.cookieService.check(ConstantAttributes.COOKIE_PHASE))
            {
                this.setPhase(ConstantAttributes.DEFAULT_PHASE);                
            }
            
            return this.cookieService.get(ConstantAttributes.COOKIE_PHASE);
        }
        else
        {       
          
           if(!this.sPhase)
           {
               this.setPhase(ConstantAttributes.DEFAULT_PHASE);
           }

           return this.sPhase;
          
               /*  
          this.storage.get(ConstantAttributes.COOKIE_PHASE).then((st_phase: string) => {
            if(!st_phase)
            {
                this.setPhase(ConstantAttributes.DEFAULT_PHASE); 
                this.sLang = ConstantAttributes.DEFAULT_PHASE;
            }
            else
            {
                this.sPhase = st_phase;
            }
           return this.sPhase;
        }); */
        }
    }

    setProj(proj: string)
    {
        if(!this.isApp)
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_PROJ))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_PROJ);
            }

            this.cookieService.set(ConstantAttributes.COOKIE_PROJ, proj, 360);
        }
        else
        {
            this.sProj = proj;
            this.storage.set(ConstantAttributes.COOKIE_PROJ, proj);
        }  
    }
    setPhase(phase: string)
    {
        if(!this.isApp)
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_PHASE))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_PHASE);
            }

            this.cookieService.set(ConstantAttributes.COOKIE_PHASE, phase, 360);
        }
        else
        {
            this.sPhase = phase;
            this.storage.set(ConstantAttributes.COOKIE_PHASE, phase);
        }  
    }

    setUser(user: UserBaseModel)
    {
        if(!this.isApp)
        {
            if(this.cookieService.check(ConstantAttributes.COOKIE_USER))
            {
                this.cookieService.delete(ConstantAttributes.COOKIE_USER);
            }

            this.cookieService.set(ConstantAttributes.COOKIE_USER, JSON.stringify(user));
        }
        else
        {
            this.sUser = JSON.stringify(user);
            this.storage.set(ConstantAttributes.COOKIE_USER, JSON.stringify(user));
        } 
    }

    getUser(): UserBaseModel
    {
        if(!this.isApp)
        {
            if(!this.cookieService.check(ConstantAttributes.COOKIE_USER))
            {
                this.setUser(this.configSrv.GUEST_MODEL);
            }

            return JSON.parse(this.cookieService.get(ConstantAttributes.COOKIE_USER)) as UserBaseModel;
        }
        else
        {                      
            if(!this.sUser)
            {
                this.setUser(this.configSrv.GUEST_MODEL);                
            }
                
            return JSON.parse(this.sUser) as UserBaseModel;
        }
    }    
}