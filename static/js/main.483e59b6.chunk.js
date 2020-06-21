(this.webpackJsonpvisualizer=this.webpackJsonpvisualizer||[]).push([[0],{38:function(e,t,a){e.exports=a(73)},43:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var n=a(15),r=a(16),i=a(19),o=a(18),s=a(0),c=a.n(s),l=a(6),u=a.n(l),d=(a(43),a(44),a(8)),h=a.n(d),b=a(13),f=a(4),m=a(11),p=a(7),g=a(34),v=a.n(g),k=function(e){for(var t,a=[],n=0;n<e.messages.length;n++)a.push(c.a.createElement(m.a.Title,{key:"Title"+n},e.header[n])),a.push(c.a.createElement(m.a.Text,{key:"Message"+n},e.messages[n]));return e.loading&&(t=c.a.createElement("div",{className:"sweet-loading"},c.a.createElement(v.a,null))),c.a.createElement(m.a,{className:"text-center"},c.a.createElement(m.a.Header,null,c.a.createElement(p.a,{id:"headerButton",onClick:e.clearMessages.bind(void 0)},"Clear Messages"),"Messages Sent and Received"),c.a.createElement(m.a.Body,null,t,a))},E=a(17),w=a(10),y=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={hover:!1,id:"",weight:0},r.onMouseEnterSquare=r.onMouseEnterSquare.bind(Object(w.a)(r)),r.onMouseLeaveSquare=r.onMouseLeaveSquare.bind(Object(w.a)(r)),r.onClick=r.onClick.bind(Object(w.a)(r)),r}return Object(r.a)(a,[{key:"onMouseEnterSquare",value:function(){this.setState({id:"redBackground",hover:!0})}},{key:"onMouseLeaveSquare",value:function(){this.setState({id:"blueBackground",hover:!1})}},{key:"onClick",value:function(){this.props.onClick()}},{key:"shouldComponentUpdate",value:function(e,t,a){return t.id!==this.state.id||this.props.weight!==e.weight||this.props.id!==e.id}},{key:"render",value:function(){var e;return e=this.state.hover?this.state.id:this.props.id,c.a.createElement(p.a,{variant:"secondary",className:"square",id:e,onMouseEnter:this.onMouseEnterSquare.bind(),onMouseLeave:this.onMouseLeaveSquare.bind(),onClick:this.onClick.bind()},this.props.weight)}}]),a}(c.a.Component),S=a(14),j=a.n(S),O=function(e){for(var t="http://localhost:9000/",a=Object(s.useState)(["Note: If the server has been idle, the initial query may take up to 10 seconds to complete.","Backend is hosted at: https://visualizerbackend.herokuapp.com/","To use:  Click a square to set a start location","Then click another square to select a destination","You may also set barriers to change the available paths","For Dijkstra's SPF you can set the weight of each square changing the algorithm's chosen path","As a note: The path found may not be the 'straightest' path as diagonal moves are valid,but if you count the squares it will be equal to a more intuitive path"]),n=Object(f.a)(a,2),r=n[0],i=n[1],o=Object(s.useState)(!1),l=Object(f.a)(o,2),u=l[0],d=l[1],m=Object(s.useState)([]),g=Object(f.a)(m,2),v=g[0],w=g[1],S=Object(s.useState)(Array(e.height*e.width).fill(!1)),O=Object(f.a)(S,2),x=O[0],D=O[1],B=Object(s.useState)(Array(e.height*e.width).fill(!1)),M=Object(f.a)(B,2),I=M[0],N=M[1],C=Object(s.useState)(Array(e.height*e.width).fill(1)),T=Object(f.a)(C,2),q=T[0],F=T[1],A=Object(s.useState)(-1),L=Object(f.a)(A,2),H=L[0],P=L[1],W=Object(s.useState)(!1),z=Object(f.a)(W,2),G=z[0],Z=z[1],J=Object(s.useState)(-1),Q=Object(f.a)(J,2),R=Q[0],U=Q[1],Y=Object(s.useState)(!1),K=Object(f.a)(Y,2),V=K[0],X=K[1],$=Object(E.useToasts)().addToast,_=Object(s.useState)(!1),ee=Object(f.a)(_,2),te=ee[0],ae=ee[1],ne=function(e,t){r.unshift(e),v.unshift(t),i(r.slice()),w(v.slice())},re=function(e,t){d(!1);var a=new Date,n=Math.abs(a-e);ne(t,"Backend"),ne("Query round trip time: "+n+" milliseconds","Frontend")},ie=function(){var e=Object(b.a)(h.a.mark((function e(){var a,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=new Date,null===(n=de())){e.next=4;break}return e.abrupt("return",n);case 4:return d(!0),se(),ne("Sending data for Dijkstra","Frontend"),e.next=9,j.a.post(t+"dijkstra",{startMarkerIndex:H,endMarkerIndex:R,SIZE:je,WIDTH:Se,blockedNodes:x,weights:q}).then((function(e){if(re(a,e.data[0]),!1!==!e.data[1])return $("Path does not exist",{appearance:"warning",autoDismiss:!0});ue(e.data[1])})).catch((function(e){console.error(e)}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),oe=function(){var e=Object(b.a)(h.a.mark((function e(){var a,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=new Date,null===(n=de())){e.next=4;break}return e.abrupt("return",n);case 4:return d(!0),se(),ne("Sending data for DFS","Frontend"),e.next=9,j.a.post(t+"depthFirstSearch",{startMarkerIndex:H,endMarkerIndex:R,SIZE:je,WIDTH:Se,blockedNodes:x}).then((function(e){re(a,e.data[0]),le(e.data[1])})).catch((function(e){console.error(e)}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),se=function(){ne(" "," *************************  ")},ce=function(){var e=Object(b.a)(h.a.mark((function e(){var a,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=new Date,null===(n=de())){e.next=4;break}return e.abrupt("return",n);case 4:return d(!0),se(),ne("Sending data for BFS","Frontend"),e.next=9,j.a.post(t+"breathFirstSearch",{startMarkerIndex:H,endMarkerIndex:R,SIZE:je,WIDTH:Se,HEIGHT:ye,squares:I,blockedNodes:x,weights:q}).then((function(e){if(re(a,e.data[0]),!1!==!e.data[1])return $("Path does not exist",{appearance:"warning",autoDismiss:!0});ue(e.data[1])})).catch((function(e){console.error(e)}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),le=function(e){var t,a=1;me(),pe();var n=function(e){if(!(a<e.length-1))return clearInterval(t),!1===e[e.length-1]?(N(I.slice()),$("Path does not exist",{appearance:"warning",autoDismiss:!0})):(I[e[e.length-1]]="gold",N(I.slice()),$("Path does exist",{appearance:"success",autoDismiss:!0}));I[e[a]]="green",a++,N(I.slice())};t=setInterval((function(){return n(e)}),10)},ue=function(e){var t,a=e[0],n=e[1],r=0;me(),pe();var i=!1,o=function(e,a){if(i)r<a.length-1?(I[a[r]]="gold",N(I.slice()),r++):(I[a[a.length-1]]="gold",N(I.slice()),clearInterval(t));else for(var n=0;n<2;n++)r<e.length?(e[r]!==R&&e[r]!==H&&(I[e[r]]="green"),r++,N(I.slice())):(i=!0,I[R]="gold",N(I.slice()),r=0)};t=setInterval((function(){return o(a,n)}),0)},de=function(){return H<0||R<0?$("Please select a starting and ending location first",{appearance:"warning",autoDismiss:!0}):null},he=function(e){var t="slateGrey";return"gold"===I[e]||"green"===I[e]||"black"===I[e]?t=I[e]:e===H?t="startMarker":e===R&&(t="endMarker"),c.a.createElement(y,{id:t,index:e,weight:q[e],onClick:be.bind(void 0,e),key:e})},be=function(e){te?function(e){q[e]=q[e]+1,F(q.slice())}(e):fe(e)},fe=function(e){var t="",a=I.slice(),n=H,r=R;if(V)return x[e]=!0,D(x.slice()),I[e]="black",void N(I.slice());if(n===e)n=-1,a[e]=void 0,t="Deselected Start Location";else if(n<0&&r===e)r=-1,t="Deselected End Location";else if(n<0)n=e,t="Start Location Selected";else if(r===e)r=-1,t="Deselected End Location";else{if(!(r<0))return;r=e,t="Selected End Location"}return P(n),U(r),N(I),$(t,{appearance:"info",autoDismiss:!0})},me=function(){I=Array(e.height*e.width).fill(null),N(Array(e.height*e.width).fill(null))},pe=function(){for(var e=0;e<I.length;e++)!0===x[e]&&(I[e]="black");N(Array(I.slice()))},ge=function(){X(!V),te&&ve(),document.getElementById("barrier").innerText=V?"Draw Barrier":"Disable Barrier"},ve=function(){ae(!te),V&&ge(),document.getElementById("addWeights").innerText=te?"Set Weights":"Toggle Weights Off"},ke=function(){var a=Object(b.a)(h.a.mark((function a(){var n;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n=new Date,d(!0),se(),ne("Sending data for maze generation","Frontend"),a.next=6,j.a.post(t+"generateMaze",{startMarkerIndex:H,endMarkerIndex:R,SIZE:je,WIDTH:Se,HEIGHT:ye,squares:I,blockedNodes:x,weights:q}).then((function(t){d(!1),re(n,t.data[0]);for(var a=t.data[1],r=Array(e.height*e.width).fill(!1),i=0;i<a.length;i++)"black"===a[i]&&(r[i]=!0);D(r),N(t.data[1])})).catch((function(e){console.error(e)}));case 6:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}(),Ee=[],we=0,ye=e.height,Se=e.width,je=ye*Se,Oe=0;Oe<ye;Oe++){for(var xe=[],De=0;De<Se;De++)xe.push(he(we)),we++;Ee.push(c.a.createElement("div",{key:Oe,className:"board-row"},xe))}var Be="dropdown-menu ".concat(G?" show":"");return c.a.createElement("div",{id:"box"},c.a.createElement("div",{id:"leftBox"},c.a.createElement("div",{id:"buttons1",className:"btn-group-vertical",role:"group"},c.a.createElement("div",{className:"btn-group",role:"group"},c.a.createElement("button",{id:"btnGroupDrop1",type:"button",onClick:function(){return Z(!G)}.bind(void 0),className:"btn btn-primary dropdown-toggle","data-toggle":"dropdown-menu","aria-haspopup":"true","aria-expanded":"false"},"Algorithms"),c.a.createElement("div",{className:Be,"aria-labelledby":"btnGroupDrop1"},c.a.createElement("a",{id:"menuButton",className:"btn btn-primary-controlButton",onClick:oe.bind(void 0)},"Backend DFS> Depth First Search",c.a.createElement("p",null," (Does path Exist)")),c.a.createElement("a",{id:"menuButton",className:"btn btn-primary-controlButton",onClick:ce.bind(void 0)},"Breath-First Search",c.a.createElement("p",null,"(Shortest Path)")),c.a.createElement("a",{id:"menuButton",className:"btn btn-primary-controlButton",onClick:ie.bind(void 0)},"Dijkstra's SPF"))),c.a.createElement(p.a,{className:"btn btn-lg btn-primary-controlButton",onClick:function(){me(),D(Array(e.height*e.width).fill(!1)),P(-1),U(-1),F(Array(e.height*e.width).fill(1))}.bind(void 0)},"Clear Graph"),c.a.createElement(p.a,{className:"btn btn-lg btn-primary-controlButton",id:"barrier",onClick:ge.bind(void 0)},"Draw Barrier"),c.a.createElement(p.a,{className:"btn btn-lg btn-primary-controlButton",id:"addWeights",onClick:ve.bind(void 0)},"Set Weights"),c.a.createElement(p.a,{className:"btn btn-lg btn-primary-controlButton",id:"maze",onClick:ke.bind(void 0)},"Generate Maze"))),c.a.createElement("div",{id:"centerBox"},Ee,c.a.createElement("div",{id:"rightBox"},c.a.createElement(k,{loading:u,clearMessages:function(){i([]),w([])}.bind(void 0),messages:r,header:v}))))},x=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={height:40,width:40},r}return Object(r.a)(a,[{key:"render",value:function(){return c.a.createElement("div",{id:"body",className:"game"},c.a.createElement("div",{className:"game-board"},c.a.createElement(E.ToastProvider,{autoDismissTimeout:2e3,placement:"bottom-center"},c.a.createElement(O,{height:this.state.height,width:this.state.width}))),c.a.createElement("div",{className:"game-info"}))}}]),a}(c.a.Component);u.a.render(c.a.createElement(x,null),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.483e59b6.chunk.js.map