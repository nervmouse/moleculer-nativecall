
# Moleculer NativeCall
Use other services as native objects for [MoleculerJS framework](https://github.com/moleculerjs/moleculer)


## Install
```
$ npm install moleculer-nativecall
```
## Usage
The ordinary way to call an action of service `math`
```js
//Ordinay way to call `math.add`
ctx.call('math.add',{a:5,b:3}).then(res=> console.log('5+3=',res));

//Use NativeCall to call `math.add`
math.add({a:5,b:3}).then(res=> console.log('5+3=',res));
```
Sample Service
```js
const NativeCall=require('moleculer-nativecall');
module.exports = {
	name: "sample",
	// Actions
	actions: {
		test (ctx){
			return math.add({a:5,b:3}).then(res=> `5+3=${res}`)
		}
	},
	// use NativeCall.require function in event handler
	started() {
        return NativeCall.require(this.broker,['math'],global);
	}
};
```

## API
`NativeCall` object

### require()
` require(broker: ServiceBroker, services: Array [, env: object])`
##### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `broker` | ServiceBroker| - | broker for accessing services |
| `services` | Array| - | List of services to be loaded |
| `env` | Object| {} | (optional) The place to assign service objects. The object will be return in promise. eg. global |
|  |  |
##### Return
a promise will be return with `env`
```js
NativeCall.require(broker,['math']).then($env=>{
  //$env.math will be the service object 
});
```
## License

[MIT license](https://tldrlegal.com/license/mit-license)
