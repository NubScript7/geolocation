/*
	Elequer v0.7
	please DO NOT try to own this module!
		-nubscript7
*/

class Elequer extends Array{
	val(replace){
		function values(el){let array=[];el.forEach(e=>{e.type?array.push(e.value):array.push(e.textContent)});return array}
		return replace||replace==''?
			this.forEach(e=>{
				e.type?
					e.value=replace:
					e.textContent=replace
			}):values(this)
}
	on(listener,cb){
		this.forEach(e=>{
			e.addEventListener(listener,a=>cb(a))
		})
	}
	ready(cb){
		this.forEach(el=>{
			return el.readyState!='loading'?cb():el.addEventListener('DOMContentLoaded',e=>cb())
		})
	}
	attr(attr){
		function values(object) {let a,b;
			a=Object.keys(object);
			b=[];
			a.forEach(e=>{b.push(object[e])});return b}
		let attrValues=[];
		function getAttr(el){el.forEach(e=>{let a=e.getAttribute(attr);
			attrValues.push(a.split(' ')) });return attrValues}
		return'object'==typeof attr||attr instanceof Object?
			this.forEach(e=>{
				Object.keys(attr).forEach((a,b)=>{
					let key,value;
					key=Object.keys(attr)[b]
					value=values(attr)[b]
					e.setAttribute(key,value)
				})
			}):getAttr(this)
	}
	child(){
		function child(elements, array){elements.forEach(e=>{let elChilds=[];elChilds.push(...e.children);array.push(elChilds)})}
		let childNodes,output;
		childNodes=[...arguments];output=[];
		childNodes.length>0?
		this.forEach(p=>{
			childNodes.forEach(c=>{
				let child;'string'==typeof c||c instanceof String?
				child=document.createElement(c):
				child=c.cloneNode(true);
				p.appendChild(child);
				output.push(child)});
			}):child(this,output)
		return new Elequer(...output[0])
	}
	content(type,value){
		this.forEach(e=>{
			e[type]=value
		})
	}
	style(param='margin: 0'){
		this.forEach(e=>{
			e.style=param
		})
	}
}

function $(param){
	return'string'==typeof param||param instanceof String?
		new Elequer(...document.querySelectorAll(param)):
		new Elequer(param)
}