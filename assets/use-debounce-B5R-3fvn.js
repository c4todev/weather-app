import{r as u}from"./react-Bt5O0tCt.js";function S(c,r,i){var g=this,a=u.useRef(null),l=u.useRef(0),n=u.useRef(null),f=u.useRef([]),o=u.useRef(),s=u.useRef(),F=u.useRef(c),m=u.useRef(!0);F.current=c;var x=typeof window<"u",d=!r&&r!==0&&x;if(typeof c!="function")throw new TypeError("Expected a function");r=+r||0;var E=!!(i=i||{}).leading,b=!("trailing"in i)||!!i.trailing,v="maxWait"in i,D="debounceOnServer"in i&&!!i.debounceOnServer,h=v?Math.max(+i.maxWait||0,r):null;u.useEffect(function(){return m.current=!0,function(){m.current=!1}},[]);var q=u.useMemo(function(){var y=function(e){var t=f.current,w=o.current;return f.current=o.current=null,l.current=e,s.current=F.current.apply(w,t)},p=function(e,t){d&&cancelAnimationFrame(n.current),n.current=d?requestAnimationFrame(e):setTimeout(e,t)},M=function(e){if(!m.current)return!1;var t=e-a.current;return!a.current||t>=r||t<0||v&&e-l.current>=h},T=function(e){return n.current=null,b&&f.current?y(e):(f.current=o.current=null,s.current)},A=function e(){var t=Date.now();if(M(t))return T(t);if(m.current){var w=r-(t-a.current),O=v?Math.min(w,h-(t-l.current)):w;p(e,O)}},R=function(){if(x||D){var e=Date.now(),t=M(e);if(f.current=[].slice.call(arguments),o.current=g,a.current=e,t){if(!n.current&&m.current)return l.current=a.current,p(A,r),E?y(a.current):s.current;if(v)return p(A,r),y(a.current)}return n.current||p(A,r),s.current}};return R.cancel=function(){n.current&&(d?cancelAnimationFrame(n.current):clearTimeout(n.current)),l.current=0,f.current=a.current=o.current=n.current=null},R.isPending=function(){return!!n.current},R.flush=function(){return n.current?T(Date.now()):s.current},R},[E,v,r,h,b,d,x,D]);return q}function W(c,r){return c===r}function k(c,r){return r}function P(c,r,i){var g=i&&i.equalityFn||W,a=u.useReducer(k,c),l=a[0],n=a[1],f=S(u.useCallback(function(s){return n(s)},[n]),r,i),o=u.useRef(c);return g(o.current,c)||(f(c),o.current=c),[l,f]}export{P as o};
