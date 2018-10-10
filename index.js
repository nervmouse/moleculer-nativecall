/*
 * moleculer-nativecall
 * call service with native object
 * Author : Jim Chen (NervMouse)
 * MIT Licensed
 */

"use strict";

module.exports={
    require(ctx,$services=[],$env={}){
        if (!Array.isArray($services)){
            $services=[$services];
        }
        let $servicenames=$services.map( $s => (typeof($s)==='object')?$s.name:$s);
        return ctx.waitForServices($services).then( ()=>{
            for (let $sv of ctx.broker.services){
                let $sv_name=$sv.name;
                if ($servicenames.includes($sv_name)){
                    let $sv_obj=$env[$sv_name]={};
                    for (let $act_name in $sv.actions){
                        $sv_obj[$act_name]=$sv.actions[$act_name];
                        
                    }
                    $env[$sv_name]=$sv_obj;
                }
            }
            return $env;
        });
        
    }
    
    
};