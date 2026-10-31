(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},t={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},n=1e3,r=1001,i=1002,a=1003,o=1004,s=1005,c=1006,l=1007,u=1008,d=1009,f=1010,p=1011,m=1012,h=1013,g=1014,_=1015,v=1016,y=1017,b=1018,x=1020,S=35902,C=1021,w=1022,T=1023,E=1024,D=1025,O=1026,k=1027,ee=1028,A=1029,te=1030,ne=1031,j=1033,re=33776,ie=33777,ae=33778,oe=33779,se=35840,ce=35841,le=35842,ue=35843,de=36196,fe=37492,pe=37496,me=37808,he=37809,ge=37810,_e=37811,ve=37812,ye=37813,M=37814,be=37815,xe=37816,Se=37817,Ce=37818,we=37819,Te=37820,Ee=37821,De=36492,Oe=36494,ke=36495,Ae=36283,je=36284,Me=36285,Ne=36286,Pe=2300,Fe=2301,Ie=2302,Le=2400,Re=2401,ze=2402,Be=3200,Ve=3201,He=`srgb`,Ue=`srgb-linear`,We=`linear`,Ge=`srgb`,Ke=7680,qe=35044,Je=2e3,Ye=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let e=n.indexOf(t);e!==-1&&n.splice(e,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let n=t.slice(0);for(let t=0,r=n.length;t<r;t++)n[t].call(this,e);e.target=null}}},Xe=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Ze=1234567,Qe=Math.PI/180,$e=180/Math.PI;function et(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Xe[e&255]+Xe[e>>8&255]+Xe[e>>16&255]+Xe[e>>24&255]+`-`+Xe[t&255]+Xe[t>>8&255]+`-`+Xe[t>>16&15|64]+Xe[t>>24&255]+`-`+Xe[n&63|128]+Xe[n>>8&255]+`-`+Xe[n>>16&255]+Xe[n>>24&255]+Xe[r&255]+Xe[r>>8&255]+Xe[r>>16&255]+Xe[r>>24&255]).toLowerCase()}function tt(e,t,n){return Math.max(t,Math.min(n,e))}function nt(e,t){return(e%t+t)%t}function rt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function it(e,t,n){return e===t?0:(n-e)/(t-e)}function at(e,t,n){return(1-n)*e+n*t}function ot(e,t,n,r){return at(e,t,1-Math.exp(-n*r))}function st(e,t=1){return t-Math.abs(nt(e,t*2)-t)}function ct(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function lt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function ut(e,t){return e+Math.floor(Math.random()*(t-e+1))}function dt(e,t){return e+Math.random()*(t-e)}function ft(e){return e*(.5-Math.random())}function pt(e){e!==void 0&&(Ze=e);let t=Ze+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function mt(e){return e*Qe}function ht(e){return e*$e}function gt(e){return!(e&e-1)&&e!==0}function _t(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function vt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function yt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:console.warn(`THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function bt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function xt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var St={DEG2RAD:Qe,RAD2DEG:$e,generateUUID:et,clamp:tt,euclideanModulo:nt,mapLinear:rt,inverseLerp:it,lerp:at,damp:ot,pingpong:st,smoothstep:ct,smootherstep:lt,randInt:ut,randFloat:dt,randFloatSpread:ft,seededRandom:pt,degToRad:mt,radToDeg:ht,isPowerOfTwo:gt,ceilPowerOfTwo:_t,floorPowerOfTwo:vt,setQuaternionFromProperEuler:yt,normalize:xt,denormalize:bt},N=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ct=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(wt.makeScale(e,t)),this}rotate(e){return this.premultiply(wt.makeRotation(-e)),this}translate(e,t){return this.premultiply(wt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wt=new Ct;function Tt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Et(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Dt(){let e=Et(`canvas`);return e.style.display=`block`,e}var Ot={};function kt(e){e in Ot||(Ot[e]=!0,console.warn(e))}function At(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}function jt(e){let t=e.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Mt(e){let t=e.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Nt={enabled:!0,workingColorSpace:Ue,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Pt(e.r),e.g=Pt(e.g),e.b=Pt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ft(e.r),e.g=Ft(e.g),e.b=Ft(e.b)),e)},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?We:this.spaces[e].transfer},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}};function Pt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ft(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var It=[.64,.33,.3,.6,.15,.06],Lt=[.2126,.7152,.0722],Rt=[.3127,.329],zt=new Ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bt=new Ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Nt.define({[Ue]:{primaries:It,whitePoint:Rt,transfer:We,toXYZ:zt,fromXYZ:Bt,luminanceCoefficients:Lt,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:It,whitePoint:Rt,transfer:Ge,toXYZ:zt,fromXYZ:Bt,luminanceCoefficients:Lt,outputColorSpaceConfig:{drawingBufferColorSpace:He}}});var Vt,Ht=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Vt===void 0&&(Vt=Et(`canvas`)),Vt.width=e.width,Vt.height=e.height;let n=Vt.getContext(`2d`);e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Vt}return t.width>2048||t.height>2048?(console.warn(`THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons`,e),t.toDataURL(`image/jpeg`,.6)):t.toDataURL(`image/png`)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Et(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Pt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Pt(t[e]/255)*255):t[e]=Pt(t[e]);return{data:t,width:e.width,height:e.height}}return console.warn(`THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ut=0,Wt=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ut++}),this.uuid=et(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Gt(r[t].image)):e.push(Gt(r[t]))}else e=Gt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Gt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Ht.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn(`THREE.Texture: Unable to serialize Texture.`),{})}var Kt=0,qt=class e extends Ye{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=r,a=r,o=c,s=u,l=T,f=d,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kt++}),this.uuid=et(),this.name=``,this.source=new Wt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=o,this.minFilter=s,this.anisotropy=p,this.format=l,this.internalFormat=null,this.type=f,this.offset=new N(0,0),this.repeat=new N(1,1),this.center=new N(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case n:e.x-=Math.floor(e.x);break;case r:e.x=e.x<0?0:1;break;case i:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case n:e.y-=Math.floor(e.y);break;case r:e.y=e.y<0?0:1;break;case i:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null,qt.DEFAULT_MAPPING=300,qt.DEFAULT_ANISOTROPY=1;var Jt=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yt=class extends Ye{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Jt(0,0,e,t),this.scissorTest=!1,this.viewport=new Jt(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:c,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let i=new qt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);i.flipY=!1,i.generateMipmaps=n.generateMipmaps,i.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let e=0;e<a;e++)this.textures[e]=i.clone(),this.textures[e].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++)this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Wt(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},Xt=class extends Yt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Zt=class extends qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=a,this.minFilter=a,this.wrapR=r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Qt=class extends qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=a,this.minFilter=a,this.wrapR=r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},$t=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(o===0){e[t+0]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;return}if(u!==m||s!==d||c!==f||l!==p){let e=1-o,t=s*d+c*f+l*p+u*m,n=t>=0?1:-1,r=1-t*t;if(r>2**-52){let i=Math.sqrt(r),a=Math.atan2(i,t*n);e=Math.sin(e*a)/i,o=Math.sin(o*a)/i}let i=o*n;if(s=s*e+d*i,c=c*e+f*i,l=l*e+p*i,u=u*e+m*i,e===1-o){let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<2**-52?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;let s=1-o*o;if(s<=2**-52){let e=1-t;return this._w=e*a+t*this._w,this._x=e*n+t*this._x,this._y=e*r+t*this._y,this._z=e*i+t*this._z,this.normalize(),this}let c=Math.sqrt(s),l=Math.atan2(c,o),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tn.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tn.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return en.copy(this).projectOnVector(e),this.sub(en)}reflect(e){return this.sub(en.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},en=new P,tn=new $t,nn=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(an.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(an.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=an.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,an):an.fromBufferAttribute(r,t),an.applyMatrix4(e.matrixWorld),this.expandByPoint(an);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),on.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),on.copy(e.boundingBox)),on.applyMatrix4(e.matrixWorld),this.union(on)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,an),an.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pn),mn.subVectors(this.max,pn),sn.subVectors(e.a,pn),cn.subVectors(e.b,pn),ln.subVectors(e.c,pn),un.subVectors(cn,sn),dn.subVectors(ln,cn),fn.subVectors(sn,ln);let t=[0,-un.z,un.y,0,-dn.z,dn.y,0,-fn.z,fn.y,un.z,0,-un.x,dn.z,0,-dn.x,fn.z,0,-fn.x,-un.y,un.x,0,-dn.y,dn.x,0,-fn.y,fn.x,0];return!_n(t,sn,cn,ln,mn)||(t=[1,0,0,0,1,0,0,0,1],!_n(t,sn,cn,ln,mn))?!1:(hn.crossVectors(un,dn),t=[hn.x,hn.y,hn.z],_n(t,sn,cn,ln,mn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,an).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(an).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(rn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},rn=[new P,new P,new P,new P,new P,new P,new P,new P],an=new P,on=new nn,sn=new P,cn=new P,ln=new P,un=new P,dn=new P,fn=new P,pn=new P,mn=new P,hn=new P,gn=new P;function _n(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){gn.fromArray(e,a);let o=i.x*Math.abs(gn.x)+i.y*Math.abs(gn.y)+i.z*Math.abs(gn.z),s=t.dot(gn),c=n.dot(gn),l=r.dot(gn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var vn=new nn,yn=new P,bn=new P,xn=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?vn.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yn.subVectors(e,this.center);let t=yn.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(yn,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bn.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yn.copy(e.center).add(bn)),this.expandByPoint(yn.copy(e.center).sub(bn))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Sn=new P,Cn=new P,wn=new P,Tn=new P,En=new P,Dn=new P,On=new P,kn=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Cn.copy(e).add(t).multiplyScalar(.5),wn.copy(t).sub(e).normalize(),Tn.copy(this.origin).sub(Cn);let i=e.distanceTo(t)*.5,a=-this.direction.dot(wn),o=Tn.dot(this.direction),s=-Tn.dot(wn),c=Tn.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Cn).addScaledVector(wn,d),f}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);let n=Sn.dot(this.direction),r=Sn.dot(Sn)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,r,i){En.subVectors(t,e),Dn.subVectors(n,e),On.crossVectors(En,Dn);let a=this.direction.dot(On),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Tn.subVectors(this.origin,e);let s=o*this.direction.dot(Dn.crossVectors(Tn,Dn));if(s<0)return null;let c=o*this.direction.dot(En.cross(Tn));if(c<0||s+c>a)return null;let l=-o*Tn.dot(On);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},An=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/jn.setFromMatrixColumn(e,0).length(),i=1/jn.setFromMatrixColumn(e,1).length(),a=1/jn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Nn,e,Pn)}lookAt(e,t,n){let r=this.elements;return Ln.subVectors(e,t),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Fn.crossVectors(n,Ln),Fn.lengthSq()===0&&(Math.abs(n.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Fn.crossVectors(n,Ln)),Fn.normalize(),In.crossVectors(Ln,Fn),r[0]=Fn.x,r[4]=In.x,r[8]=Ln.x,r[1]=Fn.y,r[5]=In.y,r[9]=Ln.y,r[2]=Fn.z,r[6]=In.z,r[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],ee=r[6],A=r[10],te=r[14],ne=r[3],j=r[7],re=r[11],ie=r[15];return i[0]=a*x+o*T+s*k+c*ne,i[4]=a*S+o*E+s*ee+c*j,i[8]=a*C+o*D+s*A+c*re,i[12]=a*w+o*O+s*te+c*ie,i[1]=l*x+u*T+d*k+f*ne,i[5]=l*S+u*E+d*ee+f*j,i[9]=l*C+u*D+d*A+f*re,i[13]=l*w+u*O+d*te+f*ie,i[2]=p*x+m*T+h*k+g*ne,i[6]=p*S+m*E+h*ee+g*j,i[10]=p*C+m*D+h*A+g*re,i[14]=p*w+m*O+h*te+g*ie,i[3]=_*x+v*T+y*k+b*ne,i[7]=_*S+v*E+y*ee+b*j,i[11]=_*C+v*D+y*A+b*re,i[15]=_*w+v*O+y*te+b*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15];return p*(+i*s*u-r*c*u-i*o*d+n*c*d+r*o*f-n*s*f)+m*(+t*s*f-t*c*d+i*a*d-r*a*f+r*c*l-i*s*l)+h*(+t*c*u-t*o*f-i*a*u+n*a*f+i*o*l-n*c*l)+g*(-r*o*l-t*s*u+t*o*d+r*a*u-n*a*d+n*s*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=u*h*c-m*d*c+m*s*f-o*h*f-u*s*g+o*d*g,v=p*d*c-l*h*c-p*s*f+a*h*f+l*s*g-a*d*g,y=l*m*c-p*u*c+p*o*f-a*m*f-l*o*g+a*u*g,b=p*u*s-l*m*s-p*o*d+a*m*d+l*o*h-a*u*h,x=t*_+n*v+r*y+i*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=_*S,e[1]=(m*d*i-u*h*i-m*r*f+n*h*f+u*r*g-n*d*g)*S,e[2]=(o*h*i-m*s*i+m*r*c-n*h*c-o*r*g+n*s*g)*S,e[3]=(u*s*i-o*d*i-u*r*c+n*d*c+o*r*f-n*s*f)*S,e[4]=v*S,e[5]=(l*h*i-p*d*i+p*r*f-t*h*f-l*r*g+t*d*g)*S,e[6]=(p*s*i-a*h*i-p*r*c+t*h*c+a*r*g-t*s*g)*S,e[7]=(a*d*i-l*s*i+l*r*c-t*d*c-a*r*f+t*s*f)*S,e[8]=y*S,e[9]=(p*u*i-l*m*i-p*n*f+t*m*f+l*n*g-t*u*g)*S,e[10]=(a*m*i-p*o*i+p*n*c-t*m*c-a*n*g+t*o*g)*S,e[11]=(l*o*i-a*u*i-l*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=b*S,e[13]=(l*m*r-p*u*r+p*n*d-t*m*d-l*n*h+t*u*h)*S,e[14]=(p*o*r-a*m*r-p*n*s+t*m*s+a*n*h-t*o*h)*S,e[15]=(a*u*r-l*o*r+l*n*s-t*u*s-a*n*d+t*o*d)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=jn.set(r[0],r[1],r[2]).length(),a=jn.set(r[4],r[5],r[6]).length(),o=jn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],Mn.copy(this);let s=1/i,c=1/a,l=1/o;return Mn.elements[0]*=s,Mn.elements[1]*=s,Mn.elements[2]*=s,Mn.elements[4]*=c,Mn.elements[5]*=c,Mn.elements[6]*=c,Mn.elements[8]*=l,Mn.elements[9]*=l,Mn.elements[10]*=l,t.setFromRotationMatrix(Mn),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=Je){let s=this.elements,c=2*i/(t-e),l=2*i/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r),f,p;if(o===2e3)f=-(a+i)/(a-i),p=-2*a*i/(a-i);else if(o===2001)f=-a/(a-i),p=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return s[0]=c,s[4]=0,s[8]=u,s[12]=0,s[1]=0,s[5]=l,s[9]=d,s[13]=0,s[2]=0,s[6]=0,s[10]=f,s[14]=p,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Je){let s=this.elements,c=1/(t-e),l=1/(n-r),u=1/(a-i),d=(t+e)*c,f=(n+r)*l,p,m;if(o===2e3)p=(a+i)*u,m=-2*u;else if(o===2001)p=i*u,m=-1*u;else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-d,s[1]=0,s[5]=2*l,s[9]=0,s[13]=-f,s[2]=0,s[6]=0,s[10]=m,s[14]=-p,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},jn=new P,Mn=new An,Nn=new P(0,0,0),Pn=new P(1,1,1),Fn=new P,In=new P,Ln=new P,Rn=new An,zn=new $t,Bn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-tt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(tt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-tt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(tt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zn.setFromEuler(this),this.setFromQuaternion(zn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Bn.DEFAULT_ORDER=`XYZ`;var Vn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Hn=0,Un=new P,Wn=new $t,Gn=new An,Kn=new P,qn=new P,Jn=new P,Yn=new $t,Xn=new P(1,0,0),Zn=new P(0,1,0),Qn=new P(0,0,1),$n={type:`added`},er={type:`removed`},tr={type:`childadded`,child:null},nr={type:`childremoved`,child:null},rr=class e extends Ye{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hn++}),this.uuid=et(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new P,n=new Bn,r=new $t,i=new P(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new An},normalMatrix:{value:new Ct}}),this.matrix=new An,this.matrixWorld=new An,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wn.setFromAxisAngle(e,t),this.quaternion.multiply(Wn),this}rotateOnWorldAxis(e,t){return Wn.setFromAxisAngle(e,t),this.quaternion.premultiply(Wn),this}rotateX(e){return this.rotateOnAxis(Xn,e)}rotateY(e){return this.rotateOnAxis(Zn,e)}rotateZ(e){return this.rotateOnAxis(Qn,e)}translateOnAxis(e,t){return Un.copy(e).applyQuaternion(this.quaternion),this.position.add(Un.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xn,e)}translateY(e){return this.translateOnAxis(Zn,e)}translateZ(e){return this.translateOnAxis(Qn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Kn.copy(e):Kn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),qn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(qn,Kn,this.up):Gn.lookAt(Kn,qn,this.up),this.quaternion.setFromRotationMatrix(Gn),r&&(Gn.extractRotation(r.matrixWorld),Wn.setFromRotationMatrix(Gn),this.quaternion.premultiply(Wn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(console.error(`THREE.Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($n),tr.child=e,this.dispatchEvent(tr),tr.child=null):console.error(`THREE.Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(er),nr.child=e,this.dispatchEvent(nr),nr.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($n),tr.child=e,this.dispatchEvent(tr),tr.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qn,e,Jn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qn,Yn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(e=>({boxInitialized:e.boxInitialized,boxMin:e.box.min.toArray(),boxMax:e.box.max.toArray(),sphereInitialized:e.sphereInitialized,sphereRadius:e.sphere.radius,sphereCenter:e.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};rr.DEFAULT_UP=new P(0,1,0),rr.DEFAULT_MATRIX_AUTO_UPDATE=!0,rr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ir=new P,ar=new P,or=new P,sr=new P,cr=new P,lr=new P,ur=new P,dr=new P,fr=new P,pr=new P,mr=new Jt,hr=new Jt,gr=new Jt,_r=class e{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ir.subVectors(e,t),r.cross(ir);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){ir.subVectors(r,t),ar.subVectors(n,t),or.subVectors(e,t);let a=ir.dot(ir),o=ir.dot(ar),s=ir.dot(or),c=ar.dot(ar),l=ar.dot(or),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,sr)!==null&&sr.x>=0&&sr.y>=0&&sr.x+sr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,sr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,sr.x),s.addScaledVector(a,sr.y),s.addScaledVector(o,sr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return mr.setScalar(0),hr.setScalar(0),gr.setScalar(0),mr.fromBufferAttribute(e,t),hr.fromBufferAttribute(e,n),gr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(mr,i.x),a.addScaledVector(hr,i.y),a.addScaledVector(gr,i.z),a}static isFrontFacing(e,t,n,r){return ir.subVectors(n,t),ar.subVectors(e,t),ir.cross(ar).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ir.subVectors(this.c,this.b),ar.subVectors(this.a,this.b),ir.cross(ar).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;cr.subVectors(r,n),lr.subVectors(i,n),dr.subVectors(e,n);let s=cr.dot(dr),c=lr.dot(dr);if(s<=0&&c<=0)return t.copy(n);fr.subVectors(e,r);let l=cr.dot(fr),u=lr.dot(fr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(cr,a);pr.subVectors(e,i);let f=cr.dot(pr),p=lr.dot(pr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(lr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return ur.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(ur,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(cr,a).addScaledVector(lr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},vr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yr={h:0,s:0,l:0},br={h:0,s:0,l:0};function xr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var F=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=He){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Nt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Nt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Nt.workingColorSpace){if(e=nt(e,1),t=tt(t,0,1),n=tt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=xr(i,r,e+1/3),this.g=xr(i,r,e),this.b=xr(i,r,e-1/3)}return Nt.toWorkingColorSpace(this,r),this}setStyle(e,t=He){function n(t){t!==void 0&&parseFloat(t)<1&&console.warn(`THREE.Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn(`THREE.Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);console.warn(`THREE.Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=He){let n=vr[e.toLowerCase()];return n===void 0?console.warn(`THREE.Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pt(e.r),this.g=Pt(e.g),this.b=Pt(e.b),this}copyLinearToSRGB(e){return this.r=Ft(e.r),this.g=Ft(e.g),this.b=Ft(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=He){return Nt.fromWorkingColorSpace(Sr.copy(this),e),Math.round(tt(Sr.r*255,0,255))*65536+Math.round(tt(Sr.g*255,0,255))*256+Math.round(tt(Sr.b*255,0,255))}getHexString(e=He){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Nt.workingColorSpace){Nt.fromWorkingColorSpace(Sr.copy(this),t);let n=Sr.r,r=Sr.g,i=Sr.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Nt.workingColorSpace){return Nt.fromWorkingColorSpace(Sr.copy(this),t),e.r=Sr.r,e.g=Sr.g,e.b=Sr.b,e}getStyle(e=He){Nt.fromWorkingColorSpace(Sr.copy(this),e);let t=Sr.r,n=Sr.g,r=Sr.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(yr),this.setHSL(yr.h+e,yr.s+t,yr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yr),e.getHSL(br);let n=at(yr.h,br.h,t),r=at(yr.s,br.s,t),i=at(yr.l,br.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Sr=new F;F.NAMES=vr;var Cr=0,wr=class extends Ye{static get type(){return`Material`}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cr++}),this.uuid=et(),this.name=``,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new F(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ke,this.stencilZFail=Ke,this.stencilZPass=Ke,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn(`Material: onBuild() has been removed.`)}},Tr=class extends wr{static get type(){return`MeshBasicMaterial`}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new F(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Er=new P,Dr=new N,Or=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=qe,this.updateRanges=[],this.gpuType=_,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXY(t,Dr.x,Dr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Er.fromBufferAttribute(this,t),Er.applyMatrix3(e),this.setXYZ(t,Er.x,Er.y,Er.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Er.fromBufferAttribute(this,t),Er.applyMatrix4(e),this.setXYZ(t,Er.x,Er.y,Er.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Er.fromBufferAttribute(this,t),Er.applyNormalMatrix(e),this.setXYZ(t,Er.x,Er.y,Er.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Er.fromBufferAttribute(this,t),Er.transformDirection(e),this.setXYZ(t,Er.x,Er.y,Er.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bt(t,this.array)),t}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bt(t,this.array)),t}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bt(t,this.array)),t}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),r=xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),r=xt(r,this.array),i=xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},kr=class extends Or{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Ar=class extends Or{constructor(e,t,n){super(new Uint32Array(e),t,n)}},jr=class extends Or{constructor(e,t,n){super(new Float32Array(e),t,n)}},Mr=0,Nr=new An,Pr=new rr,Fr=new P,Ir=new nn,Lr=new nn,Rr=new P,zr=class e extends Ye{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mr++}),this.uuid=et(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Tt(e)?Ar:kr)(e,1):e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Ct().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nr.makeRotationFromQuaternion(e),this.applyMatrix4(Nr),this}rotateX(e){return Nr.makeRotationX(e),this.applyMatrix4(Nr),this}rotateY(e){return Nr.makeRotationY(e),this.applyMatrix4(Nr),this}rotateZ(e){return Nr.makeRotationZ(e),this.applyMatrix4(Nr),this}translate(e,t,n){return Nr.makeTranslation(e,t,n),this.applyMatrix4(Nr),this}scale(e,t,n){return Nr.makeScale(e,t,n),this.applyMatrix4(Nr),this}lookAt(e){return Pr.lookAt(e),Pr.updateMatrix(),this.applyMatrix4(Pr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fr).negate(),this.translate(Fr.x,Fr.y,Fr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new jr(t,3))}else{for(let n=0,r=t.count;n<r;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn(`THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error(`THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ir.setFromBufferAttribute(n),this.morphTargetsRelative?(Rr.addVectors(this.boundingBox.min,Ir.min),this.boundingBox.expandByPoint(Rr),Rr.addVectors(this.boundingBox.max,Ir.max),this.boundingBox.expandByPoint(Rr)):(this.boundingBox.expandByPoint(Ir.min),this.boundingBox.expandByPoint(Ir.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error(`THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error(`THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(Ir.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Lr.setFromBufferAttribute(n),this.morphTargetsRelative?(Rr.addVectors(Ir.min,Lr.min),Ir.expandByPoint(Rr),Rr.addVectors(Ir.max,Lr.max),Ir.expandByPoint(Rr)):(Ir.expandByPoint(Lr.min),Ir.expandByPoint(Lr.max))}Ir.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Rr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Rr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Rr.fromBufferAttribute(a,t),o&&(Fr.fromBufferAttribute(e,t),Rr.add(Fr)),r=Math.max(r,n.distanceToSquared(Rr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error(`THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new Or(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new P,s[e]=new P;let c=new P,l=new P,u=new P,d=new N,f=new N,p=new N,m=new P,h=new P;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new P,y=new P,b=new P,x=new P;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new Or(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new P,i=new P,a=new P,o=new P,s=new P,c=new P,l=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rr.fromBufferAttribute(e,t),Rr.normalize(),e.setXYZ(t,Rr.x,Rr.y,Rr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Or(a,r,i)}if(this.index===null)return console.warn(`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.6,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},Br=new An,Vr=new kn,Hr=new xn,Ur=new P,Wr=new P,Gr=new P,Kr=new P,qr=new P,Jr=new P,Yr=new P,Xr=new P,I=class extends rr{constructor(e=new zr,t=new Tr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Jr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(qr.fromBufferAttribute(s,e),a?Jr.addScaledVector(qr,r):Jr.addScaledVector(qr.sub(t),r))}t.add(Jr)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(i),Vr.copy(e.ray).recast(e.near),!(Hr.containsPoint(Vr.origin)===!1&&(Vr.intersectSphere(Hr,Ur)===null||Vr.origin.distanceToSquared(Ur)>(e.far-e.near)**2))&&(Br.copy(i).invert(),Vr.copy(e.ray).applyMatrix4(Br),(n.boundingBox===null||Vr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Vr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Qr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Qr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Qr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Qr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Zr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Xr.copy(s),Xr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Xr);return l<n.near||l>n.far?null:{distance:l,point:Xr.clone(),object:e}}function Qr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Wr),e.getVertexPosition(c,Gr),e.getVertexPosition(l,Kr);let u=Zr(e,t,n,r,Wr,Gr,Kr,Yr);if(u){let e=new P;_r.getBarycoord(Yr,Wr,Gr,Kr,e),i&&(u.uv=_r.getInterpolatedAttribute(i,s,c,l,e,new N)),a&&(u.uv1=_r.getInterpolatedAttribute(a,s,c,l,e,new N)),o&&(u.normal=_r.getInterpolatedAttribute(o,s,c,l,e,new P),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new P,materialIndex:0};_r.getNormal(Wr,Gr,Kr,t.normal),u.face=t,u.barycoord=e}return u}var L=class e extends zr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new jr(c,3)),this.setAttribute(`normal`,new jr(l,3)),this.setAttribute(`uv`,new jr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new P;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function $r(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function ei(e){let t={};for(let n=0;n<e.length;n++){let r=$r(e[n]);for(let e in r)t[e]=r[e]}return t}function ti(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ni(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Nt.workingColorSpace}var ri={clone:$r,merge:ei},ii=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ai=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,oi=class extends wr{static get type(){return`ShaderMaterial`}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ii,this.fragmentShader=ai,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$r(e.uniforms),this.uniformsGroups=ti(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},si=class extends rr{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new An,this.projectionMatrix=new An,this.projectionMatrixInverse=new An,this.coordinateSystem=Je}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ci=new P,li=new N,ui=new N,di=class extends si{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=$e*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Qe*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $e*2*Math.atan(Math.tan(Qe*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ci.x,ci.y).multiplyScalar(-e/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-e/ci.z)}getViewSize(e,t){return this.getViewBounds(e,li,ui),t.subVectors(ui,li)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Qe*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},fi=-90,pi=1,mi=class extends rr{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new di(fi,pi,e,t);r.layers=this.layers,this.add(r);let i=new di(fi,pi,e,t);i.layers=this.layers,this.add(i);let a=new di(fi,pi,e,t);a.layers=this.layers,this.add(a);let o=new di(fi,pi,e,t);o.layers=this.layers,this.add(o);let s=new di(fi,pi,e,t);s.layers=this.layers,this.add(s);let c=new di(fi,pi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,i),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},hi=class extends qt{constructor(e,t,n,r,i,a,o,s,c,l){e=e===void 0?[]:e,t=t===void 0?301:t,super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},gi=class extends Xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new hi(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter===void 0?c:t.minFilter}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new L(5,5,5),i=new oi({name:`CubemapFromEquirect`,uniforms:$r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new I(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=c),new mi(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},_i=new P,vi=new P,yi=new Ct,bi=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=_i.subVectors(n,t).cross(vi.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(_i),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||yi.getNormalMatrix(e),r=this.coplanarPoint(_i).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},xi=new xn,Si=new P,Ci=class{constructor(e=new bi,t=new bi,n=new bi,r=new bi,i=new bi,a=new bi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Je){let n=this.planes,r=e.elements,i=r[0],a=r[1],o=r[2],s=r[3],c=r[4],l=r[5],u=r[6],d=r[7],f=r[8],p=r[9],m=r[10],h=r[11],g=r[12],_=r[13],v=r[14],y=r[15];if(n[0].setComponents(s-i,d-c,h-f,y-g).normalize(),n[1].setComponents(s+i,d+c,h+f,y+g).normalize(),n[2].setComponents(s+a,d+l,h+p,y+_).normalize(),n[3].setComponents(s-a,d-l,h-p,y-_).normalize(),n[4].setComponents(s-o,d-u,h-m,y-v).normalize(),t===2e3)n[5].setComponents(s+o,d+u,h+m,y+v).normalize();else if(t===2001)n[5].setComponents(o,u,m,v).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(e){return xi.center.set(0,0,0),xi.radius=.7071067811865476,xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Si.x=r.normal.x>0?e.max.x:e.min.x,Si.y=r.normal.y>0?e.max.y:e.min.y,Si.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Si)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function wi(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ti(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Ei=class e extends zr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new jr(p,3)),this.setAttribute(`normal`,new jr(m,3)),this.setAttribute(`uv`,new jr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Di={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},R={common:{diffuse:{value:new F(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ct}},envmap:{envMap:{value:null},envMapRotation:{value:new Ct},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ct},normalScale:{value:new N(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new F(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new F(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0},uvTransform:{value:new Ct}},sprite:{diffuse:{value:new F(16777215)},opacity:{value:1},center:{value:new N(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}}},Oi={basic:{uniforms:ei([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.fog]),vertexShader:Di.meshbasic_vert,fragmentShader:Di.meshbasic_frag},lambert:{uniforms:ei([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.fog,R.lights,{emissive:{value:new F(0)}}]),vertexShader:Di.meshlambert_vert,fragmentShader:Di.meshlambert_frag},phong:{uniforms:ei([R.common,R.specularmap,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.fog,R.lights,{emissive:{value:new F(0)},specular:{value:new F(1118481)},shininess:{value:30}}]),vertexShader:Di.meshphong_vert,fragmentShader:Di.meshphong_frag},standard:{uniforms:ei([R.common,R.envmap,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.roughnessmap,R.metalnessmap,R.fog,R.lights,{emissive:{value:new F(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Di.meshphysical_vert,fragmentShader:Di.meshphysical_frag},toon:{uniforms:ei([R.common,R.aomap,R.lightmap,R.emissivemap,R.bumpmap,R.normalmap,R.displacementmap,R.gradientmap,R.fog,R.lights,{emissive:{value:new F(0)}}]),vertexShader:Di.meshtoon_vert,fragmentShader:Di.meshtoon_frag},matcap:{uniforms:ei([R.common,R.bumpmap,R.normalmap,R.displacementmap,R.fog,{matcap:{value:null}}]),vertexShader:Di.meshmatcap_vert,fragmentShader:Di.meshmatcap_frag},points:{uniforms:ei([R.points,R.fog]),vertexShader:Di.points_vert,fragmentShader:Di.points_frag},dashed:{uniforms:ei([R.common,R.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Di.linedashed_vert,fragmentShader:Di.linedashed_frag},depth:{uniforms:ei([R.common,R.displacementmap]),vertexShader:Di.depth_vert,fragmentShader:Di.depth_frag},normal:{uniforms:ei([R.common,R.bumpmap,R.normalmap,R.displacementmap,{opacity:{value:1}}]),vertexShader:Di.meshnormal_vert,fragmentShader:Di.meshnormal_frag},sprite:{uniforms:ei([R.sprite,R.fog]),vertexShader:Di.sprite_vert,fragmentShader:Di.sprite_frag},background:{uniforms:{uvTransform:{value:new Ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Di.background_vert,fragmentShader:Di.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ct}},vertexShader:Di.backgroundCube_vert,fragmentShader:Di.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Di.cube_vert,fragmentShader:Di.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Di.equirect_vert,fragmentShader:Di.equirect_frag},distanceRGBA:{uniforms:ei([R.common,R.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Di.distanceRGBA_vert,fragmentShader:Di.distanceRGBA_frag},shadow:{uniforms:ei([R.lights,R.fog,{color:{value:new F(0)},opacity:{value:1}}]),vertexShader:Di.shadow_vert,fragmentShader:Di.shadow_frag}};Oi.physical={uniforms:ei([Oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ct},clearcoatNormalScale:{value:new N(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ct},sheen:{value:0},sheenColor:{value:new F(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ct},transmissionSamplerSize:{value:new N},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ct},attenuationDistance:{value:0},attenuationColor:{value:new F(0)},specularColor:{value:new F(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ct},anisotropyVector:{value:new N},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ct}}]),vertexShader:Di.meshphysical_vert,fragmentShader:Di.meshphysical_frag};var ki={r:0,b:0,g:0},Ai=new Bn,ji=new An;function Mi(e,t,n,r,i,a,o){let s=new F(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let r=e.isScene===!0?e.background:null;return r&&r.isTexture&&(r=(e.backgroundBlurriness>0?n:t).get(r)),r}function h(t){let n=!1,i=m(t);i===null?_(s,c):i&&i.isColor&&(_(i,1),n=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?r.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||n)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let r=m(n);r&&(r.isCubeTexture||r.mapping===306)?(u===void 0&&(u=new I(new L(1,1,1),new oi({name:`BackgroundCubeMaterial`,uniforms:$r(Oi.backgroundCube.uniforms),vertexShader:Oi.backgroundCube.vertexShader,fragmentShader:Oi.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ai.copy(n.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,r.isCubeTexture&&r.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),u.material.uniforms.envMap.value=r,u.material.uniforms.flipEnvMap.value=r.isCubeTexture&&r.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ji.makeRotationFromEuler(Ai)),u.material.toneMapped=Nt.getTransfer(r.colorSpace)!==Ge,(d!==r||f!==r.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):r&&r.isTexture&&(l===void 0&&(l=new I(new Ei(2,2),new oi({name:`BackgroundMaterial`,uniforms:$r(Oi.background.uniforms),vertexShader:Oi.background.vertexShader,fragmentShader:Oi.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=r,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=Nt.getTransfer(r.colorSpace)!==Ge,r.matrixAutoUpdate===!0&&r.updateMatrix(),l.material.uniforms.uvTransform.value.copy(r.matrix),(d!==r||f!==r.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,n){t.getRGB(ki,ni(e)),r.buffers.color.setClear(ki.r,ki.g,ki.b,n,o)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,_(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(s,c)},render:h,addToRenderList:g}}function Ni(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n){let i=n.wireframe===!0,a=r[e.id];a===void 0&&(a={},r[e.id]=a);let o=a[t.id];o===void 0&&(o={},a[t.id]=o);let s=o[i];return s===void 0&&(s=f(c()),o[i]=s),s}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){w();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e.id]}function C(e){for(let t in r){let n=r[t];if(n[e.id]===void 0)continue;let i=n[e.id];for(let e in i)u(i[e].object),delete i[e];delete n[e.id]}}function w(){T(),o=!0,a!==i&&(a=i,l(a.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:w,resetDefaultState:T,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Pi(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}function c(e,i,a,s){if(a===0)return;let c=t.get(`WEBGL_multi_draw`);if(c===null)for(let t=0;t<e.length;t++)o(e[t],i[t],s[t]);else{c.multiDrawArraysInstancedWEBGL(r,e,0,i,0,s,0,a);let t=0;for(let e=0;e<a;e++)t+=i[e]*s[e];n.update(t,r,1)}}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=c}function Fi(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(console.warn(`THREE.WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&t.has(`EXT_clip_control`),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=m>0,S=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:x,maxSamples:S}}function Ii(e){let t=this,n=null,r=0,i=!1,a=!1,o=new bi,s=new Ct,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function Li(e){let t=new WeakMap;function n(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function r(r){if(r&&r.isTexture){let a=r.mapping;if(a===303||a===304){if(t.has(r)){let e=t.get(r).texture;return n(e,r.mapping)}{let a=r.image;if(a&&a.height>0){let o=new gi(a.height);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener(`dispose`,i),n(o.texture,r.mapping)}return null}}}return r}function i(e){let n=e.target;n.removeEventListener(`dispose`,i);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function a(){t=new WeakMap}return{get:r,dispose:a}}var Ri=class extends si{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},zi=4,Bi=[.125,.215,.35,.446,.526,.582],Vi=20,Hi=new Ri,Ui=new F,Wi=null,Gi=0,Ki=0,qi=!1,Ji=(1+Math.sqrt(5))/2,Yi=1/Ji,Xi=[new P(-Ji,Yi,0),new P(Ji,Yi,0),new P(-Yi,0,Ji),new P(Yi,0,Ji),new P(0,Ji,-Yi),new P(0,Ji,Yi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Zi=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Wi=this._renderer.getRenderTarget(),Gi=this._renderer.getActiveCubeFace(),Ki=this._renderer.getActiveMipmapLevel(),qi=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(e,n,r,i),t>0&&this._blur(i,0,0,t),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ra(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=na(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Wi,Gi,Ki),this._renderer.xr.enabled=qi,e.scissorTest=!1,ea(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wi=this._renderer.getRenderTarget(),Gi=this._renderer.getActiveCubeFace(),Ki=this._renderer.getActiveMipmapLevel(),qi=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:c,minFilter:c,generateMipmaps:!1,type:v,format:T,colorSpace:Ue,depthBuffer:!1},r=$i(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$i(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qi(r)),this._blurMaterial=ta(r,e,t)}return r}_compileMaterial(e){let t=new I(this._lodPlanes[0],e);this._renderer.compile(t,Hi)}_sceneToCubeUV(e,t,n,r){let i=new di(90,1,t,n),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],s=this._renderer,c=s.autoClear,l=s.toneMapping;s.getClearColor(Ui),s.toneMapping=0,s.autoClear=!1;let u=new Tr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1}),d=new I(new L,u),f=!1,p=e.background;p?p.isColor&&(u.color.copy(p),e.background=null,f=!0):(u.color.copy(Ui),f=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(i.up.set(0,a[t],0),i.lookAt(o[t],0,0)):n===1?(i.up.set(0,0,a[t]),i.lookAt(0,o[t],0)):(i.up.set(0,a[t],0),i.lookAt(0,0,o[t]));let c=this._cubeSize;ea(r,n*c,t>2?c:0,c,c),s.setRenderTarget(r),f&&s.render(d,i),s.render(e,i)}d.geometry.dispose(),d.material.dispose(),s.toneMapping=l,s.autoClear=c,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ra()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=na());let i=r?this._cubemapMaterial:this._equirectMaterial,a=new I(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;ea(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Hi)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let t=1;t<r;t++){let n=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),i=Xi[(r-t-1)%Xi.length];this._blur(e,t-1,t,n,i)}t.autoClear=n}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&console.error(`blur direction must be either latitudinal or longitudinal!`);let l=new I(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Vi;m>Vi&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vi}`);let h=[],g=0;for(let e=0;e<Vi;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];ea(t,3*v*(r>_-zi?r-_+zi:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Hi)}};function Qi(e){let t=[],n=[],r=[],i=e,a=e-zi+1+Bi.length;for(let o=0;o<a;o++){let a=2**i;n.push(a);let s=1/a;o>e-zi?s=Bi[o-e+zi-1]:o===0&&(s=0),r.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new zr;h.setAttribute(`position`,new Or(f,3)),h.setAttribute(`uv`,new Or(p,2)),h.setAttribute(`faceIndex`,new Or(m,1)),t.push(h),i>zi&&i--}return{lodPlanes:t,sizeLods:n,sigmas:r}}function $i(e,t,n){let r=new Xt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function ea(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function ta(e,t,n){let r=new Float32Array(Vi),i=new P(0,1,0);return new oi({name:`SphericalGaussianBlur`,defines:{n:Vi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function na(){return new oi({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ra(){return new oi({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ia(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function aa(e){let t=new WeakMap,n=null;function r(r){if(r&&r.isTexture){let o=r.mapping,s=o===303||o===304,c=o===301||o===302;if(s||c){let o=t.get(r),l=o===void 0?0:o.texture.pmremVersion;if(r.isRenderTargetTexture&&r.pmremVersion!==l)return n===null&&(n=new Zi(e)),o=s?n.fromEquirectangular(r,o):n.fromCubemap(r,o),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),o.texture;if(o!==void 0)return o.texture;{let l=r.image;return s&&l&&l.height>0||c&&l&&i(l)?(n===null&&(n=new Zi(e)),o=s?n.fromEquirectangular(r):n.fromCubemap(r),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),r.addEventListener(`dispose`,a),o.texture):null}}}return r}function i(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function a(e){let n=e.target;n.removeEventListener(`dispose`,a);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:o}}function oa(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r;switch(n){case`WEBGL_depth_texture`:r=e.getExtension(`WEBGL_depth_texture`)||e.getExtension(`MOZ_WEBGL_depth_texture`)||e.getExtension(`WEBKIT_WEBGL_depth_texture`);break;case`EXT_texture_filter_anisotropic`:r=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);break;case`WEBGL_compressed_texture_s3tc`:r=e.getExtension(`WEBGL_compressed_texture_s3tc`)||e.getExtension(`MOZ_WEBGL_compressed_texture_s3tc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_s3tc`);break;case`WEBGL_compressed_texture_pvrtc`:r=e.getExtension(`WEBGL_compressed_texture_pvrtc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_pvrtc`);break;default:r=e.getExtension(n)}return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&kt(`THREE.WebGLRenderer: `+e+` extension not supported.`),t}}}function sa(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);for(let e in s.morphAttributes){let n=s.morphAttributes[e];for(let e=0,r=n.length;e<r;e++)t.remove(n[e])}s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER);let i=n.morphAttributes;for(let n in i){let r=i[n];for(let n=0,i=r.length;n<i;n++)t.update(r[n],e.ARRAY_BUFFER)}}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else if(i!==void 0){let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}else return;let s=new(Tt(n)?Ar:kr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function ca(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}function d(e,i,s,c){if(s===0)return;let u=t.get(`WEBGL_multi_draw`);if(u===null)for(let t=0;t<e.length;t++)l(e[t]/o,i[t],c[t]);else{u.multiDrawElementsInstancedWEBGL(r,i,0,a,e,0,c,0,s);let t=0;for(let e=0;e<s;e++)t+=i[e]*c[e];n.update(t,r,1)}}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function la(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:console.error(`THREE.WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ua(e,t,n){let r=new WeakMap,i=new Jt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Zt(h,p,m,u);g.type=_,g.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new N(p,m)},r.set(o,d);function y(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function da(e,t,n,r){let i=new WeakMap;function a(a){let o=r.render.frame,c=a.geometry,l=t.get(a,c);if(i.get(l)!==o&&(t.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener(`dispose`,s)===!1&&a.addEventListener(`dispose`,s),i.get(a)!==o&&(n.update(a.instanceMatrix,e.ARRAY_BUFFER),a.instanceColor!==null&&n.update(a.instanceColor,e.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let e=a.skeleton;i.get(e)!==o&&(e.update(),i.set(e,o))}return l}function o(){i=new WeakMap}function s(e){let t=e.target;t.removeEventListener(`dispose`,s),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:a,dispose:o}}var fa=class extends qt{constructor(e,t,n,r,i,o,s,c,l,u=O){if(u!==1026&&u!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);n===void 0&&u===1026&&(n=g),n===void 0&&u===1027&&(n=x),super(null,r,i,o,s,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=s===void 0?a:s,this.minFilter=c===void 0?a:c,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},pa=new qt,ma=new fa(1,1),ha=new Zt,ga=new Qt,_a=new hi,va=[],ya=[],ba=new Float32Array(16),xa=new Float32Array(9),Sa=new Float32Array(4);function Ca(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=va[i];if(a===void 0&&(a=new Float32Array(i),va[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function wa(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Ta(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ea(e,t){let n=ya[t];n===void 0&&(n=new Int32Array(t),ya[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Da(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Oa(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wa(n,t))return;e.uniform2fv(this.addr,t),Ta(n,t)}}function ka(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(wa(n,t))return;e.uniform3fv(this.addr,t),Ta(n,t)}}function Aa(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wa(n,t))return;e.uniform4fv(this.addr,t),Ta(n,t)}}function ja(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(wa(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ta(n,t)}else{if(wa(n,r))return;Sa.set(r),e.uniformMatrix2fv(this.addr,!1,Sa),Ta(n,r)}}function Ma(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(wa(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ta(n,t)}else{if(wa(n,r))return;xa.set(r),e.uniformMatrix3fv(this.addr,!1,xa),Ta(n,r)}}function Na(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(wa(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ta(n,t)}else{if(wa(n,r))return;ba.set(r),e.uniformMatrix4fv(this.addr,!1,ba),Ta(n,r)}}function Pa(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Fa(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wa(n,t))return;e.uniform2iv(this.addr,t),Ta(n,t)}}function Ia(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(wa(n,t))return;e.uniform3iv(this.addr,t),Ta(n,t)}}function La(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wa(n,t))return;e.uniform4iv(this.addr,t),Ta(n,t)}}function Ra(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function za(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wa(n,t))return;e.uniform2uiv(this.addr,t),Ta(n,t)}}function Ba(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(wa(n,t))return;e.uniform3uiv(this.addr,t),Ta(n,t)}}function Va(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wa(n,t))return;e.uniform4uiv(this.addr,t),Ta(n,t)}}function Ha(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(ma.compareFunction=515,a=ma):a=pa,n.setTexture2D(t||a,i)}function Ua(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ga,i)}function Wa(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||_a,i)}function Ga(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ha,i)}function Ka(e){switch(e){case 5126:return Da;case 35664:return Oa;case 35665:return ka;case 35666:return Aa;case 35674:return ja;case 35675:return Ma;case 35676:return Na;case 5124:case 35670:return Pa;case 35667:case 35671:return Fa;case 35668:case 35672:return Ia;case 35669:case 35673:return La;case 5125:return Ra;case 36294:return za;case 36295:return Ba;case 36296:return Va;case 35678:case 36198:case 36298:case 36306:case 35682:return Ha;case 35679:case 36299:case 36307:return Ua;case 35680:case 36300:case 36308:case 36293:return Wa;case 36289:case 36303:case 36311:case 36292:return Ga}}function qa(e,t){e.uniform1fv(this.addr,t)}function Ja(e,t){let n=Ca(t,this.size,2);e.uniform2fv(this.addr,n)}function Ya(e,t){let n=Ca(t,this.size,3);e.uniform3fv(this.addr,n)}function Xa(e,t){let n=Ca(t,this.size,4);e.uniform4fv(this.addr,n)}function Za(e,t){let n=Ca(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Qa(e,t){let n=Ca(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function $a(e,t){let n=Ca(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function eo(e,t){e.uniform1iv(this.addr,t)}function to(e,t){e.uniform2iv(this.addr,t)}function no(e,t){e.uniform3iv(this.addr,t)}function ro(e,t){e.uniform4iv(this.addr,t)}function io(e,t){e.uniform1uiv(this.addr,t)}function ao(e,t){e.uniform2uiv(this.addr,t)}function oo(e,t){e.uniform3uiv(this.addr,t)}function so(e,t){e.uniform4uiv(this.addr,t)}function co(e,t,n){let r=this.cache,i=t.length,a=Ea(n,i);wa(r,a)||(e.uniform1iv(this.addr,a),Ta(r,a));for(let e=0;e!==i;++e)n.setTexture2D(t[e]||pa,a[e])}function lo(e,t,n){let r=this.cache,i=t.length,a=Ea(n,i);wa(r,a)||(e.uniform1iv(this.addr,a),Ta(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ga,a[e])}function uo(e,t,n){let r=this.cache,i=t.length,a=Ea(n,i);wa(r,a)||(e.uniform1iv(this.addr,a),Ta(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||_a,a[e])}function fo(e,t,n){let r=this.cache,i=t.length,a=Ea(n,i);wa(r,a)||(e.uniform1iv(this.addr,a),Ta(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ha,a[e])}function po(e){switch(e){case 5126:return qa;case 35664:return Ja;case 35665:return Ya;case 35666:return Xa;case 35674:return Za;case 35675:return Qa;case 35676:return $a;case 5124:case 35670:return eo;case 35667:case 35671:return to;case 35668:case 35672:return no;case 35669:case 35673:return ro;case 5125:return io;case 36294:return ao;case 36295:return oo;case 36296:return so;case 35678:case 36198:case 36298:case 36306:case 35682:return co;case 35679:case 36299:case 36307:return lo;case 35680:case 36300:case 36308:case 36293:return uo;case 36289:case 36303:case 36311:case 36292:return fo}}var mo=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ka(t.type)}},ho=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=po(t.type)}},go=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},_o=/(\w+)(\])?(\[|\.)?/g;function vo(e,t){e.seq.push(t),e.map[t.id]=t}function yo(e,t,n){let r=e.name,i=r.length;for(_o.lastIndex=0;;){let a=_o.exec(r),o=_o.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){vo(n,l===void 0?new mo(s,e,t):new ho(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new go(s),vo(n,e)),n=e}}}var bo=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);yo(n,e.getUniformLocation(t,n.name),this)}}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function xo(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var So=37297,Co=0;function wo(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var To=new Ct;function Eo(e){Nt._getMatrix(To,Nt.workingColorSpace,e);let t=`mat3( ${To.elements.map(e=>e.toFixed(4))} )`;switch(Nt.getTransfer(e)){case We:return[t,`LinearTransferOETF`];case Ge:return[t,`sRGBTransferOETF`];default:return console.warn(`THREE.WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Do(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=e.getShaderInfoLog(t).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+wo(e.getShaderSource(t),r)}return i}function Oo(e,t){let n=Eo(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}function ko(e,t){let n;switch(t){case 1:n=`Linear`;break;case 2:n=`Reinhard`;break;case 3:n=`Cineon`;break;case 4:n=`ACESFilmic`;break;case 6:n=`AgX`;break;case 7:n=`Neutral`;break;case 5:n=`Custom`;break;default:console.warn(`THREE.WebGLProgram: Unsupported toneMapping:`,t),n=`Linear`}return`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Ao=new P;function jo(){return Nt.getLuminanceCoefficients(Ao),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Ao.x.toFixed(4)}, ${Ao.y.toFixed(4)}, ${Ao.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Mo(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Fo).join(`
`)}function No(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Po(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Fo(e){return e!==``}function Io(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Lo(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ro=/^[ \t]*#include +<([\w\d./]+)>/gm;function zo(e){return e.replace(Ro,Vo)}var Bo=new Map;function Vo(e,t){let n=Di[t];if(n===void 0){let e=Bo.get(t);if(e!==void 0)n=Di[e],console.warn(`THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return zo(n)}var Ho=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uo(e){return e.replace(Ho,Wo)}function Wo(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Go(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function Ko(e){let t=`SHADOWMAP_TYPE_BASIC`;return e.shadowMapType===1?t=`SHADOWMAP_TYPE_PCF`:e.shadowMapType===2?t=`SHADOWMAP_TYPE_PCF_SOFT`:e.shadowMapType===3&&(t=`SHADOWMAP_TYPE_VSM`),t}function qo(e){let t=`ENVMAP_TYPE_CUBE`;if(e.envMap)switch(e.envMapMode){case 301:case 302:t=`ENVMAP_TYPE_CUBE`;break;case 306:t=`ENVMAP_TYPE_CUBE_UV`}return t}function Jo(e){let t=`ENVMAP_MODE_REFLECTION`;if(e.envMap)switch(e.envMapMode){case 302:t=`ENVMAP_MODE_REFRACTION`}return t}function Yo(e){let t=`ENVMAP_BLENDING_NONE`;if(e.envMap)switch(e.combine){case 0:t=`ENVMAP_BLENDING_MULTIPLY`;break;case 1:t=`ENVMAP_BLENDING_MIX`;break;case 2:t=`ENVMAP_BLENDING_ADD`}return t}function Xo(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Zo(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Ko(n),l=qo(n),u=Jo(n),d=Yo(n),f=Xo(n),p=Mo(n),m=No(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Fo).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Fo).join(`
`),_.length>0&&(_+=`
`)):(g=[Go(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.reverseDepthBuffer?`#define USE_REVERSEDEPTHBUF`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Fo).join(`
`),_=[Go(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor||n.batchingColor?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGDEPTHBUF`:``,n.reverseDepthBuffer?`#define USE_REVERSEDEPTHBUF`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Di.tonemapping_pars_fragment,n.toneMapping===0?``:ko(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Di.colorspace_pars_fragment,Oo(`linearToOutputTexel`,n.outputColorSpace),jo(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Fo).join(`
`)),o=zo(o),o=Io(o,n),o=Lo(o,n),s=zo(s),s=Io(s,n),s=Lo(s,n),o=Uo(o),s=Uo(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=xo(i,i.VERTEX_SHADER,y),S=xo(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h).trim(),r=i.getShaderInfoLog(x).trim(),a=i.getShaderInfoLog(S).trim(),o=!0,s=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(o=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Do(i,x,`vertex`),r=Do(i,S,`fragment`);console.error(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+n+`
`+e+`
`+r)}}else n===``?(r===``||a===``)&&(s=!1):console.warn(`THREE.WebGLProgram: Program Info Log:`,n);s&&(t.diagnostics={runnable:o,programLog:n,vertexShader:{log:r,prefix:g},fragmentShader:{log:a,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new bo(i,h),T=Po(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,So)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Co++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Qo=0,$o=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new es(e),t.set(e,n)),n}},es=class{constructor(e){this.id=Qo++,this.code=e,this.usedTimes=0}};function ts(e,t,n,r,i,a,o){let s=new Vn,c=new $o,l=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distanceRGBA`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return l.add(e),e===0?`uv`:`uv${e}`}function g(a,s,u,g,_){let v=g.fog,y=_.geometry,b=a.isMeshStandardMaterial?g.environment:null,x=(a.isMeshStandardMaterial?n:t).get(a.envMap||b),S=x&&x.mapping===306?x.image.height:null,C=m[a.type];a.precision!==null&&(p=i.getMaxPrecision(a.precision),p!==a.precision&&console.warn(`THREE.WebGLProgram.getParameters:`,a.precision,`not supported, using`,p,`instead.`));let w=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,T=w===void 0?0:w.length,E=0;y.morphAttributes.position!==void 0&&(E=1),y.morphAttributes.normal!==void 0&&(E=2),y.morphAttributes.color!==void 0&&(E=3);let D,O,k,ee;if(C){let e=Oi[C];D=e.vertexShader,O=e.fragmentShader}else D=a.vertexShader,O=a.fragmentShader,c.update(a),k=c.getVertexShaderID(a),ee=c.getFragmentShaderID(a);let A=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),ne=_.isInstancedMesh===!0,j=_.isBatchedMesh===!0,re=!!a.map,ie=!!a.matcap,ae=!!x,oe=!!a.aoMap,se=!!a.lightMap,ce=!!a.bumpMap,le=!!a.normalMap,ue=!!a.displacementMap,de=!!a.emissiveMap,fe=!!a.metalnessMap,pe=!!a.roughnessMap,me=a.anisotropy>0,he=a.clearcoat>0,ge=a.dispersion>0,_e=a.iridescence>0,ve=a.sheen>0,ye=a.transmission>0,M=me&&!!a.anisotropyMap,be=he&&!!a.clearcoatMap,xe=he&&!!a.clearcoatNormalMap,Se=he&&!!a.clearcoatRoughnessMap,Ce=_e&&!!a.iridescenceMap,we=_e&&!!a.iridescenceThicknessMap,Te=ve&&!!a.sheenColorMap,Ee=ve&&!!a.sheenRoughnessMap,De=!!a.specularMap,Oe=!!a.specularColorMap,ke=!!a.specularIntensityMap,Ae=ye&&!!a.transmissionMap,je=ye&&!!a.thicknessMap,Me=!!a.gradientMap,Ne=!!a.alphaMap,Pe=a.alphaTest>0,Fe=!!a.alphaHash,Ie=!!a.extensions,Le=0;a.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Le=e.toneMapping);let Re={shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:D,fragmentShader:O,defines:a.defines,customVertexShaderID:k,customFragmentShaderID:ee,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:p,batching:j,batchingColor:j&&_._colorsTexture!==null,instancing:ne,instancingColor:ne&&_.instanceColor!==null,instancingMorph:ne&&_.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ue,alphaToCoverage:!!a.alphaToCoverage,map:re,matcap:ie,envMap:ae,envMapMode:ae&&x.mapping,envMapCubeUVHeight:S,aoMap:oe,lightMap:se,bumpMap:ce,normalMap:le,displacementMap:f&&ue,emissiveMap:de,normalMapObjectSpace:le&&a.normalMapType===1,normalMapTangentSpace:le&&a.normalMapType===0,metalnessMap:fe,roughnessMap:pe,anisotropy:me,anisotropyMap:M,clearcoat:he,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:ge,iridescence:_e,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:ve,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ye,transmissionMap:Ae,thicknessMap:je,gradientMap:Me,opaque:a.transparent===!1&&a.blending===1&&a.alphaToCoverage===!1,alphaMap:Ne,alphaTest:Pe,alphaHash:Fe,combine:a.combine,mapUv:re&&h(a.map.channel),aoMapUv:oe&&h(a.aoMap.channel),lightMapUv:se&&h(a.lightMap.channel),bumpMapUv:ce&&h(a.bumpMap.channel),normalMapUv:le&&h(a.normalMap.channel),displacementMapUv:ue&&h(a.displacementMap.channel),emissiveMapUv:de&&h(a.emissiveMap.channel),metalnessMapUv:fe&&h(a.metalnessMap.channel),roughnessMapUv:pe&&h(a.roughnessMap.channel),anisotropyMapUv:M&&h(a.anisotropyMap.channel),clearcoatMapUv:be&&h(a.clearcoatMap.channel),clearcoatNormalMapUv:xe&&h(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&h(a.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&h(a.iridescenceMap.channel),iridescenceThicknessMapUv:we&&h(a.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&h(a.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&h(a.sheenRoughnessMap.channel),specularMapUv:De&&h(a.specularMap.channel),specularColorMapUv:Oe&&h(a.specularColorMap.channel),specularIntensityMapUv:ke&&h(a.specularIntensityMap.channel),transmissionMapUv:Ae&&h(a.transmissionMap.channel),thicknessMapUv:je&&h(a.thicknessMap.channel),alphaMapUv:Ne&&h(a.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(le||me),vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:_.isPoints===!0&&!!y.attributes.uv&&(re||Ne),fog:!!v,useFog:a.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:a.flatShading===!0,sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:te,skinning:_.isSkinnedMesh===!0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:Le,decodeVideoTexture:re&&a.map.isVideoTexture===!0&&Nt.getTransfer(a.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:de&&a.emissiveMap.isVideoTexture===!0&&Nt.getTransfer(a.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionClipCullDistance:Ie&&a.extensions.clipCullDistance===!0&&r.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ie&&a.extensions.multiDraw===!0||j)&&r.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:r.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){s.disableAll(),t.supportsVertexTextures&&s.enable(0),t.instancing&&s.enable(1),t.instancingColor&&s.enable(2),t.instancingMorph&&s.enable(3),t.matcap&&s.enable(4),t.envMap&&s.enable(5),t.normalMapObjectSpace&&s.enable(6),t.normalMapTangentSpace&&s.enable(7),t.clearcoat&&s.enable(8),t.iridescence&&s.enable(9),t.alphaTest&&s.enable(10),t.vertexColors&&s.enable(11),t.vertexAlphas&&s.enable(12),t.vertexUv1s&&s.enable(13),t.vertexUv2s&&s.enable(14),t.vertexUv3s&&s.enable(15),t.vertexTangents&&s.enable(16),t.anisotropy&&s.enable(17),t.alphaHash&&s.enable(18),t.batching&&s.enable(19),t.dispersion&&s.enable(20),t.batchingColor&&s.enable(21),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reverseDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),e.push(s.mask)}function b(e){let t=m[e.type],n;if(t){let e=Oi[t];n=ri.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r;for(let e=0,t=u.length;e<t;e++){let t=u[e];if(t.cacheKey===n){r=t,++r.usedTimes;break}}return r===void 0&&(r=new Zo(e,n,t,a),u.push(r)),r}function S(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),e.destroy()}}function C(e){c.remove(e)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:w}}function ns(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function rs(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function is(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function as(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(n,r,i,a,o,s){let c=e[t];return c===void 0?(c={id:n.id,object:n,geometry:r,material:i,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=c):(c.id=n.id,c.object=n,c.geometry=r,c.material=i,c.groupOrder=a,c.renderOrder=n.renderOrder,c.z=o,c.group=s),t++,c}function s(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function c(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function l(e,t){n.length>1&&n.sort(e||rs),r.length>1&&r.sort(t||is),i.length>1&&i.sort(t||is)}function u(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:s,unshift:c,finish:u,sort:l}}function os(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new as,e.set(t,[i])):n>=r.length?(i=new as,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function ss(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new P,color:new F};break;case`SpotLight`:n={position:new P,direction:new P,color:new F,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new P,color:new F,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new P,skyColor:new F,groundColor:new F};break;case`RectAreaLight`:n={color:new F,position:new P,halfWidth:new P,halfHeight:new P}}return e[t.id]=n,n}}}function cs(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new N};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new N};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new N,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ls=0;function us(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function ds(e){let t=new ss,n=cs(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new P);let i=new P,a=new An,o=new An;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(us);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=R.LTC_FLOAT_1,r.rectAreaLTC2=R.LTC_FLOAT_2):(r.rectAreaLTC1=R.LTC_HALF_1,r.rectAreaLTC2=R.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=ls++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function fs(e){let t=new ds(e),n=[],r=[];function i(e){l.camera=e,n.length=0,r.length=0}function a(e){n.push(e)}function o(e){r.push(e)}function s(){t.setup(n)}function c(e){t.setupView(n,e)}let l={lightsArray:n,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:s,setupLightsView:c,pushLight:a,pushShadow:o}}function ps(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new fs(e),t.set(n,[a])):r>=i.length?(a=new fs(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ms=class extends wr{static get type(){return`MeshDepthMaterial`}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Be,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},hs=class extends wr{static get type(){return`MeshDistanceMaterial`}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},gs=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_s=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vs(e,t,n){let r=new Ci,i=new N,o=new N,s=new Jt,c=new ms({depthPacking:Ve}),l=new hs,u={},d=n.maxTextureSize,f={0:1,1:0,2:2},p=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new N},radius:{value:4}},vertexShader:gs,fragmentShader:_s}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let h=new zr;h.setAttribute(`position`,new Or(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new I(h,p),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,c){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;let l=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=v!==3&&this.type===3,h=v===3&&this.type!==3;for(let l=0,u=t.length;l<u;l++){let u=t[l],f=u.shadow;if(f===void 0){console.warn(`THREE.WebGLShadowMap:`,u,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;i.copy(f.mapSize);let g=f.getFrameExtents();if(i.multiply(g),o.copy(f.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(o.x=Math.floor(d/g.x),i.x=o.x*g.x,f.mapSize.x=o.x),i.y>d&&(o.y=Math.floor(d/g.y),i.y=o.y*g.y,f.mapSize.y=o.y)),f.map===null||m===!0||h===!0){let e=this.type===3?{}:{minFilter:a,magFilter:a};f.map!==null&&f.map.dispose(),f.map=new Xt(i.x,i.y,e),f.map.texture.name=u.name+`.shadowMap`,f.camera.updateProjectionMatrix()}e.setRenderTarget(f.map),e.clear();let _=f.getViewportCount();for(let e=0;e<_;e++){let t=f.getViewport(e);s.set(o.x*t.x,o.y*t.y,o.x*t.z,o.y*t.w),p.viewport(s),f.updateMatrices(u,e),r=f.getFrustum(),x(n,c,f.camera,u,this.type)}f.isPointLightShadow!==!0&&this.type===3&&y(f,c),f.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(l,u,f)};function y(n,r){let a=t.update(g);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Xt(i.x,i.y)),p.uniforms.shadow_pass.value=n.map.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,g,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,g,null)}function b(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,S)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?f[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function x(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=b(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=b(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)x(c[e],i,a,o,s)}function S(e){e.target.removeEventListener(`dispose`,S);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}var ys={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function bs(e,t){function n(){let t=!1,n=new Jt,r=null,i=new Jt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let e=t.get(`EXT_clip_control`);r?e.clipControlEXT(e.LOWER_LEFT_EXT,e.ZERO_TO_ONE_EXT):e.clipControlEXT(e.LOWER_LEFT_EXT,e.NEGATIVE_ONE_TO_ONE_EXT);let n=o;o=null,this.setClear(n)}r=e},getReversed:function(){return r},setTest:function(t){t?de(e.DEPTH_TEST):fe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ys[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(r&&(t=1-t),e.clearDepth(t),o=t)},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?de(e.STENCIL_TEST):fe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new F(0,0,0),w=0,T=!1,E=null,D=null,O=null,k=null,ee=null,A=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,ne=0,j=e.getParameter(e.VERSION);j.indexOf(`WebGL`)===-1?j.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),te=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(j)[1]),te=ne>=1);let re=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new Jt().fromArray(ae),ce=new Jt().fromArray(oe);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),de(e.DEPTH_TEST),o.setFunc(3),M(!1),be(1),de(e.CULL_FACE),ve(0);function de(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function fe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function pe(t,n){return d[t]!==n&&(e.bindFramebuffer(t,n),d[t]=n,t===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=n),!0)}function me(t,n){let r=p,i=!1;if(t){r=f.get(n),r===void 0&&(r=[],f.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function he(t){return m!==t&&(e.useProgram(t),m=t,!0)}let ge={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ge[103]=e.MIN,ge[104]=e.MAX;let _e={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ve(t,n,r,i,a,o,s,c,l,u){if(t===0){h===!0&&(fe(e.BLEND),h=!1);return}if(h===!1&&(de(e.BLEND),h=!0),t!==5){if(t!==g||u!==T){if((_!==100||b!==100)&&(e.blendEquation(e.FUNC_ADD),_=100,b=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}v=null,y=null,x=null,S=null,C.set(0,0,0),w=0,g=t,T=u}return}a||=n,o||=r,s||=i,(n!==_||a!==b)&&(e.blendEquationSeparate(ge[n],ge[a]),_=n,b=a),(r!==v||i!==y||o!==x||s!==S)&&(e.blendFuncSeparate(_e[r],_e[i],_e[o],_e[s]),v=r,y=i,x=o,S=s),(c.equals(C)===!1||l!==w)&&(e.blendColor(c.r,c.g,c.b,l),C.copy(c),w=l),g=t,T=!1}function ye(t,n){t.side===2?fe(e.CULL_FACE):de(e.CULL_FACE);let r=t.side===1;n&&(r=!r),M(r),t.blending===1&&t.transparent===!1?ve(0):ve(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?de(e.SAMPLE_ALPHA_TO_COVERAGE):fe(e.SAMPLE_ALPHA_TO_COVERAGE)}function M(t){E!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),E=t)}function be(t){t===0?fe(e.CULL_FACE):(de(e.CULL_FACE),t!==D&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),D=t}function xe(t){t!==O&&(te&&e.lineWidth(t),O=t)}function Se(t,n,r){t?(de(e.POLYGON_OFFSET_FILL),(k!==n||ee!==r)&&(e.polygonOffset(n,r),k=n,ee=r)):fe(e.POLYGON_OFFSET_FILL)}function Ce(t){t?de(e.SCISSOR_TEST):fe(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+A-1),re!==t&&(e.activeTexture(t),re=t)}function Te(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+A-1:re);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function Ee(){let t=ie[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function ke(){try{e.texSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ae(){try{e.texSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function je(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ne(){try{e.texStorage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Pe(){try{e.texStorage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Fe(){try{e.texImage2D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ie(){try{e.texImage3D.apply(e,arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Le(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function Re(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function ze(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Be(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ve(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},re=null,ie={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new F(0,0,0),w=0,T=!1,E=null,D=null,O=null,k=null,ee=null,se.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:de,disable:fe,bindFramebuffer:pe,drawBuffers:me,useProgram:he,setBlending:ve,setMaterial:ye,setFlipSided:M,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:Fe,texImage3D:Ie,updateUBOMapping:ze,uniformBlockBinding:Be,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:ke,texSubImage3D:Ae,compressedTexSubImage2D:je,compressedTexSubImage3D:Me,scissor:Le,viewport:Re,reset:Ve}}function xs(e,t,n,r){let i=Ss(r);switch(n){case C:return e*t;case E:return e*t;case D:return e*t*2;case ee:return e*t/i.components*i.byteLength;case A:return e*t/i.components*i.byteLength;case te:return e*t*2/i.components*i.byteLength;case ne:return e*t*2/i.components*i.byteLength;case w:return e*t*3/i.components*i.byteLength;case T:return e*t*4/i.components*i.byteLength;case j:return e*t*4/i.components*i.byteLength;case re:case ie:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ae:case oe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ce:case ue:return Math.max(e,16)*Math.max(t,8)/4;case se:case le:return Math.max(e,8)*Math.max(t,8)/2;case de:case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case me:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case he:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ge:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case _e:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ye:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case M:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case be:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Se:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ce:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case we:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Te:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ee:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case De:case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ae:case je:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Me:case Ne:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Ss(e){switch(e){case d:case f:return{byteLength:1,components:1};case m:case p:case v:return{byteLength:2,components:1};case y:case b:return{byteLength:2,components:4};case g:case h:case _:return{byteLength:4,components:1};case S:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}function Cs(e,t,d,f,p,m,h){let g=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new N,y=new WeakMap,b,x=new WeakMap,S=!1;try{S=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function C(e,t){return S?new OffscreenCanvas(e,t):Et(`canvas`)}function w(e,t,n){let r=1,i=Ne(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);b===void 0&&(b=C(n,a));let o=t?C(n,a):b;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),console.warn(`THREE.WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&console.warn(`THREE.WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function T(e){return e.generateMipmaps}function E(t){e.generateMipmap(t)}function D(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function O(n,r,i,a,o=!1){if(n!==null){if(e[n]!==void 0)return e[n];console.warn(`THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let s=r;if(r===e.RED&&(i===e.FLOAT&&(s=e.R32F),i===e.HALF_FLOAT&&(s=e.R16F),i===e.UNSIGNED_BYTE&&(s=e.R8)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.R8UI),i===e.UNSIGNED_SHORT&&(s=e.R16UI),i===e.UNSIGNED_INT&&(s=e.R32UI),i===e.BYTE&&(s=e.R8I),i===e.SHORT&&(s=e.R16I),i===e.INT&&(s=e.R32I)),r===e.RG&&(i===e.FLOAT&&(s=e.RG32F),i===e.HALF_FLOAT&&(s=e.RG16F),i===e.UNSIGNED_BYTE&&(s=e.RG8)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RG8UI),i===e.UNSIGNED_SHORT&&(s=e.RG16UI),i===e.UNSIGNED_INT&&(s=e.RG32UI),i===e.BYTE&&(s=e.RG8I),i===e.SHORT&&(s=e.RG16I),i===e.INT&&(s=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RGB8UI),i===e.UNSIGNED_SHORT&&(s=e.RGB16UI),i===e.UNSIGNED_INT&&(s=e.RGB32UI),i===e.BYTE&&(s=e.RGB8I),i===e.SHORT&&(s=e.RGB16I),i===e.INT&&(s=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(s=e.RGBA16UI),i===e.UNSIGNED_INT&&(s=e.RGBA32UI),i===e.BYTE&&(s=e.RGBA8I),i===e.SHORT&&(s=e.RGBA16I),i===e.INT&&(s=e.RGBA32I)),r===e.RGB&&i===e.UNSIGNED_INT_5_9_9_9_REV&&(s=e.RGB9_E5),r===e.RGBA){let t=o?We:Nt.getTransfer(a);i===e.FLOAT&&(s=e.RGBA32F),i===e.HALF_FLOAT&&(s=e.RGBA16F),i===e.UNSIGNED_BYTE&&(s=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT_4_4_4_4&&(s=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(s=e.RGB5_A1)}return(s===e.R16F||s===e.R32F||s===e.RG16F||s===e.RG32F||s===e.RGBA16F||s===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),s}function ee(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,console.warn(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function A(e,t){return T(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=e.target;t.removeEventListener(`dispose`,te),j(t),t.isVideoTexture&&y.delete(t)}function ne(e){let t=e.target;t.removeEventListener(`dispose`,ne),ie(t)}function j(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=x.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&re(e),Object.keys(r).length===0&&x.delete(n)}f.remove(e)}function re(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=x.get(r);delete i[n.__cacheKey],h.memory.textures--}function ie(t){let n=f.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),f.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=f.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(r[t])}f.remove(t)}let ae=0;function oe(){ae=0}function se(){let e=ae;return e>=p.maxTextures&&console.warn(`THREE.WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+p.maxTextures),ae+=1,e}function ce(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function le(t,n){let r=f.get(t);if(t.isVideoTexture&&je(t),t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){let e=t.image;if(e===null)console.warn(`THREE.WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)console.warn(`THREE.WebGLRenderer: Texture marked for update but image is incomplete`);else{ve(r,t,n);return}}d.bindTexture(e.TEXTURE_2D,r.__webglTexture,e.TEXTURE0+n)}function ue(t,n){let r=f.get(t);if(t.version>0&&r.__version!==t.version){ve(r,t,n);return}d.bindTexture(e.TEXTURE_2D_ARRAY,r.__webglTexture,e.TEXTURE0+n)}function de(t,n){let r=f.get(t);if(t.version>0&&r.__version!==t.version){ve(r,t,n);return}d.bindTexture(e.TEXTURE_3D,r.__webglTexture,e.TEXTURE0+n)}function fe(t,n){let r=f.get(t);if(t.version>0&&r.__version!==t.version){ye(r,t,n);return}d.bindTexture(e.TEXTURE_CUBE_MAP,r.__webglTexture,e.TEXTURE0+n)}let pe={[n]:e.REPEAT,[r]:e.CLAMP_TO_EDGE,[i]:e.MIRRORED_REPEAT},me={[a]:e.NEAREST,[o]:e.NEAREST_MIPMAP_NEAREST,[s]:e.NEAREST_MIPMAP_LINEAR,[c]:e.LINEAR,[l]:e.LINEAR_MIPMAP_NEAREST,[u]:e.LINEAR_MIPMAP_LINEAR},he={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ge(n,r){if(r.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(r.magFilter===1006||r.magFilter===1007||r.magFilter===1005||r.magFilter===1008||r.minFilter===1006||r.minFilter===1007||r.minFilter===1005||r.minFilter===1008)&&console.warn(`THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,pe[r.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,pe[r.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,pe[r.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,me[r.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,me[r.minFilter]),r.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,he[r.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(r.magFilter===1003||r.minFilter!==1005&&r.minFilter!==1008||r.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(r.anisotropy>1||f.get(r).__currentAnisotropy){let i=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,i.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,p.getMaxAnisotropy())),f.get(r).__currentAnisotropy=r.anisotropy}}}function _e(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,te));let i=n.source,a=x.get(i);a===void 0&&(a={},x.set(i,a));let o=ce(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&re(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ve(t,n,r){let i=e.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(i=e.TEXTURE_2D_ARRAY),n.isData3DTexture&&(i=e.TEXTURE_3D);let a=_e(t,n),o=n.source;d.bindTexture(i,t.__webglTexture,e.TEXTURE0+r);let s=f.get(o);if(o.version!==s.__version||a===!0){d.activeTexture(e.TEXTURE0+r);let t=Nt.getPrimaries(Nt.workingColorSpace),c=n.colorSpace===``?null:Nt.getPrimaries(n.colorSpace),l=n.colorSpace===``||t===c?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,l);let u=w(n.image,!1,p.maxTextureSize);u=Me(n,u);let f=m.convert(n.format,n.colorSpace),h=m.convert(n.type),g=O(n.internalFormat,f,h,n.colorSpace,n.isVideoTexture);ge(i,n);let _,v=n.mipmaps,y=n.isVideoTexture!==!0,b=s.__version===void 0||a===!0,x=o.dataReady,S=A(n,u);if(n.isDepthTexture)g=ee(n.format===k,n.type),b&&(y?d.texStorage2D(e.TEXTURE_2D,1,g,u.width,u.height):d.texImage2D(e.TEXTURE_2D,0,g,u.width,u.height,0,f,h,null));else if(n.isDataTexture){if(v.length>0){y&&b&&d.texStorage2D(e.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let t=0,n=v.length;t<n;t++)_=v[t],y?x&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,f,h,_.data):d.texImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,f,h,_.data);n.generateMipmaps=!1}else y?(b&&d.texStorage2D(e.TEXTURE_2D,S,g,u.width,u.height),x&&d.texSubImage2D(e.TEXTURE_2D,0,0,0,u.width,u.height,f,h,u.data)):d.texImage2D(e.TEXTURE_2D,0,g,u.width,u.height,0,f,h,u.data)}else if(n.isCompressedTexture){if(n.isCompressedArrayTexture){y&&b&&d.texStorage3D(e.TEXTURE_2D_ARRAY,S,g,v[0].width,v[0].height,u.depth);for(let t=0,r=v.length;t<r;t++)if(_=v[t],n.format!==1023){if(f!==null){if(y){if(x){if(n.layerUpdates.size>0){let r=xs(_.width,_.height,n.format,n.type);for(let i of n.layerUpdates){let n=_.data.subarray(i*r/_.data.BYTES_PER_ELEMENT,(i+1)*r/_.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,i,_.width,_.height,1,f,n)}n.clearLayerUpdates()}else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,_.width,_.height,u.depth,f,_.data)}}else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY,t,g,_.width,_.height,u.depth,0,_.data,0,0)}else console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else y?x&&d.texSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,_.width,_.height,u.depth,f,h,_.data):d.texImage3D(e.TEXTURE_2D_ARRAY,t,g,_.width,_.height,u.depth,0,f,h,_.data)}else{y&&b&&d.texStorage2D(e.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let t=0,r=v.length;t<r;t++)_=v[t],n.format===1023?y?x&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,f,h,_.data):d.texImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,f,h,_.data):f===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):y?x&&d.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,f,_.data):d.compressedTexImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,_.data)}}else if(n.isDataArrayTexture){if(y){if(b&&d.texStorage3D(e.TEXTURE_2D_ARRAY,S,g,u.width,u.height,u.depth),x){if(n.layerUpdates.size>0){let t=xs(u.width,u.height,n.format,n.type);for(let r of n.layerUpdates){let n=u.data.subarray(r*t/u.data.BYTES_PER_ELEMENT,(r+1)*t/u.data.BYTES_PER_ELEMENT);d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,r,u.width,u.height,1,f,h,n)}n.clearLayerUpdates()}else d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,u.width,u.height,u.depth,f,h,u.data)}}else d.texImage3D(e.TEXTURE_2D_ARRAY,0,g,u.width,u.height,u.depth,0,f,h,u.data)}else if(n.isData3DTexture)y?(b&&d.texStorage3D(e.TEXTURE_3D,S,g,u.width,u.height,u.depth),x&&d.texSubImage3D(e.TEXTURE_3D,0,0,0,0,u.width,u.height,u.depth,f,h,u.data)):d.texImage3D(e.TEXTURE_3D,0,g,u.width,u.height,u.depth,0,f,h,u.data);else if(n.isFramebufferTexture){if(b){if(y)d.texStorage2D(e.TEXTURE_2D,S,g,u.width,u.height);else{let t=u.width,n=u.height;for(let r=0;r<S;r++)d.texImage2D(e.TEXTURE_2D,r,g,t,n,0,f,h,null),t>>=1,n>>=1}}}else if(v.length>0){if(y&&b){let t=Ne(v[0]);d.texStorage2D(e.TEXTURE_2D,S,g,t.width,t.height)}for(let t=0,n=v.length;t<n;t++)_=v[t],y?x&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f,h,_):d.texImage2D(e.TEXTURE_2D,t,g,f,h,_);n.generateMipmaps=!1}else if(y){if(b){let t=Ne(u);d.texStorage2D(e.TEXTURE_2D,S,g,t.width,t.height)}x&&d.texSubImage2D(e.TEXTURE_2D,0,0,0,f,h,u)}else d.texImage2D(e.TEXTURE_2D,0,g,f,h,u);T(n)&&E(i),s.__version=o.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function ye(t,n,r){if(n.image.length!==6)return;let i=_e(t,n),a=n.source;d.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+r);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(e.TEXTURE0+r);let t=Nt.getPrimaries(Nt.workingColorSpace),s=n.colorSpace===``?null:Nt.getPrimaries(n.colorSpace),c=n.colorSpace===``||t===s?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let l=n.isCompressedTexture||n.image[0].isCompressedTexture,u=n.image[0]&&n.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!l&&!u?f[e]=w(n.image[e],!0,p.maxCubemapSize):f[e]=u?n.image[e].image:n.image[e],f[e]=Me(n,f[e]);let h=f[0],g=m.convert(n.format,n.colorSpace),_=m.convert(n.type),v=O(n.internalFormat,g,_,n.colorSpace),y=n.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=A(n,h);ge(e.TEXTURE_CUBE_MAP,n);let C;if(l){y&&b&&d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];n.format===1023?y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=n.mipmaps,y&&b){C.length>0&&S++;let t=Ne(f[0]);d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(u){y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let n=0;n<C.length;n++){let r=C[n].image[t].image;y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,r.width,r.height,g,_,r.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,r.width,r.height,0,g,_,r.data)}}else{y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let n=0;n<C.length;n++){let r=C[n];y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,_,r.image[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,g,_,r.image[t])}}}T(n)&&E(e.TEXTURE_CUBE_MAP),o.__version=a.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function M(t,n,r,i,a,o){let s=m.convert(r.format,r.colorSpace),c=m.convert(r.type),l=O(r.internalFormat,s,c,r.colorSpace),u=f.get(n),p=f.get(r);if(p.__renderTarget=n,!u.__hasExternalTextures){let t=Math.max(1,n.width>>o),r=Math.max(1,n.height>>o);a===e.TEXTURE_3D||a===e.TEXTURE_2D_ARRAY?d.texImage3D(a,o,l,t,r,n.depth,0,s,c,null):d.texImage2D(a,o,l,t,r,0,s,c,null)}d.bindFramebuffer(e.FRAMEBUFFER,t),Ae(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,i,a,p.__webglTexture,0,ke(n)):(a===e.TEXTURE_2D||a>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&a<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,i,a,p.__webglTexture,o),d.bindFramebuffer(e.FRAMEBUFFER,null)}function be(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=ee(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,c=ke(n);Ae(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,c,o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,c,o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=O(a.internalFormat,o,s,a.colorSpace),l=ke(n);r&&Ae(n)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,n.width,n.height):Ae(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,l,c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function xe(t,n){if(n&&n.isWebGLCubeRenderTarget)throw Error(`Depth Texture with cube render targets is not supported`);if(d.bindFramebuffer(e.FRAMEBUFFER,t),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let r=f.get(n.depthTexture);r.__renderTarget=n,(!r.__webglTexture||n.depthTexture.image.width!==n.width||n.depthTexture.image.height!==n.height)&&(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),le(n.depthTexture,0);let i=r.__webglTexture,a=ke(n);if(n.depthTexture.format===1026)Ae(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,i,0,a):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,i,0);else if(n.depthTexture.format===1027)Ae(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,i,0,a):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,i,0);else throw Error(`Unknown depthTexture format`)}function Se(t){let n=f.get(t),r=t.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){let t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer){if(r)throw Error(`target.depthTexture not supported in Cube render targets`);xe(n.__webglFramebuffer,t)}else if(r){n.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[r]),n.__webglDepthbuffer[r]===void 0)n.__webglDepthbuffer[r]=e.createRenderbuffer(),be(n.__webglDepthbuffer[r],t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,a)}}else if(d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=e.createRenderbuffer(),be(n.__webglDepthbuffer,t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,i)}d.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(t,n,r){let i=f.get(t);n!==void 0&&M(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&Se(t)}function we(t){let n=t.texture,r=f.get(t),i=f.get(n);t.addEventListener(`dispose`,ne);let a=t.textures,o=t.isWebGLCubeRenderTarget===!0,s=a.length>1;if(s||(i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture()),i.__version=n.version,h.memory.textures++),o){r.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer[t]=[];for(let i=0;i<n.mipmaps.length;i++)r.__webglFramebuffer[t][i]=e.createFramebuffer()}else r.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)r.__webglFramebuffer[t]=e.createFramebuffer()}else r.__webglFramebuffer=e.createFramebuffer();if(s)for(let t=0,n=a.length;t<n;t++){let n=f.get(a[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Ae(t)===!1){r.__webglMultisampledFramebuffer=e.createFramebuffer(),r.__webglColorRenderbuffer=[],d.bindFramebuffer(e.FRAMEBUFFER,r.__webglMultisampledFramebuffer);for(let n=0;n<a.length;n++){let i=a[n];r.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,r.__webglColorRenderbuffer[n]);let o=m.convert(i.format,i.colorSpace),s=m.convert(i.type),c=O(i.internalFormat,o,s,i.colorSpace,t.isXRRenderTarget===!0),l=ke(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,r.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(r.__webglDepthRenderbuffer=e.createRenderbuffer(),be(r.__webglDepthRenderbuffer,t,!0)),d.bindFramebuffer(e.FRAMEBUFFER,null)}}if(o){d.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture),ge(e.TEXTURE_CUBE_MAP,n);for(let i=0;i<6;i++)if(n.mipmaps&&n.mipmaps.length>0)for(let a=0;a<n.mipmaps.length;a++)M(r.__webglFramebuffer[i][a],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,a);else M(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);T(n)&&E(e.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(s){for(let n=0,i=a.length;n<i;n++){let i=a[n],o=f.get(i);d.bindTexture(e.TEXTURE_2D,o.__webglTexture),ge(e.TEXTURE_2D,i),M(r.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0+n,e.TEXTURE_2D,0),T(i)&&E(e.TEXTURE_2D)}d.unbindTexture()}else{let a=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(a=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(a,i.__webglTexture),ge(a,n),n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)M(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,a,i);else M(r.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,a,0);T(n)&&E(a),d.unbindTexture()}t.depthBuffer&&Se(t)}function Te(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(T(r)){let t=D(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),E(t),d.unbindTexture()}}}let Ee=[],De=[];function Oe(t){if(t.samples>0){if(Ae(t)===!1){let n=t.textures,r=t.width,i=t.height,a=e.COLOR_BUFFER_BIT,o=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,s=f.get(t),c=n.length>1;if(c)for(let t=0;t<n.length;t++)d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);d.bindFramebuffer(e.READ_FRAMEBUFFER,s.__webglMultisampledFramebuffer),d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer);for(let l=0;l<n.length;l++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(a|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(a|=e.STENCIL_BUFFER_BIT)),c){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,s.__webglColorRenderbuffer[l]);let t=f.get(n[l]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,r,i,0,0,r,i,a,e.NEAREST),_===!0&&(Ee.length=0,De.length=0,Ee.push(e.COLOR_ATTACHMENT0+l),t.depthBuffer&&t.resolveDepthBuffer===!1&&(Ee.push(o),De.push(o),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,De)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ee))}if(d.bindFramebuffer(e.READ_FRAMEBUFFER,null),d.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),c)for(let t=0;t<n.length;t++){d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,s.__webglColorRenderbuffer[t]);let r=f.get(n[t]).__webglTexture;d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,r,0)}d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function ke(e){return Math.min(p.maxSamples,e.samples)}function Ae(e){let n=f.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function je(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Me(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Nt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&console.warn(`THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):console.error(`THREE.WebGLTextures: Unsupported texture color space:`,n)),t}function Ne(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=se,this.resetTextureUnits=oe,this.setTexture2D=le,this.setTexture2DArray=ue,this.setTexture3D=de,this.setTextureCube=fe,this.rebindTextures=Ce,this.setupRenderTarget=we,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=M,this.useMultisampledRTT=Ae}function ws(e,t){function n(n,r=``){let i,a=Nt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1024)return e.LUMINANCE;if(n===1025)return e.LUMINANCE_ALPHA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36492)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ts=class extends di{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},z=class extends rr{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Es={type:`move`},Ds=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new z,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new z,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new z,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Es)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new z;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Os=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ks=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,As=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new qt,i=e.properties.get(r);i.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new oi({vertexShader:Os,fragmentShader:ks,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new I(new Ei(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},js=class extends Ye{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,f=null,p=null,m=null,h=new As,_=t.getContextAttributes(),v=null,y=null,b=[],S=[],C=new N,w=null,E=new di;E.viewport=new Jt;let D=new di;D.viewport=new Jt;let ee=[E,D],A=new Ts,te=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Ds,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Ds,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Ds,b[e]=t),t.getHandSpace()};function j(e){let t=S.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function re(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,re),r.removeEventListener(`inputsourceschange`,ie);for(let e=0;e<b.length;e++){let t=S[e];t!==null&&(S[e]=null,b[e].disconnect(t))}te=null,ne=null,h.reset(),e.setRenderTarget(v),p=null,f=null,u=null,r=null,y=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,re),r.addEventListener(`inputsourceschange`,ie),_.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0){let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Xt(p.framebufferWidth,p.framebufferHeight,{format:T,type:d,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?k:O,a=_.stencil?x:g);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=new XRWebGLBinding(r,t),f=u.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new Xt(f.textureWidth,f.textureHeight,{format:T,type:d,depthTexture:new fa(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),fe.setContext(r),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ie(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=S.indexOf(n);r>=0&&(S[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=S.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=S.length){S.push(n),r=e;break}else if(S[e]===null){S[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let ae=new P,oe=new P;function se(e,t,n){ae.setFromMatrixPosition(t.matrixWorld),oe.setFromMatrixPosition(n.matrixWorld);let r=ae.distanceTo(oe),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ce(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),A.near=D.near=E.near=t,A.far=D.far=E.far=n,(te!==A.near||ne!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),te=A.near,ne=A.far),E.layers.mask=e.layers.mask|2,D.layers.mask=e.layers.mask|4,A.layers.mask=E.layers.mask|D.layers.mask;let i=e.parent,a=A.cameras;ce(A,i);for(let e=0;e<a.length;e++)ce(a[e],i);a.length===2?se(A,E,D):A.projectionMatrix.copy(E.projectionMatrix),le(e,A,i)};function le(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=$e*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(A)};let ue=null;function de(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let n=!1;t.length!==A.cameras.length&&(A.cameras.length=0,n=!0);for(let r=0;r<t.length;r++){let i=t[r],a=null;if(p!==null)a=p.getViewport(i);else{let t=u.getViewSubImage(f,i);a=t.viewport,r===0&&(e.setRenderTargetTextures(y,t.colorTexture,f.ignoreDepthValues?void 0:t.depthStencilTexture),e.setRenderTarget(y))}let o=ee[r];o===void 0&&(o=new di,o.layers.enable(r),o.viewport=new Jt,ee[r]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),r===0&&(A.matrix.copy(o.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),n===!0&&A.cameras.push(o)}let i=r.enabledFeatures;if(i&&i.includes(`depth-sensing`)){let n=u.getDepthInformation(t[0]);n&&n.isValid&&n.texture&&h.init(e,n,r.renderState)}}for(let e=0;e<b.length;e++){let t=S[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ue&&ue(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let fe=new wi;fe.setAnimationLoop(de),this.setAnimationLoop=function(e){ue=e},this.dispose=function(){}}},Ms=new Bn,Ns=new An;function Ps(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ni(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial||t.isMeshLambertMaterial?a(e,t):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,Ms.copy(o),Ms.x*=-1,Ms.y*=-1,Ms.z*=-1,a.isCubeTexture&&a.isRenderTargetTexture===!1&&(Ms.y*=-1,Ms.z*=-1),e.envMapRotation.value.setFromMatrix4(Ns.makeRotationFromEuler(Ms)),e.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Fs(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return console.error(`THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?console.warn(`THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.`):console.warn(`THREE.WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var Is=class{constructor(e={}){let{canvas:t=Dt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);m=n.getContextAttributes().alpha}else m=a;let h=new Uint32Array(4),g=new Int32Array(4),_=null,y=null,b=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=He,this.toneMapping=0,this.toneMappingExposure=1;let S=this,C=!1,w=0,T=0,E=null,D=-1,O=null,k=new Jt,ee=new Jt,A=null,te=new F(0),ne=0,j=t.width,re=t.height,ie=1,ae=null,oe=null,se=new Jt(0,0,j,re),ce=new Jt(0,0,j,re),le=!1,ue=new Ci,de=!1,fe=!1,pe=new An,me=new An,he=new P,ge=new Jt,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function ye(){return E===null?ie:1}let M=n;function be(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r170`),t.addEventListener(`webglcontextlost`,Ye,!1),t.addEventListener(`webglcontextrestored`,Xe,!1),t.addEventListener(`webglcontextcreationerror`,Ze,!1),M===null){let t=`webgl2`;if(M=be(t,e),M===null)throw be(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw console.error(`THREE.WebGLRenderer: `+e.message),e}let xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,We,Ge,Ke;function qe(){xe=new oa(M),xe.init(),We=new ws(M,xe),Se=new Fi(M,xe,e,We),Ce=new bs(M,xe),Se.reverseDepthBuffer&&p&&Ce.buffers.depth.setReversed(!0),we=new la(M),Te=new ns,Ee=new Cs(M,xe,Ce,Te,Se,We,we),De=new Li(S),Oe=new aa(S),ke=new Ti(M),Ge=new Ni(M,ke),Ae=new sa(M,ke,we,Ge),je=new da(M,Ae,ke,we),ze=new ua(M,Se,Ee),Ie=new Ii(Te),Me=new ts(S,De,Oe,xe,Se,Ge,Ie),Ne=new Ps(S,Te),Pe=new os,Fe=new ps(xe),Re=new Mi(S,De,Oe,Ce,je,m,s),Le=new vs(S,je,Se),Ke=new Fs(M,we,Se,Ce),Be=new Pi(M,xe,we),Ve=new ca(M,xe,we),we.programs=Me.programs,S.capabilities=Se,S.extensions=xe,S.properties=Te,S.renderLists=Pe,S.shadowMap=Le,S.state=Ce,S.info=we}qe();let Je=new js(S,M);this.xr=Je,this.getContext=function(){return M},this.getContextAttributes=function(){return M.getContextAttributes()},this.forceContextLoss=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(e){e!==void 0&&(ie=e,this.setSize(j,re,!1))},this.getSize=function(e){return e.set(j,re)},this.setSize=function(e,n,r=!0){if(Je.isPresenting){console.warn(`THREE.WebGLRenderer: Can't change size while VR device is presenting.`);return}j=e,re=n,t.width=Math.floor(e*ie),t.height=Math.floor(n*ie),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(j*ie,re*ie).floor()},this.setDrawingBufferSize=function(e,n,r){j=e,re=n,ie=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.getCurrentViewport=function(e){return e.copy(k)},this.getViewport=function(e){return e.copy(se)},this.setViewport=function(e,t,n,r){e.isVector4?se.set(e.x,e.y,e.z,e.w):se.set(e,t,n,r),Ce.viewport(k.copy(se).multiplyScalar(ie).round())},this.getScissor=function(e){return e.copy(ce)},this.setScissor=function(e,t,n,r){e.isVector4?ce.set(e.x,e.y,e.z,e.w):ce.set(e,t,n,r),Ce.scissor(ee.copy(ce).multiplyScalar(ie).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(e){Ce.setScissorTest(le=e)},this.setOpaqueSort=function(e){ae=e},this.setTransparentSort=function(e){oe=e},this.getClearColor=function(e){return e.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(E!==null){let t=E.texture.format;e=t===1033||t===1031||t===1029}if(e){let e=E.texture.type,t=e===1009||e===1014||e===1012||e===1020||e===1017||e===1018,n=Re.getClearColor(),r=Re.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(h[0]=i,h[1]=a,h[2]=o,h[3]=r,M.clearBufferuiv(M.COLOR,0,h)):(g[0]=i,g[1]=a,g[2]=o,g[3]=r,M.clearBufferiv(M.COLOR,0,g))}else r|=M.COLOR_BUFFER_BIT}t&&(r|=M.DEPTH_BUFFER_BIT),n&&(r|=M.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),M.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ye,!1),t.removeEventListener(`webglcontextrestored`,Xe,!1),t.removeEventListener(`webglcontextcreationerror`,Ze,!1),Pe.dispose(),Fe.dispose(),Te.dispose(),De.dispose(),Oe.dispose(),je.dispose(),Ge.dispose(),Ke.dispose(),Me.dispose(),Je.dispose(),Je.removeEventListener(`sessionstart`,it),Je.removeEventListener(`sessionend`,at),ot.stop()};function Ye(e){e.preventDefault(),console.log(`THREE.WebGLRenderer: Context Lost.`),C=!0}function Xe(){console.log(`THREE.WebGLRenderer: Context Restored.`),C=!1;let e=we.autoReset,t=Le.enabled,n=Le.autoUpdate,r=Le.needsUpdate,i=Le.type;qe(),we.autoReset=e,Le.enabled=t,Le.autoUpdate=n,Le.needsUpdate=r,Le.type=i}function Ze(e){console.error(`THREE.WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Qe(e){let t=e.target;t.removeEventListener(`dispose`,Qe),$e(t)}function $e(e){et(e),Te.remove(e)}function et(e){let t=Te.get(e).programs;t!==void 0&&(t.forEach(function(e){Me.releaseProgram(e)}),e.isShaderMaterial&&Me.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=_e);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=ht(e,t,n,r,i);Ce.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ae.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ge.setup(i,r,s,n,c);let h,g=Be;if(c!==null&&(h=ke.get(c),g=Ve,g.setIndex(h)),i.isMesh)r.wireframe===!0?(Ce.setLineWidth(r.wireframeLinewidth*ye()),g.setMode(M.LINES)):g.setMode(M.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),Ce.setLineWidth(e*ye()),i.isLineSegments?g.setMode(M.LINES):i.isLineLoop?g.setMode(M.LINE_LOOP):g.setMode(M.LINE_STRIP)}else i.isPoints?g.setMode(M.POINTS):i.isSprite&&g.setMode(M.TRIANGLES);if(i.isBatchedMesh){if(i._multiDrawInstances!==null)g.renderMultiDrawInstances(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount,i._multiDrawInstances);else if(xe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ke.get(c).bytesPerElement:1,o=Te.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(M,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function tt(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ft(e,t,n),e.side=0,e.needsUpdate=!0,ft(e,t,n),e.side=2):ft(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),y=Fe.get(n),y.init(t),x.push(y),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(y.pushLight(e),e.castShadow&&y.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(y.pushLight(e),e.castShadow&&y.pushShadow(e))}),y.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];tt(a,n,e),r.add(a)}else tt(t,n,e),r.add(t)}}),x.pop(),y=null,r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){Te.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}xe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let nt=null;function rt(e){nt&&nt(e)}function it(){ot.stop()}function at(){ot.start()}let ot=new wi;ot.setAnimationLoop(rt),typeof self<`u`&&ot.setContext(self),this.setAnimationLoop=function(e){nt=e,Je.setAnimationLoop(e),e===null?ot.stop():ot.start()},Je.addEventListener(`sessionstart`,it),Je.addEventListener(`sessionend`,at),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){console.error(`THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(C===!0)return;if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(t),t=Je.getCamera()),e.isScene===!0&&e.onBeforeRender(S,e,t,E),y=Fe.get(e,x.length),y.init(t),x.push(y),me.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ue.setFromProjectionMatrix(me),fe=this.localClippingEnabled,de=Ie.init(this.clippingPlanes,fe),_=Pe.get(e,b.length),_.init(),b.push(_),Je.enabled===!0&&Je.isPresenting===!0){let e=S.xr.getDepthSensingMesh();e!==null&&st(e,t,-1/0,S.sortObjects)}st(e,t,0,S.sortObjects),_.finish(),S.sortObjects===!0&&_.sort(ae,oe),ve=Je.enabled===!1||Je.isPresenting===!1||Je.hasDepthSensing()===!1,ve&&Re.addToRenderList(_,e),this.info.render.frame++,de===!0&&Ie.beginShadows();let n=y.state.shadowsArray;Le.render(n,e,t),de===!0&&Ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let r=_.opaque,i=_.transmissive;if(y.setupLights(),t.isArrayCamera){let n=t.cameras;if(i.length>0)for(let t=0,a=n.length;t<a;t++){let a=n[t];lt(r,i,e,a)}ve&&Re.render(e);for(let t=0,r=n.length;t<r;t++){let r=n[t];ct(_,e,r,r.viewport)}}else i.length>0&&lt(r,i,e,t),ve&&Re.render(e),ct(_,e,t);E!==null&&(Ee.updateMultisampleRenderTarget(E),Ee.updateRenderTargetMipmap(E)),e.isScene===!0&&e.onAfterRender(S,e,t),Ge.resetDefaultState(),D=-1,O=null,x.pop(),x.length>0?(y=x[x.length-1],de===!0&&Ie.setGlobalState(S.clippingPlanes,y.state.camera)):y=null,b.pop(),_=b.length>0?b[b.length-1]:null};function st(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)y.pushLight(e),e.castShadow&&y.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||ue.intersectsSprite(e)){r&&ge.setFromMatrixPosition(e.matrixWorld).applyMatrix4(me);let t=je.update(e),i=e.material;i.visible&&_.push(e,t,i,n,ge.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||ue.intersectsObject(e))){let t=je.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),ge.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ge.copy(e.boundingSphere.center)),ge.applyMatrix4(e.matrixWorld).applyMatrix4(me)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&_.push(e,t,s,n,ge.z,o)}}else i.visible&&_.push(e,t,i,n,ge.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)st(i[e],t,n,r)}function ct(e,t,n,r){let i=e.opaque,a=e.transmissive,o=e.transparent;y.setupLightsView(n),de===!0&&Ie.setGlobalState(S.clippingPlanes,n),r&&Ce.viewport(k.copy(r)),i.length>0&&ut(i,t,n),a.length>0&&ut(a,t,n),o.length>0&&ut(o,t,n),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function lt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[r.id]===void 0&&(y.state.transmissionRenderTarget[r.id]=new Xt(1,1,{generateMipmaps:!0,type:xe.has(`EXT_color_buffer_half_float`)||xe.has(`EXT_color_buffer_float`)?v:d,minFilter:u,samples:4,stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Nt.workingColorSpace}));let a=y.state.transmissionRenderTarget[r.id],o=r.viewport||k;a.setSize(o.z,o.w);let s=S.getRenderTarget();S.setRenderTarget(a),S.getClearColor(te),ne=S.getClearAlpha(),ne<1&&S.setClearColor(16777215,.5),S.clear(),ve&&Re.render(n);let c=S.toneMapping;S.toneMapping=0;let l=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),y.setupLightsView(r),de===!0&&Ie.setGlobalState(S.clippingPlanes,r),ut(e,n,r),Ee.updateMultisampleRenderTarget(a),Ee.updateRenderTargetMipmap(a),xe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=a.object,s=a.geometry,c=a.material,l=a.group;if(c.side===2&&o.layers.test(r.layers)){let t=c.side;c.side=1,c.needsUpdate=!0,dt(o,n,r,s,c,l),c.side=t,c.needsUpdate=!0,e=!0}}e===!0&&(Ee.updateMultisampleRenderTarget(a),Ee.updateRenderTargetMipmap(a))}S.setRenderTarget(s),S.setClearColor(te,ne),l!==void 0&&(r.viewport=l),S.toneMapping=c}function ut(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],o=a.object,s=a.geometry,c=r===null?a.material:r,l=a.group;o.layers.test(n.layers)&&dt(o,t,n,s,c,l)}}function dt(e,t,n,r,i,a){e.onBeforeRender(S,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(S,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=2):S.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(S,t,n,r,i,a)}function ft(e,t,n){t.isScene!==!0&&(t=_e);let r=Te.get(e),i=y.state.lights,a=y.state.shadowsArray,o=i.state.version,s=Me.getParameters(e,i.state,a,t,n),c=Me.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial?t.environment:null,r.fog=t.fog,r.envMap=(e.isMeshStandardMaterial?Oe:De).get(e.envMap||r.environment),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Qe),l=new Map,r.programs=l);let u=l.get(c);if(u!==void 0){if(r.currentProgram===u&&r.lightsStateVersion===o)return mt(e,s),u}else s.uniforms=Me.getUniforms(e),e.onBeforeCompile(s,S),u=Me.acquireProgram(s,c),l.set(c,u),r.uniforms=s.uniforms;let d=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(d.clippingPlanes=Ie.uniform),mt(e,s),r.needsLights=_t(e),r.lightsStateVersion=o,r.needsLights&&(d.ambientLightColor.value=i.state.ambient,d.lightProbe.value=i.state.probe,d.directionalLights.value=i.state.directional,d.directionalLightShadows.value=i.state.directionalShadow,d.spotLights.value=i.state.spot,d.spotLightShadows.value=i.state.spotShadow,d.rectAreaLights.value=i.state.rectArea,d.ltc_1.value=i.state.rectAreaLTC1,d.ltc_2.value=i.state.rectAreaLTC2,d.pointLights.value=i.state.point,d.pointLightShadows.value=i.state.pointShadow,d.hemisphereLights.value=i.state.hemi,d.directionalShadowMap.value=i.state.directionalShadowMap,d.directionalShadowMatrix.value=i.state.directionalShadowMatrix,d.spotShadowMap.value=i.state.spotShadowMap,d.spotLightMatrix.value=i.state.spotLightMatrix,d.spotLightMap.value=i.state.spotLightMap,d.pointShadowMap.value=i.state.pointShadowMap,d.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=u,r.uniformsList=null,u}function pt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=bo.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function mt(e,t){let n=Te.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ht(e,t,n,r,i){t.isScene!==!0&&(t=_e),Ee.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial?t.environment:null,s=E===null?S.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Ue,c=(r.isMeshStandardMaterial?Oe:De).get(r.envMap||o),l=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,u=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),d=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color,m=0;r.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(m=S.toneMapping);let h=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,g=h===void 0?0:h.length,_=Te.get(r),v=y.state.lights;if(de===!0&&(fe===!0||e!==O)){let t=e===O&&r.id===D;Ie.setState(r,e,t)}let b=!1;r.version===_.__version?_.needsLights&&_.lightsStateVersion!==v.state.version?b=!0:_.outputColorSpace===s?i.isBatchedMesh&&_.batching===!1||!i.isBatchedMesh&&_.batching===!0||i.isBatchedMesh&&_.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&_.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&_.instancing===!1||!i.isInstancedMesh&&_.instancing===!0||i.isSkinnedMesh&&_.skinning===!1||!i.isSkinnedMesh&&_.skinning===!0||i.isInstancedMesh&&_.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&_.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&_.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&_.instancingMorph===!1&&i.morphTexture!==null?b=!0:_.envMap===c?r.fog===!0&&_.fog!==a||_.numClippingPlanes!==void 0&&(_.numClippingPlanes!==Ie.numPlanes||_.numIntersection!==Ie.numIntersection)?b=!0:_.vertexAlphas===l&&_.vertexTangents===u&&_.morphTargets===d&&_.morphNormals===f&&_.morphColors===p&&_.toneMapping===m?_.morphTargetsCount!==g&&(b=!0):b=!0:b=!0:b=!0:(b=!0,_.__version=r.version);let x=_.currentProgram;b===!0&&(x=ft(r,t,i));let C=!1,w=!1,T=!1,k=x.getUniforms(),ee=_.uniforms;if(Ce.useProgram(x.program)&&(C=!0,w=!0,T=!0),r.id!==D&&(D=r.id,w=!0),C||O!==e){Ce.buffers.depth.getReversed()?(pe.copy(e.projectionMatrix),jt(pe),Mt(pe),k.setValue(M,`projectionMatrix`,pe)):k.setValue(M,`projectionMatrix`,e.projectionMatrix),k.setValue(M,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(M,he.setFromMatrixPosition(e.matrixWorld)),Se.logarithmicDepthBuffer&&k.setValue(M,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(M,`isOrthographic`,e.isOrthographicCamera===!0),O!==e&&(O=e,w=!0,T=!0)}if(i.isSkinnedMesh){k.setOptional(M,i,`bindMatrix`),k.setOptional(M,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(M,`boneTexture`,e.boneTexture,Ee))}i.isBatchedMesh&&(k.setOptional(M,i,`batchingTexture`),k.setValue(M,`batchingTexture`,i._matricesTexture,Ee),k.setOptional(M,i,`batchingIdTexture`),k.setValue(M,`batchingIdTexture`,i._indirectTexture,Ee),k.setOptional(M,i,`batchingColorTexture`),i._colorsTexture!==null&&k.setValue(M,`batchingColorTexture`,i._colorsTexture,Ee));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&ze.update(i,n,x),(w||_.receiveShadow!==i.receiveShadow)&&(_.receiveShadow=i.receiveShadow,k.setValue(M,`receiveShadow`,i.receiveShadow)),r.isMeshGouraudMaterial&&r.envMap!==null&&(ee.envMap.value=c,ee.flipEnvMap.value=c.isCubeTexture&&c.isRenderTargetTexture===!1?-1:1),r.isMeshStandardMaterial&&r.envMap===null&&t.environment!==null&&(ee.envMapIntensity.value=t.environmentIntensity),w&&(k.setValue(M,`toneMappingExposure`,S.toneMappingExposure),_.needsLights&&gt(ee,T),a&&r.fog===!0&&Ne.refreshFogUniforms(ee,a),Ne.refreshMaterialUniforms(ee,r,ie,re,y.state.transmissionRenderTarget[e.id]),bo.upload(M,pt(_),ee,Ee)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(bo.upload(M,pt(_),ee,Ee),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(M,`center`,i.center),k.setValue(M,`modelViewMatrix`,i.modelViewMatrix),k.setValue(M,`normalMatrix`,i.normalMatrix),k.setValue(M,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ke.update(n,x),Ke.bind(n,x)}}return x}function gt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function _t(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(e,t,n){Te.get(e.texture).__webglTexture=t,Te.get(e.depthTexture).__webglTexture=n;let r=Te.get(e);r.__hasExternalTextures=!0,r.__autoAllocateDepthBuffer=n===void 0,r.__autoAllocateDepthBuffer||xe.has(`WEBGL_multisampled_render_to_texture`)===!0&&(console.warn(`THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided`),r.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(e,t){let n=Te.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){E=e,w=t,T=n;let r=!0,i=null,a=!1,o=!1;if(e){let s=Te.get(e);if(s.__useDefaultFramebuffer!==void 0)Ce.bindFramebuffer(M.FRAMEBUFFER,null),r=!1;else if(s.__webglFramebuffer===void 0)Ee.setupRenderTarget(e);else if(s.__hasExternalTextures)Ee.rebindTextures(e,Te.get(e.texture).__webglTexture,Te.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(s.__boundDepthTexture!==t){if(t!==null&&Te.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);Ee.setupDepthRenderbuffer(e)}}let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(o=!0);let l=Te.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],a=!0):i=e.samples>0&&Ee.useMultisampledRTT(e)===!1?Te.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,k.copy(e.viewport),ee.copy(e.scissor),A=e.scissorTest}else k.copy(se).multiplyScalar(ie).floor(),ee.copy(ce).multiplyScalar(ie).floor(),A=le;if(Ce.bindFramebuffer(M.FRAMEBUFFER,i)&&r&&Ce.drawBuffers(e,i),Ce.viewport(k),Ce.scissor(ee),Ce.setScissorTest(A),a){let r=Te.get(e.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(o){let r=Te.get(e.texture),i=t||0;M.framebufferTextureLayer(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,r.__webglTexture,n||0,i)}D=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o){if(!(e&&e.isWebGLRenderTarget)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let s=Te.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(s=s[o]),s){Ce.bindFramebuffer(M.FRAMEBUFFER,s);try{let o=e.texture,s=o.format,c=o.type;if(!Se.textureFormatReadable(s)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Se.textureTypeReadable(c)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&M.readPixels(t,n,r,i,We.convert(s),We.convert(c),a)}finally{let e=E===null?null:Te.get(E).__webglFramebuffer;Ce.bindFramebuffer(M.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let s=Te.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(s=s[o]),s){let o=e.texture,c=o.format,l=o.type;if(!Se.textureFormatReadable(c))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Se.textureTypeReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){Ce.bindFramebuffer(M.FRAMEBUFFER,s);let e=M.createBuffer();M.bindBuffer(M.PIXEL_PACK_BUFFER,e),M.bufferData(M.PIXEL_PACK_BUFFER,a.byteLength,M.STREAM_READ),M.readPixels(t,n,r,i,We.convert(c),We.convert(l),0);let o=E===null?null:Te.get(E).__webglFramebuffer;Ce.bindFramebuffer(M.FRAMEBUFFER,o);let u=M.fenceSync(M.SYNC_GPU_COMMANDS_COMPLETE,0);return M.flush(),await At(M,u,4),M.bindBuffer(M.PIXEL_PACK_BUFFER,e),M.getBufferSubData(M.PIXEL_PACK_BUFFER,0,a),M.deleteBuffer(e),M.deleteSync(u),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){e.isTexture!==!0&&(kt(`WebGLRenderer: copyFramebufferToTexture function signature has changed.`),t=arguments[0]||null,e=arguments[1]);let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ee.setTexture2D(e,0),M.copyTexSubImage2D(M.TEXTURE_2D,n,0,0,o,s,i,a),Ce.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0){e.isTexture!==!0&&(kt(`WebGLRenderer: copyTextureToTexture function signature has changed.`),r=arguments[0]||null,e=arguments[1],t=arguments[2],i=arguments[3]||0,n=null);let a,o,s,c,l,u,d,f,p,m=e.isCompressedTexture?e.mipmaps[i]:e.image;n===null?(a=m.width,o=m.height,s=m.depth||1,c=0,l=0,u=0):(a=n.max.x-n.min.x,o=n.max.y-n.min.y,s=n.isBox3?n.max.z-n.min.z:1,c=n.min.x,l=n.min.y,u=n.isBox3?n.min.z:0),r===null?(d=0,f=0,p=0):(d=r.x,f=r.y,p=r.z);let h=We.convert(t.format),g=We.convert(t.type),_;t.isData3DTexture?(Ee.setTexture3D(t,0),_=M.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ee.setTexture2DArray(t,0),_=M.TEXTURE_2D_ARRAY):(Ee.setTexture2D(t,0),_=M.TEXTURE_2D),M.pixelStorei(M.UNPACK_FLIP_Y_WEBGL,t.flipY),M.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),M.pixelStorei(M.UNPACK_ALIGNMENT,t.unpackAlignment);let v=M.getParameter(M.UNPACK_ROW_LENGTH),y=M.getParameter(M.UNPACK_IMAGE_HEIGHT),b=M.getParameter(M.UNPACK_SKIP_PIXELS),x=M.getParameter(M.UNPACK_SKIP_ROWS),S=M.getParameter(M.UNPACK_SKIP_IMAGES);M.pixelStorei(M.UNPACK_ROW_LENGTH,m.width),M.pixelStorei(M.UNPACK_IMAGE_HEIGHT,m.height),M.pixelStorei(M.UNPACK_SKIP_PIXELS,c),M.pixelStorei(M.UNPACK_SKIP_ROWS,l),M.pixelStorei(M.UNPACK_SKIP_IMAGES,u);let C=e.isDataArrayTexture||e.isData3DTexture,w=t.isDataArrayTexture||t.isData3DTexture;if(e.isRenderTargetTexture||e.isDepthTexture){let n=Te.get(e),r=Te.get(t),m=Te.get(n.__renderTarget),h=Te.get(r.__renderTarget);Ce.bindFramebuffer(M.READ_FRAMEBUFFER,m.__webglFramebuffer),Ce.bindFramebuffer(M.DRAW_FRAMEBUFFER,h.__webglFramebuffer);for(let n=0;n<s;n++)C&&M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,Te.get(e).__webglTexture,i,u+n),e.isDepthTexture?(w&&M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,Te.get(t).__webglTexture,i,p+n),M.blitFramebuffer(c,l,a,o,d,f,a,o,M.DEPTH_BUFFER_BIT,M.NEAREST)):w?M.copyTexSubImage3D(_,i,d,f,p+n,c,l,a,o):M.copyTexSubImage2D(_,i,d,f,p+n,c,l,a,o);Ce.bindFramebuffer(M.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else w?e.isDataTexture||e.isData3DTexture?M.texSubImage3D(_,i,d,f,p,a,o,s,h,g,m.data):t.isCompressedArrayTexture?M.compressedTexSubImage3D(_,i,d,f,p,a,o,s,h,m.data):M.texSubImage3D(_,i,d,f,p,a,o,s,h,g,m):e.isDataTexture?M.texSubImage2D(M.TEXTURE_2D,i,d,f,a,o,h,g,m.data):e.isCompressedTexture?M.compressedTexSubImage2D(M.TEXTURE_2D,i,d,f,m.width,m.height,h,m.data):M.texSubImage2D(M.TEXTURE_2D,i,d,f,a,o,h,g,m);M.pixelStorei(M.UNPACK_ROW_LENGTH,v),M.pixelStorei(M.UNPACK_IMAGE_HEIGHT,y),M.pixelStorei(M.UNPACK_SKIP_PIXELS,b),M.pixelStorei(M.UNPACK_SKIP_ROWS,x),M.pixelStorei(M.UNPACK_SKIP_IMAGES,S),i===0&&t.generateMipmaps&&M.generateMipmap(_),Ce.unbindTexture()},this.copyTextureToTexture3D=function(e,t,n=null,r=null,i=0){return e.isTexture!==!0&&(kt(`WebGLRenderer: copyTextureToTexture3D function signature has changed.`),n=arguments[0]||null,r=arguments[1]||null,e=arguments[2],t=arguments[3],i=arguments[4]||0),kt(`WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.`),this.copyTextureToTexture(e,t,n,r,i)},this.initRenderTarget=function(e){Te.get(e).__webglFramebuffer===void 0&&Ee.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ee.setTextureCube(e,0):e.isData3DTexture?Ee.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ee.setTexture2DArray(e,0):Ee.setTexture2D(e,0),Ce.unbindTexture()},this.resetState=function(){w=0,T=0,E=null,Ce.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Je}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Nt._getUnpackColorSpace()}},Ls=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new F(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Rs=class extends rr{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},zs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=qe,this.updateRanges=[],this.version=0,this.uuid=et()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=et()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=et()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Bs=new P,Vs=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Bs.fromBufferAttribute(this,t),Bs.applyMatrix4(e),this.setXYZ(t,Bs.x,Bs.y,Bs.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bs.fromBufferAttribute(this,t),Bs.applyNormalMatrix(e),this.setXYZ(t,Bs.x,Bs.y,Bs.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bs.fromBufferAttribute(this,t),Bs.transformDirection(e),this.setXYZ(t,Bs.x,Bs.y,Bs.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=bt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=bt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=bt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=bt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=bt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),r=xt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),r=xt(r,this.array),i=xt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){console.log(`THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Or(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log(`THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Hs=class extends wr{static get type(){return`SpriteMaterial`}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new F(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Us,Ws=new P,Gs=new P,Ks=new P,qs=new N,Js=new N,Ys=new An,Xs=new P,Zs=new P,Qs=new P,$s=new N,ec=new N,tc=new N,nc=class extends rr{constructor(e=new Hs){if(super(),this.isSprite=!0,this.type=`Sprite`,Us===void 0){Us=new zr;let e=new zs(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Us.setIndex([0,1,2,0,2,3]),Us.setAttribute(`position`,new Vs(e,3,0,!1)),Us.setAttribute(`uv`,new Vs(e,2,3,!1))}this.geometry=Us,this.material=e,this.center=new N(.5,.5)}raycast(e,t){e.camera===null&&console.error(`THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Gs.setFromMatrixScale(this.matrixWorld),Ys.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ks.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gs.multiplyScalar(-Ks.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;rc(Xs.set(-.5,-.5,0),Ks,a,Gs,r,i),rc(Zs.set(.5,-.5,0),Ks,a,Gs,r,i),rc(Qs.set(.5,.5,0),Ks,a,Gs,r,i),$s.set(0,0),ec.set(1,0),tc.set(1,1);let o=e.ray.intersectTriangle(Xs,Zs,Qs,!1,Ws);if(o===null&&(rc(Zs.set(-.5,.5,0),Ks,a,Gs,r,i),ec.set(0,1),o=e.ray.intersectTriangle(Xs,Qs,Zs,!1,Ws),o===null))return;let s=e.ray.origin.distanceTo(Ws);s<e.near||s>e.far||t.push({distance:s,point:Ws.clone(),uv:_r.getInterpolation(Ws,Xs,Zs,Qs,$s,ec,tc,new N),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function rc(e,t,n,r,i,a){qs.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Js.copy(qs):(Js.x=a*qs.x-i*qs.y,Js.y=i*qs.x+a*qs.y),e.copy(t),e.x+=Js.x,e.y+=Js.y,e.applyMatrix4(Ys)}var ic=class extends qt{constructor(e=null,t=1,n=1,r,i,o,s,c,l=a,u=a,d,f){super(null,o,s,c,l,u,r,i,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ac=class extends Or{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},oc=new An,sc=new An,cc=[],lc=new nn,uc=new An,dc=new I,fc=new xn,pc=class extends I{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ac(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,uc)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,oc),lc.copy(e.boundingBox).applyMatrix4(oc),this.boundingBox.union(lc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,oc),fc.copy(e.boundingSphere).applyMatrix4(oc),this.boundingSphere.union(fc)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(dc.geometry=this.geometry,dc.material=this.material,dc.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fc.copy(this.boundingSphere),fc.applyMatrix4(n),e.ray.intersectsSphere(fc)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,oc),sc.multiplyMatrices(n,oc),dc.matrixWorld=sc,dc.raycast(e,cc);for(let e=0,n=cc.length;e<n;e++){let n=cc[e];n.instanceId=i,n.object=this,t.push(n)}cc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ac(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ic(new Float32Array(r*this.count),r,this.count,ee,_));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;i[s]=o,i.set(n,s+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}},mc=class extends wr{static get type(){return`LineBasicMaterial`}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new F(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},hc=new P,gc=new P,_c=new An,vc=new kn,yc=new xn,bc=new P,xc=new P,Sc=class extends rr{constructor(e=new zr,t=new mc){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)hc.fromBufferAttribute(t,e-1),gc.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=hc.distanceTo(gc);e.setAttribute(`lineDistance`,new jr(n,1))}else console.warn(`THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yc.copy(n.boundingSphere),yc.applyMatrix4(r),yc.radius+=i,e.ray.intersectsSphere(yc)===!1)return;_c.copy(r).invert(),vc.copy(e.ray).applyMatrix4(_c);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Cc(this,e,vc,s,n,r);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Cc(this,e,vc,s,i,a);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Cc(this,e,vc,s,i,i+1);n&&t.push(n)}if(this.isLineLoop){let i=Cc(this,e,vc,s,r-1,n);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Cc(e,t,n,r,i,a){let o=e.geometry.attributes.position;if(hc.fromBufferAttribute(o,i),gc.fromBufferAttribute(o,a),n.distanceSqToSegment(hc,gc,bc,xc)>r)return;bc.applyMatrix4(e.matrixWorld);let s=t.ray.origin.distanceTo(bc);if(!(s<t.near||s>t.far))return{distance:s,point:xc.clone().applyMatrix4(e.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:e}}var wc=new P,Tc=new P,Ec=class extends Sc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)wc.fromBufferAttribute(t,e),Tc.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+wc.distanceTo(Tc);e.setAttribute(`lineDistance`,new jr(n,1))}else console.warn(`THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Dc=class extends qt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Oc=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200}getPoint(){return console.warn(`THREE.Curve: .getPoint() not implemented.`),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new N:new P);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new P,r=[],i=[],a=[],o=new P,s=new An;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new P)}i[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(tt(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(tt(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},kc=class extends Oc{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new N){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ac=class extends kc{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function jc(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Mc=new P,Nc=new jc,Pc=new jc,Fc=new jc,Ic=class extends Oc{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new P){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Mc.subVectors(r[0],r[1]).add(r[0]),c=Mc);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Mc.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Mc),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Nc.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Pc.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Fc.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Nc.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Pc.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Fc.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Nc.calc(s),Pc.calc(s),Fc.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new P().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Lc(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Rc(e,t){let n=1-e;return n*n*t}function zc(e,t){return 2*(1-e)*e*t}function Bc(e,t){return e*e*t}function Vc(e,t,n,r){return Rc(e,t)+zc(e,n)+Bc(e,r)}function Hc(e,t){let n=1-e;return n*n*n*t}function Uc(e,t){let n=1-e;return 3*n*n*e*t}function Wc(e,t){return 3*(1-e)*e*e*t}function Gc(e,t){return e*e*e*t}function Kc(e,t,n,r,i){return Hc(e,t)+Uc(e,n)+Wc(e,r)+Gc(e,i)}var qc=class extends Oc{constructor(e=new N,t=new N,n=new N,r=new N){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new N){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Kc(e,r.x,i.x,a.x,o.x),Kc(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Jc=class extends Oc{constructor(e=new P,t=new P,n=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new P){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Kc(e,r.x,i.x,a.x,o.x),Kc(e,r.y,i.y,a.y,o.y),Kc(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Yc=class extends Oc{constructor(e=new N,t=new N){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new N){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xc=class extends Oc{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zc=class extends Oc{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Vc(e,r.x,i.x,a.x),Vc(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qc=class extends Oc{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Vc(e,r.x,i.x,a.x),Vc(e,r.y,i.y,a.y),Vc(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$c=class extends Oc{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new N){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Lc(o,s.x,c.x,l.x,u.x),Lc(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new N().fromArray(n))}return this}},el=Object.freeze({__proto__:null,ArcCurve:Ac,CatmullRomCurve3:Ic,CubicBezierCurve:qc,CubicBezierCurve3:Jc,EllipseCurve:kc,LineCurve:Yc,LineCurve3:Xc,QuadraticBezierCurve:Zc,QuadraticBezierCurve3:Qc,SplineCurve:$c}),tl=class extends Oc{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new el[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new el[n.type]().fromJSON(n))}return this}},nl=class extends tl{constructor(e){super(),this.type=`Path`,this.currentPoint=new N,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Yc(this.currentPoint.clone(),new N(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Zc(this.currentPoint.clone(),new N(e,t),new N(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new qc(this.currentPoint.clone(),new N(e,t),new N(n,r),new N(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new $c([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new kc(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},rl=class e extends zr{constructor(e=[new N(0,-.5),new N(.5,0),new N(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=tt(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new P,d=new N,f=new P,p=new P,m=new P,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new jr(a,3)),this.setAttribute(`uv`,new jr(o,2)),this.setAttribute(`normal`,new jr(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},il=class e extends rl{constructor(e=1,t=1,n=4,r=8){let i=new nl;i.absarc(0,-t/2,e,Math.PI*1.5,0),i.absarc(0,t/2,e,0,Math.PI*.5),super(i.getPoints(n),r),this.type=`CapsuleGeometry`,this.parameters={radius:e,length:t,capSegments:n,radialSegments:r}}static fromJSON(t){return new e(t.radius,t.length,t.capSegments,t.radialSegments)}},al=class e extends zr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new P,l=new N;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new jr(a,3)),this.setAttribute(`normal`,new jr(o,3)),this.setAttribute(`uv`,new jr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},B=class e extends zr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new jr(u,3)),this.setAttribute(`normal`,new jr(d,3)),this.setAttribute(`uv`,new jr(f,2));function _(){let a=new P,_=new P,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new N,m=new P,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ol=class e extends B{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},sl=class e extends zr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new jr(i,3)),this.setAttribute(`normal`,new jr(i.slice(),3)),this.setAttribute(`uv`,new jr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new P,r=new P,i=new P;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new P;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new P;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new P,t=new P,n=new P,r=new P,o=new N,s=new N,c=new N;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.details)}},cl=class e extends sl{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ll=class extends nl{constructor(e){super(e),this.uuid=et(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new nl().fromJSON(n))}return this}},ul={triangulate:function(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=dl(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l,u,d,f,p;if(r&&(a=vl(e,t,a,n)),e.length>80*n){s=l=e[0],c=u=e[1];for(let t=n;t<i;t+=n)d=e[t],f=e[t+1],d<s&&(s=d),f<c&&(c=f),d>l&&(l=d),f>u&&(u=f);p=Math.max(l-s,u-c),p=p===0?0:32767/p}return pl(a,o,n,s,c,p,0),o}};function dl(e,t,n,r,i){let a,o;if(i===Vl(e,t,n,r)>0)for(a=t;a<n;a+=r)o=Rl(a,e[a],e[a+1],o);else for(a=n-r;a>=t;a-=r)o=Rl(a,e[a],e[a+1],o);return o&&Al(o,o.next)&&(zl(o),o=o.next),o}function fl(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Al(n,n.next)||kl(n.prev,n,n.next)===0)){if(zl(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function pl(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Cl(e,r,i,a);let s=e,c,l;for(;e.prev!==e.next;){if(c=e.prev,l=e.next,a?hl(e,r,i,a):ml(e)){t.push(c.i/n|0),t.push(e.i/n|0),t.push(l.i/n|0),zl(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=gl(fl(e),t,n),pl(e,t,n,r,i,a,2)):o===2&&_l(e,t,n,r,i,a):pl(fl(e),t,n,r,i,a,1);break}}}function ml(e){let t=e.prev,n=e,r=e.next;if(kl(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=i<a?i<o?i:o:a<o?a:o,d=s<c?s<l?s:l:c<l?c:l,f=i>a?i>o?i:o:a>o?a:o,p=s>c?s>l?s:l:c>l?c:l,m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Dl(i,s,a,c,o,l,m.x,m.y)&&kl(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function hl(e,t,n,r){let i=e.prev,a=e,o=e.next;if(kl(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=s<c?s<l?s:l:c<l?c:l,m=u<d?u<f?u:f:d<f?d:f,h=s>c?s>l?s:l:c>l?c:l,g=u>d?u>f?u:f:d>f?d:f,_=Tl(p,m,t,n,r),v=Tl(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Dl(s,u,c,d,l,f,y.x,y.y)&&kl(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Dl(s,u,c,d,l,f,b.x,b.y)&&kl(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Dl(s,u,c,d,l,f,y.x,y.y)&&kl(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Dl(s,u,c,d,l,f,b.x,b.y)&&kl(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function gl(e,t,n){let r=e;do{let i=r.prev,a=r.next.next;!Al(i,a)&&jl(i,r,r.next,a)&&Fl(i,a)&&Fl(a,i)&&(t.push(i.i/n|0),t.push(r.i/n|0),t.push(a.i/n|0),zl(r),zl(r.next),r=e=a),r=r.next}while(r!==e);return fl(r)}function _l(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Ol(o,e)){let s=Ll(o,e);o=fl(o,o.next),s=fl(s,s.next),pl(o,t,n,r,i,a,0),pl(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function vl(e,t,n,r){let i=[],a,o,s,c,l;for(a=0,o=t.length;a<o;a++)s=t[a]*r,c=a<o-1?t[a+1]*r:e.length,l=dl(e,s,c,r,!1),l===l.next&&(l.steiner=!0),i.push(El(l));for(i.sort(yl),a=0;a<i.length;a++)n=bl(i[a],n);return n}function yl(e,t){return e.x-t.x}function bl(e,t){let n=xl(e,t);if(!n)return t;let r=Ll(n,e);return fl(r,r.next),fl(n,n.next)}function xl(e,t){let n=t,r=-1/0,i,a=e.x,o=e.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){let e=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=a&&e>r&&(r=e,i=n.x<n.next.x?n:n.next,e===a))return i}n=n.next}while(n!==t);if(!i)return null;let s=i,c=i.x,l=i.y,u=1/0,d;n=i;do a>=n.x&&n.x>=c&&a!==n.x&&Dl(o<l?a:r,o,c,l,o<l?r:a,o,n.x,n.y)&&(d=Math.abs(o-n.y)/(a-n.x),Fl(n,e)&&(d<u||d===u&&(n.x>i.x||n.x===i.x&&Sl(i,n)))&&(i=n,u=d)),n=n.next;while(n!==s);return i}function Sl(e,t){return kl(e.prev,e,t.prev)<0&&kl(t.next,e,e.next)<0}function Cl(e,t,n,r){let i=e;do i.z===0&&(i.z=Tl(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,wl(i)}function wl(e){let t,n,r,i,a,o,s,c,l=1;do{for(n=e,e=null,a=null,o=0;n;){for(o++,r=n,s=0,t=0;t<l&&(s++,r=r.nextZ,r);t++);for(c=l;s>0||c>0&&r;)s!==0&&(c===0||!r||n.z<=r.z)?(i=n,n=n.nextZ,s--):(i=r,r=r.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;n=r}a.nextZ=null,l*=2}while(o>1);return e}function Tl(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function El(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Dl(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Ol(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Pl(e,t)&&(Fl(e,t)&&Fl(t,e)&&Il(e,t)&&(kl(e.prev,e,t.prev)||kl(e,t.prev,t))||Al(e,t)&&kl(e.prev,e,e.next)>0&&kl(t.prev,t,t.next)>0)}function kl(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Al(e,t){return e.x===t.x&&e.y===t.y}function jl(e,t,n,r){let i=Nl(kl(e,t,n)),a=Nl(kl(e,t,r)),o=Nl(kl(n,r,e)),s=Nl(kl(n,r,t));return!!(i!==a&&o!==s||i===0&&Ml(e,n,t)||a===0&&Ml(e,r,t)||o===0&&Ml(n,e,r)||s===0&&Ml(n,t,r))}function Ml(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Nl(e){return e>0?1:e<0?-1:0}function Pl(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&jl(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Fl(e,t){return kl(e.prev,e,e.next)<0?kl(e,t,e.next)>=0&&kl(e,e.prev,t)>=0:kl(e,t,e.prev)<0||kl(e,e.next,t)<0}function Il(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Ll(e,t){let n=new Bl(e.i,e.x,e.y),r=new Bl(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Rl(e,t,n,r){let i=new Bl(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function zl(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Bl(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Vl(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Hl=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Ul(e),Wl(n,e);let a=e.length;t.forEach(Ul);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Wl(n,t[e]);let o=ul.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Ul(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Wl(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Gl=class e extends zr{constructor(e=new ll([new N(.5,.5),new N(-.5,.5),new N(-.5,-.5),new N(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new jr(r,3)),this.setAttribute(`uv`,new jr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Kl:t.UVGenerator,g,_=!1,v,y,b,x;m&&(g=m.getSpacedPoints(s),_=!0,l=!1,v=m.computeFrenetFrames(s,!1),y=new P,b=new P,x=new P),l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Hl.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Hl.isClockWise(t)&&(w[e]=t.reverse())}}let T=Hl.triangulateShape(C,w),E=C;for(let e=0,t=w.length;e<t;e++){let t=w[e];C=C.concat(t)}function D(e,t,n){return t||console.error(`THREE.ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let O=C.length,k=T.length;function ee(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new N(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new N(r/a,i/a)}let A=[];for(let e=0,t=E.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),A[e]=ee(E[e],E[n],E[r]);let te=[],ne,j=A.concat();for(let e=0,t=w.length;e<t;e++){let t=w[e];ne=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),ne[e]=ee(t[e],t[r],t[i]);te.push(ne),j=j.concat(ne)}for(let e=0;e<p;e++){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=E.length;e<t;e++){let t=D(E[e],A[e],r);se(t.x,t.y,-n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];ne=te[e];for(let e=0,i=t.length;e<i;e++){let i=D(t[e],ne[e],r);se(i.x,i.y,-n)}}}let re=d+f;for(let e=0;e<O;e++){let t=l?D(C[e],j[e],re):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),se(x.x,x.y,x.z)):se(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<O;t++){let n=l?D(C[t],j[t],re):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),se(x.x,x.y,x.z)):se(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=E.length;e<t;e++){let t=D(E[e],A[e],r);se(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];ne=te[e];for(let e=0,i=t.length;e<i;e++){let i=D(t[e],ne[e],r);_?se(i.x,i.y+g[s-1].y,g[s-1].x+n):se(i.x,i.y,c+n)}}}ie(),ae();function ie(){let e=r.length/3;if(l){let e=0,t=O*e;for(let e=0;e<k;e++){let n=T[e];ce(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=O*e;for(let e=0;e<k;e++){let n=T[e];ce(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<k;e++){let t=T[e];ce(t[2],t[1],t[0])}for(let e=0;e<k;e++){let t=T[e];ce(t[0]+O*s,t[1]+O*s,t[2]+O*s)}}n.addGroup(e,r.length/3-e,0)}function ae(){let e=r.length/3,t=0;oe(E,t),t+=E.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];oe(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function oe(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=O*e,a=O*(e+1);le(t+r+n,t+i+n,t+i+a,t+r+a)}}}function se(e,t,n){a.push(e),a.push(t),a.push(n)}function ce(e,t,i){ue(e),ue(t),ue(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);de(o[0]),de(o[1]),de(o[2])}function le(e,t,i,a){ue(e),ue(t),ue(a),ue(t),ue(i),ue(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);de(s[0]),de(s[1]),de(s[3]),de(s[1]),de(s[2]),de(s[3])}function ue(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function de(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ql(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new el[i.type]().fromJSON(i)),new e(r,t.options)}},Kl={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new N(a,o),new N(s,c),new N(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new N(o,1-c),new N(l,1-d),new N(f,1-m),new N(h,1-_)]:[new N(s,1-c),new N(u,1-d),new N(p,1-m),new N(g,1-_)]}};function ql(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Jl=class e extends sl{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Yl=class e extends zr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new P,p=new N;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new jr(s,3)),this.setAttribute(`normal`,new jr(c,3)),this.setAttribute(`uv`,new jr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Xl=class e extends zr{constructor(e=new ll([new N(0,.5),new N(-.5,-.5),new N(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new jr(r,3)),this.setAttribute(`normal`,new jr(i,3)),this.setAttribute(`uv`,new jr(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;Hl.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];Hl.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=Hl.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Zl(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function Zl(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var Ql=class e extends zr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new P,d=new P,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=0;f===0&&a===0?v=.5/t:f===n&&s===Math.PI&&(v=-.5/t);for(let n=0;n<=t;n++){let s=n/t;u.x=-e*Math.cos(r+s*i)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(r+s*i)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(s+v,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new jr(p,3)),this.setAttribute(`normal`,new jr(m,3)),this.setAttribute(`uv`,new jr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},$l=class e extends zr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],s=[],c=[],l=new P,u=new P,d=new P;for(let a=0;a<=n;a++)for(let f=0;f<=r;f++){let p=f/r*i,m=a/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(p),u.y=(e+t*Math.cos(m))*Math.sin(p),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),l.x=e*Math.cos(p),l.y=e*Math.sin(p),d.subVectors(u,l).normalize(),s.push(d.x,d.y,d.z),c.push(f/r),c.push(a/n)}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,o=(r+1)*(e-1)+t,s=(r+1)*e+t;a.push(n,i,s),a.push(i,o,s)}this.setIndex(a),this.setAttribute(`position`,new jr(o,3)),this.setAttribute(`normal`,new jr(s,3)),this.setAttribute(`uv`,new jr(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},eu=class e extends zr{constructor(e=new Qc(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,s=new P,c=new N,l=new P,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new jr(u,3)),this.setAttribute(`normal`,new jr(d,3)),this.setAttribute(`uv`,new jr(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new el[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},tu=class extends wr{static get type(){return`MeshStandardMaterial`}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:``},this.color=new F(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new F(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new N(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function nu(e,t,n){return!e||!n&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function ru(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var iu=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},au=class extends iu{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Le,endingEnd:Le}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Re:i=e,o=2*t-n;break;case ze:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Re:a=e,s=2*n-t;break;case ze:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ou=class extends iu{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},su=class extends iu{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},cu=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=nu(t,this.TimeBufferType),this.values=nu(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:nu(e.times,Array),values:nu(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new su(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ou(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new au(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Pe:t=this.InterpolantFactoryMethodDiscrete;break;case Fe:t=this.InterpolantFactoryMethodLinear;break;case Ie:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return console.warn(`THREE.KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Pe;case this.InterpolantFactoryMethodLinear:return Fe;case this.InterpolantFactoryMethodSmooth:return Ie}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error(`THREE.KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(console.error(`THREE.KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){console.error(`THREE.KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){console.error(`THREE.KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&ru(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){console.error(`THREE.KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ie,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};cu.prototype.TimeBufferType=Float32Array,cu.prototype.ValueBufferType=Float32Array,cu.prototype.DefaultInterpolation=Fe;var lu=class extends cu{constructor(e,t,n){super(e,t,n)}};lu.prototype.ValueTypeName=`bool`,lu.prototype.ValueBufferType=Array,lu.prototype.DefaultInterpolation=Pe,lu.prototype.InterpolantFactoryMethodLinear=void 0,lu.prototype.InterpolantFactoryMethodSmooth=void 0;var uu=class extends cu{};uu.prototype.ValueTypeName=`color`;var du=class extends cu{};du.prototype.ValueTypeName=`number`;var fu=class extends iu{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)$t.slerpFlat(i,0,a,c-o,a,c,s);return i}},pu=class extends cu{InterpolantFactoryMethodLinear(e){return new fu(this.times,this.values,this.getValueSize(),e)}};pu.prototype.ValueTypeName=`quaternion`,pu.prototype.InterpolantFactoryMethodSmooth=void 0;var mu=class extends cu{constructor(e,t,n){super(e,t,n)}};mu.prototype.ValueTypeName=`string`,mu.prototype.ValueBufferType=Array,mu.prototype.DefaultInterpolation=Pe,mu.prototype.InterpolantFactoryMethodLinear=void 0,mu.prototype.InterpolantFactoryMethodSmooth=void 0;var hu=class extends cu{};hu.prototype.ValueTypeName=`vector`;var gu=class extends rr{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new F(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},_u=class extends gu{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(rr.DEFAULT_UP),this.updateMatrix(),this.groundColor=new F(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},vu=new An,yu=new P,bu=new P,xu=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new N(512,512),this.map=null,this.mapPass=null,this.matrix=new An,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ci,this._frameExtents=new N(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;yu.setFromMatrixPosition(e.matrixWorld),t.position.copy(yu),bu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bu),t.updateMatrixWorld(),vu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Su=class extends xu{constructor(){super(new Ri(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Cu=class extends gu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(rr.DEFAULT_UP),this.updateMatrix(),this.target=new rr,this.shadow=new Su}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},wu=class extends gu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Tu=`\\[\\]\\.:\\/`,Eu=RegExp(`[\\[\\]\\.:\\/]`,`g`),Du=`[^\\[\\]\\.:\\/]`,Ou=`[^`+Tu.replace(`\\.`,``)+`]`,ku=`((?:WC+[\\/:])*)`.replace(`WC`,Du),Au=`(WCOD+)?`.replace(`WCOD`,Ou),ju=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Du),Mu=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Du),Nu=RegExp(`^`+ku+Au+ju+Mu+`$`),Pu=[`material`,`materials`,`bones`,`map`],Fu=class{constructor(e,t,n){let r=n||Iu.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Iu=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Eu,``)}static parseTrackName(e){let t=Nu.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Pu.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn(`THREE.PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){console.error(`THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){console.error(`THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){console.error(`THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error(`THREE.PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){console.error(`THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;console.error(`THREE.PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.needsUpdate===void 0?t.matrixWorldNeedsUpdate!==void 0&&(s=this.Versioning.MatrixWorldNeedsUpdate):s=this.Versioning.NeedsUpdate;let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Iu.Composite=Fu,Iu.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Iu.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Iu.prototype.GetterByBindingType=[Iu.prototype._getValue_direct,Iu.prototype._getValue_array,Iu.prototype._getValue_arrayElement,Iu.prototype._getValue_toArray],Iu.prototype.SetterByBindingTypeAndVersioning=[[Iu.prototype._setValue_direct,Iu.prototype._setValue_direct_setNeedsUpdate,Iu.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Iu.prototype._setValue_array,Iu.prototype._setValue_array_setNeedsUpdate,Iu.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Iu.prototype._setValue_arrayElement,Iu.prototype._setValue_arrayElement_setNeedsUpdate,Iu.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Iu.prototype._setValue_fromArray,Iu.prototype._setValue_fromArray_setNeedsUpdate,Iu.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Lu=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=Math.max(e,Math.min(Math.PI-e,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(tt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Ru=class extends Ec{constructor(e=10,t=10,n=4473924,r=8947848){n=new F(n),r=new F(r);let i=t/2,a=e/t,o=e/2,s=[],c=[];for(let e=0,l=0,u=-o;e<=t;e++,u+=a){s.push(-o,0,u,o,0,u),s.push(u,0,-o,u,0,o);let t=e===i?n:r;t.toArray(c,l),l+=3,t.toArray(c,l),l+=3,t.toArray(c,l),l+=3,t.toArray(c,l),l+=3}let l=new zr;l.setAttribute(`position`,new jr(s,3)),l.setAttribute(`color`,new jr(c,3));let u=new mc({vertexColors:!0,toneMapped:!1});super(l,u),this.type=`GridHelper`}dispose(){this.geometry.dispose(),this.material.dispose()}},zu=class extends Ye{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`170`}})),typeof window<`u`&&(window.__THREE__?console.warn(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`170`);var Bu={type:`change`},Vu={type:`start`},Hu={type:`end`},Uu=new kn,Wu=new bi,Gu=Math.cos(70*St.DEG2RAD),Ku=new P,qu=2*Math.PI,Ju={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Yu=1e-6,Xu=class extends zu{constructor(n,r=null){super(n,r),this.state=Ju.NONE,this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:e.ROTATE,MIDDLE:e.DOLLY,RIGHT:e.PAN},this.touches={ONE:t.ROTATE,TWO:t.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new $t,this._lastTargetPosition=new P,this._quat=new $t().setFromUnitVectors(n.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Lu,this._sphericalDelta=new Lu,this._scale=1,this._panOffset=new P,this._rotateStart=new N,this._rotateEnd=new N,this._rotateDelta=new N,this._panStart=new N,this._panEnd=new N,this._panDelta=new N,this._dollyStart=new N,this._dollyEnd=new N,this._dollyDelta=new N,this._dollyDirection=new P,this._mouse=new N,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Qu.bind(this),this._onPointerDown=Zu.bind(this),this._onPointerUp=$u.bind(this),this._onContextMenu=od.bind(this),this._onMouseWheel=nd.bind(this),this._onKeyDown=rd.bind(this),this._onTouchStart=id.bind(this),this._onTouchMove=ad.bind(this),this._onMouseDown=ed.bind(this),this._onMouseMove=td.bind(this),this._interceptControlDown=sd.bind(this),this._interceptControlUp=cd.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Bu),this.update(),this.state=Ju.NONE}update(e=null){let t=this.object.position;Ku.copy(t).sub(this.target),Ku.applyQuaternion(this._quat),this._spherical.setFromVector3(Ku),this.autoRotate&&this.state===Ju.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=qu:n>Math.PI&&(n-=qu),r<-Math.PI?r+=qu:r>Math.PI&&(r-=qu),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(Ku.setFromSpherical(this._spherical),Ku.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ku),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=Ku.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new P(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new P(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=Ku.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(Uu.origin.copy(this.object.position),Uu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Uu.direction))<Gu?this.object.lookAt(this.target):(Wu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Uu.intersectPlane(Wu,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Yu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Yu||this._lastTargetPosition.distanceToSquared(this.target)>Yu?(this.dispatchEvent(Bu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?qu/60/60*this.autoRotateSpeed:qu/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ku.setFromMatrixColumn(t,0),Ku.multiplyScalar(-e),this._panOffset.add(Ku)}_panUp(e,t){this.screenSpacePanning===!0?Ku.setFromMatrixColumn(t,1):(Ku.setFromMatrixColumn(t,0),Ku.crossVectors(this.object.up,Ku)),Ku.multiplyScalar(e),this._panOffset.add(Ku)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Ku.copy(r).sub(this.target);let i=Ku.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(qu*this._rotateDelta.x/t.clientHeight),this._rotateUp(qu*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(qu*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-qu*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(qu*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-qu*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(qu*this._rotateDelta.x/t.clientHeight),this._rotateUp(qu*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new N,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Zu(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener(`pointermove`,this._onPointerMove),this.domElement.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e)))}function Qu(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function $u(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(Hu),this.state=Ju.NONE;break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function ed(t){let n;switch(t.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case e.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=Ju.DOLLY;break;case e.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=Ju.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=Ju.ROTATE}break;case e.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=Ju.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=Ju.PAN}break;default:this.state=Ju.NONE}this.state!==Ju.NONE&&this.dispatchEvent(Vu)}function td(e){switch(this.state){case Ju.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Ju.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Ju.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function nd(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===Ju.NONE&&(e.preventDefault(),this.dispatchEvent(Vu),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Hu))}function rd(e){this.enabled!==!1&&this.enablePan!==!1&&this._handleKeyDown(e)}function id(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case t.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=Ju.TOUCH_ROTATE;break;case t.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=Ju.TOUCH_PAN;break;default:this.state=Ju.NONE}break;case 2:switch(this.touches.TWO){case t.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Ju.TOUCH_DOLLY_PAN;break;case t.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Ju.TOUCH_DOLLY_ROTATE;break;default:this.state=Ju.NONE}break;default:this.state=Ju.NONE}this.state!==Ju.NONE&&this.dispatchEvent(Vu)}function ad(e){switch(this._trackPointer(e),this.state){case Ju.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Ju.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Ju.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Ju.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Ju.NONE}}function od(e){this.enabled!==!1&&e.preventDefault()}function sd(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function cd(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function ld(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new zr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=ud(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=ud(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}return c}function ud(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Or(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var dd=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),fd=(e,t,n)=>e+(t-e)*n,V=e=>(e=dd(e),e*e*(3-2*e)),pd=e=>(e=dd(e),e<.5?4*e*e*e:1-(-2*e+2)**3/2),md=e=>1-(1-dd(e))**3,hd=e=>(e=dd(e),1+2.70158*(e-1)**3+1.70158*(e-1)**2),H=(e,t,n)=>dd((e-t)/(n-t)),gd=(e,t,n,r=.5)=>Math.min(V((e-t)/r),V((n-e)/r)),U=(e=0,t=0,n=0)=>new P(e,t,n);function _d(e){let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var vd=new Map;function W(e,t={}){let n=`${new F(e).getHexString()}|${t.rough??.85}|${t.metal??0}|${t.emissive??``}|${t.ei??0}|${t.flat??!0}`,r=vd.get(n);return r||(r=new tu({color:e,roughness:t.rough??.85,metalness:t.metal??0,flatShading:t.flat??!0}),t.emissive&&(r.emissive=new F(t.emissive),r.emissiveIntensity=t.ei??1),vd.set(n,r)),r}function G(e,t,n=0,r=0,i=0,a=!0){let o=new I(e,t);return o.position.set(n,r,i),o.castShadow=a,o.receiveShadow=!0,o}function yd(e,t,n=new P){if(t<=e[0][0])return n.set(e[0][1],e[0][2],e[0][3]);let r=e.length;if(t>=e[r-1][0])return n.set(e[r-1][1],e[r-1][2],e[r-1][3]);let i=0;for(;i<r-2&&t>e[i+1][0];)i++;let a=e[Math.max(0,i-1)],o=e[i],s=e[i+1],c=e[Math.min(r-1,i+2)],l=pd((t-o[0])/(s[0]-o[0]))*.35+(t-o[0])/(s[0]-o[0])*.65,u=(e,t,n,r)=>{let i=l*l,a=i*l;return .5*(2*t+(-e+n)*l+(2*e-5*t+4*n-r)*i+(-e+3*t-3*n+r)*a)};return n.set(u(a[1],o[1],s[1],c[1]),u(a[2],o[2],s[2],c[2]),u(a[3],o[3],s[3],c[3]))}function bd(e,t,n,r,i,a){let o=Math.min(a,r/2,i/2);e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+r,n,t+r,n+i,o),e.arcTo(t+r,n+i,t,n+i,o),e.arcTo(t,n+i,t,n,o),e.arcTo(t,n,t+r,n,o),e.closePath()}var xd=`Inter, "Segoe UI", Roboto, "Noto Sans", system-ui, -apple-system, sans-serif`;function Sd(e,t,n={}){let r=document.createElement(`canvas`),i=1024,a=t?300:190;r.width=i,r.height=a;let o=r.getContext(`2d`);o.fillStyle=n.bg??`rgba(255,255,255,0.94)`,bd(o,8,8,1008,a-16,60),o.fill(),o.fillStyle=n.accent??`#00685F`,bd(o,40,a/2-50,16,100,8),o.fill(),o.fillStyle=n.color??`#0E1A1A`,o.textBaseline=`middle`,o.font=`700 76px ${xd}`,o.fillText(e,90,t?105:a/2+2,894),t&&(o.font=`500 54px ${xd}`,o.fillStyle=`#5F6B6B`,o.fillText(t,90,200,894));let s=new Dc(r);s.colorSpace=He,s.anisotropy=4;let c=new nc(new Hs({map:s,transparent:!0,depthWrite:!1,fog:!1,toneMapped:!1})),l=n.scale??4;return c.scale.set(l,l*a/i,1),c}var Cd=new P(.5,.62,.6).normalize();function wd(e,t,n){return e.rotation[t]=n,e}var Td=(e,t,n)=>{let r=dd((n-e)/(t-e));return r*r*(3-2*r)},Ed=[`#2E86DE`,`#E84C8B`,`#FFB703`,`#2EC4B6`,`#9B5DE5`,`#FB5607`,`#06D6A0`,`#FF6B6B`,`#3A86FF`,`#F15BB5`],Dd=[`#1E6FD9`,`#FFFFFF`,`#E63946`,`#2BA84A`,`#FFC300`],Od=[[-10,92],[14,86],[36,77],[12,66],[-26,56],[-6,46],[26,37],[10,27],[-4,19],[3,12],[6,6.5]];function kd(e,t){let n=1e9;for(let r=0;r<Od.length-1;r++){let[i,a]=Od[r],[o,s]=Od[r+1],c=o-i,l=s-a,u=dd(((e-i)*c+(t-a)*l)/(c*c+l*l));n=Math.min(n,Math.hypot(e-i-c*u,t-a-l*u))}return n}function Ad(e,t){return Math.sin(e*.031+1.3)*Math.cos(t*.027-.7)+.5*Math.sin(e*.071-t*.053+2.1)+.25*Math.sin(e*.13+t*.11)}function jd(e,t){let n=0,r=1,i=.0042;for(let a=0;a<5;a++)n+=r*(1-Math.abs(Math.sin(e*i+a*1.7)*Math.cos(t*i*1.13-a*.9))),r*=.5,i*=2.03;return n}var Md=e=>102+Math.sin(e*.018)*6,Nd=4.4,Pd=Nd*.55;function Fd(e,t){let n=t+(t>18?4*Math.sin(e*.035)*Td(18,30,t):0),r=Md(e),i;return i=t<-14?(-t-14)*.62+Math.max(0,-t-50)**1.25*.35:t<r?n<16?0:Math.max(-41.8,-(n-16)*.55):-41.8+Math.max(0,t-r-10)*.6+Math.max(0,t-r-40)**1.25*.35,i-=2.2*(1-Td(4,10,Math.abs(t-r))),{h:i,zw:n}}function Id(e,t){let{h:n}=Fd(e,t),r=Math.max(Math.abs(e)-70,-14-t,t-16,0),i=n+Math.max(0,Math.abs(e)-70)*.36;return i+=Ad(e,t)*4.5*Td(0,40,r)*(1-.8*(1-Td(1.5,6,kd(e,t)))),i+=Td(260,620,Math.hypot(e,t-40))*jd(e,t)*85,i}function Ld(e,t){let n=Td(19,22,t)*(1-Td(84,88,t))*(1-Td(88,104,Math.abs(e)+6*Math.sin(t*.2))),r=Td(-64,-58,t)*(1-Td(-22,-18,t))*(1-Td(44,58,Math.abs(e+8)));return Math.max(n,r)*Td(2.2,4.5,kd(e,t))}function Rd(e,t){let n=Id(e,t),r=Ld(e,t);if(r<=0)return n;let i;if(t>0){let{zw:n}=Fd(e,t);i=-Math.floor((n-16)/Nd)*Pd-.4}else i=(Math.floor((-t-14)/3.4)+1)*3.4*.62-.2;return n+(i-n)*r}function zd(e,t){let{zw:n}=Fd(e,t),r=t>0?Math.floor((n-16)/Nd):Math.floor((-t-14)/3.4)+40;return{k:r,c:Math.floor((e+200+Math.sin(r*1.7)*9)/26),frac:t>0?(n-16)/Nd%1:(-t-14)/3.4%1}}function Bd(e){let t=new Ql(1900,32,16),n=new oi({side:1,depthWrite:!1,fog:!1,uniforms:{top:{value:new F(`#2F7FD6`)},mid:{value:new F(`#8CC8F2`)},horizon:{value:new F(`#E8F1F5`)},sun:{value:Cd.clone()}},vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`uniform vec3 top; uniform vec3 mid; uniform vec3 horizon; uniform vec3 sun; varying vec3 vDir;
      void main(){ float h = vDir.y;
        vec3 c = mix(horizon, mid, smoothstep(-0.02, 0.16, h));
        c = mix(c, top, smoothstep(0.16, 0.7, h));
        float s = max(dot(normalize(vDir), normalize(sun)), 0.0);
        c += vec3(1.0,0.85,0.6)*pow(s, 16.0)*0.3 + vec3(1.0,0.97,0.85)*pow(s, 700.0)*1.6;
        if (h < 0.0) c = horizon;
        gl_FragColor = vec4(c,1.0); }`});e.add(new I(t,n))}function Vd(e,t,n){let r=new ll;r.moveTo(-e/2,0),r.lineTo(e/2,0),r.lineTo(0,t),r.closePath();let i=new Gl(r,{depth:n,bevelEnabled:!1});return i.translate(0,0,-n/2),i}function Hd(e,t,n,r){for(let i=0;i<11;i++){let a=-t/2+t*i/10,o=Math.sin(i/10*Math.PI)*.18;e.add(G(new Jl(.075,0),W(i%2?`#FF8C00`:`#FFC300`),a,n-o,r,!1))}}function Ud(e,t,n,r,i,a=5.4,o=4.4,s=2){let c=new z;c.position.set(e,t,n),c.rotation.y=r;let l=W(`#A39C92`),u=W(`#6B4426`),d=W(`#9A6338`),f=W(`#5E656D`);c.add(G(new L(a+.6,8,o+.6),W(`#8E877E`),0,-3.85,0)),c.add(G(new L(a,2.5,o),l,0,1.4,0));for(let e=0;e<4;e++)c.add(G(new L(a+.06,.12,o+.06),u,0,.45+e*.6,0,!1));c.add(G(new L(1,1.85,.12),W(`#5A341B`),-.9,1.08,o/2+.04,!1)),c.add(G(new L(1.25,.16,.16),W(i),-.9,2.05,o/2+.06,!1));for(let e of[-1,1])c.add(G(new L(.14,1.95,.16),W(i),-.9+e*.58,1.08,o/2+.06,!1));Hd(c,1.2,2,o/2+.16),c.add(G(new L(.8,.7,.1),W(`#1F3B4D`),1.2,1.5,o/2+.04,!1)),c.add(G(new L(.98,.88,.08),W(i),1.2,1.5,o/2+.02,!1));let p=2.65;if(s>1){let e=2.1;c.add(G(new L(a+.5,e,o+.5),d,0,p+e/2,0)),c.add(G(new L(a+.9,.14,1),u,0,p+.08,o/2+.7,!1)),c.add(G(new L(a+.9,.12,.1),W(i),0,p+.95,o/2+1.15,!1));for(let e=0;e<=10;e++)c.add(G(new L(.07,.85,.07),W(e%2?i:`#FFFFFF`),-(a+.8)/2+e*(a+.8)/10,p+.5,o/2+1.15,!1));for(let e of[-1.4,0,1.4])c.add(G(new L(.85,.95,.1),W(`#FFFFFF`),e,p+1.1,o/2+.27,!1)),c.add(G(new L(.62,.72,.12),W(e===0?`#FFB703`:`#1F6F8B`),e,p+1.1,o/2+.29,!1));p+=e}let m=Vd(o+1.8,1.6,a+1.6);return m.rotateY(Math.PI/2),c.add(G(m,f,0,p,0)),c.add(G(new L(a+1.7,.18,.22),W(`#3F454B`),0,p+1.6,0,!1)),c}function Wd(){let e=[];for(let t=0;t<4;t++){let n=new ol(2.2-t*.45,3,7);n.translate(0,2.4+t*1.7,0),e.push(n)}return ld(e)}function Gd(){let e=[],t=_d(5);for(let n=0;n<4;n++){let n=new Jl(1.1+t()*.4,0);n.translate((t()-.5)*1.6,2.6+t()*.9,(t()-.5)*1.6),e.push(n)}return ld(e)}function Kd(e,t,n,r,i,a){let o=new z;o.position.set(e,t,n),o.rotation.y=r,o.scale.setScalar(.85);let s=W(i);o.add(G(new L(.75,.7,1.5),s,0,1,0)),o.add(G(new L(.42,.45,.55),s,0,1.25,.95));for(let e of[-1,1]){let t=G(new ol(.05,.3,5),W(a),e*.15,1.6,.9,!1);t.rotation.z=-e*.5,o.add(t);for(let t of[-.55,.55])o.add(G(new L(.16,.7,.16),s,e*.25,.35,t))}return o.add(G(new $l(.24,.04,5,12),W(`#FF8C00`),0,1.1,.8,!1)),o}function qd(e,t,n){let r=new z;r.position.set(e,0,t),r.rotation.y=n;let i=W(`#8B5A2B`),a=W(`#E84C8B`);for(let e of[-1,1])for(let t of[-1,1])r.add(G(new L(.06,.45,.06),i,e*.21,.22,t*.2));r.add(G(new L(.5,.06,.48),i,0,.46,0)),r.add(G(new L(.46,.035,.44),a,0,.5,0,!1));for(let e of[-1,1])r.add(G(new L(.06,.55,.06),i,e*.21,.75,-.2));return r.add(G(new L(.48,.2,.05),W(`#2EC4B6`),0,.9,-.2)),r}function Jd(e,t,n,r,i=1.2){for(let r of[t,n])e.add(G(new B(.06,.08,5,5),W(`#6E4B2E`),r.x,r.y-2.5,r.z));let a=Math.max(10,Math.round(t.distanceTo(n)*1.6)),o=new Ei(.42,.5);o.translate(0,-.25,0);let s=[];for(let c=0;c<=a;c++){let l=c/a,u=t.clone().lerp(n,l);if(u.y-=Math.sin(l*Math.PI)*i,s.push(u),c>0&&c<a){let i=new I(o,new tu({color:Dd[c%Dd.length],side:2,roughness:.8}));i.position.copy(u),i.lookAt(u.x+(n.z-t.z),u.y,u.z-(n.x-t.x)),i.userData.phase=r()*6,e.add(i)}}e.add(new Sc(new zr().setFromPoints(s),new mc({color:`#555`})))}function Yd(e,t,n){let r=new z;r.position.set(e,t,n),r.rotation.y=.5,r.add(G(new L(5,8,5),W(`#8E877E`),0,-3.6,0)),r.add(G(new L(4.6,.6,4.6),W(`#C9BFB0`),0,.5,0)),r.add(G(new L(3,2.6,3),W(`#B8ADA0`),0,2.1,0));for(let e=0;e<4;e++)r.add(G(new L(3.06,.12,3.06),W(`#6B4426`),0,1+e*.55,0,!1));r.add(G(new L(.9,1.6,.12),W(`#B01E2F`),0,1.6,1.53,!1));for(let e=0;e<3;e++){let t=2.9-e*.75,n=G(new ol(t,1.1,4),W(e===1?`#C0392B`:`#5E656D`),0,3.9+e*1.05,0);n.rotation.y=Math.PI/4,r.add(n),e<2&&r.add(G(new L(t*.9,.5,t*.9),W(`#9A6338`),0,4.55+e*1.05,0,!1))}r.add(G(new Ql(.25,10,8),W(`#E0A526`,{metal:.6,rough:.35}),0,7.4,0));let i=new ll;i.moveTo(0,0),i.lineTo(1.2,-.3),i.lineTo(0,-.7),i.closePath();let a=new I(new Xl(i),new tu({color:`#E63946`,side:2}));return a.position.set(.04,9.2,0),r.add(a),r.add(G(new B(.035,.035,2.2,4),W(`#5A3A22`),0,8.2,0,!1)),r.userData.flag=a,r}function Xd(e,t,n){let r=new z;r.position.set(e,t,n),r.rotation.y=Math.PI*1.04,r.add(G(new L(13,10,9),W(`#8E877E`),0,-4.8,0)),r.add(G(new L(11,4.2,7),W(`#F7F7F2`),0,2.3,0)),r.add(G(new L(11.05,.5,7.05),W(`#00685F`),0,.8,0,!1));let i=Vd(8.2,1.8,12);i.rotateY(Math.PI/2),r.add(G(i,W(`#2A9D8F`),0,4.4,0)),r.add(G(new L(2,2.4,.2),W(`#99EFE5`,{rough:.3}),0,1.4,3.55,!1));for(let e of[-3.6,-2,2,3.6])r.add(G(new L(1,1,.15),W(`#2A5DA8`,{rough:.3}),e,2.5,3.55,!1));let a=document.createElement(`canvas`);a.width=512,a.height=128;let o=a.getContext(`2d`);o.fillStyle=`#00685F`,o.fillRect(0,0,512,128),o.fillStyle=`#FFFFFF`,o.fillRect(28,34,60,60),o.fillStyle=`#D7263D`,o.fillRect(50,40,16,48),o.fillRect(34,56,48,16),o.fillStyle=`#FFFFFF`,o.font=`700 56px Inter, system-ui, sans-serif`,o.textBaseline=`middle`,o.fillText(`PHC Rongli`,110,66);let s=new Dc(a);s.colorSpace=He;let c=new I(new Ei(7,1.75),new Tr({map:s,fog:!1}));c.position.set(0,7.4,3.2),r.add(c);for(let e of[-3,3])r.add(G(new L(.15,2.4,.15),W(`#555555`),e,6.2,3.2,!1));let l=new z;l.position.set(-8,0,4),l.rotation.y=.4,l.add(G(new L(2,1.4,3.6),W(`#FFFFFF`),0,1.1,0)),l.add(G(new L(2.02,.3,3.62),W(`#D7263D`),0,1,0,!1));for(let e of[-1,1])for(let t of[-1.1,1.1]){let n=G(new B(.4,.4,.25,12),W(`#222222`),e*1,.4,t);n.rotation.z=Math.PI/2,l.add(n)}return r.add(l),r}function Zd(e,t,n){let r=new z;r.position.set(e,t,n);for(let e=0;e<4;e++){let t=e/4*Math.PI*2+Math.PI/4,n=G(new B(.12,.18,22,5),W(`#9AA4AA`,{metal:.6,rough:.4}),Math.cos(t)*1.1,11,Math.sin(t)*1.1);r.add(n)}for(let e=1;e<8;e++){let t=G(new $l(1.1-e*.07,.06,4,4),W(e%2?`#D7263D`:`#FFFFFF`),0,e/8*22,0,!1);t.rotation.x=Math.PI/2,t.rotation.z=Math.PI/4,r.add(t)}for(let e=0;e<3;e++){let t=e/3*Math.PI*2;r.add(G(new L(.4,1.8,.25),W(`#E8E8E8`),Math.cos(t)*.8,20.5,Math.sin(t)*.8))}r.add(G(new Ql(.25,8,6),W(`#FF2D2D`,{emissive:`#FF2D2D`,ei:2}),0,22.3,0,!1));let i=G(new L(2.4,.08,1.6),W(`#1F3B73`,{rough:.2,metal:.4}),2.6,1.6,0);return i.rotation.z=.5,r.add(i),r}function Qd(e,t,n,r){let i=n.clone().sub(t),a=i.length();i.normalize();let o=U(i.z,0,-i.x),s=Math.atan2(i.x,i.z),c=W(`#9A6338`),l=new mc({color:`#4A3420`}),u=[];for(let e=0;e<=28;e++){let r=e/28,i=t.clone().lerp(n,r);i.y-=Math.sin(r*Math.PI)*2.2,u.push(i)}u.forEach((t,n)=>{if(n%1==0){let n=G(new L(1.8,.1,a/28*.8),c,t.x,t.y,t.z,!1);n.rotation.y=s,e.add(n)}});for(let r of[-1,1]){let i=u.map(e=>e.clone().addScaledVector(o,r*.95).add(U(0,1.1,0)));e.add(new Sc(new zr().setFromPoints(i),l));for(let t=0;t<=28;t+=2)e.add(new Sc(new zr().setFromPoints([u[t].clone().addScaledVector(o,r*.9),i[t]]),l));for(let i of[t,n])e.add(G(new L(.35,2.6,.35),W(`#6B4426`),i.x+o.x*r*1,i.y+.6,i.z+o.z*r*1))}let d=new z;return e.add(d),Jd(d,t.clone().addScaledVector(o,1).add(U(0,3.6,0)),n.clone().addScaledVector(o,1).add(U(0,3.6,0)),r,3),d}function $d(e){e.background=new F(`#E8F1F5`),e.fog=new Ls(`#DCEAF2`,220,1500),Bd(e),e.add(new _u(`#D6ECFF`,`#6B7F4A`,1.25));let t=new Cu(`#FFF0D6`,2.7);t.position.copy(Cd).multiplyScalar(140),t.castShadow=!0,t.shadow.mapSize.set(2048,2048);let n=t.shadow.camera;n.left=-70,n.right=70,n.top=70,n.bottom=-70,n.near=10,n.far=380,t.shadow.bias=-6e-4,t.shadow.normalBias=.05,e.add(t),e.add(t.target);let r=_d(42),i=new z;e.add(i);let a=new Ei(2,2,300,300);a.rotateX(-Math.PI/2);let o=a.attributes.position,s=e=>150*e+1250*Math.abs(e)**5*Math.sign(e);for(let e=0;e<o.count;e++){let t=s(o.getX(e)),n=s(o.getZ(e))+30;o.setXYZ(e,t,Rd(t,n),n)}a.computeVertexNormals();let c=a.toNonIndexed(),l=c.attributes.position,u=new Float32Array(l.count*3),d=new F(`#7DB843`),f=new F(`#A6CC52`),p=new F(`#4E8A3C`),m=new F(`#8E8A84`),h=new F(`#F7FAFF`),g=new F(`#9B7B55`),_=new F(`#C9A777`),v=new F(`#6E9C8A`),y=[`#D9487A`,`#F0C33C`,`#7CC046`,`#D9B862`,`#55A043`,`#EC8A3C`,`#C04A72`,`#A2D04A`,`#F5D85A`],b=new F,x=new F,S=new P,C=new P,w=new P,T=new P;for(let e=0;e<l.count;e+=3){S.fromBufferAttribute(l,e),C.fromBufferAttribute(l,e+1),w.fromBufferAttribute(l,e+2),T.subVectors(w,C).cross(C.clone().sub(S)).normalize();let t=Math.abs(T.y),n=(S.x+C.x+w.x)/3,r=(S.y+C.y+w.y)/3,i=(S.z+C.z+w.z)/3;b.copy(d).lerp(f,(Math.sin(n*.07)*Math.cos(i*.05)+1)/2);let a=Td(.2,.9,Ad(n*1.7+40,i*1.7)*.5+.5)*Td(20,60,Math.hypot(n,i));b.lerp(p,a*.8);let o=Ld(n,i);if(o>.5){let{k:e,c:r}=zd(n,i);x.set(y[Math.abs(e*3+r*5)%y.length]),b.copy(t<.8?g:x)}kd(n,i)<2.2&&i>5&&b.lerp(_,.85);let s=Math.max(0,1-Math.hypot((n-5)/9,(i-3)/5));b.lerp(_,Math.min(1,s*1.6)),Math.abs(i-Md(n))<12&&r<-40&&b.lerp(v,.6);let c=1-Td(.55,.8,t);b.lerp(m,c*(o>.5?0:.9));let E=Td(120,150,r+Ad(n*3,i*3)*14)*(.55+.45*Td(.45,.75,t));b.lerp(h,E);for(let t=0;t<3;t++)u[(e+t)*3]=b.r,u[(e+t)*3+1]=b.g,u[(e+t)*3+2]=b.b}c.setAttribute(`color`,new Or(u,3)),c.computeVertexNormals();let E=new I(c,new tu({vertexColors:!0,roughness:1,flatShading:!0}));E.receiveShadow=!0,i.add(E);{let e=[],t=[];for(let n=0;n<=160;n++){let r=-900+1800*n/160,i=Md(r);if(e.push(r,-42.6,i-6,r,-42.6,i+6),n<160){let e=n*2;t.push(e,e+1,e+2,e+1,e+3,e+2)}}let n=new zr;n.setAttribute(`position`,new jr(e,3)),n.setIndex(t),n.computeVertexNormals();let r=new I(n,new tu({color:`#4FB3D9`,roughness:.15,metalness:.15,side:2,emissive:`#1C6C8C`,emissiveIntensity:.25}));i.add(r)}let D=Od.map(([e,t])=>U(e,Id(e,t)+.08,t));D[D.length-1].y=.02,D[D.length-2].y=.04;let O=new Ic(D,!1,`catmullrom`,.2);{let e=[],t=[];for(let n=0;n<=600;n++){let r=O.getPointAt(n/600),i=O.getTangentAt(n/600),a=U(i.z,0,-i.x).normalize().multiplyScalar(1.1),o=Math.max(r.y,Id(r.x+a.x,r.z+a.z)+.06),s=Math.max(r.y,Id(r.x-a.x,r.z-a.z)+.06);if(e.push(r.x+a.x,r.z<8?.03:o,r.z+a.z,r.x-a.x,r.z<8?.03:s,r.z-a.z),n<600){let e=n*2;t.push(e,e+1,e+2,e+1,e+3,e+2)}}let n=new zr;n.setAttribute(`position`,new jr(e,3)),n.setIndex(t),n.computeVertexNormals();let a=new I(n,new tu({color:`#B9AE9E`,roughness:1,side:2,polygonOffset:!0,polygonOffsetFactor:-2}));a.receiveShadow=!0,i.add(a);let o=new pc(new cl(.35,0),W(`#8F887F`),360),s=new An;for(let e=0;e<360;e++){let t=(e+.5)/360,n=O.getPointAt(t),i=O.getTangentAt(t),a=(e%2?1:-1)*1.35;s.compose(U(n.x+i.z*a,Math.max(n.y,Id(n.x+i.z*a,n.z-i.x*a))+.05,n.z-i.x*a),new $t().setFromEuler(new Bn(r(),r(),r())),U(1,.6,1).multiplyScalar(.7+r()*.6)),o.setMatrixAt(e,s)}i.add(o)}let k=Qd(i,U(-10,-36.4,90),U(-12,-36.4,116),r),ee=U(4,0,-3.2);i.add(Ud(ee.x,0,ee.z,0,`#2E86DE`,6,4.6,2)),[[-11,-4,.15],[-33,-2,-.1],[-46,2,.2],[17,-5,-.1],[30,-2,-.2],[44,1,.1],[57,3,-.25],[-20,9,.1],[24,10,-.1],[-56,12,.3],[-14,-24,.1],[6,-27,-.05],[26,-25,-.15],[-34,-27,.2],[44,-30,-.2],[-4,-40,.05],[18,-43,-.1],[-26,-44,.15]].forEach(([e,t,n],a)=>i.add(Ud(e,Rd(e,t)-(t<-14?.6:0),t,n,Ed[(a*3+1)%Ed.length],4.6+r()*1.4,4+r()*.6,r()>.25?2:1)));for(let e=0;e<8;e++){let t=20+e*14+r()*6,n=132+r()*22;i.add(Ud(t,Rd(t,n)-.4,n,Math.PI+(r()-.5)*.3,Ed[e*7%Ed.length],4.8,4.2,2))}let A=new I(new Ei(10,5.5),W(`#B8B1A6`,{rough:1}));A.rotation.x=-Math.PI/2,A.position.set(5.5,.03,2.6),A.receiveShadow=!0,i.add(A);for(let e=0;e<18;e++)i.add(wd(G(new Ei(1.1+r()*.5,.9+r()*.4),W(r()>.5?`#A9A196`:`#C4BDB2`),1.2+e%6*1.6+r()*.3,.04,.8+Math.floor(e/6)*1.5+r()*.2,!1),`x`,-Math.PI/2));let te=U(7.2,0,1);i.add(qd(te.x,te.z,0)),i.add(G(new L(.7,.8,.7),W(`#F2A65A`),.2,.4,.4)),i.add(G(new Jl(.42,0),W(`#3F9A3A`),.2,1.05,.4));{let e=new rl([[0,0],[.12,.01],[.24,.1],[.27,.22],[.24,.34],[.14,.42],[.09,.47],[.09,.52],[.13,.56],[.12,.58],[0,.58]].map(([e,t])=>new N(e,t)),16);i.add(G(new L(1.9,.12,.7),W(`#8E877C`),10.2,.06,-.4)),[`#D4A017`,`#B5542F`,`#C9CCD1`].forEach((t,n)=>i.add(G(e,W(t,{metal:.65,rough:.32,flat:!1}),9.6+n*.6,.12,-.4)))}for(let e=0;e<12;e++){let t=G(new B(.12,.12,1.6,6),W(`#7A5230`),-.6,.15+Math.floor(e/4)*.24,-.4+e%4*.26);t.rotation.x=Math.PI/2,i.add(t)}for(let e=0;e<6;e++)if(e!==3){i.add(G(new B(.2,.15,.3,8),W(`#B5542F`),1+e*1.6,.15,5.6)),i.add(G(new Jl(.17,0),W(`#3E8E3A`),1+e*1.6,.36,5.6,!1));for(let t=0;t<5;t++){let n=t*1.256+e;i.add(G(new Jl(.055,0),W([`#FF8C00`,`#FFC300`,`#E84C8B`][(e+t)%3]),1+e*1.6+Math.cos(n)*.1,.46+t%2*.04,5.6+Math.sin(n)*.1,!1))}}i.add(G(new L(4.75,.5,.35),W(`#9C958B`),2.625,.25,6)),i.add(G(new L(3.75,.5,.35),W(`#9C958B`),8.875,.25,6)),i.add(Kd(-6,0,8,.8,`#7A4E2D`,`#E84C8B`)),i.add(Kd(-3.5,0,10.5,-.6,`#EFEAE0`,`#3A86FF`)),i.add(Kd(36,0,8,2.2,`#3B3B3B`,`#FFB703`));let ne=Yd(-24,0,-6);i.add(ne);let j=new z;i.add(j),Jd(j,U(-29,5.5,-2),U(-16,5.5,4),r),Jd(j,U(12.5,5.2,-1.5),U(14.5,5.2,-8),r,.8),Jd(j,U(-3,5.2,-.5),U(-8,5.2,6),r,.8),Jd(j,U(22,4.6,12),U(34,4.6,6),r);let re=U(-46,Rd(-46,-50),-50);i.add(Zd(re.x,re.y,re.z));let ie=U(72,Rd(72,140)+.3,140);i.add(Xd(ie.x,ie.y,ie.z));{let e=Wd(),t=Gd(),n=new B(.25,.35,2.2,5);n.translate(0,1.1,0);let a=new Jl(.32,0),o=[],s=[],c=[],l=[],u=()=>new An,d=0;for(;(o.length<1500||s.length<220)&&d<3e4;){d++;let e=r()*Math.PI*2,t=18+r()**.8*520,n=Math.cos(e)*t,i=Math.sin(e)*t*.9+30,a=Rd(n,i);if(a>118||a<-44||Ld(n,i)>.1||kd(n,i)<4||Math.abs(n)<64&&i>-16&&i<17||Math.abs(i-Md(n))<9||Math.hypot(n-ie.x,i-ie.z)<12||Math.hypot(n-re.x,i-re.z)<6)continue;let f=.8+r()*.9,p=new $t().setFromEuler(new Bn(0,r()*6,0));if(s.length<220&&a<40&&r()<.22){s.push(u().compose(U(n,a,i),p,U(f,f,f))),c.push(u().compose(U(n,a,i),p,U(f,f,f)));for(let e=0;e<5;e++)l.push(u().compose(U(n+(r()-.5)*2.4*f,a+(2.6+r()*1.6)*f,i+(r()-.5)*2.4*f),p,U(f,f,f)))}else if(o.length<1500){let e=f*(1.2+r()*.6);o.push(u().compose(U(n,a,i),p,U(e,e*(1.1+r()*.4),e))),c.push(u().compose(U(n,a,i),p,U(e,e,e)))}}let f=(e,t,n,r)=>{let a=new pc(e,t,n.length);return n.forEach((e,t)=>a.setMatrixAt(t,e)),a.castShadow=r,a.receiveShadow=!0,i.add(a),a},p=f(e,W(`#3B7343`),o,!0),m=new F;for(let e=0;e<o.length;e++)p.setColorAt(e,m.set([`#3B7343`,`#467A3A`,`#356B45`,`#4F8440`][e%4]));f(t,W(`#3E7D3A`),s,!0),f(n,W(`#6E4B2E`),c,!1);let h=f(a,W(`#E8344E`,{emissive:`#A0102A`,ei:.25}),l,!1);for(let e=0;e<l.length;e++)h.setColorAt(e,m.set([`#E8344E`,`#FF5C8A`,`#D7263D`][e%3]));for(let[t,r]of[[-14,-12],[14,-12],[36,-10],[-40,-10],[62,-8],[-60,-6]]){let a=Rd(t,r),o=new I(e,W(`#3F7A45`));o.position.set(t,a,r),o.scale.setScalar(1.4),o.castShadow=!0,i.add(o),i.add(G(n,W(`#6E4B2E`),t,a,r))}}let ae=[],oe=new tu({color:`#FFFFFF`,roughness:1,emissive:`#F2F7FF`,emissiveIntensity:.45,flatShading:!0,transparent:!0,opacity:.92});for(let e=0;e<26;e++){let t=new z,n=4+Math.floor(r()*4);for(let e=0;e<n;e++)t.add(new I(new Jl(3+r()*3.5,1),oe).translateX(e*4-n*2).translateY(r()*2).translateZ(r()*3));if(e<9)t.position.set(-260+r()*520,-24+r()*14,95+r()*40);else{let e=r()*Math.PI*2,n=160+r()*380;t.position.set(Math.cos(e)*n,70+r()*90,Math.sin(e)*n)}t.scale.setScalar(.9+r()*1.3),i.add(t),ae.push(t)}let se=[];for(let e=0;e<8;e++){let e=new z,t=new L(1.6,.05,.45),n=new I(t,W(`#4A3B2E`));n.position.x=-.8;let a=new I(t,W(`#4A3B2E`));a.position.x=.8;let o=new z;o.add(n);let s=new z;s.add(a),e.add(o,s,new I(new L(.35,.3,1.1),W(`#5A4636`))),e.userData={pl:o,pr:s,a:r()*6,rad:28+r()*30,h:20+r()*25,ph:r()*6},i.add(e),se.push(e)}let ce=ne.userData.flag;return{road:O,kamalaHouse:ee,charpai:te,phc:ie,tower:re,towerTop:re.clone().setY(re.y+22),update(e){for(let t of se){let n=t.userData,r=n.a+e*.12;t.position.set(Math.cos(r)*n.rad+10,n.h+Math.sin(e*.5+n.ph)*1.5,Math.sin(r)*n.rad+60),t.rotation.set(0,-r,.25);let i=Math.sin(e*2.2+n.ph)*.18;n.pl.rotation.z=i,n.pr.rotation.z=-i}for(let e of ae)e.position.x+=.02,e.position.x>600&&(e.position.x=-600);ce.rotation.y=Math.sin(e*3)*.35;for(let t of[j,k])t.children.forEach(t=>{t.userData.phase!==void 0&&(t.rotation.x=Math.sin(e*2.5+t.userData.phase)*.4)})}}}var ef=new P;function tf(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;ef.copy(t),ef[r]=0,ef.normalize();let l=.5*o/(o+s),u=1-ef.angleTo(e)/c;return Math.sign(ef[n])===1?u*l:s/(o+s)+l+l*(1-u)}var nf=class extends L{constructor(e=1,t=1,n=1,r=2,i=.1){if(r=r*2+1,i=Math.min(e/2,t/2,n/2,i),super(1,1,1,r,r,r),r===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new P,s=new P,c=new P(e,t,n).divideScalar(2).subScalar(i),l=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,f=l.length/6,p=new P,m=.5/r;for(let r=0,a=0;r<l.length;r+=3,a+=2)switch(o.fromArray(l,r),s.copy(o),s.x-=Math.sign(s.x)*m,s.y-=Math.sign(s.y)*m,s.z-=Math.sign(s.z)*m,s.normalize(),l[r+0]=c.x*Math.sign(o.x)+s.x*i,l[r+1]=c.y*Math.sign(o.y)+s.y*i,l[r+2]=c.z*Math.sign(o.z)+s.z*i,u[r+0]=s.x,u[r+1]=s.y,u[r+2]=s.z,Math.floor(r/f)){case 0:p.set(1,0,0),d[a+0]=tf(p,s,`z`,`y`,i,n),d[a+1]=1-tf(p,s,`y`,`z`,i,t);break;case 1:p.set(-1,0,0),d[a+0]=1-tf(p,s,`z`,`y`,i,n),d[a+1]=1-tf(p,s,`y`,`z`,i,t);break;case 2:p.set(0,1,0),d[a+0]=1-tf(p,s,`x`,`z`,i,e),d[a+1]=tf(p,s,`z`,`x`,i,n);break;case 3:p.set(0,-1,0),d[a+0]=1-tf(p,s,`x`,`z`,i,e),d[a+1]=1-tf(p,s,`z`,`x`,i,n);break;case 4:p.set(0,0,1),d[a+0]=1-tf(p,s,`x`,`y`,i,e),d[a+1]=1-tf(p,s,`y`,`x`,i,t);break;case 5:p.set(0,0,-1),d[a+0]=tf(p,s,`x`,`y`,i,e),d[a+1]=1-tf(p,s,`y`,`x`,i,t)}}};function rf(e){let t=new z,n=.86,r=new z;r.position.y=n,t.add(r);let i=W(e.skin,{flat:!1,rough:.7}),a=W(e.top,{flat:!1}),o=W(e.legs??e.skin,{flat:!1}),s=new z;if(r.add(s),s.add(G(new B(.15,.13,.56,10),a,0,.28,0)),e.saree){let t=G(new L(.14,.62,.33),W(e.saree,{flat:!1}),.03,.3,0);t.rotation.z=.5,s.add(t);let n=G(new L(.035,.62,.335),W(e.border??`#E0A526`),.1,.27,0,!1);n.rotation.z=.5,s.add(n),s.add(G(new B(.135,.15,.12,10),W(e.saree,{flat:!1}),0,.05,0))}if(e.dupatta){let t=W(e.dupatta,{flat:!1}),n=G(new L(.1,.6,.322),t,-.02,.32,0);n.rotation.z=-.55,s.add(n);let r=G(new $l(.135,.028,6,14),t,0,.55,0,!1);r.rotation.x=Math.PI/2,s.add(r);let i=G(new L(.1,.42,.03),t,-.12,.3,-.15);i.rotation.z=.1,s.add(i)}if(e.vest){let t=W(e.vest,{flat:!1});s.add(G(new B(.162,.142,.5,14,1,!0,.42,Math.PI*2-.84),t,0,.3,0)),s.add(G(new B(.165,.165,.04,14,1,!0,.42,Math.PI*2-.84),W(`#E0C27A`),0,.06,0,!1));for(let e=0;e<3;e++)s.add(G(new Ql(.009,6,4),W(`#E0C27A`,{metal:.6,rough:.3}),.072,.16+e*.11,.142,!1))}s.add(G(new B(.045,.05,.08,6),i,0,.6,0));let c=new z;c.position.y=.72,s.add(c),c.add(G(new Ql(.115,16,12),i,0,0,0));let l=W(e.hair,{flat:!1,rough:.6}),u=G(new Ql(.122,16,12,0,Math.PI*2,0,Math.PI*.55),l,0,.012,-.012);if(c.add(u),e.bun&&c.add(G(new Ql(.06,10,8),l,0,0,-.13)),e.cap){let t=W(e.cap,{flat:!1,rough:.9});c.add(G(new Ql(.128,16,10,0,Math.PI*2,0,Math.PI*.42),t,0,.03,-.005));let n=G(new $l(.118,.022,6,18),W(`#3A2747`,{flat:!1,rough:.9}),0,.055,-.005);n.rotation.x=Math.PI/2,c.add(n)}if(e.moustache){let t=W(e.moustache,{rough:.8});for(let e of[-1,1]){let n=G(new il(.009,.03,3,6),t,e*.022,-.026,.108,!1);n.rotation.z=Math.PI/2+e*.35,c.add(n)}}if(e.turban){let t=G(new $l(.1,.05,8,16),W(e.turban),0,.07,0);t.rotation.x=Math.PI/2,c.add(t),c.add(G(new Ql(.1,10,8),W(e.turban),0,.1,0))}for(let e of[-1,1])c.add(G(new Ql(.013,6,4),W(`#1A1A1A`),e*.04,.015,.105,!1));e.saree&&c.add(G(new Ql(.011,6,4),W(`#D7263D`,{emissive:`#D7263D`,ei:.4}),0,.055,.112,!1));let d=G(new $l(.025,.005,4,10,Math.PI),W(`#6B2E2E`),0,-.04,.105,!1);d.rotation.z=Math.PI,c.add(d);let f=t=>{let n=new z;n.position.set(t*.19,.5,0),s.add(n),n.add(G(new Ql(.055,8,6),a,0,0,0)),n.add(G(new B(.045,.04,.28,8),e.saree?i:a,0,-.14,0));let r=new z;r.position.y=-.28,n.add(r),r.add(G(new B(.038,.034,.26,8),i,0,-.13,0)),e.saree&&r.add(G(new $l(.036,.01,4,10),W(t>0?`#E0A526`:`#D7263D`,{metal:.5,rough:.4}),0,-.22,0,!1));let o=new z;return o.position.y=-.28,r.add(o),o.add(G(new Ql(.042,8,6),i,0,0,0)),{sh:n,el:r,hand:o}},p=f(-1),m=f(1),h=t=>{let n=new z;n.position.set(t*.085,0,0),r.add(n),n.add(G(new B(.065,.055,.42,8),o,0,-.21,0));let a=new z;return a.position.y=-.42,n.add(a),a.add(G(new Ql(.055,8,6),e.shorts?i:o,0,0,0)),a.add(G(new B(.05,.04,.42,8),e.saree||e.shorts?i:o,0,-.21,0)),e.shorts&&n.add(G(new B(.074,.07,.07,10),o,0,-.33,0,!1)),e.saree&&a.add(G(new $l(.042,.008,4,10),W(`#C0C0C0`,{metal:.8,rough:.3}),0,-.38,0,!1)),a.add(G(new L(.08,.05,.18),W(e.shorts?`#2B2B2B`:`#5A3A22`),0,-.43,.04)),{hp:n,kn:a}},g=h(-1),_=h(1),v,y;if(e.saree){let t=new z;t.add(G(new B(.16,.3,.8,14),W(e.saree,{flat:!1}),0,-.36,0)),t.add(G(new B(.302,.31,.09,14),W(e.border??`#E0A526`),0,-.73,0,!1)),t.add(G(new L(.06,.7,.02),W(e.border??`#E0A526`),.05,-.38,.235,!1)),r.add(t),v=t;let n=new z;n.add(G(new L(.36,.17,.5),W(e.saree,{flat:!1}),0,0,.2)),n.add(G(new L(.38,.12,.06),W(e.saree,{flat:!1}),0,-.07,.45)),n.add(G(new L(.385,.04,.065),W(e.border??`#E0A526`),0,-.13,.45,!1)),n.visible=!1,r.add(n),y=n}else if(e.kurta){let t=new z;t.add(G(new B(.15,.215,.36,12),a,0,-.13,0)),t.add(G(new B(.217,.219,.035,12),W(e.dupatta??e.top),0,-.3,0,!1)),r.add(t),v=t}else if(e.legs&&!e.shorts){let e=G(new B(.15,.19,.2,10),a,0,-.05,0);r.add(e),v=e}if(e.stick){let e=G(new B(.014,.014,.95,5),W(`#7A4F2A`),0,-.42,.02);m.hand.add(e),t.userData.stick=e}return t.scale.setScalar(e.scale??1),{root:t,hips:r,torso:s,head:c,hipH:n,shoulderL:p.sh,shoulderR:m.sh,elbowL:p.el,elbowR:m.el,handL:p.hand,handR:m.hand,legL:g.hp,legR:_.hp,kneeL:g.kn,kneeR:_.kn,skirt:v,seatedDrape:y}}function af(e){for(let t of[e.hips,e.torso,e.head,e.shoulderL,e.shoulderR,e.elbowL,e.elbowR,e.legL,e.legR,e.kneeL,e.kneeR])t.rotation.set(0,0,0);e.hips.position.set(0,e.hipH,0),e.shoulderL.rotation.z=-.08,e.shoulderR.rotation.z=.08,e.skirt&&(e.skirt.visible=!0),e.seatedDrape&&(e.seatedDrape.visible=!1)}function of(e,t,n=.45,r=0){let i=Math.sin(t);e.legL.rotation.x=-i*n,e.legR.rotation.x=i*n*(1-r*.5),e.kneeL.rotation.x=Math.max(0,Math.sin(t+1.2))*n*1.4,e.kneeR.rotation.x=Math.max(0,Math.sin(t+1.2+Math.PI))*n*1.4*(1-r*.6),e.shoulderL.rotation.x=i*n*.8,e.shoulderR.rotation.x=-i*n*.8,e.hips.position.y=e.hipH+Math.abs(Math.cos(t))*.025-.02-(r?Math.max(0,Math.sin(t))*.03:0),e.torso.rotation.z=r?Math.sin(t)*.06:0}function sf(e,t){e.hips.position.y=t+.07,e.legL.rotation.x=-Math.PI/2,e.legR.rotation.x=-Math.PI/2,e.kneeL.rotation.x=Math.PI/2,e.kneeR.rotation.x=Math.PI/2,e.legL.rotation.y=.08,e.legR.rotation.y=-.08,e.skirt&&(e.skirt.visible=!1),e.seatedDrape&&(e.seatedDrape.visible=!0)}function cf(e,t=1){e.shoulderR.rotation.x=-.75*t,e.shoulderR.rotation.z=.25*t,e.elbowR.rotation.x=-1.1*t,e.head.rotation.x=.25*t}function lf(){let e=new z,t=G(new nf(.075,.05,.026,3,.01),W(`#00685F`,{rough:.35,flat:!1}),0,0,0);e.add(t),e.add(G(new nf(.06,.036,.006,2,.004),W(`#99EFE5`,{rough:.3,flat:!1}),0,0,.013,!1));let n=G(new Ql(.006,8,6),new Tr({color:`#7CFFB2`}),.022,.01,.017,!1);return e.add(n),e.userData.led=n,e}function uf(e,t=.45){e.skirt&&(e.skirt.visible=!1),e.hips.position.y=.5,e.legL.rotation.x=-.15,e.legR.rotation.x=-.15,e.kneeL.rotation.x=Math.PI/2+.15,e.kneeR.rotation.x=Math.PI/2+.15,e.torso.rotation.x=t,e.shoulderL.rotation.x=-1,e.shoulderR.rotation.x=-1,e.elbowL.rotation.x=-.6,e.elbowR.rotation.x=-.6,e.shoulderL.rotation.z=.25,e.shoulderR.rotation.z=-.25,e.head.rotation.x=.35}function df(){let e=new z;e.add(G(new nf(.3,.24,.1,2,.03),W(`#00685F`,{flat:!1}),0,0,0)),e.add(G(new nf(.2,.08,.02,2,.01),W(`#99EFE5`,{flat:!1}),0,.03,.055,!1));let t=G(new L(.035,.75,.02),W(`#004F48`),.12,.33,0,!1);return t.rotation.z=.55,e.add(t),e}function ff(){let e=new z,t=W(`#2B2F36`,{metal:.5,rough:.4,flat:!1});for(let n=0;n<3;n++){let r=n/3*Math.PI*2,i=G(new B(.012,.012,.95,6),t,Math.sin(r)*.16,.45,Math.cos(r)*.16);i.rotation.set(Math.cos(r)*.33,0,-Math.sin(r)*.33),e.add(i)}return e.add(G(new B(.014,.014,.3,6),t,0,1,0)),e.add(G(new L(.1,.03,.05),t,0,1.15,0)),e}var pf=new URL(`saathi-logo-CESZ_r5J.png`,import.meta.url).href,mf=new URL(`saathi-mark-CVn5Tzze.png`,import.meta.url).href,K={intro:0,problem:9,asha:17,app:26,camera:38,posture:49.5,strap:57.5,shock:67,lab:79,result:93,nutrition:101,sync:111,phc:116,arch:128,impact:144,end:154,total:162},hf=[{name:`Hills`,t:K.intro},{name:`The problem`,t:K.problem},{name:`ASHA arrives`,t:K.asha},{name:`App`,t:K.app},{name:`Camera ROM`,t:K.camera},{name:`Knee posture`,t:K.posture},{name:`Strap pod`,t:K.strap},{name:`Tibial shock`,t:K.shock},{name:`Evidence base`,t:K.lab},{name:`Result`,t:K.result},{name:`Nutrition`,t:K.nutrition},{name:`Sync`,t:K.sync},{name:`PHC dashboard`,t:K.phc},{name:`Architecture`,t:K.arch},{name:`Impact`,t:K.impact},{name:`SAATHI`,t:K.end}],gf=[68.4,69.3,70.2,71.1,72],_f=[`MID`,`HIGH`,`MID`,`HIGH`,`MID`],vf=K.camera+2.2,yf=K.camera+10.2;function bf(e){if(e<vf||e>yf)return 2;let t=(e-vf)%4/4;return 2+74*(.5-.5*Math.cos(t*Math.PI*2))*(.97+.03*Math.sin(e*.7))+Math.sin(e*23)*.5}var xf=e=>90+bf(e);function Sf(e){if(e<vf)return 0;let t=Math.min(e,yf)-vf;return t>=2?74:74*(.5-.5*Math.cos(t/4*Math.PI*2))}var Cf=e=>Math.sin(e*2.1)*.004+Math.sin(e*5.3)*.0015,wf={t0:K.posture+1.9,t1:K.posture+6.9,right:168.9,left:176.4},Tf=+(wf.left-wf.right).toFixed(1);function Ef(e,t){let n=Math.min(1,Math.max(0,(e-wf.t0)/(wf.t1-wf.t0)));return wf[t]+(1-n)*(t===`left`?1.6:-2.2)*Math.sin(e*5+ +(t===`left`))}var Df=[3,3.5,3.1,3.6,3.2];function Of(e){let t=1+Math.sin(e*31)*.03;return gf.forEach((n,r)=>{let i=e-n;if(i>-.1&&i<.4){let e=Df[r];t+=(e-1)*Math.exp(-((i/.028)**2))-.5*Math.exp(-(((i-.07)/.04)**2))+.35*Math.exp(-(((i-.16)/.05)**2))}}),t}var kf=e=>gf.filter(t=>e>=t).length;function Af(e,t,n,r){if(e<t)return 1;let i=(e-t)%n;return 1+(r-1)*Math.exp(-(((i-.05)/.03)**2))-.18*r*Math.exp(-(((i-.12)/.04)**2))+.1*r*Math.exp(-(((i-.22)/.05)**2))}var q={primary:`#00685F`,primaryDark:`#004F48`,primaryMid:`#2F8981`,primaryLight:`#D5F8F5`,mint:`#99EFE5`,mintSoft:`#E1FBF8`,bg:`#F8F9FF`,surface:`#FFFFFF`,tint:`#EFF4FF`,tint2:`#E4E9F4`,ink:`#0E1A1A`,secondary:`#5F6B6B`,muted:`#8A9494`,warning:`#B7791F`,warningText:`#7A5A17`,warningTint:`#FFF1D6`,error:`#BA1B1B`,errorTint:`#FFDAD6`,info:`#2A5DA8`,infoTint:`#DCE9FF`,success:`#0F7A5A`},jf=new Image;jf.src=pf;var Mf=new Image;Mf.src=mf;var Nf=[[`login`,K.app,27.6],[`language`,27.6,29],[`dashboard`,29,31],[`intake`,31,33.5],[`joint`,33.5,35.5],[`questions`,35.5,K.camera],[`camRom`,K.camera,K.posture],[`camPosture`,K.posture,K.strap],[`placement`,K.strap,61.6],[`pairing`,61.6,64.4],[`calibrate`,64.4,K.shock],[`assess`,K.shock,K.result],[`analysis`,K.result,95.6],[`result`,95.6,K.nutrition],[`guidance`,K.nutrition,104],[`nutrition`,104,K.sync],[`report`,K.sync,K.phc+1.5]],Pf=360,Ff=780,If=1.5;function J(e,t,n,r,i,a=400,o=q.ink,s=`left`){e.font=`${a} ${i}px ${xd}`,e.fillStyle=o,e.textAlign=s,e.textBaseline=`alphabetic`,e.fillText(t,n,r)}function Lf(e,t,n,r,i,a,o,s,c=1.3){e.font=`${o} ${a}px ${xd}`;let l=t.split(` `),u=``,d=r;for(let t of l){let r=u?u+` `+t:t;e.measureText(r).width>i&&u?(J(e,u,n,d,a,o,s),u=t,d+=a*c):u=r}return u&&J(e,u,n,d,a,o,s),d}function Y(e,t,n,r,i,a,o,s,c=1.5){bd(e,t,n,r,i,a),e.fillStyle=o,e.fill(),s&&(e.strokeStyle=s,e.lineWidth=c,e.stroke())}function Rf(e,t,n,r,i,a=16,o=q.surface){e.save(),e.shadowColor=`rgba(16,30,54,0.10)`,e.shadowBlur=14,e.shadowOffsetY=4,Y(e,t,n,r,i,a,o),e.restore()}function zf(e,t,n,r,i={}){let a=i.x??24,o=i.w??312,s=i.h??54,c=1-.035*Math.sin(dd(r)*Math.PI);e.save(),e.translate(a+o/2,n+s/2),e.scale(c,c),e.translate(-(a+o/2),-(n+s/2)),i.variant===`secondary`?Y(e,a,n,o,s,16,q.surface,q.primary):(e.shadowColor=`rgba(0,104,95,0.30)`,e.shadowBlur=16,e.shadowOffsetY=6,Y(e,a,n,o,s,16,r>0?q.primaryDark:q.primary),e.shadowColor=`transparent`),J(e,t,a+o/2,n+s/2+6,16,700,i.variant===`secondary`?q.primary:`#FFFFFF`,`center`),r>0&&r<1&&(e.save(),bd(e,a,n,o,s,16),e.clip(),e.beginPath(),e.arc(a+o/2,n+s/2,r*o*.7,0,Math.PI*2),e.fillStyle=`rgba(255,255,255,${.35*(1-r)})`,e.fill(),e.restore()),e.restore()}function Bf(e,t,n,r){r<=0||r>=1||(e.beginPath(),e.arc(t,n,10+r*26,0,Math.PI*2),e.fillStyle=`rgba(0,104,95,${.25*(1-r)})`,e.fill(),e.beginPath(),e.arc(t,n,12,0,Math.PI*2),e.fillStyle=`rgba(14,26,26,${.25*(1-r)})`,e.fill())}function Vf(e,t,n,r,i=q.primary,a=`#fff`){e.beginPath(),e.arc(t,n,r,0,Math.PI*2),e.fillStyle=i,e.fill(),e.strokeStyle=a,e.lineWidth=r*.28,e.lineCap=`round`,e.lineJoin=`round`,e.beginPath(),e.moveTo(t-r*.45,n),e.lineTo(t-r*.1,n+r*.38),e.lineTo(t+r*.5,n-r*.35),e.stroke()}function Hf(e,t,n,r,i,a,o=12,s=`left`){e.font=`700 ${o}px ${xd}`;let c=e.measureText(t).width+22,l=s===`right`?n-c:n;return Y(e,l,r,c,o+14,(o+14)/2,i),J(e,t,l+11,r+o+6,o,700,a),c}function Uf(e,t,n,r,i,a=6,o=q.tint2,s=q.primary){Y(e,t,n,r,a,a/2,o),i>0&&Y(e,t,n,Math.max(a,r*dd(i)),a,a/2,s)}function Wf(e,t,n,r,i,a,o,s){if(J(e,t,r,i,13,600,q.secondary),Y(e,r,i+8,a,48,12,q.surface,o?q.primary:q.tint2,o?2:1.5),J(e,n,r+14,i+39,16,500,q.ink),o&&Math.floor(s*2.5)%2==0){e.font=`500 16px ${xd}`;let t=r+15+e.measureText(n).width;e.fillStyle=q.primary,e.fillRect(t,i+22,2,22)}}function Gf(e,t=!1){let n=t?`#FFFFFF`:q.ink;J(e,`9:41`,28,26,14,700,n),e.fillStyle=n;for(let t=0;t<4;t++)e.fillRect(270+t*6,22-t*3,4,4+t*3);bd(e,302,13,26,13,4),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.fillRect(305,16,17,7),e.fillRect(329,17,2,5),Y(e,140,10,80,22,11,`#0B0B0B`)}function Kf(e,t,n,r,i=`#fff`){e.strokeStyle=i,e.lineWidth=r*.12,e.lineCap=`round`,e.lineJoin=`round`,e.beginPath(),e.moveTo(t-r*.3,n-r*.25),e.lineTo(t+r*.3,n+r*.25),e.lineTo(t,n+r*.5),e.lineTo(t,n-r*.5),e.lineTo(t+r*.3,n-r*.25),e.lineTo(t-r*.3,n+r*.25),e.stroke()}function qf(e,t,n,r,i){if(e.strokeStyle=i,e.fillStyle=i,e.lineWidth=4,e.lineCap=`round`,e.lineJoin=`round`,e.beginPath(),t===`knee`)e.moveTo(n-6,r-18),e.lineTo(n+2,r),e.lineTo(n-4,r+18),e.stroke(),e.beginPath(),e.arc(n+2,r,6,0,Math.PI*2),e.fill();else if(t===`hip`)e.arc(n,r-4,14,Math.PI*.1,Math.PI*.9),e.stroke(),e.beginPath(),e.arc(n-9,r+6,4.5,0,Math.PI*2),e.arc(n+9,r+6,4.5,0,Math.PI*2),e.fill();else if(t===`hand`){Y(e,n-9,r-2,18,18,6,i);for(let t=0;t<4;t++)e.beginPath(),e.moveTo(n-7+t*4.6,r-2),e.lineTo(n-7+t*4.6,r-14+Math.abs(t-1.5)*2),e.lineWidth=3.4,e.stroke()}else for(let t=0;t<5;t++)Y(e,n-7+t%2*1.5,r-20+t*8.5,14,6.5,3,i)}function Jf(e,t,n,r){e.fillStyle=r,e.beginPath(),e.moveTo(t,n-3),e.lineTo(t+4,n-3),e.lineTo(t+9,n-7),e.lineTo(t+9,n+7),e.lineTo(t+4,n+3),e.lineTo(t,n+3),e.fill(),e.strokeStyle=r,e.lineWidth=1.6,e.beginPath(),e.arc(t+10,n,5,-.9,.9),e.stroke(),e.beginPath(),e.arc(t+10,n,9,-.9,.9),e.stroke()}function Yf(e,t,n,r=q.mint,i=q.primaryDark,a=!0){e.fillStyle=q.surface,e.fillRect(0,0,Pf,104);let o=22;a&&(e.strokeStyle=q.ink,e.lineWidth=2.2,e.lineCap=`round`,e.lineJoin=`round`,e.beginPath(),e.moveTo(32,64),e.lineTo(24,72),e.lineTo(32,80),e.moveTo(24,72),e.lineTo(40,72),e.stroke(),o=50),Mf.complete&&e.drawImage(Mf,o,58,30,24),e.font=`800 11px ${xd}`;let s=(n?300-e.measureText(n).width-34:304)-(o+38),c=16.5;for(e.font=`800 ${c}px ${xd}`;c>11&&e.measureText(t).width>s;)c-=.5,e.font=`800 ${c}px ${xd}`;J(e,t,o+38,78,c,800,q.ink),n&&Hf(e,n,300,59,r,i,11,`right`),e.beginPath(),e.arc(326,72,15,0,Math.PI*2),e.fillStyle=q.primary,e.fill(),e.beginPath(),e.arc(326,68,4.5,0,Math.PI*2),e.strokeStyle=`#fff`,e.lineWidth=1.8,e.stroke(),e.beginPath(),e.arc(326,81,7,Math.PI*1.15,Math.PI*1.85),e.stroke(),e.fillStyle=q.tint2,e.fillRect(0,104,Pf,1)}function Xf(e,t,n,r,i=130){J(e,`STEP ${t} OF ${n}`,24,i,12,800,q.primary),J(e,r,336,i,11.5,500,q.secondary,`right`),Uf(e,24,i+10,312,t/n,5,q.tint2,q.primary)}function Zf(e,t){e.save(),e.shadowColor=`rgba(16,30,54,0.08)`,e.shadowBlur=12,e.fillStyle=`#fff`,e.fillRect(0,712,Pf,68),e.restore(),[`Home`,`Patients`,`Reports`,`Awareness`,`More`].forEach((n,r)=>{let i=36+r*72;r===t&&Y(e,i-30,718,60,52,12,q.mintSoft),Y(e,i-8,726,16,15,4,r===t?q.primaryDark:q.muted),J(e,n,i,760,10.5,700,r===t?q.primaryDark:q.secondary,`center`)})}function Qf(e,t,n,r,i){Rf(e,16,t,328,62,14),Y(e,30,t+13,36,36,10,q.tint),Y(e,41,t+24,14,14,3,r),J(e,n,80,t+37,15.5,800),i&&Hf(e,i,312,t+18,q.tint,q.secondary,10.5,`right`),e.strokeStyle=q.secondary,e.lineWidth=2,e.beginPath(),e.moveTo(322,t+26),e.lineTo(328,t+31),e.lineTo(322,t+36),e.stroke()}var $f=(e,t,n)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff);let r=e.createRadialGradient(180,170,10,180,170,220);r.addColorStop(0,`rgba(153,239,229,0.45)`),r.addColorStop(1,`rgba(153,239,229,0)`),e.fillStyle=r,e.fillRect(0,0,Pf,420),Y(e,22,50,146,28,14,q.surface),e.beginPath(),e.arc(38,64,4,0,Math.PI*2),e.fillStyle=q.success,e.fill(),J(e,`Field mode active`,48,69,11.5,700,q.ink),Y(e,236,50,102,28,14,q.mintSoft),J(e,`Offline ready`,287,69,11.5,700,q.primaryDark,`center`),Rf(e,100,96,160,160,30),jf.complete&&e.drawImage(jf,106,102,148,148),Rf(e,20,282,320,352,22),J(e,`Field Worker Sign In`,40,318,18,800),J(e,`Enter credentials to access screening intake`,40,340,12,500,q.secondary),Hf(e,`OFFLINE AUTH`,322,300,q.mint,q.primaryDark,9.5,`right`),Wf(e,`Worker ID / Username`,`ASHA-2041`.slice(0,Math.floor(H(t,.05,.35)*9)),40,370,280,t<.38,n),J(e,`4-Digit Security PIN`,40,452,13,600,q.secondary);let i=Math.floor(H(t,.4,.68)*4.01);Y(e,40,460,280,48,12,q.tint,t>=.38&&t<.72?q.primary:void 0,2);for(let t=0;t<i;t++)e.beginPath(),e.arc(62+t*20,484,5,0,Math.PI*2),e.fillStyle=q.ink,e.fill();Y(e,40,524,18,18,5,q.primary),Vf(e,49,533,7,q.primary),J(e,`Remember device`,66,538,12.5,600,q.ink),J(e,`Offline Recovery`,320,538,12.5,700,q.primary,`right`),zf(e,`Sign In & Enter Field Intake  →`,562,H(t,.78,.95),{x:40,w:280,h:50}),J(e,`v2.4 Preview · Screening support only · Offline secure`,180,668,11,500,q.secondary,`center`),J(e,`SAATHI does not diagnose osteoarthritis.`,180,690,11,600,q.muted,`center`)},ep=[[`English`,`English`],[`हिन्दी`,`Hindi`],[`தமிழ்`,`Tamil`],[`বাংলা`,`Bengali`],[`অসমীয়া`,`Assamese`],[`ꯃꯩꯇꯩꯂꯣꯟ`,`Manipuri`]],tp=(e,t)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Mf.complete&&e.drawImage(Mf,22,52,36,29),J(e,`SAATHI`,66,66,17,800,q.primaryDark),J(e,`CARE COMPANION`,66,82,9.5,800,q.secondary),Hf(e,`● Step 1 of 2`,338,56,q.tint,q.ink,11,`right`),J(e,`Select Language`,20,132,24,800),J(e,`Choose your preferred language to continue`,20,156,13,500,q.secondary),ep.forEach(([t,n],r)=>{let i=176+r*74,a=r===0;Rf(e,20,i,320,64,14,a?q.mintSoft:q.surface),a&&(bd(e,20,i,320,64,14),e.strokeStyle=q.primary,e.lineWidth=2,e.stroke()),Y(e,36,i+14,36,36,10,a?q.mint:q.tint),J(e,t,86,i+30,16,800,q.ink),J(e,n,86,i+49,11.5,500,q.secondary),a?Vf(e,314,i+32,12):(e.beginPath(),e.arc(314,i+32,11,0,Math.PI*2),e.strokeStyle=q.mint,e.lineWidth=2,e.stroke())}),Bf(e,250,208,H(t,.38,.6)),Y(e,20,630,320,40,12,q.tint),Jf(e,36,650,q.primary),J(e,`Voice guidance in every language`,62,655,12,600,q.ink),zf(e,`Continue  →`,690,H(t,.82,.97),{x:20,w:320})},np=(e,t)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Mf.complete&&e.drawImage(Mf,20,54,32,26),J(e,`SAATHI`,60,74,18,800,q.ink),Y(e,210,56,82,30,15,q.surface),e.beginPath(),e.arc(226,71,4,0,Math.PI*2),e.fillStyle=q.success,e.fill(),J(e,`Synced`,236,76,13,600,q.ink),e.beginPath(),e.arc(320,71,16,0,Math.PI*2),e.fillStyle=q.primary,e.fill(),J(e,`S`,320,77,15,800,`#fff`,`center`),J(e,`Good morning, Sunita`,16,128,24,800),J(e,`Here's what's waiting for you today.`,16,152,13.5,500,q.secondary);let n=H(t,.72,.9);e.save();let r=1-.03*Math.sin(n*Math.PI);e.translate(180,216),e.scale(r,r),e.translate(-180,-216),e.shadowColor=`rgba(0,104,95,0.35)`,e.shadowBlur=18,e.shadowOffsetY=8,Y(e,16,172,328,92,18,q.primary),e.shadowColor=`transparent`,Y(e,32,192,50,50,12,`rgba(255,255,255,0.16)`),e.strokeStyle=`#fff`,e.lineWidth=2.5,e.beginPath(),e.arc(54,211,7,0,Math.PI*2),e.moveTo(42,232),e.quadraticCurveTo(54,218,66,232),e.moveTo(68,212),e.lineTo(76,212),e.moveTo(72,208),e.lineTo(72,216),e.stroke(),J(e,`New Patient`,98,210,20,800,`#fff`),J(e,`Start rapid osteoarthritis screening`,98,232,12,500,q.mint),e.beginPath(),e.arc(318,218,14,0,Math.PI*2),e.fillStyle=`rgba(255,255,255,0.2)`,e.fill(),e.strokeStyle=`#fff`,e.lineWidth=2,e.beginPath(),e.moveTo(311,218),e.lineTo(325,218),e.moveTo(320,213),e.lineTo(325,218),e.lineTo(320,223),e.stroke(),e.restore(),Bf(e,200,218,n);let i=md(H(t,0,.5));[[`Patients`,q.primary],[`View Reports`,q.info],[`Health Awareness`,q.success],[`Analytics Dashboard`,q.primaryMid],[`Sync Data`,q.primary]].forEach(([t,n],r)=>{e.globalAlpha=V(H(i,r*.12,r*.12+.5)),Qf(e,280+r*76,t,n,r===4?`Up to date`:void 0)}),e.globalAlpha=1,J(e,`Works fully offline · syncs when network returns`,180,680,11,500,q.muted,`center`),Zf(e,0)},rp=(e,t,n)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Screening Intake`,`Saved`,q.surface,q.ink);let r=t>.52;if(Xf(e,r?3:1,3,r?`Health background`:`Demographics & Intake`),J(e,`Frontline Triage Intake`,24,182,21,800),J(e,`New patient · will get an ID on save`,24,202,12.5,500,q.secondary),Hf(e,`Ready`,336,168,q.mint,q.primaryDark,10.5,`right`),!r)Wf(e,`Full Name *`,`Tashi Bhutia`.slice(0,Math.floor(H(t,.03,.25)*12)),24,230,312,t<.27,n),Wf(e,`Age (Yrs) *`,`68`.slice(0,Math.floor(H(t,.28,.36)*2)),24,310,146,t>=.27&&t<.38,n),Wf(e,`Mobile (optional)`,``,190,310,146,!1,n),J(e,`Gender *`,24,392,13,600,q.secondary),Y(e,24,400,312,48,14,q.tint),[`Male`,`Female`,`Other`].forEach((n,r)=>{let i=r===0&&t>.42;i&&Y(e,28+r*103,404,100,40,11,q.surface),J(e,n,78+r*103,430,13.5,i?800:600,i?q.primaryDark:q.secondary,`center`)}),Bf(e,78,424,H(t,.38,.5)),Y(e,24,466,312,48,12,q.mintSoft),J(e,`Village: Lingdok · PHC Rongli`,40,495,13,700,q.primaryDark),zf(e,`Next: Location  →`,700,H(t,.44,.52));else{Wf(e,`Height (cm) *`,`162`,24,230,146,!1,n),Wf(e,`Weight (kg) *`,`58`,190,230,146,!1,n),J(e,`Occupation & Physical Load *`,24,316,13,600,q.secondary);let r=[`Farm work`,`Household work`,`Carrying loads`,`Weaving / craft`,`Retired`],i=24,a=326;r.forEach((n,r)=>{e.font=`700 12px ${xd}`;let o=e.measureText(n).width+26;i+o>336&&(i=24,a+=40);let s=r===0&&t>.62;Y(e,i,a,o,32,16,s?q.primary:q.surface,s?void 0:q.tint2),J(e,n,i+o/2,a+21,12,700,s?`#fff`:q.ink,`center`),i+=o+8}),[[`Previous Joint Issues`,0],[`Family history of joint problems`,1]].forEach(([n,r])=>{let i=430+r*74;Rf(e,24,i,312,62,14),J(e,n,38,i+36,13,700),[`Yes`,`No`].forEach((n,a)=>{let o=(r===0?a===0:a===1)&&t>.72;Y(e,236+a*48,i+16,42,30,10,o?q.primary:q.tint),J(e,n,257+a*48,i+36,12,700,o?`#fff`:q.secondary,`center`)})}),zf(e,`Save patient`,700,H(t,.86,.98))}J(e,`Stored locally on this device`,180,772,10.5,500,q.muted,`center`)},ip=[[`knee`,`Knee`,`Knee pain, grinding or morning stiffness`],[`hip`,`Hip`,`Groin or thigh pain, difficulty squatting`],[`hand`,`Hand`,`Finger nodes, thumb base pain`],[`spine`,`Spine`,`Lower back pain on bending`]],ap=(e,t)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Screening Intake`,`Saved`,q.surface,q.ink),Xf(e,1,7,`Joint selection`),J(e,`Select Joint to Assess`,24,182,21,800),J(e,`Screening for Tashi Bhutia. Choose the joint with the most trouble.`,24,202,11.5,500,q.secondary),ip.forEach(([n,r,i],a)=>{let o=220+a*88,s=a===0&&t>.25;Rf(e,24,o,312,78,16,s?q.mintSoft:q.surface),s&&(bd(e,24,o,312,78,16),e.strokeStyle=q.primary,e.lineWidth=2.2,e.stroke()),Y(e,38,o+15,48,48,12,s?q.mint:q.tint),qf(e,n,62,o+39,s?q.primaryDark:q.primary),J(e,r,100,o+32,16,800),a===0&&Hf(e,s?`SELECTED`:`Most common`,322,o+12,s?q.primary:q.mint,s?`#fff`:q.primaryDark,9.5,`right`),J(e,i,100,o+52,11,500,q.secondary),J(e,`✓ Movement test available`,100,o+68,10,700,q.success)}),Bf(e,180,258,H(t,.18,.38)),J(e,`Which side?`,24,590,13,700,q.secondary),Y(e,24,600,312,46,14,q.tint),[`Left`,`Right`,`Both`].forEach((n,r)=>{let i=r===1&&t>.55;i&&Y(e,28+r*103,604,100,38,11,q.primary),J(e,n,78+r*103,629,13.5,700,i?`#fff`:q.secondary,`center`)}),Bf(e,180,623,H(t,.48,.66)),Y(e,24,656,312,34,10,q.mintSoft),J(e,t>.55?`Selected: Right knee`:`No selection`,40,678,12,700,q.primaryDark),zf(e,`Next: Clinical Assessment`,702,H(t,.85,.98),{h:50})},op=[`No stiffness`,`Less than 30 minutes`,`More than 30 minutes`],sp=(e,t)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Symptom Assessment`,`Saved`,q.surface,q.ink);let n=t<.3?1:t<.55?2:3;Xf(e,2,7,`${Math.round((n-1)/8*100)}% done`),Hf(e,`Triage protocol · Right knee`,24,160,q.tint,q.ink,10.5),J(e,`Q ${n} / 8`,336,178,12,800,q.primary,`right`),Y(e,276,196,60,30,15,q.surface,q.tint2),Jf(e,290,211,q.primary),Lf(e,`${n}. ${[`Does the joint hurt during walking, climbing or daily activity?`,`Does the joint hurt at rest or at night?`,`Is the joint stiff in the morning or after sitting for a while?`][n-1]}`,24,250,312,19,800,q.ink,1.3),n===3&&(Y(e,24,318,312,50,12,q.infoTint),Lf(e,`Stiffness that eases within 30 minutes of moving is common.`,40,338,280,11.5,600,q.info,1.35));let r=n===3?op:[`Never`,`Sometimes`,`Often`,`Almost every day`],i=n===3?t>.75?1:-1:n===1?t>.15?1:-1:t>.42?0:-1;r.forEach((t,n)=>{let r=384+n*64,a=n===i;Rf(e,24,r,312,54,14,a?q.mintSoft:q.surface),a&&(bd(e,24,r,312,54,14),e.strokeStyle=q.primary,e.lineWidth=2,e.stroke()),e.beginPath(),e.arc(48,r+27,9,0,Math.PI*2),e.strokeStyle=a?q.primary:q.muted,e.lineWidth=2,e.stroke(),a&&(e.beginPath(),e.arc(48,r+27,5,0,Math.PI*2),e.fillStyle=q.primary,e.fill()),J(e,t,68,r+32,14,700,a?q.primaryDark:q.ink)}),Rf(e,24,640,312,44,12,q.tint),J(e,`${n-1+ +(i>=0)} of 8 answered · risk is estimated after the movement tests`,180,667,10.5,600,q.secondary,`center`),zf(e,`Back`,704,0,{x:24,w:100,h:48,variant:`secondary`}),zf(e,n===3&&t>.85?`Next: Movement`:`Next Question`,704,H(t,.88,.98),{x:134,w:202,h:48})};function cp(e,t){return t===1?e<K.camera+1.3?{ph:`setup`,k:0}:e<K.camera+1.85?{ph:`ready`,k:0}:e<vf?{ph:`intro`,k:0}:e<yf?{ph:`rec`,k:(e-vf)/(yf-vf)}:e<K.posture-.45?{ph:`result`,k:1}:{ph:`next`,k:1}:e<K.posture+.9?{ph:`setup`,k:0}:e<wf.t0-.5?{ph:`ready`,k:0}:e<wf.t0?{ph:`intro`,k:0}:e<wf.t1?{ph:`rec`,k:(e-wf.t0)/(wf.t1-wf.t0)}:{ph:`result`,k:1}}function lp(e,t,n,r,i,a){e.strokeStyle=`#FFD166`,e.lineWidth=4,e.beginPath(),e.moveTo(t[0],t[1]),e.lineTo(n[0],n[1]),e.lineTo(r[0],r[1]),e.stroke();for(let i of[t,n,r])e.beginPath(),e.arc(i[0],i[1],5.5,0,Math.PI*2),e.fillStyle=`#FFD166`,e.fill(),e.strokeStyle=`#7A5A17`,e.lineWidth=1.5,e.stroke();e.font=`800 11px ${xd}`;let o=e.measureText(i).width+12,s=a<0?n[0]-12-o:n[0]+12;Y(e,s,n[1]-10,o,20,6,`rgba(14,26,26,0.82)`),J(e,i,s+6,n[1]+4,11,800,`#FFD166`)}function up(e,t,n,r,i,a,o){e.save(),bd(e,t,n,r,i,18),e.clip();let s=e.createLinearGradient(0,n,0,n+i);s.addColorStop(0,`#9C8A74`),s.addColorStop(.66,`#B9A88F`),s.addColorStop(.67,`#8E8D88`),s.addColorStop(1,`#6E6D69`),e.fillStyle=s,e.fillRect(t,n,r,i),e.fillStyle=`rgba(80,50,30,0.35)`;for(let i=0;i<5;i++)e.fillRect(t,n+40+i*50,r,6);Y(e,t+r-70,n+60,56,104,4,`#2E86DE`),Y(e,t+r-64,n+66,44,92,3,`#5A341B`);let c=t+r*.38,l=n+i*.95;e.lineCap=`round`,e.lineJoin=`round`,e.fillStyle=`#8B5A2B`,e.fillRect(c-58,l-262,9,262),e.fillRect(c+40,l-128,9,128),Y(e,c-60,l-134,112,13,4,`#8B5A2B`),Y(e,c-62,l-252,13,70,4,`#3FB8A8`),Y(e,c-56,l-140,104,8,3,`#E84C8B`);let u=(e,t)=>[c+e,l+t],d=bf(a)*Math.PI/180,f=u(-18,-150),p=u(66,-146),m=[p[0]+80*Math.sin(d),p[1]+80*Math.cos(d)],h=[m[0]+20*Math.cos(d),m[1]-20*Math.sin(d)],g=u(60,-142),_=u(62,-62);e.strokeStyle=`#2E3A48`,e.lineWidth=24,e.beginPath(),e.moveTo(f[0],f[1]),e.lineTo(f[0]+(g[0]-f[0])*.72,g[1]-2),e.stroke(),e.strokeStyle=`#A97F5A`,e.lineWidth=14,e.beginPath(),e.moveTo(f[0]+(g[0]-f[0])*.72,g[1]-2),e.lineTo(g[0],g[1]),e.lineTo(_[0],_[1]),e.stroke(),e.strokeStyle=`#1E1E1E`,e.lineWidth=10,e.beginPath(),e.moveTo(_[0],_[1]+2),e.lineTo(_[0]+20,_[1]+2),e.stroke();let v=u(-22,-262),y=u(-14,-302);e.strokeStyle=`#E9E3D6`,e.lineWidth=46,e.beginPath(),e.moveTo(v[0],v[1]+6),e.lineTo(f[0],f[1]-4),e.stroke(),e.strokeStyle=`#2F4A3A`,e.lineWidth=38,e.beginPath(),e.moveTo(v[0]-5,v[1]+8),e.lineTo(f[0]-5,f[1]-6),e.stroke();let b=[f[0]+(p[0]-f[0])*.72,f[1]+(p[1]-f[1])*.72];e.strokeStyle=`#3E4B5C`,e.lineWidth=26,e.beginPath(),e.moveTo(f[0],f[1]),e.lineTo(b[0],b[1]),e.stroke(),e.strokeStyle=`#C99B70`,e.lineWidth=15,e.beginPath(),e.moveTo(b[0],b[1]),e.lineTo(p[0],p[1]),e.lineTo(m[0],m[1]),e.stroke(),e.strokeStyle=`#2B2B2B`,e.lineWidth=11,e.beginPath(),e.moveTo(m[0],m[1]),e.lineTo(h[0],h[1]),e.stroke();let x=u(-8,-196),S=u(30,-164);if(e.strokeStyle=`#E9E3D6`,e.lineWidth=14,e.beginPath(),e.moveTo(v[0],v[1]),e.lineTo(x[0],x[1]),e.stroke(),e.strokeStyle=`#C99B70`,e.lineWidth=12,e.beginPath(),e.moveTo(x[0],x[1]),e.lineTo(S[0],S[1]),e.stroke(),e.beginPath(),e.arc(y[0],y[1],20,0,Math.PI*2),e.fillStyle=`#C99B70`,e.fill(),e.beginPath(),e.moveTo(y[0]+18,y[1]-4),e.lineTo(y[0]+25,y[1]+4),e.lineTo(y[0]+18,y[1]+6),e.fill(),e.fillStyle=`#F2F2F2`,e.fillRect(y[0]+10,y[1]+8,12,4),e.beginPath(),e.arc(y[0],y[1]-5,21,Math.PI*1.02,Math.PI*1.98),e.fillStyle=`#5B3A6B`,e.fill(),e.fillStyle=`#3A2747`,e.fillRect(y[0]-21,y[1]-9,42,5),o){let t=[[v,x],[x,S],[v,f],[f,p],[p,m],[m,h]];e.strokeStyle=`rgba(255,255,255,0.85)`,e.lineWidth=2.5;for(let[n,r]of t)e.beginPath(),e.moveTo(n[0],n[1]),e.lineTo(r[0],r[1]),e.stroke();for(let t of[v,x,S,y,h])e.beginPath(),e.arc(t[0],t[1],4,0,Math.PI*2),e.fillStyle=`#7CFFE9`,e.fill();lp(e,f,p,m,`${Math.round(xf(a))}°`,1)}e.restore()}function dp(e,t,n,r,i,a,o,s){if(!o)return up(e,t,n,r,i,a,s);e.save(),bd(e,t,n,r,i,18),e.clip();let c=e.createLinearGradient(0,n,0,n+i);c.addColorStop(0,`#9C8A74`),c.addColorStop(.62,`#B9A88F`),c.addColorStop(.63,`#8E8D88`),c.addColorStop(1,`#6E6D69`),e.fillStyle=c,e.fillRect(t,n,r,i),e.fillStyle=`rgba(80,50,30,0.35)`;for(let i=0;i<5;i++)e.fillRect(t,n+40+i*50,r,6);Y(e,t+r*.7,n+40,60,110,4,`#2E86DE`),Y(e,t+r*.7+6,n+46,48,98,3,`#5A341B`);let l=t+r*.45,u=n+i*.92,d=o?Cf(a)*900:0,f=(e,t)=>[l+e+d*(-t/300),u+t];e.lineCap=`round`,e.lineJoin=`round`;let p,m,h,g,_,v,y=o?-272:-208;if(o)p=f(-17,-150),m=f(17,-150),h=f(-21,-81),g=f(-20,-10),_=f(18,-80),v=f(19,-10);else{let t=bf(a)*Math.PI/180;Y(e,l-54,u-124,108,14,4,`#8B5A2B`),e.fillStyle=`#8B5A2B`,e.fillRect(l-50,u-112,8,104),e.fillRect(l+42,u-112,8,104),Y(e,l-46,u-222,92,34,5,`#8B5A2B`),p=f(-17,-120),m=f(17,-120),h=f(-24,-96),_=f(24,-96),v=f(24,-22),g=f(-24,-96+74*Math.cos(t))}let b=f(32,y),x=f(-32,y),S=f(0,y-40);e.strokeStyle=`#E9E3D6`,e.lineWidth=48,e.beginPath(),e.moveTo(S[0],S[1]+44),e.lineTo((p[0]+m[0])/2,p[1]-8),e.stroke(),e.strokeStyle=`#2F4A3A`,e.lineWidth=17;for(let t of[-1,1])e.beginPath(),e.moveTo(S[0]+t*15,S[1]+46),e.lineTo((p[0]+m[0])/2+t*15,p[1]-8),e.stroke();for(let[t,n,r]of[[p,h,g],[m,_,v]])e.strokeStyle=`#3E4B5C`,e.lineWidth=24,e.beginPath(),e.moveTo(t[0],t[1]),e.lineTo(t[0]+(n[0]-t[0])*.72,t[1]+(n[1]-t[1])*.72),e.stroke(),e.strokeStyle=`#C99B70`,e.lineWidth=15,e.beginPath(),e.moveTo(t[0]+(n[0]-t[0])*.72,t[1]+(n[1]-t[1])*.72),e.lineTo(n[0],n[1]),e.lineTo(r[0],r[1]),e.stroke(),e.fillStyle=`#2B2B2B`,e.beginPath(),e.ellipse(r[0],r[1]+4,10,6,0,0,Math.PI*2),e.fill();e.strokeStyle=`#E9E3D6`,e.lineWidth=13;let C=f(44,y+70),w=f(-44,y+70),T=f(36,y+130),E=f(-36,y+130);for(let[t,n,r]of[[b,C,T],[x,w,E]])e.beginPath(),e.moveTo(t[0],t[1]),e.lineTo(n[0],n[1]),e.stroke(),e.strokeStyle=`#C99B70`,e.beginPath(),e.moveTo(n[0],n[1]),e.lineTo(r[0],r[1]),e.stroke(),e.strokeStyle=`#E9E3D6`;if(e.beginPath(),e.arc(S[0],S[1],20,0,Math.PI*2),e.fillStyle=`#C99B70`,e.fill(),e.beginPath(),e.arc(S[0],S[1]-5,21,Math.PI*1.05,Math.PI*1.95),e.fillStyle=`#5B3A6B`,e.fill(),e.fillStyle=`#3A2747`,e.fillRect(S[0]-20,S[1]-9,40,5),s){let t=[[b,x],[b,C],[C,T],[x,w],[w,E],[b,m],[x,p],[m,p],[m,_],[_,v],[p,h],[h,g]];e.strokeStyle=`rgba(255,255,255,0.85)`,e.lineWidth=2.5;for(let[n,r]of t)e.beginPath(),e.moveTo(n[0],n[1]),e.lineTo(r[0],r[1]),e.stroke();for(let t of[b,x,C,w,T,E,S])e.beginPath(),e.arc(t[0],t[1],4,0,Math.PI*2),e.fillStyle=`#7CFFE9`,e.fill();if(o)lp(e,p,h,g,`R ${Ef(a,`right`).toFixed(1)}°`,-1),lp(e,m,_,v,`L ${Ef(a,`left`).toFixed(1)}°`,1);else{for(let t of[m,_,v])e.beginPath(),e.arc(t[0],t[1],4,0,Math.PI*2),e.fillStyle=`#7CFFE9`,e.fill();lp(e,p,h,g,`${Math.round(xf(a))}°`,-1)}}e.restore()}function fp(e,t,n,r){e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff);let i=r===1?`Joint Movement`:`Posture`,{ph:a,k:o}=cp(n,r);Yf(e,`Movement Assessment`,`Triage active`),e.fillStyle=q.surface,e.fillRect(0,105,Pf,50),J(e,i,16,136,15,800,q.primary),J(e,`TEST ${r} OF 2`,344,128,10.5,600,q.secondary,`right`);let s=a!==`setup`;if(J(e,s?`TRACKING PATIENT`:`WAITING FOR PATIENT…`,344,144,9.5,800,s?q.success:q.warning,`right`),dp(e,16,166,328,420,n,r===2,s),a===`rec`&&r===1){Y(e,26,176,150,64,14,`rgba(14,26,26,0.75)`),J(e,`JOINT ANGLE`,38,196,9.5,800,`rgba(255,255,255,0.7)`),J(e,`${Math.round(xf(n))}°`,38,228,26,800,`#fff`),Y(e,184,176,150,64,14,`rgba(0,104,95,0.88)`),J(e,`RANGE OF MOTION`,196,196,9.5,800,`rgba(255,255,255,0.8)`);let t=Sf(n);J(e,`${Math.round(t)}°`,196,224,24,800,`#fff`),Uf(e,196,230,126,t/140,5,`rgba(255,255,255,0.25)`,q.mint)}a===`rec`&&r===2&&(Y(e,26,176,150,64,14,`rgba(14,26,26,0.75)`),J(e,`RIGHT KNEE`,38,196,9.5,800,`rgba(255,255,255,0.7)`),J(e,`${Ef(n,`right`).toFixed(1)}°`,38,228,24,800,`#FFD166`),Y(e,184,176,150,64,14,`rgba(14,26,26,0.75)`),J(e,`LEFT KNEE`,196,196,9.5,800,`rgba(255,255,255,0.7)`),J(e,`${Ef(n,`left`).toFixed(1)}°`,196,228,24,800,`#FFD166`),Y(e,120,250,120,28,14,`rgba(0,104,95,0.9)`),J(e,`HOLD STILL · ${Math.max(0,5-o*5).toFixed(0)}s`,180,269,11,800,`#fff`,`center`)),a===`intro`&&(Y(e,16,166,328,420,18,`rgba(0,104,95,0.92)`),J(e,`TEST ${r}`,180,362,18,800,q.mint,`center`),J(e,i,180,398,28,800,`#fff`,`center`)),a===`next`&&(Y(e,16,166,328,420,18,`rgba(225,251,248,0.95)`),Vf(e,180,316,26,q.success),J(e,`Complete 1`,180,376,22,800,q.primaryDark,`center`),J(e,`Next · TEST 2 Posture`,180,406,14,700,q.secondary,`center`)),a===`setup`?(Lf(e,r===1?`Seat the patient side-on to the camera, the knee being tested nearest to it.`:`Please ask the patient to stand naturally facing the camera.`,30,622,300,16,800,q.ink,1.35),J(e,r===1?`Side view: hip, knee and ankle in the frame`:`Front view: hips, knees and ankles in the frame`,30,690,12,600,q.secondary)):a===`ready`||a===`intro`?(Lf(e,`Patient detected. The patient is ready. Please tap Start Assessment.`,30,622,300,14,700,q.ink,1.35),zf(e,`START ASSESSMENT`,700,a===`ready`?H(n,r===1?K.camera+1.5:wf.t0-.8,r===1?K.camera+1.85:wf.t0-.5):1,{h:50})):a===`rec`?(e.beginPath(),e.arc(150,614,6,0,Math.PI*2),e.fillStyle=Math.floor(n*2)%2?q.error:`#F28B82`,e.fill(),J(e,`LIVE`,164,619,14,800,q.error),J(e,r===1?`Test progress: ${(o*8).toFixed(1)}s / 30s`:`Hold still: ${(o*5).toFixed(1)}s / 5s`,180,648,13,600,q.secondary,`center`),Y(e,24,668,312,44,14,`rgba(14,26,26,0.9)`),J(e,r===1?`Slowly bend the knee, then straighten it`:`Please stand still for 5 seconds`,180,696,13.5,700,`#fff`,`center`)):(Rf(e,16,596,328,124,16),J(e,`TEST ${r} — ${i}`,30,620,13.5,800),Vf(e,254,615,8,q.success),J(e,`Completed`,330,620,11.5,800,q.success,`right`),(r===1?[[`Range of motion`,`74°`],[`Joint angle range`,`92° – 166°`],[`Smoothness · Quality`,`71% · Good`]]:[[`Left knee angle`,`${wf.left}°`],[`Right knee angle`,`${wf.right}°`],[`Symmetry difference`,`${Tf}°`]]).forEach(([t,n],i)=>{J(e,t,30,648+i*22,12.5,600,q.secondary),J(e,n,330,648+i*22,12.5,800,i===2&&r===2?q.warningText:q.ink,`right`)}),zf(e,r===1?`NEXT`:`CONTINUE`,728,H(n,r===1?K.posture-.9:K.strap-.6,r===1?K.posture-.5:K.strap-.2),{h:44}))}var pp=(e,t,n)=>fp(e,t,n,1),mp=(e,t,n)=>fp(e,t,n,2);function hp(e,t,n,r,i=1){e.save(),e.translate(t,n),e.scale(i,i),e.lineCap=`round`,e.lineJoin=`round`,e.strokeStyle=`#C9B7A6`,e.lineWidth=34,e.beginPath(),e.moveTo(-90,-40),e.lineTo(10,-40),e.lineTo(16,70),e.stroke(),e.strokeStyle=`#B9A696`,e.lineWidth=16,e.beginPath(),e.moveTo(16,74),e.lineTo(46,80),e.stroke(),e.strokeStyle=`rgba(255,255,255,0.8)`,e.lineWidth=3,e.setLineDash([4,4]),e.beginPath(),e.moveTo(24,-12),e.lineTo(28,66),e.stroke(),e.setLineDash([]),Y(e,-6,-6,44,14,5,`#2B2F36`),Y(e,22,-10,22,22,6,q.primary),e.beginPath(),e.arc(37,-3,2.5,0,Math.PI*2),e.fillStyle=Math.floor(r*3)%2?`#7CFFB2`:`#2BD47A`,e.fill(),e.restore()}var gp=(e,t,n)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Movement Assessment`,`Triage active`),Xf(e,3,7,`Placement guide`),J(e,`Knee Assessment`,24,186,20,800),J(e,`Instructions`,24,210,20,800),Hf(e,`● Pair ready`,336,204,q.mint,q.primaryDark,10.5,`right`),[[`1. Wear`,`Strap`],[`2. Calib`,`Stand`],[`3. Test`,`Walk`],[`4. Done`,`Report`]].forEach(([t,n],r)=>{let i=r===0;Y(e,24+r*79,228,72,48,10,i?q.primary:q.tint),J(e,t,60+r*79,248,11.5,800,i?`#fff`:q.secondary,`center`),J(e,n,60+r*79,265,10,600,i?q.mint:q.muted,`center`)}),Rf(e,24,288,312,268,18),Hf(e,`Placement guide`,38,300,q.mintSoft,q.primaryDark,10),Hf(e,`Sensor: Right`,150,300,q.mint,q.primaryDark,10),Y(e,38,336,284,140,14,q.tint),hp(e,178,412,n,1);let r=.5+.5*Math.sin(n*5);e.beginPath(),e.arc(215,409,16+r*6,0,Math.PI*2),e.strokeStyle=`rgba(0,104,95,${.6-r*.4})`,e.lineWidth=2.5,e.stroke(),J(e,`on the tibia`,238,372,10.5,800,q.primary),J(e,`Attach the strap as shown`,180,502,14,800,q.ink,`center`),Lf(e,`Strap the small sensor just below the knee on the Right side, light facing forward.`,50,524,270,11.5,500,q.secondary,1.35),Rf(e,24,568,312,104,16),[`Seat the patient on a firm chair`,`Explain the walk: 5 normal steps`].forEach((t,n)=>{e.beginPath(),e.arc(46,596+n*44,12,0,Math.PI*2),e.fillStyle=q.mintSoft,e.fill(),J(e,String(n+2),46,601+n*44,12,800,q.primary,`center`),J(e,t,68,601+n*44,13,700)}),zf(e,`Start Assessment  →`,690,H(t,.86,.98),{h:50}),J(e,`Patient cannot do the movement — skip this step`,180,762,11,600,q.secondary,`center`)},_p=(e,t,n)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Screening Intake`,`Saved`,q.surface,q.ink);let r=t>.35;Xf(e,4,7,r?`Paired`:`Pairing…`),J(e,`Sensor Pairing`,24,186,21,800),Hf(e,`Bluetooth LE`,336,168,q.mint,q.primaryDark,10.5,`right`),Rf(e,24,204,312,220,18);for(let t=0;t<3;t++){let r=(n*.7+t/3)%1;e.beginPath(),e.arc(180,300,40+r*70,0,Math.PI*2),e.strokeStyle=`rgba(0,104,95,${(1-r)*.3})`,e.lineWidth=2,e.stroke()}e.beginPath(),e.arc(180,300,78,0,Math.PI*2),e.fillStyle=`rgba(153,239,229,0.3)`,e.fill(),e.beginPath(),e.arc(180,300,44,0,Math.PI*2),e.fillStyle=q.primaryDark,e.fill(),Kf(e,180,300,38),J(e,r?`Sensor is ready. Continue to setup.`:`Searching for SAATHI sensor…`,180,404,12.5,600,q.secondary,`center`),e.globalAlpha=md(H(t,.35,.5)),Rf(e,24,436,312,188,18),Y(e,40,452,44,44,12,q.mint),Y(e,52,466,20,16,4,q.primary),J(e,`SAATHI Sensor`,96,472,16,800),J(e,`ID: SP-8842 · Found`,96,490,11.5,500,q.secondary),Y(e,40,508,136,52,12,q.tint),J(e,`Signal Strength`,52,528,11,700,q.ink),J(e,`Strong`,52,550,16,800),Y(e,184,508,136,52,12,q.tint),J(e,`Battery`,196,528,11,700,q.ink),J(e,`88%`,196,550,16,800),[`Sensor found`,`Ready to use`].forEach((n,r)=>{let i=t>.5+r*.12;Y(e,40,570+r*26,280,22,8,i?q.mintSoft:q.tint),i&&Vf(e,54,581+r*26,7),J(e,n,68,586+r*26,11.5,700,i?q.primaryDark:q.muted)}),e.globalAlpha=1,zf(e,`Next: Sensor Setup  →`,700,H(t,.86,.98))},vp=(e,t)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Movement Assessment`,`Triage active`),Xf(e,5,7,`Sensor Setup`),J(e,`Sensor Setup`,24,186,21,800),J(e,`A short 4-step setup before recording.`,24,206,12.5,500,q.secondary);let n=[`Prepare`,`Position`,`Calibrate`,`Ready`],r=t<.18?0:t<.34?1:t<.8?2:3;n.forEach((t,n)=>{Y(e,24+n*79,222,72,36,10,n<r?q.mint:n===r?q.primary:q.tint),J(e,`${n+1}. ${t}`,60+n*79,245,10.5,800,n===r?`#fff`:n<r?q.primaryDark:q.muted,`center`)});let i=V(H(t,.34,.8));Rf(e,24,272,312,250,18),e.beginPath(),e.arc(180,390,86,0,Math.PI*2),e.strokeStyle=q.tint2,e.lineWidth=14,e.stroke(),e.beginPath(),e.arc(180,390,86,-Math.PI/2,-Math.PI/2+i*Math.PI*2),e.strokeStyle=q.primary,e.lineCap=`round`,e.stroke(),i<1?(J(e,`${Math.round(i*100)}%`,180,402,38,800,q.ink,`center`),J(e,`Hold still`,180,426,12,600,q.secondary,`center`)):Vf(e,180,390,40,q.success),J(e,r===0?`Sensor strapped · patient stands up`:r===1?`Stand straight, leg relaxed and still`:i<1?`Setting the starting position`:`Sensor calibrated`,180,556,17,800,i>=1?q.success:q.ink,`center`),J(e,`Sensor setup takes about 3 seconds of quiet standing`,180,580,12,600,q.secondary,`center`),zf(e,`Start movement assessment`,700,H(t,.9,.99))},yp={LOW:[q.mintSoft,q.primaryDark],MID:[q.warningTint,q.warningText],HIGH:[q.errorTint,q.error]},bp=(e,t,n)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Movement Assessment`,`Triage active`),Rf(e,16,116,328,40,12);let r=n>=K.shock+.4&&kf(n)<5;e.beginPath(),e.arc(34,136,5,0,Math.PI*2),e.fillStyle=r?Math.floor(n*2)%2?q.error:`#F28B82`:q.success,e.fill(),J(e,r||n<K.shock+.4?`LIVE RECORDING`:`RECORDING COMPLETE`,46,141,12,800,q.ink),Hf(e,`Tashi · Right knee`,334,123,q.mint,q.primaryDark,10,`right`);let i=kf(n);Rf(e,16,166,328,176,18);let a=Math.max(0,n-K.shock),o=Math.max(0,30-Math.floor(a*1.6));e.beginPath(),e.arc(100,254,58,0,Math.PI*2),e.strokeStyle=q.tint2,e.lineWidth=10,e.stroke(),e.beginPath(),e.arc(100,254,58,-Math.PI/2,-Math.PI/2+(1-o/30)*Math.PI*2),e.strokeStyle=q.primary,e.lineCap=`round`,e.stroke(),J(e,`REMAINING`,100,236,9.5,800,q.secondary,`center`),J(e,`00:${String(o).padStart(2,`0`)}`,100,266,26,800,q.ink,`center`),J(e,`STEPS COUNTED BY POD`,180,206,9.5,800,q.secondary),J(e,`${i} of 5`,180,238,26,800,q.primary),J(e,`SHOCK CLASS PER STEP`,180,272,9.5,800,q.secondary),_f.forEach((t,n)=>{let r=180+n*31,a=n<i,[o,s]=a?yp[t]:[q.tint,q.muted];Y(e,r,284,28,40,8,o),J(e,String(n+1),r+14,299,10,800,a?s:q.muted,`center`),J(e,a?t===`HIGH`?`HI`:t===`MID`?`MID`:`LO`:`·`,r+14,316,9,800,a?s:q.muted,`center`)}),Rf(e,16,352,328,222,18),J(e,`Movement Trace`,32,380,15,800),Hf(e,`Calibrated`,330,364,q.tint,q.ink,10,`right`),J(e,`Tibial acceleration (g) · illustrative`,32,402,11,700,q.secondary),Y(e,32,412,296,146,10,q.tint),e.strokeStyle=q.tint2,e.lineWidth=1;for(let t=1;t<4;t++)e.beginPath(),e.moveTo(32,412+t*146/4),e.lineTo(328,412+t*146/4),e.stroke();J(e,`4g`,36,424,9,700,q.muted),J(e,`1g`,36,524,9,700,q.muted),e.beginPath();for(let t=0;t<=220;t++){let r=n-4+t/220*4,i=r<K.shock?1:Of(r),a=32+t/220*296,o=548-(i-.4)/3.8*126;t===0?e.moveTo(a,o):e.lineTo(a,o)}e.strokeStyle=q.primary,e.lineWidth=2.4,e.lineJoin=`round`,e.stroke(),gf.forEach((t,r)=>{let i=328-(n-t)/4*296;if(i<32||i>328||n<t)return;let a=548-(Df[r]-.4)/3.8*126;e.beginPath(),e.arc(i,a,4.5,0,Math.PI*2),e.fillStyle=_f[r]===`HIGH`?q.error:q.warning,e.fill()}),Y(e,16,584,328,44,12,i>=5?q.mintSoft:q.tint),J(e,i>=5?`✓ Test completed · 5 steps captured`:`Movement detected — keep walking steadily`,180,611,12.5,700,i>=5?q.primaryDark:q.ink,`center`),zf(e,i>=5?`Analyse results`:`Stop Recording`,700,0,{h:50})},xp=(e,t,n)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Movement Assessment`,`Triage active`),Hf(e,`SCREENING ENGINE · ON-DEVICE`,24,120,q.tint,q.primaryDark,10),J(e,`Analysing Data…`,24,182,22,800),J(e,`The screening model processes the results.`,24,204,12.5,500,q.secondary),e.beginPath(),e.arc(180,290,58,0,Math.PI*2),e.strokeStyle=q.tint2,e.lineWidth=10,e.stroke(),e.beginPath(),e.arc(180,290,58,-Math.PI/2,-Math.PI/2+t*Math.PI*2),e.strokeStyle=q.primary,e.lineCap=`round`,e.stroke(),J(e,`${Math.round(t*100)}%`,180,300,28,800,q.ink,`center`),J(e,`SCREENING PIPELINE`,24,384,11,800,q.secondary),[[`Patient information`,`68 M`],[`Symptoms`,`8 / 8`],[`Camera · ROM, posture`,`74° · Δ7.5°`],[`Pod · 5-step walk`,`2 HIGH · 3 MID`],[`Screening risk model`,`13 inputs`]].forEach(([r,i],a)=>{let o=396+a*58,s=H(t,.05+a*.18,.2+a*.18);Rf(e,24,o,312,48,12),s>=1?Vf(e,48,o+24,10):(e.beginPath(),e.arc(48,o+24,9,n*6,n*6+4.2),e.strokeStyle=q.primary,e.lineWidth=3,e.stroke()),J(e,r,68,o+29,13.5,700,s>0?q.ink:q.muted),s>=1&&J(e,i,322,o+29,13,800,q.primary,`right`)}),J(e,`On-device · screening risk only, not a diagnosis`,180,700,10,600,q.muted,`center`)},Sp=(e,t)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Screening Result`,`Triage active`),Hf(e,`✓ Assessment finalised`,16,116,q.mint,q.primaryDark,10.5),J(e,`Right knee screening complete`,16,170,18.5,800),J(e,`Symptoms · camera ROM + posture · tibial shock`,16,190,12,500,q.secondary),Y(e,16,202,328,46,12,q.tint),J(e,`Tashi Bhutia (68M)`,30,230,14,800),Hf(e,`PHC Rongli`,334,212,q.surface,q.ink,10,`right`),e.globalAlpha=md(H(t,.03,.25)),Rf(e,16,258,328,196,18),e.save(),bd(e,16,258,328,196,18),e.clip();let n=e.createLinearGradient(16,0,344,0);n.addColorStop(0,q.mint),n.addColorStop(1,q.errorTint),e.fillStyle=n,e.fillRect(16,258,328,6),e.restore(),J(e,`SCREENING BAND`,32,290,10,800,q.secondary),J(e,`Moderate`,32,322,25,800,q.info),J(e,`screening risk`,32,344,16,700,q.ink),Y(e,196,276,132,70,12,q.infoTint),J(e,`NEXT ACTION`,206,294,9,800,q.info),Lf(e,`Advise PHC visit for evaluation`,206,314,116,12.5,800,q.error,1.25),[[q.mint,0],[`#7FD3E6`,1],[q.errorTint,2]].forEach(([t,n])=>Y(e,32+296/3*n,364,296/3-3,12,5,t)),bd(e,130.66666666666669,362,296/3-3,16,6),e.strokeStyle=q.primaryDark,e.lineWidth=2,e.stroke();let r=32+148*md(H(t,.12,.35));e.beginPath(),e.moveTo(r-6,352),e.lineTo(r+6,352),e.lineTo(r,360),e.fillStyle=q.primaryDark,e.fill(),J(e,`Low`,32,396,10.5,600,q.secondary),J(e,`Moderate`,180,396,10.5,800,q.primaryDark,`center`),J(e,`Higher`,328,396,10.5,600,q.secondary,`right`),J(e,`Clinical confirmation required`,32,438,11.5,700,q.secondary),e.globalAlpha=1,Rf(e,16,464,328,166,18),J(e,`KEY MEASURED FINDINGS`,32,490,10.5,800,q.secondary),[[`Range of movement`,`Camera · seated bend / straighten`,`74°`],[`Knee posture (standing)`,`Camera · R 168.9° · L 176.4°`,`Δ 7.5°`],[`Tibial shock · 5 steps`,`Wearable pod on the shin`,`2 HIGH ↑`]].forEach(([n,r,i],a)=>{e.globalAlpha=md(H(t,.3+a*.1,.45+a*.1));let o=502+a*42;Y(e,30,o,300,36,10,q.tint),J(e,n,42,o+16,12.5,800),J(e,r,42,o+30,9.5,600,q.secondary),J(e,i,318,o+24,14,800,a===2?q.warningText:q.primary,`right`)}),e.globalAlpha=1,Rf(e,16,640,328,50,14,q.mintSoft),J(e,`AI model output · Moderate`,30,662,12,800,q.primaryDark),J(e,`On-device neural network 13 → 32 → 16 → 3`,30,680,10.5,600,q.secondary),zf(e,`Next Steps  →`,702,H(t,.9,.99),{h:50})},Cp=(e,t)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Post Screening Guidance`,`✓ Ready`),Y(e,16,116,328,52,12,q.tint),e.beginPath(),e.arc(42,142,16,0,Math.PI*2),e.fillStyle=q.mint,e.fill(),J(e,`KD`,42,147,11,800,q.primaryDark,`center`),J(e,`Tashi Bhutia 68M`,66,140,13.5,800),J(e,`Right knee`,66,157,11,500,q.secondary),Hf(e,`● Moderate risk`,334,128,q.infoTint,q.info,10,`right`),J(e,`Personalised Guidelines`,16,206,21,800),J(e,`Care steps tailored to moderate screening risk`,16,226,12,500,q.secondary),[[`Exercises`,`Gentle strengthening, 15 min daily`,`Daily 15 min`,q.mint,q.primaryDark],[`Lifestyle Care`,`Avoid deep squatting & floor sitting`,`Essential`,q.infoTint,q.info],[`Nutrition Plan`,`Diet matched to the risk band`,`By risk band`,q.warningTint,q.warningText],[`When to Visit PHC`,`Within 60 days · sooner if swollen`,`Priority`,q.errorTint,q.error]].forEach(([n,r,i,a,o],s)=>{let c=242+s*80,l=s===2&&t>.6;Rf(e,16,c,328,70,14,l?q.warningTint:q.surface),l&&(bd(e,16,c,328,70,14),e.strokeStyle=q.warning,e.lineWidth=2,e.stroke()),Y(e,28,c+12,46,46,12,q.tint),s===2?(e.beginPath(),e.arc(51,c+37,12,0,Math.PI*2),e.fillStyle=`#E8752A`,e.fill(),e.fillStyle=`#3F9A3A`,e.fillRect(50,c+20,3,8)):Y(e,43,c+27,16,16,4,q.primary),J(e,n,86,c+30,14.5,800),J(e,r,86,c+50,11,500,q.secondary),Hf(e,i,334,c+10,a,o,9.5,`right`)}),Bf(e,200,440,H(t,.6,.85)),Y(e,16,566,328,84,16,q.primary),J(e,`COMMUNITY HEALTH WORKER NOTE`,30,590,9.5,800,`rgba(255,255,255,0.9)`),Lf(e,`Explain to Tashi that this is a screening result, not a diagnosis.`,30,612,300,12.5,600,`#fff`,1.3),zf(e,`Share via WhatsApp`,664,0,{h:46}),zf(e,`Back to Home Dashboard`,718,0,{h:44,variant:`secondary`})},wp=[{band:`Low`,title:`Maintain & prevent`,fg:q.primaryDark,bg:q.mint,tip:`Stay active · re-screen in 6 months`,foods:[[`Millet / ragi roti, rice`,`Energy + calcium`,`#7A4A2E`],[`Rajma, dal, chana`,`Protein for muscles`,`#B5482A`],[`Seasonal greens & fruit`,`Vitamins, fibre`,`#3F9A3A`],[`Milk / curd daily`,`Calcium for bones`,`#F2EEE3`]]},{band:`Moderate`,title:`Anti-inflammatory plate`,fg:q.info,bg:q.infoTint,tip:`Each kg lost = 4 kg less load on the knee`,foods:[[`Haldi, black pepper, ginger`,`Natural anti-inflammatory`,`#F2B134`],[`Ragi, curd, milk, moringa`,`Calcium-rich`,`#F2EEE3`],[`Walnuts, alsi (flaxseed)`,`Omega-3 fats`,`#9A6338`],[`Less sugar & fried food`,`Reduces swelling`,`#E5534B`]]},{band:`Higher`,title:`Joint-protective + weight care`,fg:q.error,bg:q.errorTint,tip:`Follow PHC advice · visit within 2 weeks`,foods:[[`Dal, egg or paneer each meal`,`Protects muscle`,`#E8C07A`],[`Morning sun + calcium foods`,`Vitamin D & bone`,`#FFC300`],[`Smaller portions, more veg`,`Healthy weight`,`#55A043`],[`No sugary drinks · less salt`,`Less inflammation`,`#4FB3D9`]]}];function Tp(e){return e<.52?1:e<.76?0:2}var Ep={login:$f,language:tp,dashboard:np,intake:rp,joint:ap,questions:sp,camRom:pp,camPosture:mp,placement:gp,pairing:_p,calibrate:vp,assess:bp,analysis:xp,result:Sp,guidance:Cp,nutrition:(e,t)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff),Yf(e,`Nutrition Plan`,`By risk band`,q.warningTint,q.warningText),J(e,`Diet for healthy joints`,16,150,21,800),J(e,`Local, affordable foods · matched to the screening band`,16,170,11.5,500,q.secondary);let n=Tp(t);Y(e,16,184,328,46,14,q.tint),wp.forEach((t,r)=>{let i=r===n;i&&Y(e,20+r*108,188,104,38,11,t.fg),J(e,t.band,72+r*108,213,13.5,800,i?`#fff`:q.secondary,`center`)}),n===1&&Hf(e,`Tashi's band`,344,236,q.infoTint,q.info,9.5,`right`),Bf(e,72+n*108,207,n===1?0:H(t,n===0?.5:.74,n===0?.6:.84));let r=wp[n],i=n===1?0:n===0?.52:.76;J(e,r.title,16,278,17,800,r.fg),r.foods.forEach(([n,r,a],o)=>{let s=md(H(t,i+.02+o*.03,i+.08+o*.03));e.globalAlpha=s;let c=294+o*78+(1-s)*10;Rf(e,16,c,328,68,14),e.beginPath(),e.arc(52,c+34,22,0,Math.PI*2),e.fillStyle=q.tint,e.fill(),e.beginPath(),e.arc(52,c+34,14,0,Math.PI*2),e.fillStyle=a,e.fill(),e.beginPath(),e.arc(47,c+30,4,0,Math.PI*2),e.fillStyle=`rgba(255,255,255,0.5)`,e.fill(),e.save(),e.beginPath(),e.rect(84,c,252,68),e.clip(),Lf(e,n,86,c+30,244,13.5,800,q.ink,1.2),e.restore(),J(e,r,86,c+56,11,600,q.secondary),e.globalAlpha=1}),Y(e,16,612,328,52,14,r.bg),Lf(e,r.tip,30,642,300,12.5,800,r.fg),zf(e,`Share diet card`,700,0,{h:50})},report:(e,t,n)=>{e.fillStyle=q.bg,e.fillRect(0,0,Pf,Ff);let r=t>.55,i=t>.15;if(Mf.complete&&e.drawImage(Mf,20,54,32,26),J(e,`SAATHI`,60,70,17,800,q.primaryDark),J(e,`CLINICAL REPORTS`,60,86,9.5,800,q.secondary),Hf(e,r?`● Synced`:`● 1 pending`,300,58,r?q.mint:q.tint,r?q.primaryDark:q.secondary,11,`right`),Rf(e,16,116,328,238,18),J(e,`SCREENING ID: S-GOZBVQ`,32,144,10.5,800,q.secondary),J(e,`Tashi Bhutia`,32,174,20,800),J(e,`68 M · Right knee · Lingdok · 14 Oct 2026`,32,196,11.5,600,q.secondary),Y(e,32,212,296,60,14,q.tint),e.beginPath(),e.arc(64,242,20,0,Math.PI*2),e.strokeStyle=q.primaryDark,e.lineWidth=5,e.stroke(),J(e,`Screening Risk Band`,96,238,13,800),J(e,`Moderate · follow-up in 60 days`,96,257,11,600,q.secondary),[[`ROM · posture Δ`,`74° · 7.5°`],[`Tibial shock (5 steps)`,`2 HIGH · 3 MID`],[`Nutrition plan`,`Moderate`]].forEach(([t,n],r)=>{J(e,t,32,298+r*20,11.5,600,q.secondary),J(e,n,328,298+r*20,11.5,800,q.ink,`right`)}),[`Download PDF`,`WhatsApp`,`Print`].forEach((t,n)=>{Y(e,16+n*112,366,104,42,12,q.surface,q.tint2),J(e,t,68+n*112,392,12,700,q.primary,`center`)}),Rf(e,16,422,328,150,18,r?q.mintSoft:q.surface),e.fillStyle=r?q.primary:i?q.info:q.muted,e.beginPath(),e.arc(48,474,11,0,Math.PI*2),e.arc(60,467,14,0,Math.PI*2),e.arc(72,475,10,0,Math.PI*2),e.fill(),e.fillRect(48,474,24,11),J(e,r?`Synced to PHC Rongli`:i?`Network found · syncing…`:`Saved on this device`,90,468,15,800,r?q.primaryDark:q.ink),J(e,r?`Medical officer dashboard updated`:i?`Encrypted upload · 1 record`:`Will sync when network returns`,90,490,11.5,500,q.secondary),Uf(e,32,516,296,r?1:i?V(H(t,.15,.55)):0,8,q.tint2,r?q.success:q.info),i&&!r)for(let t=0;t<3;t++){let r=(n*1.5+t/3)%1;e.beginPath(),e.arc(32+r*296,520,3,0,Math.PI*2),e.fillStyle=`#fff`,e.fill()}J(e,`Screening record only — not a medical diagnosis`,180,556,10.5,600,q.muted,`center`),Zf(e,2)}};function Dp(e){for(let t=0;t<Nf.length;t++){let[n,r,i]=Nf[t];if(e<i||t===Nf.length-1)return{id:n,p:dd((e-r)/(i-r)),start:r,idx:t}}return{id:`login`,p:0,start:0,idx:0}}function Op(){let e=document.createElement(`canvas`);e.width=Pf*If,e.height=Ff*If;let t=e.getContext(`2d`),n=new Dc(e);n.colorSpace=He,n.anisotropy=8,n.minFilter=u;let r=new Tr({map:n,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),i=()=>{let e=new z,t=new I(new nf(1,2.12,.1,4,.12),new tu({color:`#1C2026`,roughness:.35,metalness:.6}));e.add(t);let n=new I(new nf(1.02,2.14,.07,4,.12),new tu({color:`#7FD8CF`,roughness:.3,metalness:.8}));e.add(n);let i=new I(new Ei(.93,2.015),r);i.position.z=.085,e.add(i);let a=new I(new L(.02,.22,.04),new tu({color:`#7FD8CF`,metalness:.8,roughness:.3}));return a.position.set(.515,.45,0),e.add(a),e},a=``;function o(e){let r=Dp(e),i=`${r.id}|${Math.round(e*30)}`;if(i===a)return;a=i,t.setTransform(If,0,0,If,0,0);let o=r.idx>0?V((e-r.start)/.45):1;if(o<1){let[n,i,a]=Nf[r.idx-1];t.save(),t.translate(-o*Pf*.3,0),Ep[n](t,1,i+(a-i),a-i),t.restore(),t.fillStyle=`rgba(0,0,0,${.15*o})`,t.fillRect(0,0,Pf,Ff),t.save(),t.translate((1-o)*Pf,0),t.shadowColor=`rgba(0,0,0,0.25)`,t.shadowBlur=20,t.fillStyle=q.bg,t.fillRect(0,0,Pf,Ff),t.shadowColor=`transparent`,Ep[r.id](t,r.p,e,0),t.restore()}else Ep[r.id](t,r.p,e,0);Gf(t),n.needsUpdate=!0}return{build:i,render:o,canvas:e}}var kp=1440,Ap=900,jp=260,X={bg:`#F6F8FB`,card:`#FFFFFF`,line:`#E6EBF1`,ink:`#0F172A`,sub:`#64748B`,faint:`#94A3B8`,teal:`#0F766E`,tealSoft:`#CCFBF1`,tealInk:`#115E59`,blue:`#2563EB`,blueSoft:`#DBEAFE`,amber:`#B45309`,amberSoft:`#FEF3C7`,red:`#B91C1C`,redSoft:`#FEE2E2`,purple:`#7C3AED`,purpleSoft:`#EDE9FE`,slate:`#475569`,slateSoft:`#F1F5F9`,sky:`#38BDF8`,green:`#16A34A`},Mp=new Image;Mp.src=mf;var Np=[[`Tashi Bhutia`,`14 Oct 2026`,`Right knee`,`Moderate`],[`Pema Lhamo`,`13 Oct 2026`,`Left knee`,`Low`],[`Karma Tshering`,`12 Oct 2026`,`Right knee`,`Higher`],[`Dawa Doma`,`12 Oct 2026`,`Both knees`,`Moderate`],[`Nima Sherpa`,`11 Oct 2026`,`Left knee`,`Low`],[`Phurba Lama`,`10 Oct 2026`,`Right knee`,`Low`]],Pp=[[`Tashi Bhutia`,`+91 97••• ••218`,`68 / M`,`Lingdok`],[`Pema Lhamo`,`+91 94••• ••671`,`54 / F`,`Tumlong`],[`Karma Tshering`,`+91 70••• ••905`,`61 / M`,`Rongli`],[`Dawa Doma`,`+91 98••• ••342`,`47 / F`,`Lingdok`],[`Nima Sherpa`,`+91 96••• ••127`,`58 / M`,`Sakyong`],[`Phurba Lama`,`+91 81••• ••560`,`66 / M`,`Tumlong`],[`Sonam Choden`,`+91 99••• ••083`,`49 / F`,`Phamtam`],[`Ang Dorjee`,`+91 77••• ••414`,`72 / M`,`Rongli`]],Fp={Higher:[X.redSoft,X.red],Moderate:[X.amberSoft,X.amber],Low:[X.tealSoft,X.tealInk]},Ip=[`09-16`,`09-19`,`09-22`,`09-25`,`09-28`,`10-01`,`10-04`,`10-07`,`10-10`,`10-14`],Lp=[1,2,4,2,2,3,2,2,1,1],Rp=[[`18-29`,11],[`30-44`,2],[`45-59`,4],[`60+`,1]],zp=[[`SR`,`Sunita Rai`,`ASHA-2041`,11],[`PD`,`Pema Doma`,`ASHA-2017`,5],[`KT`,`Karma Tamang`,`ASHA-2033`,3],[`NL`,`Nima Lepcha`,`ASHA-2050`,1]],Bp=[[`Lingdok`,6],[`Tumlong`,5],[`Rongli`,4],[`Sakyong`,3],[`Phamtam`,2]],Vp={in:.9,arrive:2.3,toPatients:5,toAnalytics:7.6,scroll:9.7,out:11.3};function Hp(e){let t=e-K.phc,n=t<Vp.toPatients?0:t<Vp.toAnalytics?1:2,r=n===0?0:n===1?Vp.toPatients:Vp.toAnalytics,i=V(H(t,Vp.arrive,Vp.arrive+.8)),a=[1010,640],o=[118,188],s=[118,280],c=[980,520],l,u=(e,t,n)=>{let r=pd(n);return[e[0]+(t[0]-e[0])*r,e[1]+(t[1]-e[1])*r]};l=t<Vp.toPatients-.9?a:t<Vp.toPatients?u(a,o,H(t,Vp.toPatients-.9,Vp.toPatients-.1)):t<Vp.toAnalytics-.9?o:t<Vp.toAnalytics?u(o,s,H(t,Vp.toAnalytics-.9,Vp.toAnalytics-.1)):u(s,c,H(t,Vp.toAnalytics+.6,Vp.toAnalytics+1.6));let d=[Vp.toPatients-.05,Vp.toAnalytics-.05],f=0;for(let e of d){let n=t-e;n>0&&n<.35&&(f=1-n/.35)}return{page:n,arrive:i,pageK:V(H(t,r,r+.45)),scroll:pd(H(t,Vp.scroll,Vp.scroll+1.1)),cursor:l,click:f,now:t}}function Z(e,t,n,r,i,a,o,s=`left`){e.font=`${a} ${i}px ${xd}`,e.fillStyle=o,e.textAlign=s,e.textBaseline=`middle`,e.fillText(t,n,r)}function Up(e,t,n,r,i,a,o,s){bd(e,t,n,r,i,a),e.fillStyle=o,e.fill(),s&&(e.strokeStyle=s,e.lineWidth=1.5,e.stroke())}function Wp(e,t,n,r,i){e.save(),e.shadowColor=`rgba(15,23,42,0.06)`,e.shadowBlur=14,e.shadowOffsetY=3,Up(e,t,n,r,i,16,X.card),e.restore(),bd(e,t,n,r,i,16),e.strokeStyle=X.line,e.lineWidth=1.2,e.stroke()}function Gp(e,t,n,r,i,a,o=13){e.font=`700 ${o}px ${xd}`;let s=e.measureText(t).width+o*1.6;return Up(e,n,r-o*.95,s,o*1.9,o*.95,i),Z(e,t,n+s/2,r+.5,o,700,a,`center`),s}function Kp(e,t,n,r,i,a=1){switch(e.save(),e.translate(n,r),e.scale(a,a),e.strokeStyle=i,e.fillStyle=i,e.lineWidth=2,e.lineCap=`round`,e.lineJoin=`round`,e.beginPath(),t){case`grid`:for(let[t,n]of[[-7,-7],[1,-7],[-7,1],[1,1]])bd(e,t,n,6,6,1.5),e.stroke();break;case`users`:e.arc(-3,-3,3.5,0,Math.PI*2),e.moveTo(-10,8),e.quadraticCurveTo(-3,-2,4,8),e.moveTo(5,-6),e.arc(5,-3,3,-Math.PI/2,Math.PI/2),e.moveTo(6,2),e.quadraticCurveTo(10,4,10,8),e.stroke();break;case`clip`:bd(e,-6,-7,12,15,2),e.moveTo(-3,-2),e.lineTo(3,-2),e.moveTo(-3,2),e.lineTo(3,2),e.stroke();break;case`chart`:e.moveTo(-8,8),e.lineTo(-8,-8),e.moveTo(-8,8),e.lineTo(8,8),e.moveTo(-4,4),e.lineTo(-4,0),e.moveTo(0,4),e.lineTo(0,-5),e.moveTo(4,4),e.lineTo(4,-2),e.stroke();break;case`cal`:bd(e,-7,-6,14,13,2),e.moveTo(-7,-1),e.lineTo(7,-1),e.moveTo(-3,-9),e.lineTo(-3,-4),e.moveTo(3,-9),e.lineTo(3,-4),e.stroke();break;case`doc`:e.moveTo(-6,-8),e.lineTo(3,-8),e.lineTo(6,-5),e.lineTo(6,8),e.lineTo(-6,8),e.closePath(),e.moveTo(-3,0),e.lineTo(3,0),e.moveTo(-3,4),e.lineTo(3,4),e.stroke();break;case`home`:e.moveTo(-8,0),e.lineTo(0,-7),e.lineTo(8,0),e.moveTo(-6,-1),e.lineTo(-6,8),e.lineTo(6,8),e.lineTo(6,-1),e.stroke();break;case`badge`:e.arc(0,-2,5,0,Math.PI*2),e.moveTo(-4,2),e.lineTo(-5,9),e.lineTo(0,6),e.lineTo(5,9),e.lineTo(4,2),e.stroke();break;case`sync`:e.arc(0,0,7,-2.6,.4),e.moveTo(7,-4),e.lineTo(7,1),e.lineTo(2,1),e.moveTo(0,0),e.arc(0,0,7,.6,3.6),e.stroke();break;case`gear`:e.arc(0,0,3,0,Math.PI*2);for(let t=0;t<8;t++){let n=t*Math.PI/4;e.moveTo(Math.cos(n)*5.5,Math.sin(n)*5.5),e.lineTo(Math.cos(n)*8,Math.sin(n)*8)}e.stroke();break;case`pulse`:e.moveTo(-9,0),e.lineTo(-4,0),e.lineTo(-2,-6),e.lineTo(2,6),e.lineTo(4,0),e.lineTo(9,0),e.stroke();break;case`alert`:e.moveTo(0,-8),e.lineTo(8,7),e.lineTo(-8,7),e.closePath(),e.moveTo(0,-2),e.lineTo(0,2),e.stroke(),e.beginPath(),e.arc(0,4.5,.8,0,Math.PI*2),e.fill();break;case`search`:e.arc(-2,-2,6,0,Math.PI*2),e.moveTo(2.5,2.5),e.lineTo(8,8),e.stroke();break;case`filter`:e.moveTo(-8,-6),e.lineTo(8,-6),e.lineTo(2,1),e.lineTo(2,7),e.lineTo(-2,5),e.lineTo(-2,1),e.closePath(),e.stroke();break;case`check`:e.moveTo(-6,0),e.lineTo(-2,4),e.lineTo(6,-5),e.stroke()}e.restore()}var qp=[[`Overview`,`grid`],[`Patients`,`users`],[`Screenings`,`clip`],[`Analytics`,`chart`],[`Follow-ups`,`cal`],[`Reports`,`doc`],[`Community`,`home`],[`Workers`,`badge`]],Jp=[[`Sync & Field Status`,`sync`],[`Settings`,`gear`]],Yp=[0,1,3];function Xp(e,t){e.fillStyle=X.card,e.fillRect(0,0,jp,Ap),e.fillStyle=X.line,e.fillRect(259,0,1,Ap),Mp.complete&&Mp.naturalWidth&&e.drawImage(Mp,26,24,46,37),Z(e,`SAATHI PHC`,84,38,21,800,X.ink),Z(e,`Primary Health Centre`,84,58,12.5,600,X.sub),Z(e,`MAIN MENU`,28,108,11.5,800,X.faint),qp.forEach(([n,r],i)=>{let a=140+i*46,o=Yp[t]===i;o&&Up(e,16,a-20,228,40,11,X.teal),Kp(e,r,42,a,o?`#FFFFFF`:X.slate),Z(e,n,64,a+1,15,o?700:600,o?`#FFFFFF`:X.slate)}),Z(e,`SYSTEM`,28,532,11.5,800,X.faint),Jp.forEach(([t,n],r)=>{let i=564+r*46;Kp(e,n,42,i,X.slate),Z(e,t,64,i+1,15,600,X.slate)}),Up(e,16,808,228,68,14,X.slateSoft),e.beginPath(),e.arc(52,842,18,0,Math.PI*2),e.fillStyle=X.teal,e.fill(),Z(e,`PL`,52,843,13,800,`#FFFFFF`,`center`),Z(e,`Dr. P. Lepcha`,80,834,14,700,X.ink),Z(e,`Medical Officer`,80,853,12,600,X.sub)}function Zp(e){e.fillStyle=X.card,e.fillRect(jp,0,1180,68),e.fillStyle=X.line,e.fillRect(jp,67,1180,1),Z(e,`PHC Rongli`,292,34,15,700,X.ink),Z(e,`·  East district hill block`,380,34,14,500,X.sub),Up(e,1110,18,210,34,17,`#ECFDF5`,`#A7F3D0`),e.beginPath(),e.arc(1130,35,5,0,Math.PI*2),e.fillStyle=X.green,e.fill(),Z(e,`Connected to SAATHI`,1144,35.5,14,700,`#166534`),e.beginPath(),e.arc(1360,35,17,0,Math.PI*2),e.fillStyle=X.slateSoft,e.fill(),Kp(e,`alert`,1360,35,X.slate,.85),e.beginPath(),e.arc(1400,35,17,0,Math.PI*2),e.fillStyle=X.teal,e.fill(),Z(e,`PL`,1400,36,12.5,800,`#FFFFFF`,`center`)}function Qp(e,t,n,r){Z(e,n,292,t,30,800,X.ink),Z(e,r,292,t+32,15,500,X.sub)}function $p(e,t,n){return n>=1?t:n<=0?e:Math.round(e+(t-e)*n)}function em(e,t,n,r,i){n.forEach(([n,a,o,s,c,l],u)=>{let d=292+u*284;Wp(e,d,t,264,118),Up(e,d+20,t+20,46,46,12,l),Kp(e,s,d+43,t+43,c,1.1),Z(e,n,d+80,t+36,14,600,X.sub);let f=$p(a,o,r);if(Z(e,String(f),d+80,t+78,34,800,X.ink),o!==a&&r>0){let n=1-V(H(i,Vp.arrive+2.2,Vp.arrive+3.2));n>0&&(e.globalAlpha=n,Gp(e,`+1 today`,d+264-104,t+80,`#DCFCE7`,`#166534`,12.5),e.globalAlpha=1)}})}function tm(e,t){Qp(e,112,`PHC Overview`,`Welcome back, PHC`),Gp(e,`14 Oct 2026`,1280,118,X.slateSoft,X.slate,13.5),em(e,172,[[`Total Patients`,18,19,`users`,X.teal,X.tealSoft],[`Total Screenings`,20,21,`clip`,X.blue,X.blueSoft],[`Follow-ups Due`,4,5,`cal`,X.amber,X.amberSoft],[`Active Field Workers`,7,7,`badge`,X.purple,X.purpleSoft]],t.arrive,t.now),Wp(e,292,312,744,214),Z(e,`Screening Indications`,316,346,18,800,X.ink),Z(e,`All screenings to date`,1012,346,13,600,X.faint,`right`),[[`HIGHER RISK`,6,6,X.redSoft,X.red],[`MODERATE`,6,7,X.amberSoft,X.amber],[`LOW RISK`,8,8,X.tealSoft,X.tealInk],[`INSUFFICIENT`,0,0,X.slateSoft,X.slate]].forEach(([n,r,i,a,o],s)=>{let c=316+s*176;Up(e,c,376,160,124,14,a),r!==i&&t.arrive>0&&t.arrive<1&&(bd(e,c,376,160,124,14),e.strokeStyle=o,e.lineWidth=3,e.stroke()),Z(e,n,c+18,406,12.5,800,o),Z(e,String($p(r,i,t.arrive)),c+18,456,44,800,o)}),Wp(e,1056,312,352,214),Z(e,`System Status`,1080,346,18,800,X.ink),e.beginPath(),e.arc(1106,410,24,0,Math.PI*2),e.fillStyle=`#DCFCE7`,e.fill(),Kp(e,`check`,1106,410,X.green,1.6),Z(e,`Online & Synchronized`,1144,402,17,800,`#166534`),Z(e,t.arrive>0?`Last sync: just now · ASHA-2041`:`Last sync: 2 h ago`,1144,426,13.5,600,X.sub),Up(e,1080,460,304,42,11,X.card,`#CBD5E1`),Z(e,`Manage Connections`,1232,481.5,14.5,700,X.ink,`center`),Wp(e,292,546,1116,322),Z(e,`Recent Screenings`,316,580,18,800,X.ink),Z(e,`View all  →`,1384,580,14,700,X.teal,`right`);let n=[316,652,852,1052,1252];[`PATIENT`,`DATE`,`JOINT`,`INDICATION`,`ACTION`].forEach((t,r)=>Z(e,t,n[r],618,12,800,X.faint)),e.fillStyle=X.line,e.fillRect(308,634,1084,1);let r=t.arrive,i=Np;e.save(),e.beginPath(),e.rect(292,636,1116,226),e.clip(),i.forEach((i,a)=>{let o=a===0,s=660+(o?0:(a-1+r)*44);if(o){if(r<=0)return;e.globalAlpha=r;let n=1-V(H(t.now,Vp.arrive+2.6,Vp.arrive+4));n>0&&Up(e,304,s-20,1092,40,10,`rgba(204,251,241,${.9*n})`)}Z(e,i[0],n[0],s,15,700,X.ink),o&&Gp(e,`NEW`,n[0]+132,s,X.teal,`#FFFFFF`,11),Z(e,i[1],n[1],s,14,500,X.sub),Z(e,i[2],n[2],s,14,500,X.sub);let[c,l]=Fp[i[3]];Gp(e,i[3],n[3],s,c,l,12.5),Z(e,`View  →`,n[4],s,14,700,X.teal),e.globalAlpha=1}),e.restore();let a=Math.min(V(H(t.now,Vp.arrive-.2,Vp.arrive+.3)),1-V(H(t.now,Vp.arrive+2.4,Vp.arrive+2.9)));if(a>0){e.globalAlpha=a;let t=84+(1-a)*-16;e.save(),e.shadowColor=`rgba(15,23,42,0.25)`,e.shadowBlur=24,Up(e,988,t,420,70,14,X.ink),e.restore(),e.beginPath(),e.arc(1024,t+35,16,0,Math.PI*2),e.fillStyle=X.teal,e.fill(),Kp(e,`sync`,1024,t+35,`#FFFFFF`,.9),Z(e,`New screening synced`,1052,t+26,15.5,800,`#FFFFFF`),Z(e,`Tashi Bhutia · Right knee · from ASHA Sunita`,1052,t+48,13,600,`#99EFE5`),e.globalAlpha=1}}function nm(e,t){Qp(e,112,`Patient Registry`,`Total registered patients: 19`),Up(e,1208,100,200,44,12,X.teal),Z(e,`+  Register Patient`,1308,122.5,15,700,`#FFFFFF`,`center`),Up(e,292,176,560,48,12,X.card,X.line),Kp(e,`search`,318,200,X.faint),Z(e,`Search by name, phone or village...`,340,200.5,15,500,X.faint),Up(e,868,176,120,48,12,X.card,X.line),Kp(e,`filter`,894,200,X.slate),Z(e,`Filters`,914,200.5,15,700,X.slate),Wp(e,292,244,1116,624);let n=[316,692,832,1012,1222];[`PATIENT DETAILS`,`AGE / SEX`,`VILLAGE`,`SCREENING STATUS`,`ACTION`].forEach((t,r)=>Z(e,t,n[r],282,12,800,X.faint)),e.fillStyle=X.line,e.fillRect(308,300,1084,1),Pp.forEach((r,i)=>{let a=338+i*66;e.globalAlpha=V(H(t.now,Vp.toPatients+.1+i*.06,Vp.toPatients+.5+i*.06)),i===0&&Up(e,304,a-28,1092,56,12,`rgba(204,251,241,0.65)`);let o=r[0].split(` `).map(e=>e[0]).join(``);e.beginPath(),e.arc(n[0]+20,a,20,0,Math.PI*2),e.fillStyle=[`#CCFBF1`,`#DBEAFE`,`#FEF3C7`,`#EDE9FE`][i%4],e.fill(),Z(e,o,n[0]+20,a+1,13,800,[X.tealInk,X.blue,X.amber,X.purple][i%4],`center`),Z(e,r[0],n[0]+54,a-9,15.5,700,X.ink),Z(e,r[1],n[0]+54,a+12,13,500,X.sub),i===0&&Gp(e,`NEW`,n[0]+190,a-9,X.teal,`#FFFFFF`,10.5),Z(e,r[2],n[1],a,14.5,600,X.slate),Z(e,r[3],n[2],a,14.5,600,X.slate),Gp(e,`1 Screenings`,n[3],a,X.tealSoft,X.tealInk,12.5),Up(e,n[4],a-18,120,36,10,X.card,`#99D5CF`),Z(e,`View Profile`,n[4]+60,a+.5,13.5,700,X.teal,`center`),i<Pp.length-1&&(e.fillStyle=X.line,e.fillRect(316,a+33,1068,1)),e.globalAlpha=1})}function rm(e,t){let n=t.scroll*470;e.save(),e.beginPath(),e.rect(jp,68,1180,832),e.clip(),e.translate(0,-n),Qp(e,112,`Analytics`,`Screening and community health activity across your PHC`),Up(e,1228,100,180,44,12,X.card,X.line),Kp(e,`cal`,1252,122,X.slate,.9),Z(e,`Last 30 days`,1272,122.5,14.5,700,X.slate),e.strokeStyle=X.slate,e.lineWidth=2,e.beginPath(),e.moveTo(1382,119),e.lineTo(1387,125),e.lineTo(1392,119),e.stroke();let r=V(H(t.now,Vp.toAnalytics+.1,Vp.toAnalytics+1.3));em(e,172,[[`Total Patients`,19,19,`users`,X.teal,X.tealSoft],[`Screenings in Period`,21,21,`clip`,X.blue,X.blueSoft],[`Higher Risk Indications`,6,6,`alert`,X.red,X.redSoft],[`Follow-ups Due`,5,5,`cal`,X.amber,X.amberSoft]],1,99),Wp(e,292,312,744,330),Z(e,`Screening Activity`,316,346,18,800,X.ink),Z(e,`Screenings per day`,316,370,13,500,X.sub),e.strokeStyle=X.line,e.lineWidth=1;for(let t=0;t<=4;t++){let n=588-t/4*190;e.beginPath(),e.moveTo(352,n),e.lineTo(1e3,n),e.stroke(),Z(e,String(t),338,n,12,600,X.faint,`right`)}let i=Lp.map((e,t)=>t===Lp.length-1?e+1:e),a=i.map((e,t)=>[352+t/(i.length-1)*648,588-e/4*190]);Ip.forEach((t,n)=>Z(e,t,a[n][0],610,12,600,X.faint,`center`)),e.save(),e.beginPath(),e.rect(342,378,668*r,230),e.clip();let o=()=>{e.moveTo(a[0][0],a[0][1]);for(let t=1;t<a.length;t++){let[n,r]=a[t-1],[i,o]=a[t],s=(n+i)/2;e.bezierCurveTo(s,r,s,o,i,o)}};e.beginPath(),o(),e.lineTo(1e3,588),e.lineTo(352,588),e.closePath();let s=e.createLinearGradient(0,398,0,588);s.addColorStop(0,`rgba(15,118,110,0.22)`),s.addColorStop(1,`rgba(15,118,110,0)`),e.fillStyle=s,e.fill(),e.beginPath(),o(),e.strokeStyle=X.teal,e.lineWidth=3.5,e.stroke(),a.forEach(([t,n],r)=>{e.beginPath(),e.arc(t,n,r===a.length-1?6:4,0,Math.PI*2),e.fillStyle=`#FFFFFF`,e.fill(),e.strokeStyle=X.teal,e.lineWidth=2.5,e.stroke()}),e.restore(),Wp(e,1056,312,352,330),Z(e,`Screening Indication`,1080,346,18,800,X.ink);let c=[[`Higher`,6,`#EF4444`],[`Moderate`,7,`#F59E0B`],[`Low`,8,`#14B8A6`]],l=1156,u=-Math.PI/2;c.forEach(([,t,n])=>{let i=u+t/21*Math.PI*2*r;e.beginPath(),e.arc(l,496,68,u,i),e.strokeStyle=n,e.lineWidth=26,e.lineCap=`butt`,e.stroke(),u=i+0}),Z(e,`21`,l,490,30,800,X.ink,`center`),Z(e,`screenings`,l,516,12.5,600,X.sub,`center`),c.forEach(([t,n,r],i)=>{let a=440+i*40;Up(e,1252,a-7,14,14,4,r),Z(e,t,1274,a,14.5,600,X.slate),Z(e,String(n),1384,a,15,800,X.ink,`right`)}),Wp(e,292,662,548,320),Z(e,`Patient Age Distribution`,316,696,18,800,X.ink);for(let t=0;t<=12;t+=4){let n=922-t/12*180;e.fillStyle=X.line,e.fillRect(348,n,458,1),Z(e,String(t),336,n,12,600,X.faint,`right`)}let d=V(H(t.now,Vp.scroll+.5,Vp.scroll+1.5));Rp.forEach(([t,n],r)=>{let i=458/Rp.length,a=i*.5,o=348+r*i+(i-a)/2,s=t===`60+`?n+1:n,c=s/12*180*d;Up(e,o,922-c,a,c,8,t===`60+`?`#14B8A6`:X.teal),Z(e,t,o+a/2,944,13,700,X.slate,`center`),d>.6&&Z(e,String(s),o+a/2,922-c-14,13,800,X.ink,`center`)}),Wp(e,860,662,548,320),Z(e,`Field Worker Activity`,884,696,18,800,X.ink),zp.forEach(([t,n,r,i],a)=>{let o=752+a*56,s=a===0?i+1:i;e.beginPath(),e.arc(906,o,20,0,Math.PI*2),e.fillStyle=[`#CCFBF1`,`#DBEAFE`,`#FEF3C7`,`#EDE9FE`][a],e.fill(),Z(e,t,906,o+1,13,800,[X.tealInk,X.blue,X.amber,X.purple][a],`center`),Z(e,n,940,o-8,15,700,X.ink),Z(e,r,940,o+12,12.5,500,X.sub),Up(e,1120,o-5,168*d,10,5,X.slateSoft),Up(e,1120,o-5,s/12*168*d,10,5,X.teal),Z(e,`${s} screenings`,1384,o,13.5,700,X.slate,`right`)}),Wp(e,292,1002,1116,300),Z(e,`Community Screening Activity`,316,1036,18,800,X.ink),Z(e,`Screenings by village`,316,1060,13,500,X.sub),Bp.forEach(([t,n],r)=>{let i=1102+r*38,a=r===0?n+1:n;if(Z(e,t,422,i,14.5,600,X.slate,`right`),Up(e,442,i-12,a/8*896*d,24,6,X.sky),r===0&&d>.9){let n=442+a/8*896+18;e.save(),e.shadowColor=`rgba(15,23,42,0.2)`,e.shadowBlur=12,Up(e,n,i-22,190,44,10,X.card),e.restore(),Z(e,`${t}`,n+14,i-7,13,800,X.ink),Z(e,`Screenings: ${a}`,n+14,i+11,12.5,600,X.sub)}}),e.restore()}function im(e,t,n,r){r>0&&(e.beginPath(),e.arc(t,n,10+(1-r)*22,0,Math.PI*2),e.fillStyle=`rgba(15,118,110,${.35*r})`,e.fill()),e.save(),e.translate(t,n),e.beginPath(),e.moveTo(0,0),e.lineTo(0,26),e.lineTo(7,20),e.lineTo(12,31),e.lineTo(17,29),e.lineTo(12,18),e.lineTo(21,18),e.closePath(),e.fillStyle=`#111827`,e.fill(),e.strokeStyle=`#FFFFFF`,e.lineWidth=2,e.stroke(),e.restore()}function am(e,t,n=!0){let r=Hp(t);e.fillStyle=X.bg,e.fillRect(0,0,kp,Ap),e.save(),e.globalAlpha=1,e.save(),e.beginPath(),e.rect(jp,68,1180,832),e.clip(),e.translate(0,(1-r.pageK)*14),e.globalAlpha=r.pageK,r.page===0?tm(e,r):r.page===1?nm(e,r):rm(e,r),e.restore(),e.globalAlpha=1,Zp(e),Xp(e,r.page),n&&im(e,r.cursor[0],r.cursor[1],r.click),e.restore()}function om(){let e=document.createElement(`canvas`);e.width=kp,e.height=Ap;let t=e.getContext(`2d`),n=new Dc(e);n.colorSpace=He,n.anisotropy=8,n.minFilter=u;let r=new z,i=2.5,a=i*Ap/kp,o=new I(new nf(2.6,1.6625,.07,3,.03),new tu({color:`#16191F`,roughness:.35,metalness:.3}));r.add(o);let s=new I(new Ei(i,a),new Tr({map:n,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}));s.position.z=.06,r.add(s);let c=new I(new L(.2,.34,.05),new tu({color:`#2A2F38`,roughness:.4,metalness:.5}));c.position.set(0,-1.5625/2-.2,-.06),r.add(c);let l=-1;return{group:r,size:{w:2.6,h:1.6625},render(e){let r=Math.round(e*30)/30;r!==l&&(l=r,am(t,e),n.needsUpdate=!0)}}}function sm(e,t){let n=document.createElement(`canvas`);n.width=kp,n.height=Ap;let r=()=>{am(n.getContext(`2d`),K.phc+Vp.toPatients-1.2,!1),e.getContext(`2d`).drawImage(n,0,0,e.width,e.height),t?.()};r(),Mp.complete||Mp.addEventListener(`load`,r,{once:!0})}function cm(e){let t=e-K.phc;return Math.min(md(dd((t-Vp.in)/.8)),1-V(H(t,Vp.out,Vp.out+.6)))}var lm=K.arch;function um(e,t,n){let r=document.createElement(`canvas`);r.width=1024,r.height=160;let i=r.getContext(`2d`);i.fillStyle=n,i.fillRect(0,0,1024,160),i.fillStyle=`rgba(255,255,255,0.92)`,bd(i,28,30,100,100,26),i.fill(),i.fillStyle=n,i.beginPath(),i.arc(78,80,20,0,Math.PI*2),i.fill(),i.fillStyle=`#FFFFFF`,i.textBaseline=`middle`,i.font=`800 58px ${xd}`,i.fillText(e,160,62),i.font=`500 38px ${xd}`,i.fillStyle=`rgba(255,255,255,0.85)`,i.fillText(t,160,116);let a=new Dc(r);return a.colorSpace=He,a.anisotropy=8,a}function dm(e,t){let n=new z;n.position.y=70,e.add(n);let r=new I(new B(30,30,.4,6),new tu({color:`#E1FBF8`,transparent:!0,opacity:.55,roughness:.3,metalness:.1}));r.position.y=-.4,n.add(r);let i=new I(new $l(30,.18,6,6),new Tr({color:`#2EC4B6`}));i.rotation.x=Math.PI/2,i.rotation.z=Math.PI/6,i.position.y=-.2,n.add(i);let a=new Ru(52,26,`#00685F`,`#7FD8CF`);a.material.transparent=!0,a.material.opacity=.35,a.position.y=-.18,n.add(a);let o=[],s=(e,t,r,i=0)=>{n.add(e),r&&(r.position.set(e.position.x,i,e.position.z+.5),n.add(r)),o.push({obj:e,label:r,at:t,base:e.scale.x})},c=new z;c.position.set(-24,3,0),c.add(new I(new nf(3.2,2.2,1.2,3,.3),W(`#1C2026`,{flat:!1})));let l=new I(new B(.75,.85,.6,24),W(`#2B2F36`,{flat:!1,metal:.6,rough:.3}));l.rotation.x=Math.PI/2,l.position.z=.8,c.add(l);let u=new I(new al(.55,24),new Tr({color:`#7CFFE9`}));u.position.z=1.11,c.add(u),s(c,.6,Sd(`Camera vision`,`MediaPipe Pose · ROM & posture`,{scale:5.8}),9.6);let d=lf();d.scale.setScalar(42),d.position.set(-15.5,3,0),s(d,1,Sd(`Wearable pod`,`IMU on tibia · shock per step`,{scale:5.8}),6.6);let f=new I(new $l(2.2,.35,10,30),W(`#2B2F36`,{flat:!1}));f.position.set(-15.5,3,-.8),s(f,1.1);let p=t();p.scale.setScalar(2.7),p.position.set(-7,3.2,.6),p.rotation.y=.25,s(p,2.4,Sd(`SAATHI app`,`React + TS PWA · offline-first`,{scale:5.8}),7);let m=[[`Screens`,`6 languages · voice guidance`,`#00685F`],[`Vision + sensor`,`Pose ROM · tibial shock`,`#2F8981`],[`Risk engine`,`On-device NN · diet plan`,`#3A86FF`],[`Offline store`,`Local records · sync queue`,`#9B5DE5`]],h=[];m.forEach(([e,t,n],r)=>{let i=new z,a=new I(new nf(8.4,1.05,4.2,3,.25),new tu({color:n,roughness:.4,metalness:.1}));a.castShadow=!0,i.add(a);let o=new I(new Ei(8,1.25),new Tr({map:um(e,t,n),toneMapped:!1}));o.scale.y=.8,o.position.z=2.11,i.add(o),i.position.set(2,6.2-r*1.6,0),s(i,3.4+r*.45),i.userData.y=i.position.y,h.push(i)});let g=Sd(`App architecture`,`React + TypeScript · modular`,{scale:5.8});g.position.set(2,8.6,.5),n.add(g),o.push({obj:new rr,label:g,at:3.4,base:1});let _=new z;_.position.set(11,0,0);for(let e=0;e<4;e++){let t=e/4*Math.PI*2+Math.PI/4,n=new I(new B(.08,.12,7,5),W(`#8C979D`,{metal:.6}));n.position.set(Math.cos(t)*.6,3.5,Math.sin(t)*.6),_.add(n)}for(let e=1;e<6;e++){let t=new I(new $l(.62,.05,4,4),W(e%2?`#D7263D`:`#FFFFFF`));t.rotation.x=Math.PI/2,t.position.y=e*1.2,_.add(t)}_.add(new I(new Ql(.22,10,8),new Tr({color:`#FF3B3B`})).translateY(7.3)),s(_,6.6,Sd(`Sync when online`,`4G / Wi-Fi · retry queue`,{scale:5.8}),9.6);let v=new z;v.position.set(19,5.5,-1);let y=new tu({color:`#FFFFFF`,emissive:`#DCE9FF`,emissiveIntensity:.4,roughness:.6,flatShading:!0});[[0,0,0,2.2],[-2,-.5,0,1.6],[2.1,-.4,0,1.7],[.8,1,-.3,1.5],[-1,.7,.4,1.3]].forEach(([e,t,n,r])=>v.add(new I(new Jl(r,1),y).translateX(e).translateY(t).translateZ(n)));let b=new I(new nf(1.2,1,.5,2,.15),W(`#00685F`,{flat:!1}));b.position.set(0,-.2,2.1),v.add(b);let x=new I(new $l(.38,.1,6,14,Math.PI),W(`#00685F`,{flat:!1}));x.position.set(0,.3,2.1),v.add(x),s(v,8.6,Sd(`Secure backend`,`Express · Prisma · Neon Postgres`,{scale:5.8}),9.6);let S=new z;S.position.set(26,0,1.5);let C=new I(new L(5,3,3.4),W(`#F7F7F2`));C.position.y=1.5,S.add(C);let w=new I(new L(5.05,.4,3.45),W(`#00685F`));w.position.y=.6,S.add(w);let T=new I(new L(.35,1.1,.1),new Tr({color:`#D7263D`}));T.position.set(0,2.1,1.76),S.add(T);let E=new I(new L(1.1,.35,.1),new Tr({color:`#D7263D`}));E.position.set(0,2.1,1.76),S.add(E);let D=new I(new nf(3.4,2.2,.2,2,.1),W(`#1C2026`,{flat:!1}));D.position.set(0,4.6,.5),S.add(D);let O=document.createElement(`canvas`);O.width=768,O.height=480;let k=new Dc(O);k.colorSpace=He,k.anisotropy=8,sm(O,()=>{k.needsUpdate=!0});let ee=new I(new Ei(3.2,2),new Tr({map:k,toneMapped:!1}));ee.position.set(0,4.6,.61),S.add(ee),s(S,10.6,Sd(`PHC dashboard`,`Overview · registry · analytics`,{scale:5.8}),8.4);let A=[],te=(e,t,r,i,a=3,o)=>{let s=e.clone().lerp(t,.5);s.y+=a;let c=new Qc(e,s,t),l=new eu(c,64,.09,6),u=new I(l,new Tr({color:i,transparent:!0,opacity:.55}));u.geometry.setDrawRange(0,0),n.add(u);let d=[];for(let e=0;e<6;e++){let e=new I(new Ql(.28,10,8),new Tr({color:`#FFFFFF`}));e.visible=!1,n.add(e),d.push(e)}let f;o&&(f=Sd(o,void 0,{scale:3.6,accent:i}),f.position.copy(c.getPoint(.5)).add(U(0,1,0)),n.add(f),f.material.opacity=0),A.push({tube:u,curve:c,at:r,dots:d,count:l.index.count,label:f})};return te(U(-22.4,4.2,.6),U(-8.4,4.6,.6),1.6,`#FFB703`,4.5,`On-device vision`),te(U(-13.6,3,0),U(-8.2,3,.6),2,`#2EC4B6`,1.5,`Bluetooth / Wi-Fi`),te(U(-5.8,3.6,.6),U(-2.2,4.4,0),3.2,`#00685F`,1.2),te(U(6.4,3.6,0),U(10.6,6.8,0),6.2,`#3A86FF`,2.5,`Encrypted sync`),te(U(11.4,7,0),U(16.8,5.6,-1),8.2,`#3A86FF`,2.5),te(U(21,5,-1),U(26,4.6,1.5),10.2,`#9B5DE5`,2),n.visible=!1,{root:n,update(e){let t=e-lm;if(n.visible=e>lm-3&&e<lm+20,!n.visible)return;let s=V(H(t,-1.5,1));r.material.opacity=.55*s,a.material.opacity=.35*s,i.scale.setScalar(.6+.4*s);for(let e of o){let n=hd(H(t,e.at,e.at+.7));e.obj.scale.setScalar(Math.max(1e-4,e.base*n)),e.label&&(e.label.material.opacity=V(H(t,e.at+.3,e.at+.9)))}h.forEach((n,r)=>{let i=V(H(t,3.4+r*.45,4.1+r*.45));n.position.y=n.userData.y+(1-i)*6,n.position.x=2+Math.sin(e*.8+r)*.06}),d.rotation.y=Math.sin(e*.9)*.5+.3,f.rotation.y=d.rotation.y,p.rotation.y=.25+Math.sin(e*.7)*.12,v.position.y=5.5+Math.sin(e*1.2)*.3;for(let n of A){let r=V(H(t,n.at,n.at+.9));n.tube.geometry.setDrawRange(0,Math.floor(n.count/3*r)*3),n.label&&(n.label.material.opacity=V(H(t,n.at+.5,n.at+1.2))),n.dots.forEach((t,i)=>{if(t.visible=r>=1,t.visible){let r=(e*.45+i/n.dots.length)%1;n.curve.getPoint(r,t.position),t.scale.setScalar(.6+Math.sin(r*Math.PI)*.7)}})}}}}var fm=K.impact;function pm(e,t){let n=new z;e.add(n);let r=_d(99),i=[U(4,0,-2)];for(let e=0;e<26;e++){let t=e/26*Math.PI*2+r()*.15,n=105+r()*170,a=Math.cos(t)*n,o=Math.sin(t)*n;i.push(U(a,Rd(a,o),o))}let a=new L(3,2.4,3);a.translate(0,1.2,0);let o=new ol(2.4,1.6,4);o.rotateY(Math.PI/4),o.translate(0,3.2,0);let s=new pc(a,new tu({roughness:.8,flatShading:!0}),(i.length-1)*9),c=new pc(o,new tu({color:`#B5482A`,roughness:.8,flatShading:!0}),(i.length-1)*9),l=0,u=new An,d=new $t,f=new F;i.slice(1).forEach(e=>{for(let t=0;t<9;t++){let t=r()*Math.PI*2,n=2+r()*9,i=e.x+Math.cos(t)*n,a=e.z+Math.sin(t)*n;d.setFromEuler(new Bn(0,r()*3,0));let o=.8+r()*.5;u.compose(U(i,Rd(i,a),a),d,U(o,o,o)),s.setMatrixAt(l,u),c.setMatrixAt(l,u),s.setColorAt(l,f.set(Ed[Math.floor(r()*Ed.length)])),l++}}),s.castShadow=c.castShadow=!1,n.add(s,c);let p=new B(1.1,1.1,1,14,1,!0);p.translate(0,.5,0);let m=new Yl(2,3,32);m.rotateX(-Math.PI/2);let h=i.map((e,r)=>{let i=new Tr({color:r===0?`#FFB703`:[`#00B4A6`,`#E84C8B`,`#3A86FF`,`#FB8500`][r%4],transparent:!0,opacity:0,depthWrite:!1,side:2}),a=new I(p,i);a.position.copy(e),n.add(a);let o=new I(m,new Tr({color:`#99EFE5`,transparent:!0,opacity:0,blending:2,depthWrite:!1}));o.position.copy(e).add(U(0,.6,0)),n.add(o);let s=t.clone().add(U(0,8,0)),c=e.clone().lerp(s,.5);c.y+=18+e.distanceTo(s)*.18;let l=new eu(new Qc(e.clone().add(U(0,3,0)),c,s),50,.45,6),u=new I(l,new Tr({color:r%3==0?`#FFB703`:`#99EFE5`,transparent:!0,opacity:.85,blending:2,depthWrite:!1}));l.setDrawRange(0,0),n.add(u);let d=r===0?.3:.8+(r-1)*.2;return{beacon:a,ring:o,arc:u,count:l.index.count,at:d,isRef:r%3==0}}),g=new I(p,new Tr({color:`#FFB703`,transparent:!0,opacity:0,blending:2,depthWrite:!1,side:2}));return g.position.copy(t),g.scale.set(3,60,3),n.add(g),n.visible=!1,{update(e){let t=e-fm;if(n.visible=e>fm-2&&e<K.total+.5,!n.visible)return;let r=1-V(H(e,K.end,K.end+3));for(let n of h){let i=md(H(t,n.at,n.at+.8));n.beacon.scale.set(1,4+46*i,1),n.beacon.material.opacity=.6*i*r;let a=(e*.7+n.at)%1;n.ring.scale.setScalar(.6+a*1.6),n.ring.material.opacity=(1-a)*.8*i*r;let o=n.isRef?V(H(t,n.at+.6,n.at+2)):0;n.arc.geometry.setDrawRange(0,Math.floor(n.count/3*o)*3),n.arc.material.opacity=.85*r}g.material.opacity=.5*V(H(t,1.5,3))*r}}}var mm=U(0,22,64),hm=U(24,22,64),gm=1.6,_m=K.shock+5.4,vm=K.shock+8.8,ym=K.lab,bm=K.lab+3.6,xm=K.lab+7,Sm=.72;function Cm(e,t=1){return new Tr({color:e,transparent:!0,opacity:t,blending:2,depthWrite:!1})}function wm(e){let t=new z;t.position.copy(mm),e.add(t);let n=G(new B(7.5,7.5,.4,48),W(`#F4FBFA`,{flat:!1,rough:.5}),0,-.2,0);t.add(n);let r=new I(new $l(7.5,.12,6,64),new Tr({color:`#2EC4B6`}));r.rotation.x=Math.PI/2,t.add(r);let i=new Ru(13,13,`#7FD8CF`,`#CDEFEA`);i.position.y=.02,t.add(i);let a=new z;t.add(a);let o=W(`#F3EBD9`,{flat:!1,rough:.6});a.add(G(new nf(1.2,.8,1,2,.25),o,.1,.55,0));let s=G(new nf(2.4,.35,.9,2,.15),o,1.6,.32,0);s.rotation.z=-.12,a.add(s),a.add(G(new B(.34,.42,5,16),o,.3,3.5,0)),a.add(G(new B(.85,.5,.6,20),o,.3,6.15,0)),a.add(G(new B(.13,.15,4.4,8),o,-.25,3.5,.35));let c=new tu({color:`#5BC0EB`,emissive:`#1C7FB0`,emissiveIntensity:.3,roughness:.3,transparent:!0,opacity:.95}),l=new I(new B(.86,.86,.32,24),c);l.position.set(.3,6.6,0),a.add(l);let u=new I(new $l(.72,.13,8,24),c);u.rotation.x=Math.PI/2,u.position.set(.3,6.6,0),a.add(u);let d=new z;d.position.set(.3,7.25,0),a.add(d);for(let e of[-.38,.38])d.add(G(new Ql(.55,16,12),o,0,0,e));let f=G(new B(.4,.5,4.4,16),o,-.25,2.3,0);f.rotation.z=.12,d.add(f);let p=G(new Ql(.42,12,10),o,.95,0,0);p.scale.set(.55,1,.9),d.add(p);let m=new tu({color:`#C98B63`,transparent:!0,opacity:.16,roughness:.6,depthWrite:!1});a.add(new I(new il(.95,5.2,8,16),m).translateX(.3).translateY(3.9)),a.add(new I(new il(1.25,4,8,16),m).translateX(.1).translateY(9.4));let h=lf();h.scale.setScalar(16),h.position.set(1.15,5.3,0),h.rotation.y=Math.PI/2,a.add(h);let g=new I(new $l(1,.16,8,32),W(`#2B2F36`,{flat:!1}));g.rotation.x=Math.PI/2,g.position.set(.3,5.3,0),a.add(g);let _=new I(new $l(.75,.12,8,32),Cm(`#FFC300`));_.rotation.x=Math.PI/2,a.add(_);let v=new I(new Ql(.6,16,12),Cm(`#FF9F1C`,.6));a.add(v);let y=new I(new Yl(.6,.9,40),Cm(`#FFB703`));y.rotation.x=-Math.PI/2,y.position.y=.05,t.add(y);let b=new I(new Ql(1.3,16,12),Cm(`#FF5A36`,0));b.position.set(.3,6.7,0),a.add(b);let x=new z;x.position.copy(hm),e.add(x),x.add(G(new B(8,8,.4,48),W(`#F7F8FB`,{flat:!1,rough:.5}),0,-.2,0));let S=new I(new $l(8,.12,6,64),new Tr({color:`#3A86FF`}));S.rotation.x=Math.PI/2,x.add(S);let C=new z;x.add(C),C.add(G(new nf(7.5,.6,2.6,2,.2),W(`#3A3F47`,{flat:!1}),0,.5,0));let w=G(new L(7,.08,2),W(`#1B1E22`),0,.84,0);C.add(w);for(let e of[-1.25,1.25]){C.add(G(new B(.07,.07,3.2,8),W(`#9AA4AA`,{metal:.7}),3.1,2.3,e));let t=G(new B(.06,.06,2.6,8),W(`#9AA4AA`,{metal:.7}),1.9,3.8,e);t.rotation.z=Math.PI/2,C.add(t)}C.add(G(new nf(.4,1.4,2.4,2,.1),W(`#2B2F36`,{flat:!1}),3.3,4.2,0));let T=[];for(let e=0;e<14;e++){let e=G(new L(.06,.02,1.9),W(`#3C424A`),0,.89,0,!1);C.add(e),T.push(e)}let E=new z;E.position.set(-.4,6.35,0),x.add(E);let D=W(`#B97A56`,{flat:!1});E.add(G(new B(.62,.48,2.6,14),W(`#1F3B73`,{flat:!1}),0,-1.3,0));let O=new z;O.position.y=-2.6,E.add(O),O.add(G(new Ql(.48,12,10),D)),O.add(G(new B(.42,.3,2.6,14),D,0,-1.3,0));let k=new z;k.position.set(.42,-.55,0),O.add(k),k.add(G(new nf(.22,.4,.34,2,.05),W(`#3A86FF`,{flat:!1}))),k.add(G(new $l(.44,.06,6,20),W(`#2B2F36`),-.42,0,0).rotateX(Math.PI/2));let ee=new z;ee.position.y=-2.6,O.add(ee);let A=new z,te=new z;A.add(G(new nf(1.5,.5,.7,2,.15),W(`#5E656D`,{flat:!1}),.35,-.2,0)),A.add(G(new L(1.55,.12,.72),W(`#2B2F36`),.35,-.5,0)),te.add(G(new nf(1.5,.5,.7,2,.15),W(`#FB5607`,{flat:!1}),.35,-.15,0)),te.add(G(new nf(1.6,.42,.76,2,.15),W(`#FFFFFF`,{flat:!1}),.35,-.55,0)),ee.add(A,te);let ne=new I(new Yl(.4,.65,40),Cm(`#FF5A36`));ne.rotation.x=-Math.PI/2,ne.position.set(.2,.92,0),x.add(ne);let j=new I(new Ql(.55,12,10),Cm(`#7CC6FF`,0));k.add(j),t.visible=x.visible=!1;let re={anat:t,lab:x,pod:h,cart:l,ankle:ee,accel:k,kneeGlow:b,waveU:0,update(e){if(t.visible=e>_m-3&&e<K.result+.5,x.visible=e>_m&&e<K.result+.5,!t.visible)return;let n=e>vm,r=e<_m?.5:(e-_m)%gm/gm,i=r<.62?0:Math.sin((r-.62)/.38*Math.PI)*.9;a.position.y=i,a.rotation.z=r>.62?-Math.sin((r-.62)/.38*Math.PI)*.06:0;let o=(e-_m)%gm,s=dd(o/.45);re.waveU=e>=_m?s:0,_.visible=v.visible=e>=_m&&o<.5;let d=n?1.5:.85;_.position.set(.3,.9+s*5.6,0),v.position.copy(_.position),_.scale.setScalar(d*(1+.25*Math.sin(s*Math.PI))),v.scale.setScalar(d*(.8+.4*Math.sin(s*Math.PI))),_.material.color.set(n?`#FF5A36`:`#FFC300`),v.material.color.set(n?`#FF3B1F`:`#FF9F1C`),_.material.opacity=1-V(H(s,.85,1));let f=dd(o/.6);y.visible=e>=_m,y.scale.setScalar(1+f*(n?5:3.5)),y.material.opacity=(1-f)*.9,y.material.color.set(n?`#FF5A36`:`#FFB703`);let p=e>=_m?Math.exp(-(((o-.45)/.09)**2)):0;b.material.opacity=p*(n?.65:.25);let m=V(H(e,vm-.3,vm+.5));if(l.scale.y=1-.55*m,u.scale.setScalar(1-.25*m),c.color.set(m>.5?`#F28B82`:`#5BC0EB`),c.emissive.set(m>.5?`#B03A2E`:`#1C7FB0`),c.emissiveIntensity=.3+p*1.2,h.userData.led.visible=Math.abs(o-.3)<.08||Math.floor(e*3)%2==0,!x.visible)return;let g=e<bm;A.visible=g,te.visible=!g;let S=(e-ym)%Sm/Sm,C=S*Math.PI*2;E.rotation.z=.5*Math.sin(C),O.rotation.z=-(.15+.8*Math.max(0,Math.sin(C-1.4))),ee.rotation.z=-.1-.2*Math.sin(C),T.forEach((t,n)=>{t.position.x=3.4-(e*4+n*.5)%7});let w=e>=ym&&e<xm+6?Math.exp(-(((S-.2)/.05)**2)):0;ne.scale.setScalar(1+w*(g?3:1.6)),ne.material.opacity=w*.9,j.material.opacity=w*(g?.9:.45)}};return re}var Tm={healthyWalk:2,oaWalk:3.6,hardShoe:8.4,cushionShoe:5.1},Em=class{ctx;master;voiceIn;stream;reverb;timer=0;next={drone:0,tabla:0,melody:0};step={drone:0,tabla:0,melody:0};started=0;muted=!1;constructor(){this.ctx=new AudioContext,this.master=this.ctx.createGain(),this.master.gain.value=.55,this.stream=this.ctx.createMediaStreamDestination();let e=this.ctx.createDynamicsCompressor();this.master.connect(e),e.connect(this.ctx.destination),e.connect(this.stream),this.voiceIn=this.ctx.createGain(),this.voiceIn.gain.value=1,this.voiceIn.connect(e),this.reverb=this.ctx.createConvolver();let t=this.ctx.sampleRate*2.6,n=this.ctx.createBuffer(2,t,this.ctx.sampleRate);for(let e=0;e<2;e++){let r=n.getChannelData(e);for(let e=0;e<t;e++)r[e]=(Math.random()*2-1)*(1-e/t)**2.6}this.reverb.buffer=n;let r=this.ctx.createGain();r.gain.value=.35,this.reverb.connect(r),r.connect(this.master)}out(e,t=.4){let n=this.ctx.createGain();if(n.gain.value=1,e.connect(n),n.connect(this.master),t>0){let n=this.ctx.createGain();n.gain.value=t,e.connect(n),n.connect(this.reverb)}}pluck(e,t,n=3.2,r=.12){let i=this.ctx,a=i.createGain();a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(r,t+.02),a.gain.exponentialRampToValueAtTime(8e-4,t+n);let o=i.createBiquadFilter();o.type=`lowpass`,o.frequency.setValueAtTime(2600,t),o.frequency.exponentialRampToValueAtTime(700,t+n),o.Q.value=2;for(let r of[-6,5,0]){let a=i.createOscillator();a.type=r===0?`triangle`:`sawtooth`,a.frequency.value=e,a.detune.value=r,a.connect(o),a.start(t),a.stop(t+n+.1)}o.connect(a),this.out(a,.5)}flute(e,t,n,r=.09){let i=this.ctx,a=i.createGain();a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(r,t+.09),a.gain.setValueAtTime(r,t+n*.7),a.gain.exponentialRampToValueAtTime(8e-4,t+n+.4);let o=i.createOscillator();o.type=`sine`,o.frequency.setValueAtTime(e*.985,t),o.frequency.exponentialRampToValueAtTime(e,t+.08);let s=i.createOscillator();s.type=`triangle`,s.frequency.value=e*2;let c=i.createGain();c.gain.value=.12;let l=i.createOscillator();l.frequency.value=5.2;let u=i.createGain();u.gain.value=e*.006,l.connect(u),u.connect(o.frequency);let d=i.createBuffer(1,i.sampleRate*(n+.5),i.sampleRate),f=d.getChannelData(0);for(let e=0;e<f.length;e++)f[e]=Math.random()*2-1;let p=i.createBufferSource();p.buffer=d;let m=i.createBiquadFilter();m.type=`bandpass`,m.frequency.value=e*2,m.Q.value=3;let h=i.createGain();h.gain.value=.18,p.connect(m),m.connect(h),h.connect(a),o.connect(a),s.connect(c),c.connect(a);for(let e of[o,s,l,p])e.start(t),e.stop(t+n+.5);this.out(a,.7)}drum(e,t,n=1){let r=this.ctx;if(t===`dha`||t===`ge`){let i=r.createOscillator();i.type=`sine`,i.frequency.setValueAtTime(t===`dha`?110:95,e),i.frequency.exponentialRampToValueAtTime(58,e+.35);let a=r.createGain();a.gain.setValueAtTime(.32*n,e),a.gain.exponentialRampToValueAtTime(.001,e+.5),i.connect(a),i.start(e),i.stop(e+.55),this.out(a,.15)}if(t!==`ge`){let i=t===`ti`?760:540;for(let[a,o]of[[1,.16],[2.01,.07],[2.98,.04]]){let s=r.createOscillator();s.type=`sine`,s.frequency.value=i*a;let c=r.createGain();c.gain.setValueAtTime(o*n,e),c.gain.exponentialRampToValueAtTime(8e-4,e+(t===`ti`?.09:.22)),s.connect(c),s.start(e),s.stop(e+.3),this.out(c,.25)}}}schedule(){let e=this.ctx.currentTime,t=e+.25,n=146.83,r=e-this.started;for(;this.next.drone<t;){let e=[n*.75,n,n,n*.5];this.pluck(e[this.step.drone%4],this.next.drone,3.4,this.step.drone%4==3?.14:.1),this.next.drone+=.82,this.step.drone++}let i=60/84/2;for(;this.next.tabla<t;){if(r>7){let e=[`dha`,`ge`,`na`,`ti`,`na`,`ka`,`dha`,`na`][this.step.tabla%8];e!==`ka`&&this.drum(this.next.tabla,e,Math.min(1,(r-7)/4)*(this.step.tabla%8==0?1.1:.8))}this.next.tabla+=i,this.step.tabla++}let a=[0,2,4,7,9,12,14,16],o=[[2,2],[3,1],[4,1],[5,3],[-1,1],[4,1],[3,1],[2,1],[3,2],[1,2],[0,3],[-1,1],[3,1],[4,1],[5,1],[6,1],[5,2],[4,1],[3,1],[4,2],[2,2],[3,3],[-1,1],[2,1],[1,1],[0,4],[-1,2]];for(;this.next.melody<t;){let[e,t]=o[this.step.melody%o.length],s=t*i*2;e>=0&&r>3&&this.flute(n*2*2**(a[e]/12),this.next.melody,s*.95),this.next.melody+=s,this.step.melody++}}start(){if(this.timer)return;this.ctx.resume();let e=this.ctx.currentTime+.05;this.started=e,this.next={drone:e,tabla:e,melody:e+.5},this.step={drone:0,tabla:0,melody:0},this.timer=window.setInterval(()=>this.schedule(),60)}pause(){this.ctx.suspend()}resume(){this.ctx.resume()}setMuted(e){this.muted=e,this.master.gain.setTargetAtTime(e?0:this.ducked?.24:.55,this.ctx.currentTime,.1)}ducked=!1;duck(e){this.ducked=e,this.muted||this.master.gain.setTargetAtTime(e?.24:.55,this.ctx.currentTime,.15)}},Dm=new URL(`pod-1-BqtOfHo1.png`,import.meta.url).href,Om=new URL(`pod-2-CXxWe-R1.png`,import.meta.url).href,km=new URL(`pod-3-DdG79oJD.png`,import.meta.url).href,Am=new URL(`vo-01-CXd_URY_.mp3`,import.meta.url).href,jm=new URL(`vo-02-Cb-RHS1K.mp3`,import.meta.url).href,Mm=new URL(`vo-03-BAYgTnio.mp3`,import.meta.url).href,Nm=new URL(`vo-04-CLcYYpmU.mp3`,import.meta.url).href,Pm=new URL(`vo-05-4Wftekso.mp3`,import.meta.url).href,Fm=new URL(`vo-06-Bi0jF39E.mp3`,import.meta.url).href,Im=new URL(`vo-07-2FOmUJPz.mp3`,import.meta.url).href,Lm=new URL(`vo-08-vhSkFttm.mp3`,import.meta.url).href,Rm=new URL(`vo-09-DshL6aln.mp3`,import.meta.url).href,zm=new URL(`vo-10-qK7TwuCd.mp3`,import.meta.url).href,Bm=K.total,Vm=e=>{let t=0;for(;t<hf.length-1&&e>=hf[t+1].t;)t++;return t},Hm=document.getElementById(`gl`),Um=document.getElementById(`overlay`),Wm=Um.getContext(`2d`);function Gm(e){let t=document.getElementById(`fatal`);if(!t)return;let n=t.querySelector(`p`);n&&(n.textContent=e),t.classList.remove(`hidden`);let r=document.getElementById(`start`);r&&r.classList.add(`gone`)}window.addEventListener(`error`,e=>Gm(`Could not start: `+(e.message||`the page failed to load. Check your connection and reload.`))),window.addEventListener(`unhandledrejection`,e=>Gm(`Could not start: `+(e.reason?.message||e.reason||`the page failed to load. Reload to try again.`)));var Km;try{Km=new Is({canvas:Hm,antialias:!0,powerPreference:`high-performance`})}catch(e){throw Gm(`This browser could not start 3D (WebGL). Turn on hardware acceleration, or open the link in Chrome, Edge or Safari and reload.`),e}Hm.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),Gm(`The 3D view stopped (graphics context lost). Reload the page to restart the film.`)}),Km.shadowMap.enabled=!0,Km.shadowMap.type=2,Km.toneMapping=4,Km.toneMappingExposure=1.08,Km.outputColorSpace=He,Km.autoClear=!1;var qm=new Rs,Jm=new Rs;Jm.add(new wu(`#ffffff`,1.4));var Ym=new Cu(`#ffffff`,2);Ym.position.set(2,3,5),Jm.add(Ym);var Xm=new di(45,16/9,.05,4e3);Jm.add(Xm);var Zm=$d(qm),Qm=qm.fog.color.clone(),$m=new F(`#EEF6F9`),Q=rf({skin:`#C99B70`,top:`#E9E3D6`,legs:`#3E4B5C`,shorts:!0,hair:`#CFCFCF`,cap:`#5B3A6B`,vest:`#2F4A3A`,moustache:`#D9D9D9`,stick:!0}),$=rf({skin:`#A0694A`,top:`#E84C8B`,legs:`#F6E3EC`,kurta:!0,dupatta:`#7B1E5B`,hair:`#141414`,bun:!0});qm.add(Q.root,$.root);var eh=Q.root.userData.stick,th=df();th.position.set(.17,.1,.02),$.torso.add(th);var nh=lf();nh.scale.setScalar(1.3),nh.position.set(0,-.11,.062),Q.kneeL.add(nh);var rh=new tu({color:`#2B2F36`,roughness:.6}),ih=new I(new $l(.054,.013,6,28),rh);ih.rotation.x=Math.PI/2,ih.position.y=-.11,Q.kneeL.add(ih);var ah=1;function oh(e){let t=Math.round(dd(e)*30)/30;t!==ah&&(ah=t,ih.geometry.dispose(),ih.geometry=new $l(.054,.013,6,28,Math.max(.01,t*Math.PI*2)),ih.visible=t>.02)}var sh=ff();sh.position.set(7.2,0,3.6),qm.add(sh);var ch=new z;ch.position.set(6.15,0,2.15),qm.add(ch);{ch.add(G(new B(.26,.24,.05,20),W(`#8B5A2B`,{flat:!1}),0,.33,0));for(let e=0;e<4;e++){let t=e*Math.PI/2+.6;ch.add(G(new B(.025,.025,.31,6),W(`#6E4520`),Math.cos(t)*.17,.155,Math.sin(t)*.17))}let e=W(`#D4A017`,{metal:.75,rough:.28,flat:!1});ch.add(G(new B(.22,.2,.02,32),e,0,.37,0));for(let[t,n,r]of[[-.11,-.08,`#F2C14E`],[0,-.13,`#3F8F3A`],[.11,-.08,`#7A2E1F`],[.12,.05,`#F7F3E8`]])ch.add(G(new B(.05,.035,.035,14),e,t,.395,n)),ch.add(G(new B(.044,.044,.006,14),W(r,{flat:!1}),t,.41,n));for(let e=0;e<3;e++)ch.add(G(new B(.06,.06,.012,18),W(`#5A3A2A`,{flat:!1}),-.06+e*.012,.39+e*.012,.07));ch.add(G(new B(.03,.026,.09,12),W(`#F4C430`,{flat:!1}),.2,.42,.16));for(let e=0;e<5;e++)ch.add(G(new Jl(.014,0),W(`#8A5A2B`),.03+e*.022,.39,.12,!1))}var lh=[{rig:rf({skin:`#7A4B2E`,top:`#FFFFFF`,legs:`#F2EEE3`,hair:`#222`,turban:`#FF9933`}),kind:`idle`,pos:U(-12,0,11),rot:2.4,ph:0},{rig:rf({skin:`#8D5A3B`,top:`#FFB703`,saree:`#3A86FF`,border:`#FFD166`,hair:`#111`,bun:!0}),kind:`idle`,pos:U(-1.7,0,1.7),rot:-2.5,ph:1},{rig:rf({skin:`#9A6646`,top:`#E63946`,legs:`#1D3557`,hair:`#111`,scale:.62}),kind:`run`,pos:U(),rot:0,ph:0,c:U(-31,0,8),rad:4.3,sp:.6},{rig:rf({skin:`#8A5A3A`,top:`#06D6A0`,legs:`#5A189A`,hair:`#111`,scale:.58}),kind:`run`,pos:U(),rot:0,ph:2.2,c:U(-31,0,8),rad:4.6,sp:.6},{rig:rf({skin:`#7A4B2E`,top:`#FFFFFF`,legs:`#FFFFFF`,hair:`#BBB`,turban:`#D7263D`}),kind:`sit`,pos:U(-18.5,0,4),rot:.6,ph:0},{rig:rf({skin:`#946042`,top:`#FF6B6B`,saree:`#FFB703`,border:`#D7263D`,hair:`#111`,bun:!0}),kind:`idle`,pos:U(23,0,1.5),rot:.4,ph:2}];lh.forEach(e=>qm.add(e.rig.root)),lh[1].rig.head.add(new I(new Ql(.13,12,10),new tu({color:`#D4A017`,metalness:.7,roughness:.3})).translateY(.2));var uh=Op(),dh=uh.build();dh.scale.setScalar(.072),dh.position.set(0,-.075,.03),dh.rotation.set(-.35,0,Math.PI),$.handR.add(dh);var fh=uh.build();fh.scale.setScalar(.072),fh.position.set(7.2,1.255,3.6),qm.add(fh);var ph=uh.build();Jm.add(ph);var mh=ph.children.find(e=>e.material?.map),hh=new nc(new Hs({map:(()=>{let e=document.createElement(`canvas`);e.width=e.height=256;let t=e.getContext(`2d`),n=t.createRadialGradient(128,128,0,128,128,128);n.addColorStop(0,`rgba(153,239,229,0.9)`),n.addColorStop(.45,`rgba(46,196,182,0.35)`),n.addColorStop(1,`rgba(46,196,182,0)`),t.fillStyle=n,t.fillRect(0,0,256,256);let r=new Dc(e);return r.colorSpace=He,r})(),transparent:!0,depthWrite:!1,blending:2,opacity:.8}));hh.scale.set(3.4,3.4,1),hh.position.z=-.4,ph.add(hh);var gh=om();Jm.add(gh.group),gh.group.visible=!1;var _h=dm(qm,uh.build),vh=pm(qm,Zm.phc),yh=wm(qm);function bh(e,t,n=1){let r=document.createElement(`canvas`);r.width=r.height=128;let i=r.getContext(`2d`),a=i.createRadialGradient(64,64,0,64,64,64);a.addColorStop(0,e),a.addColorStop(1,t),i.fillStyle=a,i.fillRect(0,0,128,128);let o=new Dc(r);o.colorSpace=He;let s=new nc(new Hs({map:o,transparent:!0,depthWrite:!1,depthTest:!1,blending:2}));return s.scale.setScalar(n),s}function xh(e){let t=document.createElement(`canvas`);t.width=t.height=128;let n=t.getContext(`2d`);n.strokeStyle=e,n.lineWidth=7,n.beginPath(),n.arc(64,64,56,0,Math.PI*2),n.stroke();let r=new Dc(t);return r.colorSpace=He,new nc(new Hs({map:r,transparent:!0,depthWrite:!1,blending:2}))}var Sh=bh(`rgba(255,60,60,1)`,`rgba(255,0,0,0)`,.4);qm.add(Sh);var Ch=bh(`rgba(255,210,60,1)`,`rgba(255,120,0,0)`,.2);qm.add(Ch);var wh=xh(`#FFC300`);qm.add(wh);var Th=[0,1,2].map(()=>{let e=xh(`#99EFE5`);return qm.add(e),e}),Eh=Array.from({length:22},()=>{let e=new I(new Ql(1,12,10),new Tr({color:`#FFE08A`})),t=bh(`rgba(255,230,140,0.9)`,`rgba(255,200,60,0)`,6);return e.add(t),qm.add(e),e}),Dh=[0,1,2].map(()=>{let e=xh(`#FFE08A`);return qm.add(e),e}),Oh=bh(`rgba(255,255,255,1)`,`rgba(124,255,233,0)`,3);qm.add(Oh);var kh=Math.PI/180,Ah=new P,jh=new P,Mh=new $t,Nh=U(4,0,-.5),Ph=U(6.1,0,1.75),Fh=Zm.charpai.clone().setZ(Zm.charpai.z+.08),Ih=U(8.6,0,2.35),Lh=U(7.9,0,4.4),Rh=U(7.62,0,1.98),zh=U(7.1,0,1.5),Bh=U(10,0,1.5),Vh=U(7.2,0,1.4),Hh=U(7.2,0,1.53),Uh=U(5,0,1.9),Wh=U(9.2,0,1.9),Gh=67.5,Kh=72.45,qh=K.strap+1.1,Jh=K.strap+2.4,Yh=K.strap+3.9,Xh=K.strap+4.4,Zh=Xh+.8,Qh=Xh+2.7,$h=U(5.05,0,1.45),eg=U(7.2,0,3.6),tg=U(5.55,0,.55),ng=yf+.05,rg=K.posture+1.3,ig=.35,ag=eg.clone().sub($h).normalize();function og(e){let t=V(H(e,ng+ig,rg-ig));return sh.position.lerpVectors($h,eg,t),sh.rotation.y=fd(-Math.PI/2,0,t),fh.position.copy(sh.position).setY(1.255),fh.rotation.y=sh.rotation.y,t}var sg=Zm.road.getLength(),cg=((e,t)=>{let n=0,r=1e9;for(let i=0;i<=3e3;i++){let a=Zm.road.getPointAt(i/3e3),o=Math.hypot(a.x-e,a.z-t);o<r&&(r=o,n=i/3e3)}return n})(24,71),lg=1-4.3/sg,ug=Zm.road.getPointAt(1);function dg(e,t){if(e<20.5){let n=Math.min(1,cg+(e-K.asha)*1.3/sg);t.copy(Zm.road.getPointAt(n));let r=Zm.road.getTangentAt(n);return Math.atan2(r.x,r.z)}if(e<23.2){let n=fd(lg,1,H(e,20.5,23.2));t.copy(Zm.road.getPointAt(n));let r=Zm.road.getTangentAt(n);return Math.atan2(r.x,r.z)}let n=V(H(e,23.2,25.8));return t.lerpVectors(ug,Ih,n),t.y=fd(ug.y,0,Math.min(1,n*3)),Math.atan2(Ih.x-ug.x,Ih.z-ug.z)}var fg=e=>fd(Uh.x,Wh.x,H(e,Gh,Kh)),pg=(e,t)=>Math.atan2(t.x-e.x,t.z-e.z);function mg(e){Q.root.position.copy(Fh),Q.root.rotation.y=0,sf(Q,.43),Q.torso.rotation.x=.04,Q.shoulderL.rotation.x=-.55,Q.shoulderR.rotation.x=-.55,Q.elbowL.rotation.x=-.65,Q.elbowR.rotation.x=-.65,Q.head.rotation.y=.35+Math.sin(e*.5)*.1}function hg(e,t,n,r){let i=V(e);Q.root.position.lerpVectors(t,n,i),Q.root.rotation.y=r,Q.hips.position.y=fd(.5,Q.hipH,i),Q.legL.rotation.x=Q.legR.rotation.x=fd(-Math.PI/2,0,i),Q.kneeL.rotation.x=Q.kneeR.rotation.x=fd(Math.PI/2,0,i),Q.legL.rotation.y=.08*(1-i),Q.legR.rotation.y=-.08*(1-i),Q.torso.rotation.x=.08+.42*Math.sin(i*Math.PI),Q.shoulderL.rotation.x=Q.shoulderR.rotation.x=-.55*(1-i),Q.elbowL.rotation.x=Q.elbowR.rotation.x=-.65*(1-i)}function gg(e){if(af(Q),eh.visible=e<25,Q.torso.rotation.x=.16,e<K.problem)Q.root.position.copy(Nh),Q.root.rotation.y=.2,Q.head.rotation.y=Math.sin(e*.6)*.3,Q.shoulderR.rotation.x=-.25;else if(e<13.5){let t=H(e,K.problem,13.5);Q.root.position.lerpVectors(Nh,Ph,t),Q.root.rotation.y=pg(Nh,Ph),of(Q,e*4.6,.3,1),Q.torso.rotation.x=.22,Q.shoulderR.rotation.x=-.3+Math.sin(e*4.6)*.1}else if(e<24.2){Q.root.position.copy(Ph);let t=V(H(e,13.5,14.3))*(1-V(H(e,16.6,17.4)));Q.root.rotation.y=fd(pg(Nh,Ph),.15,V(H(e,13.5,14.5)))+.9*V(H(e,22,23)),Q.torso.rotation.x=.2+.5*t,Q.shoulderL.rotation.x=-.7*t,Q.elbowL.rotation.x=-.4*t,Q.legL.rotation.x=-.15*t,Q.kneeL.rotation.x=.3*t,Q.head.rotation.x=.15*t,Q.shoulderR.rotation.x=-.25}else if(e<25.2){let t=Fh.clone().setZ(Fh.z+.45);Q.root.position.lerpVectors(Ph,t,V(H(e,24.2,25.2))),Q.root.rotation.y=pg(Ph,t),of(Q,e*4.6,.25,1)}else if(e<K.posture)mg(e),e>vf-.2&&e<yf+.2&&(Q.kneeL.rotation.x=Math.PI/2-bf(e)*kh,Q.head.rotation.y=0,Q.head.rotation.x=.1);else if(e<K.posture+.8)hg(H(e,K.posture,K.posture+.8),Fh,Vh,0);else if(e<K.strap-.6)Q.root.position.copy(Vh),Q.root.position.x+=Cf(e),Q.root.rotation.y=0,Q.torso.rotation.x=.04,Q.legL.rotation.x=-.09,Q.kneeL.rotation.x=.2,Q.hips.position.y=Q.hipH-.006,Q.shoulderL.rotation.z=-.1,Q.shoulderR.rotation.z=.1;else if(e<K.strap+.2)hg(1-H(e,K.strap-.6,K.strap+.2),Fh,Vh,0);else if(e<Xh)mg(e),Q.head.rotation.y=0,Q.head.rotation.x=.4;else if(e<Xh+.6)hg(H(e,Xh,Xh+.6),Fh,Hh,0);else if(e<Qh){let t=H(e,Xh+.6,Qh);Q.root.position.lerpVectors(Hh,Uh,t),Q.root.rotation.y=pg(Hh,Uh),of(Q,e*5.2,.3,.6)}else if(e<Gh)Q.root.position.copy(Uh),Q.root.rotation.y=fd(pg(Hh,Uh),Math.PI/2,V(H(e,Qh,Qh+.5))),Q.torso.rotation.x=.06,Q.head.rotation.y=-.25;else if(e<K.result-.5){let t=e>=Gh&&e<Kh;Q.root.position.set(fg(e),0,Uh.z),Q.root.rotation.y=Math.PI/2,t&&of(Q,Math.PI/2+2*Math.PI*(e-gf[0])/.9,.36,.4),Q.torso.rotation.x=.12}else mg(e);if(af($),$.root.visible=e>=K.asha-.1,dh.visible=e>=25.6&&!(e>=39.6&&e<Zh),fh.visible=e>=39.6&&e<Zh,sh.visible=e>=38.3&&e<K.shock,og(e),e<25.8){let t=dg(e,Ah);$.root.position.copy(Ah),$.root.rotation.y=t,of($,e*7.2,.5),$.torso.rotation.x=e<23.2?.12:.04}else if(e<38)$.root.position.copy(Ih),$.root.rotation.y=pg(Ih,Fh)+.35,cf($,.6+.4*V(H(e,25.8,26.6)));else if(e<39.6){let t=V(H(e,37.7,39.3));$.root.position.lerpVectors(Ih,tg,t),$.root.position.z+=Math.sin(t*Math.PI)*.95,Ah.copy(tg),$.root.rotation.y=t<.92?pg(Ih,Ah.setZ(tg.z+1.6)):pg(tg,$h),of($,e*7.5,.45*(1-t)),cf($,.8)}else if(e<ng)$.root.position.copy(tg),$.root.rotation.y=pg(tg,Fh)-.25,$.shoulderL.rotation.x=-.2,$.head.rotation.x=.1,e<40.4&&cf($,1-H(e,39.6,40.4));else if(e<rg){let t=jh.copy(sh.position).addScaledVector(ag,-.42),n=Math.atan2(ag.x,ag.z);if(e<ng+ig){let r=V(H(e,ng,ng+ig));$.root.position.lerpVectors(tg,t,r),$.root.rotation.y=fd(pg(tg,Fh)-.25,n,r),of($,e*7.5,.3)}else if(e<rg-ig)$.root.position.copy(t),$.root.rotation.y=n,of($,e*7.5,.4),$.shoulderR.rotation.x=-.95,$.elbowR.rotation.x=-.35,$.shoulderL.rotation.x=-.95,$.elbowL.rotation.x=-.35,$.shoulderR.rotation.z=.12,$.shoulderL.rotation.z=-.12;else{let r=V(H(e,rg-ig,rg));$.root.position.lerpVectors(t,Lh,r),$.root.rotation.y=fd(n,Math.PI-.12,r),of($,e*7.5,.3*(1-r))}}else if(e<K.strap)$.root.position.copy(Lh),$.root.rotation.y=Math.PI-.12,$.shoulderL.rotation.x=-.2,$.head.rotation.x=.1,e>K.strap-1&&($.shoulderR.rotation.x=-1.2,$.elbowR.rotation.x=-.4);else if(e<qh-.2){let t=V(H(e,K.strap,qh-.3));$.root.position.lerpVectors(Lh,Rh,t),$.root.position.x+=Math.sin(t*Math.PI)*.6,$.root.rotation.y=t<.85?pg(Lh,Rh):pg(Rh,zh),of($,e*7.5,.4*(1-t))}else if(e<Xh){$.root.position.copy(Rh),$.root.rotation.y=pg(Rh,zh),uf($,.5);let t=e>Jh&&e<Yh?Math.sin(e*6)*.08:0;$.shoulderL.rotation.x+=t,$.shoulderR.rotation.x-=t}else if(e<Zh){let t=V(H(e,Xh,Zh));$.root.position.lerpVectors(Rh,Lh,t),$.root.position.x+=Math.sin(t*Math.PI)*.5,$.root.rotation.y=pg(Rh,Lh),of($,e*7.5,.4)}else if(e<Zh+.9){let t=V(H(e,Zh,Zh+.9));$.root.position.lerpVectors(Lh,Bh,t),$.root.rotation.y=pg(Lh,Bh),of($,e*7.5,.4),cf($,.7)}else e<K.result-.5?($.root.position.copy(Bh),$.root.rotation.y=pg(Bh,Q.root.position),cf($,.9)):($.root.position.copy(Ih),$.root.rotation.y=pg(Ih,Fh)+.35,cf($,1),e>K.nutrition+3&&($.head.rotation.y=-.3));for(let t of lh)if(af(t.rig),t.kind===`run`&&t.c&&t.rad&&t.sp){let n=e*t.sp+t.ph;t.rig.root.position.set(t.c.x+Math.cos(n)*t.rad,0,t.c.z+Math.sin(n)*t.rad),t.rig.root.rotation.y=-n+Math.PI,of(t.rig,e*11+t.ph,.75),t.rig.shoulderL.rotation.x*=1.3}else t.kind===`sit`?(t.rig.root.position.copy(t.pos),t.rig.root.rotation.y=t.rot,sf(t.rig,.62),t.rig.shoulderL.rotation.x=-.5,t.rig.shoulderR.rotation.x=-.5,t.rig.head.rotation.y=Math.sin(e*.4)*.4):(t.rig.root.position.copy(t.pos),t.rig.root.rotation.y=t.rot+Math.sin(e*.3+t.ph)*.2,t.rig.head.rotation.y=Math.sin(e*.7+t.ph)*.4,t.rig.shoulderR.rotation.x=Math.sin(e*1.2+t.ph)*.2,t===lh[1]&&(t.rig.shoulderR.rotation.x=-2.8,t.rig.elbowR.rotation.x=-.6));nh.visible=e>=qh,nh.position.z=fd(.3,.062,V(H(e,qh,Jh))),nh.position.y=fd(-.06,-.11,V(H(e,qh,Jh))),oh(e<Jh?0:H(e,Jh,Yh)),nh.userData.led.visible=Math.floor(e*3)%2==0||e>K.strap+6.5&&e<K.shock+6,Q.kneeL.getWorldPosition(Ah),Sh.position.copy(Ah);let t=gd(e,13.8,17.4,.5);Sh.visible=t>.01,Sh.scale.setScalar((.35+.18*Math.sin(e*7))*t),nh.getWorldPosition(Ah),Th.forEach((t,n)=>{let r=(e*.8+n/3)%1;t.visible=e>K.strap+4.1&&e<Kh,t.position.copy(Ah),t.scale.setScalar(.05+r*.45),t.material.opacity=(1-r)*.85});let n=-1;for(let t of gf)e>=t&&(n=t);let r=e-n,i=n>0&&r<.35&&e<72.75;if(Ch.visible=wh.visible=i,i){let e=Q.kneeL.localToWorld(jh.set(0,-.4,.02)),t=nh.getWorldPosition(new P),n=dd(r/.22);Ch.position.lerpVectors(e,t,md(n)),Ch.scale.setScalar(.09+.07*Math.sin(n*Math.PI)),Ch.material.opacity=1-V(H(r,.22,.35)),wh.position.copy(e).setY(.03),wh.scale.setScalar(.05+r*1.6),wh.material.opacity=1-r/.35,nh.userData.led.visible=r>.18}let a=gd(e,K.asha+.3,20.4,.4);Oh.visible=a>0,a>0&&($.root.getWorldPosition(Oh.position),Oh.position.y+=2.4,Oh.material.opacity=a*(.75+.25*Math.sin(e*6))),dh.getWorldPosition(jh);let o=e>K.sync+.5&&e<K.phc+1.4,s=Zm.towerTop,c=Zm.phc.clone().add(U(0,7,0));Eh.forEach((t,n)=>{if(t.visible=o,!o)return;let r=(e*.35+n/Eh.length)%1;if(r<.5){let e=r/.5;t.position.lerpVectors(jh,s,e),t.position.y+=Math.sin(e*Math.PI)*12}else{let e=(r-.5)/.5;t.position.lerpVectors(s,c,e),t.position.y+=Math.sin(e*Math.PI)*24}}),Dh.forEach((t,n)=>{let r=(e*.6+n/3)%1;t.visible=o,t.position.copy(s),t.scale.setScalar(2+r*16),t.material.opacity=1-r}),ch.visible=e>K.nutrition-.5&&e<K.phc}var _g=[[116,-34,74,52],[118.2,-22,76,33],[121.5,-10,76.5,31],[125,3,77,32],[128.5,16,77,32],[132,4,86,60],[135,60,150,205],[139,185,140,125],[142,210,118,-30],[146,34,42,72],[150,8,14,31]],vg=[[116,-24,72,0],[118.2,-22,74,0],[121.5,-10,74.5,0],[125,3,74.5,0],[128.5,17,74.5,0],[132,4,73.5,0],[135,10,0,0],[139,10,0,0],[142,10,0,0],[146,4,3,0],[150,4,2.5,-2]],yg=(e,t,n,r,i,a,o)=>(s,c,l)=>{let u=fd(r,i,H(s,a,o));c.set(e.x+Math.sin(u)*t,n+Math.sin(s*.3)*.2,e.z+Math.cos(u)*t),l.copy(e)},bg=[{a:0,b:K.asha,keys:{p:[[0,62,128,255],[3,40,66,165],[6,22,22,72],[9,13,5,17],[11.5,10.5,2.6,8.6],[14.5,8.8,1.45,4.9],[17,8.5,1.3,4.4]],l:[[0,0,12,-60],[3,0,6,-20],[6,4,2,0],[9,5.5,1.2,0],[11.5,5.6,1,.9],[14.5,6.2,.6,1.7],[17,6.2,.55,1.75]]}},{a:K.asha,b:20.5,proc:(e,t,n)=>{let r=H(e,K.asha,20.5);t.set(fd(62,52,r),fd(-8,-4,r),fd(156,146,r)),dg(e,n),n.lerp(U(8,0,20),.35),n.y+=4}},{a:20.5,b:K.app,proc:(e,t,n)=>{dg(Math.min(e,25.8),n);let r=V(H(e,23.4,26));t.copy(n).add(U(fd(2.4,3.6,r),fd(1.6,2.2,r),fd(-2.4,2.6,r))),n.y+=fd(1,.8,r),n.lerp(U(7.6,.8,1.6),r*.6)}},{a:K.app,b:K.camera,blend:1,proc:yg(U(7.4,.9,1.8),8.5,2.6,.25,.95,K.app,K.camera)},{a:K.camera,b:K.posture,blend:1.2,keys:{p:[[38,9.6,2.6,6.6],[40,3.35,1.6,3.85],[44,3.45,1.5,3.75],[yf,3.5,1.5,3.7],[K.posture,4.2,1.6,4.4]],l:[[38,7,.8,2],[40,6.35,.7,1.15],[44,6.45,.64,1.15],[yf,6.45,.64,1.15],[K.posture,6.6,.8,2]]}},{a:K.posture,b:K.strap,blend:.9,keys:{p:[[K.posture,5.35,1.5,5],[K.strap,5.55,1.35,4.6]],l:[[K.posture,7.3,.8,1.35],[K.strap,7.3,.78,1.35]]}},{a:K.strap,b:K.shock,blend:.8,keys:{p:[[K.strap,6.3,1.25,4],[qh,6.15,.98,2.85],[Xh-.2,6.25,.92,2.72],[Xh+1,7,1.55,6.1],[Qh+.3,6.15,1.3,5.1],[K.shock,5.85,1.15,5.3]],l:[[K.strap,7.15,.55,1.6],[qh,7.28,.42,1.6],[Xh-.2,7.26,.42,1.58],[Xh+1,6.5,.8,1.8],[Qh+.3,5.75,.82,1.9],[K.shock,5.75,.74,1.9]]}},{a:K.shock,b:Kh,proc:(e,t,n)=>{let r=fg(e);t.set(r+.5,.95,5.6),n.set(r+.9,.62,1.9)}},{a:Kh,b:K.lab,keys:{p:[[Kh,Wh.x+.5,.95,5.6],[73.3,20,14,36],[74.4,14,29,94],[75.3,1.6,28.4,84],[79,-.4,28.2,81]],l:[[Kh,Wh.x+.9,.62,1.9],[73.3,8,14,50],[74.4,1.5,27,64],[75.3,.6,27.3,64],[79,.6,27.3,64]]}},{a:K.lab,b:K.result,keys:{p:[[79,-.4,28.2,81],[80.6,24.5,26.8,79],[86,25,26.6,77.5],[88.2,12,30.5,101],[93,12,30,99]],l:[[79,.6,27.3,64],[80.6,24.5,25.2,64],[86,24.5,25.2,64],[88.2,12,25.8,64],[93,12,25.8,64]]}},{a:K.result,b:K.nutrition,proc:yg(U(7.3,.9,1.8),7.5,2.4,-.25,.3,K.result,K.nutrition)},{a:K.nutrition,b:K.sync,blend:1,keys:{p:[[101,4.6,1.6,4.5],[104,5.2,1.25,3.7],[111,5.45,1.1,3.35]],l:[[101,6.6,.6,2],[104,6.3,.42,2.15],[111,6.3,.4,2.15]]}},{a:K.sync,b:K.phc,blend:1,keys:{p:[[111,28,14,42],[113.2,118,52,32],[K.phc,132,58,12]],l:[[111,6,1,2],[113.2,10,-5,45],[K.phc,10,-5,45]]}},{a:K.phc,b:K.arch,proc:(e,t,n)=>{let r=pd(H(e,K.phc,K.phc+2.2)),i=Zm.phc;t.lerpVectors(U(132,58,12),U(i.x+34+(e-K.phc)*.6,i.y+30,i.z-46),r),n.lerpVectors(U(10,-5,45),U(i.x,i.y+3,i.z),r)}},{a:K.arch,b:Bm,blend:1.4,keys:{p:_g.map(([e,t,n,r])=>[e-116+K.arch,t,n,r]),l:vg.map(([e,t,n,r])=>[e-116+K.arch,t,n,r])}}],xg=new P,Sg=new P;function Cg(e,t,n,r){e.proc?e.proc(t,n,r):e.keys&&(yd(e.keys.p,t,n),yd(e.keys.l,t,r))}function wg(e,t,n){let r=0;for(;r<bg.length-1&&e>=bg[r+1].a;)r++;let i=bg[r];if(Cg(i,e,t,n),i.blend&&r>0&&e<i.a+i.blend){let a=new P,o=new P;Cg(bg[r-1],i.a,a,o);let s=pd((e-i.a)/i.blend);t.lerpVectors(a,t,s),n.lerpVectors(o,n,s)}}var Tg=[[0,`hand`],[26,`hand`],[27,`hero`],[38,`hero`],[38.6,`corner`],[K.strap,`corner`],[K.strap+.5,`hero`],[qh-.1,`hero`],[qh+.5,`corner`],[Xh,`corner`],[Xh+.5,`hero`],[K.shock,`hero`],[K.shock+.5,`corner`],[72,`corner`],[72.5,`gone`],[93,`gone`],[93.6,`hero`],[111,`hero`],[111.6,`corner`],[K.phc+.4,`corner`],[K.phc+1,`gone`]],Eg={a:new P,b:new P},Dg={a:new $t,b:new $t};function Og(e,t,n,r){if(e===`hand`)return dh.getWorldPosition(n),dh.getWorldQuaternion(r),.072;let i=Xm.aspect,a=i>1.15,o,s,c;return e===`hero`?(o=U(a?.5*Math.min(1.25,i/1.78):0,a?-.06:-.02,-2.5),s=a?.69:.78,c=-.2):(o=a?U(.98*Math.min(1.3,i/1.78),-.12,-2.6):U(.2,-.42,-2.6),s=e===`gone`?1e-4:a?.5:.36,c=-.32),n.copy(o).applyMatrix4(Xm.matrixWorld),r.copy(Xm.quaternion).multiply(Mh.setFromEuler(new Bn(Math.sin(t*.5)*.04,c+Math.sin(t*.6)*.06,0))),s}function kg(e){let t=0;for(;t<Tg.length-1&&e>=Tg[t+1][0];)t++;return Tg[t][1]}function Ag(e){let t=0;for(;t<Tg.length-1&&e>=Tg[t+1][0];)t++;let[n,r]=Tg[t],[i,a]=Tg[Math.min(t+1,Tg.length-1)];if(r===`hand`&&a===`hand`||r===`gone`&&a===`gone`||t===Tg.length-1){ph.visible=!1,hh.visible=!1;return}ph.visible=!0;let o=i>n?pd((e-n)/(i-n)):1,s=Og(r,e,Eg.a,Dg.a),c=Og(a,e,Eg.b,Dg.b);ph.position.lerpVectors(Eg.a,Eg.b,o),ph.quaternion.slerpQuaternions(Dg.a,Dg.b,o),ph.scale.setScalar(fd(s,c,o)),hh.visible=!0,hh.material.opacity=.75*(r===`hand`?o:a===`hand`?1-o:1)}function jg(e){let t=cm(e);if(gh.group.visible=t>.002,!gh.group.visible)return;gh.render(e);let n=5*Math.tan(Xm.fov*kh/2),r=n*Xm.aspect,i=Math.min(1,r*.94/gh.size.w,n*.8/gh.size.h),a=Xm.aspect>1.15;Ah.set(0,(a?-.09:0)-(1-t)*.5,-2.5).applyMatrix4(Xm.matrixWorld),gh.group.position.copy(Ah),gh.group.quaternion.copy(Xm.quaternion).multiply(Mh.setFromEuler(new Bn(-.04*(1-t),Math.sin(e*.35)*.025,0))),gh.group.scale.setScalar(i*(.9+.1*t))}var Mg=[[9.6,16.6,`Knee pain, high in the hills`,`The nearest PHC is across the gorge`],[17.4,20.2,`Meet Sunita, ASHA worker`,`She walks these hills — SAATHI is her screening kit`],[96.2,100.6,`Screening risk in minutes`,`A smarter referral, not a diagnosis`,!0],[111.8,115.6,`Syncs when the network returns`,`The record travels to PHC Rongli, across the gorge`],[K.impact+1.2,K.impact+6.8,`Every hill hamlet. Earlier care.`,``]],Ng=[[38.8,K.posture-.3,`Test 1 of 2 · Joint movement`,`Seated, side view · knee bends and straightens in the camera plane`],[K.posture+.5,K.strap-.4,`Test 2 of 2 · Knee posture`,`Standing still for 5 s · left vs right knee angle (hip – knee – ankle)`],[K.strap+.3,61.3,`Pod strapped just below the knee`,`On the front of the shin bone (tibia) · light facing forward`],[61.8,64.2,`Pod paired over Bluetooth`,`SAATHI Sensor SP-8842 · signal strong · battery 88%`],[64.5,K.shock-.2,`Sensor setup · 3 s of quiet standing`,`The pod learns its resting position before the walk`],[67.4,72.2,`Walk test · tibial shock at every step`,`The pod counts each heel strike and classes it LOW · MID · HIGH`],[101.4,110.6,`Care doesn't stop at screening`,`A local diet plan matched to the risk band`]],Pg=[{title:`APP FLOW · INTAKE`,from:0,to:5,names:[`Sign in`,`Language`,`Dashboard`,`Register patient`,`Select joint`,`Symptoms`]},{title:`SCREENING · CAMERA`,from:6,to:7,names:[`Test 1 · Joint movement`,`Test 2 · Knee posture`]},{title:`SCREENING · SENSOR POD`,from:8,to:11,names:[`Strap pod below knee`,`Pair pod`,`Sensor setup`,`Walk test · tibial shock`]},{title:`OUTCOME`,from:12,to:16,names:[`On-device analysis`,`Risk result`,`Guidance`,`Nutrition plan`,`Report & sync`]}],Fg=new Image;Fg.src=pf;var Ig=new Image;Ig.src=mf,document.getElementById(`brandMark`).src=mf,document.getElementById(`startLogo`).src=pf,document.getElementById(`podImg1`).src=Dm,document.getElementById(`podImg2`).src=Om,document.getElementById(`podImg3`).src=km;function Lg(e,t,n){let r=e.clone().project(Xm);return{x:(r.x*.5+.5)*t,y:(-r.y*.5+.5)*n,front:r.z<1}}var Rg=(e,t)=>t?e.localToWorld(t.clone()):e.getWorldPosition(new P);function zg(e,t,n,r,i,a,o,s=`left`){e.font=`${a} ${i}px ${xd}`,e.fillStyle=o,e.textAlign=s,e.textBaseline=`middle`,e.fillText(t,n,r)}function Bg(e,t,n,r,i,a){bd(e,t,n,r,i,i/2),e.fillStyle=a,e.fill()}function Vg(e,t,n,r,i,a,o=`rgba(255,255,255,0.95)`){e.save(),e.shadowColor=`rgba(0,0,0,0.22)`,e.shadowBlur=24,bd(e,t,n,r,i,a),e.fillStyle=o,e.fill(),e.restore()}function Hg(e,t,n,r,i=`#FFFFFF`,a=2){e.beginPath(),e.arc(t.x,t.y,n,0,Math.PI*2),e.fillStyle=r,e.fill(),e.strokeStyle=i,e.lineWidth=a,e.stroke()}function Ug(e,t,n,r,i,a=[]){e.setLineDash(a),e.strokeStyle=r,e.lineWidth=i,e.lineCap=`round`,e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(n.x,n.y),e.stroke(),e.setLineDash([])}function Wg(e,t,n,r,i,a,o=``,s=`#00685F`){if(!n.front)return;let c=n.x+r*t,l=n.y+i*t;Ug(e,n,{x:c,y:l,front:!0},`#FFFFFF`,2.5*t),Hg(e,n,7*t,s,`#FFFFFF`,3*t),e.font=`800 ${21*t}px ${xd}`;let u=e.measureText(a).width;e.font=`600 ${16*t}px ${xd}`;let d=Math.max(u,o?e.measureText(o).width:0)+40*t,f=(o?66:46)*t,p=r<0?c-d:c;Vg(e,p,l-f/2,d,f,16*t),e.fillStyle=s,bd(e,p,l-f/2,7*t,f,3*t),e.fill(),zg(e,a,p+20*t,o?l-12*t:l,21*t,800,`#0B2E2B`),o&&zg(e,o,p+20*t,l+15*t,16*t,600,`#4F6B68`)}function Gg(e,t,n,r,i,a,o,s,c,l,u=3.2){e.strokeStyle=l,e.lineWidth=3.5*t,e.lineJoin=`round`,e.beginPath();for(let t=0;t<=220;t++){let l=dd(s(o-u+u*t/220)/c),d=n+i*t/220,f=r+a-l*a;t===0?e.moveTo(d,f):e.lineTo(d,f)}e.stroke()}function Kg(e,t,n,r,i,a,o,s){Vg(e,n,r,i,a,24*t,`rgba(10,32,30,0.82)`),zg(e,o,n+26*t,r+32*t,18*t,800,`#99EFE5`),zg(e,`illustrative values`,n+i-24*t,r+32*t,13*t,600,`rgba(255,255,255,0.55)`,`right`);let c=n+60*t,l=r+58*t,u=i-86*t,d=a-92*t;e.strokeStyle=`rgba(255,255,255,0.12)`,e.lineWidth=1;for(let n=0;n<=s;n+=s>6?2:1){let r=l+d-n/s*d;e.beginPath(),e.moveTo(c,r),e.lineTo(c+u,r),e.stroke(),zg(e,`${n} g`,c-10*t,r,12*t,600,`rgba(255,255,255,0.5)`,`right`)}return{gx:c,gy:l,gw:u,gh:d}}function qg(e,t,n,r,i,a){e.globalAlpha=r,e.font=`800 ${32*t}px ${xd}`;let o=Math.max(e.measureText(i).width,(e.font=`600 ${19*t}px ${xd}`,e.measureText(a).width))+80*t;Vg(e,n/2-o/2,70*t-(1-r)*14*t,o,92*t,46*t),zg(e,i,n/2,104*t-(1-r)*14*t,32*t,800,`#004F48`,`center`),zg(e,a,n/2,140*t-(1-r)*14*t,19*t,600,`#2F8981`,`center`),e.globalAlpha=1}var Jg=e=>Af(e,_m,gm,e<vm?Tm.healthyWalk:Tm.oaWalk),Yg=ym+.2*Sm-.05,Xg=e=>e<ym?1:Af(e,Yg,Sm,e<bm?Tm.hardShoe:Tm.cushionShoe);function Zg(e){let t=Um.width,n=Um.height,r=Xm.aspect>1.15,i=r?Math.min(t/1920,n/1080):t/1150,a=Wm;a.clearRect(0,0,t,n),a.save();let o=gd(e,.6,8.3,.8);if(o>0){a.globalAlpha=o;let e=300*i,r=t/2,s=n*.4-(1-o)*20*i;a.save(),a.shadowColor=`rgba(0,0,0,0.25)`,a.shadowBlur=40*i,bd(a,r-e/2,s-e/2,e,e,44*i),a.fillStyle=`rgba(255,255,255,0.96)`,a.fill(),a.restore(),Fg.complete&&a.drawImage(Fg,r-e/2+14*i,s-e/2+14*i,e-28*i,e-28*i);let c=`AI-assisted knee osteoarthritis screening for India’s hill villages`;a.font=`700 ${32*i}px ${xd}`;let l=a.measureText(c).width+64*i;Bg(a,r-l/2,s+e/2+26*i,l,60*i,`rgba(0,40,36,0.78)`),zg(a,c,r,s+e/2+57*i,32*i,700,`#FFFFFF`,`center`),a.globalAlpha=1}let s=Vm(e);if(s>0&&s<hf.length-1){let t=gd(e,hf[s].t+.2,hf[s].t+3.2,.4);if(t>0){a.globalAlpha=t;let e=hf[s].name.toUpperCase();a.font=`800 ${20*i}px ${xd}`;let n=a.measureText(e).width+110*i,o=r?96*i:190*i;Bg(a,60*i,o,n,50*i,`rgba(0,79,72,0.88)`),Bg(a,66*i,o+6*i,52*i,38*i,`#99EFE5`),zg(a,String(s).padStart(2,`0`),92*i,o+25*i,18*i,800,`#004F48`,`center`),zg(a,e,132*i,o+26*i,20*i,800,`#FFFFFF`),a.globalAlpha=1}}for(let[o,s,c,l,u]of Mg){let d=gd(e,o,s,.6);if(d<=0)continue;a.globalAlpha=d;let f=a.createLinearGradient(0,n*.62,0,n);f.addColorStop(0,`rgba(0,20,18,0)`),f.addColorStop(1,`rgba(0,20,18,0.55)`),a.fillStyle=f,a.fillRect(0,n*.62,t,n*.38);let p=n-190*i+(1-d)*20*i,m=u&&r?70*i:t/2,h=u&&r?`left`:`center`;{a.font=`800 ${(u?54:62)*i}px ${xd}`;let e=a.measureText(c).width;l&&(a.font=`600 ${28*i}px ${xd}`,e=Math.max(e,a.measureText(l).width)),e+=80*i;let t=(l?150:96)*i;Vg(a,h===`left`?m-40*i:m-e/2,p-52*i,e,t,30*i,`rgba(0,36,32,0.62)`)}a.shadowColor=`rgba(0,0,0,0.35)`,a.shadowBlur=10*i,zg(a,c,m,p,(u?54:62)*i,800,`#FFFFFF`,h),l&&zg(a,l,m,p+58*i,28*i,600,`#D5F8F5`,h),a.shadowBlur=0,a.globalAlpha=1}for(let[n,r,o,s]of Ng){let c=gd(e,n,r,.5);c>0&&qg(a,i,t,c,o,s)}let c=gd(e,K.asha+.3,20.4,.4);if(c>0){let e=Lg(Rg($.root).add(U(0,2.6,0)),t,n);e.front&&(a.globalAlpha=c,Wg(a,i,e,60,-70,`Sunita · ASHA`,`climbing to Tashi’s hamlet`,`#E84C8B`),a.globalAlpha=1)}let l=kg(e);if((e>26.3&&e<72.2||e>93.6&&e<K.phc)&&r&&(l===`hero`||l===`corner`||e<27)){let t=Dp(e),r=Pg.find(e=>t.idx>=e.from&&t.idx<=e.to);a.globalAlpha=Math.min(V(H(e,26.3,27.3)),1-V(H(e,71.4,72.2)),e>93?V(H(e,93.6,94.4)):1,1-V(H(e,K.phc-.8,K.phc)));let o=70*i,s=58*i,c=n/2-r.names.length*s/2+30*i;bd(a,o-24*i,c-50*i,430*i,r.names.length*s+76*i,28*i),a.fillStyle=`rgba(0,40,36,0.58)`,a.fill(),zg(a,r.title,o,c-14*i,16*i,800,`#99EFE5`),r.names.forEach((e,n)=>{let l=r.from+n,u=c+26*i+n*s,d=l===t.idx,f=l<t.idx;d&&Bg(a,o-10*i,u-23*i,392*i,46*i,`#FFFFFF`),a.beginPath(),a.arc(o+16*i,u,14*i,0,Math.PI*2),a.fillStyle=d?`#00685F`:f?`#99EFE5`:`rgba(255,255,255,0.25)`,a.fill(),f?(a.strokeStyle=`#004F48`,a.lineWidth=3.5*i,a.lineCap=`round`,a.beginPath(),a.moveTo(o+9*i,u),a.lineTo(o+14*i,u+6*i),a.lineTo(o+24*i,u-6*i),a.stroke()):zg(a,String(l+1),o+16*i,u+1*i,13*i,800,`#FFFFFF`,`center`),zg(a,e,o+44*i,u+1*i,22*i,d?800:600,d?`#004F48`:f?`rgba(255,255,255,0.9)`:`rgba(255,255,255,0.6)`),d&&Qg(a,o+44*i,u+15*i,290*i,4*i,t.p)}),a.globalAlpha=1}let u=e<ng+.5,d=u?gd(e,39.9,ng,.5):gd(e,rg+.1,K.strap-.3,.5);if(d>0){a.globalAlpha=d*.9;let e=Lg(Rg(fh,U(0,.6,-.15)),t,n),r=(u?[U(7.1,.02,.5),U(7.1,.02,2.05),U(7.1,1.4,2.05),U(7.1,1.4,.5)]:[U(6.65,.02,1.4),U(7.75,.02,1.4),U(7.75,1.75,1.4),U(6.65,1.75,1.4)]).map(e=>Lg(e,t,n));e.front&&r.every(e=>e.front)&&(a.beginPath(),r.forEach((e,t)=>t?a.lineTo(e.x,e.y):a.moveTo(e.x,e.y)),a.closePath(),a.fillStyle=`rgba(124,255,233,0.07)`,a.fill(),a.strokeStyle=`rgba(124,255,233,0.7)`,a.lineWidth=2*i,a.stroke(),r.forEach(t=>Ug(a,e,t,`rgba(124,255,233,0.45)`,1.5*i,[8*i,8*i])),Hg(a,e,6*i,`#7CFFE9`)),a.globalAlpha=1}let f=gd(e,vf-.6,yf+.8,.4);if(f>0){a.globalAlpha=f;let r=Lg(Rg(Q.legL),t,n),o=Lg(Rg(Q.kneeL),t,n),s=Lg(Rg(Q.kneeL,U(0,-.42,0)),t,n);if(r.front&&o.front&&s.front){Ug(a,r,o,`#FFD166`,6*i),Ug(a,o,s,`#FFD166`,6*i);for(let e of[r,o,s])Hg(a,e,8*i,`#FFB703`);let t=Math.atan2(r.y-o.y,r.x-o.x),n=Math.atan2(s.y-o.y,s.x-o.x)-t;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;a.beginPath(),a.moveTo(o.x,o.y),a.arc(o.x,o.y,46*i,t,t+n,n<0),a.closePath(),a.fillStyle=`rgba(255,209,102,0.35)`,a.fill(),Wg(a,i,o,-250,120,`Joint angle ${Math.round(xf(e))}°`,`range of motion ${Math.round(Sf(e))}°`,`#FFB703`)}a.globalAlpha=1}let p=gd(e,K.posture+1.1,K.strap-.7,.4);if(p>0){a.globalAlpha=p;let r=(e,r)=>Lg(Rg(e,r),t,n),o=[[Q.legL,Q.kneeL,`Right knee`,Ef(e,`right`),-1],[Q.legR,Q.kneeR,`Left knee`,Ef(e,`left`),1]];for(let[e,t,n,s,c]of o){let o=r(e),l=r(t),u=r(t,U(0,-.42,.02));if(o.front&&l.front&&u.front){Ug(a,o,l,`#FFD166`,6*i),Ug(a,l,u,`#FFD166`,6*i);for(let e of[o,l,u])Hg(a,e,8*i,`#FFB703`);Wg(a,i,l,c*170,-30,`${n} ${s.toFixed(1)}°`,`hip – knee – ankle`,`#FFB703`)}}let s=dd((e-wf.t0)/(wf.t1-wf.t0)),c=560*i,l=128*i,u=70*i,d=n-l-120*i;Vg(a,u,d,c,l,26*i,`rgba(10,32,30,0.85)`);let f=u+66*i,m=d+l/2,h=40*i;a.lineCap=`round`,a.beginPath(),a.arc(f,m,h,0,Math.PI*2),a.strokeStyle=`rgba(255,255,255,0.15)`,a.lineWidth=8*i,a.stroke(),a.beginPath(),a.arc(f,m,h,-Math.PI/2,-Math.PI/2+s*Math.PI*2),a.strokeStyle=`#99EFE5`,a.stroke(),zg(a,s<1?`${Math.max(0,5-s*5).toFixed(0)}s`:`✓`,f,m+1*i,24*i,800,`#FFFFFF`,`center`),zg(a,s<1?`STANDING STILL · 5 s`:`POSTURE DATA SUFFICIENT`,u+130*i,d+38*i,15*i,800,`#99EFE5`),zg(a,`Symmetry difference`,u+130*i,d+74*i,20*i,700,`#FFFFFF`),zg(a,`${Math.abs(Ef(e,`left`)-Ef(e,`right`)).toFixed(1)}°`,u+c-30*i,d+74*i,30*i,800,`#FFD166`,`right`),zg(a,`right knee rests more bent than the left`,u+130*i,d+104*i,14*i,600,`rgba(255,255,255,0.65)`),a.globalAlpha=1}let m=gd(e,Jh+.3,Xh-.1,.4);m>0&&(a.globalAlpha=m,Wg(a,i,Lg(Rg(nh),t,n),-190,110,`SAATHI pod on the tibia`,`just below the right knee · light forward`,`#00685F`),a.globalAlpha=1);let h=gd(e,gf[0]-.4,72.35000000000001,.3);if(h>0){a.globalAlpha=h;let r=kf(e),o=Lg(Rg(nh),t,n),s=r?_f[r-1]:``,c=s===`HIGH`?`#E5484D`:`#FF8A00`;Wg(a,i,o,70,-190,r?`Step ${r} · ${s} shock`:`Recording…`,r?`peak ≈ ${Df[r-1].toFixed(1)} g (illustrative)`:`walk 5 easy steps`,r?c:`#00685F`);let l=520*i,u=210*i,d=70*i,f=n-u-70*i,p=Kg(a,i,d,f,l,u,`TIBIAL ACCELERATION`,4);Gg(a,i,p.gx,p.gy,p.gw,p.gh,e,Of,4,`#FFB703`,2.4),_f.forEach((e,t)=>{let n=t<r,o=d+t*104*i;Bg(a,o,f-62*i,94*i,44*i,n?e===`HIGH`?`#E5484D`:`#FF8A00`:`rgba(10,32,30,0.55)`),zg(a,n?`${t+1} · ${e}`:`${t+1} · —`,o+47*i,f-40*i,17*i,800,`#FFFFFF`,`center`)}),a.globalAlpha=1}let g=gd(e,74.2,K.lab-.2,.5);if(g>0){a.globalAlpha=g,qg(a,i,t,g,`What is tibial shock?`,`Each heel strike sends a jolt up the shin to the knee`);let r=e>vm,o=(e,r)=>Lg(Rg(e,r),t,n);Wg(a,i,o(yh.anat,U(.2,.3,0)),-120,40,`Heel strike`,``,`#FFB703`),Wg(a,i,o(yh.pod),160,30,`Pod measures peak g`,`IMU on the tibia`,`#00685F`),Wg(a,i,o(yh.cart),150,-110,r?`Worn cartilage · stiff gait`:`Healthy cartilage`,r?`sharper, higher shock`:`shock is damped`,r?`#E5484D`:`#2EC4B6`);let s=560*i,c=230*i,l=70*i,u=n-c-70*i,d=Kg(a,i,l,u,s,c,r?`STIFF OA GAIT`:`HEALTHY GAIT`,4);Gg(a,i,d.gx,d.gy,d.gw,d.gh,e,Jg,4,r?`#FF5A36`:`#2EC4B6`),zg(a,`peak ≈ ${r?Tm.oaWalk:Tm.healthyWalk} g`,l+s-26*i,u+c-22*i,20*i,800,`#FFFFFF`,`right`),a.globalAlpha=1}let _=gd(e,80.4,xm+.2,.5);if(_>0){a.globalAlpha=_,qg(a,i,t,_,`The method footwear labs use`,`Published tibial-accelerometer research · Saathi adapts it as screening support`);let o=e<bm,s=e=>Lg(Rg(e),t,n);Wg(a,i,s(yh.accel),-190,-70,`Tibial accelerometer`,``,`#3A86FF`),Wg(a,i,s(yh.ankle),150,40,o?`Hard sole`:`Cushioned shoe`,o?`high peak`:`lower peak`,o?`#E5484D`:`#2EC4B6`);let c=560*i,l=230*i,u=Kg(a,i,70*i,n-l-70*i,c,l,`PEAK TIBIAL ACCELERATION`,10);Gg(a,i,u.gx,u.gy,u.gw,u.gh,e,Xg,10,o?`#FF5A36`:`#2EC4B6`,2.6);let d=V(H(e,bm+1.4,bm+2.4));if(d>0){let e=t-(r?520:400)*i,o=n-300*i;Vg(a,e,o,420*i,230*i,24*i),zg(a,`Lower peak = better cushioning`,e+24*i,o+34*i,18*i,800,`#004F48`),[[`Hard sole`,Tm.hardShoe,`#FF5A36`],[`Cushioned`,Tm.cushionShoe,`#2EC4B6`]].forEach(([t,n,r],s)=>{let c=o+80*i+s*66*i;zg(a,t,e+24*i,c+14*i,17*i,700,`#2B3A39`),bd(a,e+140*i,c,220*i*(n/10)*d,28*i,8*i),a.fillStyle=r,a.fill(),zg(a,`${n} g`,e+150*i+220*i*(n/10)*d,c+14*i,17*i,800,`#2B3A39`)}),zg(a,`illustrative values`,e+24*i,o+206*i,13*i,600,`#7A8A88`)}a.globalAlpha=1}let v=gd(e,xm+.6,K.result-.2,.5);if(v>0){a.globalAlpha=v,qg(a,i,t,v,`Same physics. New place: the doorstep.`,`Labs change the shoe and keep the runner · SAATHI keeps the footwear and measures the person`);let r=[`Published method, no lab needed`,`Camera ROM + posture + shock`,`Low-cost pod · works offline`,`Run by ASHA workers`];a.font=`800 ${20*i}px ${xd}`;let o=r.map(e=>a.measureText(e).width+84*i),s=18*i,c=o.reduce((e,t)=>e+t,0)+s*3<t-60*i?[[0,1,2,3]]:[[0,1],[2,3]];r.forEach((r,l)=>{let u=V(H(e,xm+1.2+l*.35,xm+2+l*.35))*v;a.globalAlpha=u;let d=c.findIndex(e=>e.includes(l)),f=c[d],p=f.reduce((e,t)=>e+o[t],0)+s*(f.length-1),m=t/2-p/2;for(let e of f){if(e===l)break;m+=o[e]+s}let h=o[l],g=n-(c.length===1?165:250)*i+d*76*i+(1-u)*20*i;Bg(a,m,g-30*i,h,60*i,`rgba(255,255,255,0.95)`),a.beginPath(),a.arc(m+32*i,g,12*i,0,Math.PI*2),a.fillStyle=[`#2EC4B6`,`#FFB703`,`#3A86FF`,`#E84C8B`][l],a.fill(),zg(a,r,m+56*i,g+1*i,20*i,800,`#004F48`)}),a.globalAlpha=v;let l=Lg(yh.lab.position.clone().add(U(0,9,0)),t,n),u=Lg(yh.anat.position.clone().add(U(0,13.5,0)),t,n);if(l.front&&u.front){let e=(e,t,n)=>{a.font=`800 ${22*i}px ${xd}`;let r=a.measureText(t).width+44*i;Bg(a,e.x-r/2,e.y-24*i,r,48*i,n),zg(a,t,e.x,e.y+1*i,22*i,800,`#FFFFFF`,`center`)};e(l,`SPORTS LAB`,`#3A86FF`),e(u,`SAATHI · DOORSTEP`,`#00685F`),a.strokeStyle=`#FFFFFF`,a.lineWidth=4*i,a.setLineDash([12*i,10*i]),a.beginPath(),a.moveTo(l.x-120*i,l.y),a.lineTo(u.x+160*i,u.y),a.stroke(),a.setLineDash([]);let t=u.x+160*i,n=u.y;a.beginPath(),a.moveTo(t,n),a.lineTo(t+18*i,n-12*i),a.lineTo(t+18*i,n+12*i),a.closePath(),a.fillStyle=`#FFFFFF`,a.fill()}a.globalAlpha=1}let y=gd(e,K.arch+1.6,K.impact-.4,.6);y>0&&(a.globalAlpha=y,Bg(a,t/2-480*i,80*i,960*i,96*i,`rgba(255,255,255,0.95)`),zg(a,`How SAATHI works`,t/2,114*i,38*i,800,`#004F48`,`center`),zg(a,`Camera + pod → phone (on-device AI) → cloud → PHC  ·  offline-first`,t/2,151*i,21*i,600,`#2F8981`,`center`),a.globalAlpha=1);let b=gd(e,K.impact+2.5,K.end-.4,.6);if(b>0){let r=[`Doorstep screening`,`Lab-grade biomechanics`,`Diet + care plan`,`6 Indian languages`],o=340*i,s=22*i,c=r.length*o+(r.length-1)*s;r.forEach((r,l)=>{let u=V(H(e,K.impact+2.5+l*.35,K.impact+3.3+l*.35))*b;a.globalAlpha=u;let d=t/2-c/2+l*(o+s),f=n-100*i+(1-u)*20*i;Bg(a,d,f-32*i,o,64*i,`rgba(255,255,255,0.95)`),a.beginPath(),a.arc(d+34*i,f,13*i,0,Math.PI*2),a.fillStyle=[`#2EC4B6`,`#FFB703`,`#3A86FF`,`#E84C8B`][l],a.fill(),zg(a,r,d+60*i,f+1*i,23*i,800,`#004F48`)}),a.globalAlpha=1}let x=V(H(e,K.end+1.2,K.end+2.6));if(x>0){let r=a.createRadialGradient(t/2,n/2,0,t/2,n/2,Math.max(t,n)*.7);r.addColorStop(0,`rgba(255,255,255,${.75*x})`),r.addColorStop(1,`rgba(255,255,255,${.15*x})`),a.fillStyle=r,a.fillRect(0,0,t,n),a.globalAlpha=x;let o=360*i;Fg.complete&&a.drawImage(Fg,t/2-o/2,n/2-o*.68-(1-x)*20*i,o,o),zg(a,`A companion for earlier care`,t/2,n/2+o*.45,48*i,800,`#00685F`,`center`),a.globalAlpha=V(H(e,K.end+3,K.end+4)),zg(a,`Screening support for community health workers · not a diagnostic device`,t/2,n/2+o*.45+56*i,22*i,600,`#5F6B6B`,`center`),a.globalAlpha=1}e>K.problem&&e<K.end+1&&(e<K.phc||e>K.impact+.5)&&Ig.complete&&r&&(a.globalAlpha=.9,Bg(a,t-240*i,96*i,180*i,48*i,`rgba(255,255,255,0.9)`),a.drawImage(Ig,t-228*i,102*i,46*i,36*i),zg(a,`SAATHI`,t-130*i,121*i,22*i,800,`#00685F`,`center`),a.globalAlpha=1),a.restore()}function Qg(e,t,n,r,i,a){bd(e,t,n,r,i,i/2),e.fillStyle=`rgba(0,104,95,0.15)`,e.fill(),bd(e,t,n,Math.max(i,r*dd(a)),i,i/2),e.fillStyle=`#00685F`,e.fill()}var $g=null;function e_(){let e=window.innerWidth,t=window.innerHeight,n,r,i,a;if($g){[n,r]=$g;let o=Math.min(e/n,t/r);i=n*o,a=r*o,Km.setPixelRatio(1)}else{let o=Math.min(window.devicePixelRatio||1,2);Km.setPixelRatio(o),i=e,a=t,n=Math.round(e*o),r=Math.round(t*o)}Km.setSize($g?n:i,$g?r:a,!1);for(let e of[Hm,Um])e.style.width=i+`px`,e.style.height=a+`px`;Um.width=Km.domElement.width,Um.height=Km.domElement.height,Xm.aspect=i/a,Xm.updateProjectionMatrix()}window.addEventListener(`resize`,e_),e_();var t_=new Xu(Xm,Hm);t_.enabled=!1,t_.enableDamping=!0,t_.maxPolarAngle=Math.PI*.6,t_.maxDistance=900,t_.minDistance=1.5;var n_=0,r_=!1,i_=!1,a_=!1,o_=null,s_=1.22,c_=[[0,3.5],[5.5,7.5],[21.5,25.5],[105.6,110.8],[138.8,143.2]],l_=e=>c_.reduce((t,[n,r])=>t+(e<=n?0:e>=r?r-n:e-n),0),u_=e=>(e-l_(e))/s_,d_=[Am,jm,Mm,Nm,Pm,Fm,Im,Lm,Rm,zm],f_=[3,13.7,23.6,39.5,46.9,56.8,68.2,79.1,93.1,103.5],p_=[],m_=[],h_=-1,g_=null;async function __(){if(p_.length||!o_)return;let e=o_.ctx;p_=await Promise.all(d_.map(async t=>{try{let n=await(await fetch(t)).arrayBuffer();return await e.decodeAudioData(n)}catch{return null}})),m_=[];let t=-10;for(let e=0;e<f_.length;e++){let n=Math.max(f_[e],t+.3);m_.push(n),t=n+(p_[e]?p_[e].duration:10)}}function v_(e){for(let t=0;t<m_.length;t++){let n=p_[t]?p_[t].duration:10;if(e>=m_[t]&&e<m_[t]+n+.1)return t}return-1}function y_(){let e=u_(n_),t=r_&&!i_&&m_.length?v_(e):-1;if(t===h_)return;if(g_){try{g_.onended=null,g_.stop()}catch{}g_=null}if(h_=t,t<0||!o_){o_?.duck(!1);return}let n=p_[t];if(!n){o_.duck(!1);return}let r=o_.ctx.createBufferSource();r.buffer=n,r.connect(o_.voiceIn),r.start(o_.ctx.currentTime+.03,Math.min(Math.max(0,e-m_[t]),Math.max(0,n.duration-.2))),r.onended=()=>{h_===t&&(h_=-1,o_?.duck(!1))},g_=r,o_.duck(!0)}var b_=!0,x_=e=>document.getElementById(e),S_=x_(`btnPlay`),C_=x_(`time`),w_=x_(`chapters`),T_=x_(`hint`),E_=e=>`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,`0`)}`,D_=hf.map((e,t)=>{let n=t<hf.length-1?hf[t+1].t:Bm,r=document.createElement(`div`);return r.className=`chap`,r.style.flex=String(n-e.t),r.innerHTML=`<span>${e.name}</span><div class="bar"><div class="fill"></div></div>`,r.addEventListener(`click`,t=>{let i=r.getBoundingClientRect(),a=dd((t.clientX-i.left)/i.width);A_(e.t+a*(n-e.t)*.98)}),w_.appendChild(r),{el:r,fill:r.querySelector(`.fill`),a:e.t,b:n}});function O_(){if(!o_)try{o_=new Em,o_.setMuted(!b_)}catch{o_=null}}function k_(e){r_=e,S_.textContent=e?`❚❚`:`▶`,e&&i_&&j_(!1),o_&&(e?o_.resume():o_.pause())}function A_(e){n_=dd(e,0,Bm-.01),i_&&j_(!1),r_||k_(!0)}function j_(e){i_=e,t_.enabled=e,x_(`btnExplore`).classList.toggle(`on`,e),T_.classList.toggle(`hidden`,!e),F_.style.display=e?`block`:`none`,e&&(r_&&(r_=!1,S_.textContent=`▶`,o_?.pause()),t_.target.copy(Sg),t_.update())}S_.addEventListener(`click`,()=>{O_(),k_(!r_)}),x_(`btnExplore`).addEventListener(`click`,()=>j_(!i_)),x_(`btnSound`).addEventListener(`click`,()=>{b_=!b_,x_(`btnSound`).querySelector(`span`).textContent=b_?`Music on`:`Music off`,x_(`btnSound`).classList.toggle(`on`,!b_),O_(),o_?.setMuted(!b_)}),Hm.addEventListener(`pointerdown`,()=>{a_&&!i_&&!R_&&j_(!0)});function M_(e){if(a_=!0,x_(`start`).classList.add(`gone`),x_(`honesty`).classList.remove(`hidden`),O_(),__(),!e)try{document.documentElement.requestFullscreen?.()}catch{}e?(n_=40,j_(!0),Xm.position.set(46,22,70),t_.target.set(6,2,10),t_.update()):(n_=0,k_(!0))}x_(`btnStart`).addEventListener(`click`,()=>M_(!1)),x_(`btnStartExplore`).addEventListener(`click`,()=>M_(!0)),window.addEventListener(`keydown`,e=>{e.code===`Space`&&(e.preventDefault(),a_?(O_(),k_(!r_)):M_(!1)),e.code===`ArrowRight`&&A_(n_+5),e.code===`ArrowLeft`&&A_(n_-5)});var N_=performance.now();window.addEventListener(`pointermove`,()=>{N_=performance.now()});var P_=Array.from(document.querySelectorAll(`.ui`)),F_=x_(`hotspots`);F_.style.display=`none`;var I_=[{label:`Tashi's home`,pos:()=>Zm.kamalaHouse.clone().setY(6.4),t:K.problem},{label:`Footpath from the gorge`,pos:()=>Zm.road.getPointAt(.45).add(U(0,3,0)),t:K.asha},{label:`Camera tests · ROM + knee posture`,pos:()=>sh.position.clone().add(U(0,1.8,0)),t:K.camera},{label:`Pod on the tibia`,pos:()=>Rg(nh).add(U(0,.35,0)),t:K.strap},{label:`Tibial shock explainer`,pos:()=>yh.anat.position.clone().add(U(0,14,0)),t:_m+1},{label:`Sports-lab method`,pos:()=>yh.lab.position.clone().add(U(0,10,0)),t:K.lab},{label:`Mobile tower · sync`,pos:()=>Zm.towerTop.clone().add(U(0,3,0)),t:K.sync},{label:`PHC Rongli · dashboard`,pos:()=>Zm.phc.clone().add(U(0,10,0)),t:K.phc},{label:`Architecture`,pos:()=>U(0,78,0),t:K.arch}],L_=I_.map(e=>{let t=document.createElement(`div`);return t.className=`hotspot`,t.innerHTML=`<b>${e.label}</b><i></i>`,t.addEventListener(`pointerdown`,e=>e.stopPropagation()),t.addEventListener(`click`,()=>A_(e.t)),F_.appendChild(t),t}),R_=!1,z_=null,B_=null,V_=null,H_=[];function U_(){if(R_)return;if(typeof MediaRecorder>`u`){alert(`Video recording is not supported in this browser. Try Chrome or Edge.`);return}O_(),$g=[1920,1080],e_(),B_=document.createElement(`canvas`),B_.width=1920,B_.height=1080,V_=B_.getContext(`2d`);let e=B_.captureStream(30);o_?.stream.stream.getAudioTracks().forEach(t=>e.addTrack(t));let t=[`video/mp4;codecs=avc1.640028,mp4a.40.2`,`video/mp4`,`video/webm;codecs=vp9,opus`,`video/webm;codecs=vp8,opus`,`video/webm`].find(e=>MediaRecorder.isTypeSupported(e))??``;z_=new MediaRecorder(e,t?{mimeType:t,videoBitsPerSecond:14e6}:void 0),H_.length=0,z_.ondataavailable=e=>{e.data.size&&H_.push(e.data)},z_.onstop=()=>{let e=z_?.mimeType||`video/webm`,t=new Blob(H_,{type:e}),n=document.createElement(`a`);n.href=URL.createObjectURL(t),n.download=`SAATHI-3D-demo.${e.includes(`mp4`)?`mp4`:`webm`}`,document.body.appendChild(n),n.click(),n.remove(),$g=null,e_(),x_(`recBadge`).classList.add(`hidden`),x_(`btnRecord`).classList.remove(`on`)},i_&&j_(!1),n_=0,R_=!0,k_(!0),z_.start(1e3),x_(`recBadge`).classList.remove(`hidden`),x_(`btnRecord`).classList.add(`on`)}function W_(){R_&&(R_=!1,z_?.stop())}x_(`btnRecord`).addEventListener(`click`,()=>{a_||M_(!1),R_?W_():U_()}),x_(`btnFull`).addEventListener(`click`,()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen?.()});var G_=performance.now();wg(0,xg,Sg),Xm.position.copy(xg),Xm.lookAt(Sg);function K_(e){let t=Math.min(.05,(e-G_)/1e3);if(G_=e,r_){n_+=t*s_;for(let[e,t]of c_)if(n_>e&&n_<t){n_=t;break}n_>=Bm&&(R_?(n_=Bm-.001,W_(),k_(!1)):(n_=Bm-.001,k_(!1)))}let n=e/1e3;Zm.update(n,t),gg(n_),_h.update(i_?K.arch+14:n_),vh.update(n_),yh.update(i_?_m+3+n%6:n_),i_&&(yh.anat.visible=yh.lab.visible=!0),i_?(t_.update(),Sg.copy(t_.target)):(wg(n_,xg,Sg),Xm.position.copy(xg),Xm.lookAt(Sg)),Xm.updateMatrixWorld(),Ag(i_?0:n_),jg(i_?-10:n_),uh.render(n_),y_(),x_(`pod`).classList.toggle(`on`,a_&&!i_&&n_>K.strap+.4&&n_<K.shock-.6);let r=i_?0:gd(n_,K.arch-.4,K.impact-.2,1.2),i=qm.fog;i.near=fd(220,30,r),i.far=fd(1500,105,r),i.color.copy(Qm).lerp($m,r),Km.clear(),Km.render(qm,Xm),Km.clearDepth(),Km.render(Jm,Xm),Zg(i_?-10:n_),R_&&V_&&(V_.drawImage(Hm,0,0,1920,1080),V_.drawImage(Um,0,0,1920,1080),x_(`recTime`).textContent=`${E_(u_(n_))} / ${E_(u_(Bm))}`),C_.textContent=`${E_(u_(n_))} / ${E_(u_(Bm))}`;let a=Vm(n_);D_.forEach((e,t)=>{e.fill.style.width=`${dd((n_-e.a)/(e.b-e.a))*100}%`,e.el.classList.toggle(`active`,t===a)});let o=a_&&r_&&!i_&&e-N_>2600;if(P_.forEach(e=>e.classList.toggle(`idle`,o||R_)),i_){let e=Hm.getBoundingClientRect();I_.forEach((t,n)=>{let r=t.pos().project(Xm),i=r.z<1&&Math.abs(r.x)<1.05&&Math.abs(r.y)<1.05;L_[n].style.display=i?`flex`:`none`,i&&(L_[n].style.left=`${e.left+(r.x*.5+.5)*e.width}px`,L_[n].style.top=`${e.top+(-r.y*.5+.5)*e.height}px`)})}requestAnimationFrame(K_)}requestAnimationFrame(K_),window.saathi={seek:e=>{n_=e},get t(){return n_},play:()=>k_(!0),pause:()=>k_(!1),SCREENS:Nf,easeOut:md,phoneCanvas:uh.canvas,phoneRect:()=>{let e=new P;return mh.getWorldPosition(e),e.project(Xm),{x:e.x*.5+.5,y:-e.y*.5+.5,z:e.z,vis:ph.visible}}};