(this.webpackJsonpvisualizer=this.webpackJsonpvisualizer||[]).push([[0],{38:function(e,t,a){e.exports=a(73)},43:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var n=a(15),r=a(16),i=a(19),o=a(18),s=a(0),c=a.n(s),l=a(8),u=a.n(l),d=(a(43),a(44),a(7)),h=a.n(d),b=a(11),m=a(4),p=a(13),f=a(6),g=a(34),v=a.n(g),k=function(e){for(var t,a=[],n=0;n<e.messages.length;n++)a.push(c.a.createElement(p.a.Title,{key:"Title"+n},e.header[n])),a.push(c.a.createElement(p.a.Text,{key:"Message"+n},e.messages[n]));return e.loading&&(t=c.a.createElement("div",{className:"sweet-loading"},c.a.createElement(v.a,null))),c.a.createElement(p.a,{className:"text-center"},c.a.createElement(p.a.Header,null,c.a.createElement(f.a,{id:"headerButton",onClick:e.clearMessages.bind(void 0)},"Clear Messages"),"Messages Sent and Received"),c.a.createElement(p.a.Body,null,t,a))},E=a(17),w=a(10),y=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={hover:!1,id:"",weight:0},r.onMouseEnterSquare=r.onMouseEnterSquare.bind(Object(w.a)(r)),r.onMouseLeaveSquare=r.onMouseLeaveSquare.bind(Object(w.a)(r)),r.onClick=r.onClick.bind(Object(w.a)(r)),r}return Object(r.a)(a,[{key:"onMouseEnterSquare",value:function(){this.setState({id:"redBackground",hover:!0})}},{key:"onMouseLeaveSquare",value:function(){this.setState({id:"blueBackground",hover:!1})}},{key:"onClick",value:function(){this.props.onClick()}},{key:"shouldComponentUpdate",value:function(e,t,a){return t.id!==this.state.id||this.props.weight!==e.weight||this.props.id!==e.id}},{key:"render",value:function(){var e;return e=this.state.hover?this.state.id:this.props.id,c.a.createElement(f.a,{variant:"secondary",className:"square",id:e,onMouseEnter:this.onMouseEnterSquare.bind(),onMouseLeave:this.onMouseLeaveSquare.bind(),onClick:this.onClick.bind()},this.props.weight)}}]),a}(c.a.Component),S=a(12),j=a.n(S),O=function(e){for(var t="https://visualizerbackend.herokuapp.com/",a=Object(s.useState)(["Note: If the server has been idle, the initial query may take up to 10 seconds to complete.","Backend is hosted at: https://visualizerbackend.herokuapp.com/","To use:  Click a square to set a start location","Then click another square to select a destination","You may also set barriers to change the available paths","For Dijkstra's SPF you can set the weight of each square changing the algorithm's chosen path","As a note: The path found may not be the 'straightest' path as diagonal moves are valid,but if you count the squares it will be equal to a more intuitive path"]),n=Object(m.a)(a,2),r=n[0],i=n[1],o=Object(s.useState)(!1),l=Object(m.a)(o,2),u=l[0],d=l[1],p=Object(s.useState)([]),g=Object(m.a)(p,2),v=g[0],w=g[1],S=Object(s.useState)(Array(e.height*e.width).fill(!1)),O=Object(m.a)(S,2),x=O[0],D=O[1],B=Object(s.useState)(Array(e.height*e.width).fill(!1)),M=Object(m.a)(B,2),I=M[0],N=M[1],C=Object(s.useState)(Array(e.height*e.width).fill(1)),T=Object(m.a)(C,2),q=T[0],F=T[1],W=Object(s.useState)(-1),z=Object(m.a)(W,2),A=z[0],L=z[1],H=Object(s.useState)(!1),P=Object(m.a)(H,2),G=P[0],Z=P[1],R=Object(s.useState)(-1),J=Object(m.a)(R,2),Q=J[0],U=J[1],Y=Object(s.useState)(!1),K=Object(m.a)(Y,2),V=K[0],X=K[1],$=Object(E.useToasts)().addToast,_=Object(s.useState)(!1),ee=Object(m.a)(_,2),te=ee[0],ae=ee[1],ne=function(e,t){r.unshift(e),v.unshift(t),i(r.slice()),w(v.slice())},re=function(e,t){d(!1);var a=new Date,n=Math.abs(a-e);ne(t,"Backend"),ne("Query round trip time: "+n+" milliseconds","Frontend")},ie=function(){var e=Object(b.a)(h.a.mark((function e(){var a,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=new Date,null===(n=de())){e.next=4;break}return e.abrupt("return",n);case 4:return d(!0),se(),ne("Sending data for Dijkstra","Frontend"),e.next=9,j.a.post(t+"dijkstra",{startMarkerIndex:A,endMarkerIndex:Q,SIZE:Oe,WIDTH:je,blockedNodes:x,weights:q}).then((function(e){if(re(a,e.data[0]),!1!==!e.data[1])return $("Path does not exist",{appearance:"warning",autoDismiss:!0});ue(e.data[1])})).catch((function(e){console.error(e)}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),oe=function(){var e=Object(b.a)(h.a.mark((function e(){var a,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=new Date,null===(n=de())){e.next=4;break}return e.abrupt("return",n);case 4:return d(!0),se(),ne("Sending data for DFS","Frontend"),e.next=9,j.a.post(t+"depthFirstSearch",{startMarkerIndex:A,endMarkerIndex:Q,SIZE:Oe,WIDTH:je,blockedNodes:x}).then((function(e){re(a,e.data[0]),le(e.data[1])})).catch((function(e){console.error(e)}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),se=function(){ne(" "," *************************  ")},ce=function(){var e=Object(b.a)(h.a.mark((function e(){var a,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=new Date,null===(n=de())){e.next=4;break}return e.abrupt("return",n);case 4:return d(!0),se(),ne("Sending data for BFS","Frontend"),e.next=9,j.a.post(t+"breathFirstSearch",{startMarkerIndex:A,endMarkerIndex:Q,SIZE:Oe,WIDTH:je,HEIGHT:Se,squares:I,blockedNodes:x,weights:q}).then((function(e){if(re(a,e.data[0]),!1!==!e.data[1])return $("Path does not exist",{appearance:"warning",autoDismiss:!0});ue(e.data[1])})).catch((function(e){console.error(e)}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),le=function(e){var t,a=1;pe();var n=function(e){if(!(a<e.length-1))return clearInterval(t),!1===e[e.length-1]?(N(I.slice()),$("Path does not exist",{appearance:"warning",autoDismiss:!0})):(I[e[e.length-1]]="gold",N(I.slice()),$("Path does exist",{appearance:"success",autoDismiss:!0}));I[e[a]]="green",a++,N(I.slice())};t=setInterval((function(){return n(e)}),10)},ue=function(e){var t,a=e[0],n=e[1],r=0;pe();var i=!1,o=function(e,a){i?r<a.length-1?(I[a[r]]="gold",N(I.slice()),r++):(I[a[a.length-1]]="gold",N(I.slice()),clearInterval(t)):(r<=e.length?(e[r]!==Q&&e[r]!==A&&(I[e[r]]="green"),r++):(i=!0,I[Q]="gold",r=0),N(I.slice()))};t=setInterval((function(){return o(a,n)}),0)},de=function(){return A<0||Q<0?$("Please select a starting and ending location first",{appearance:"warning",autoDismiss:!0}):null},he=function(e){var t;return t=I[e],c.a.createElement(y,{id:t,index:e,weight:q[e],onClick:be.bind(void 0,e),key:e})},be=function(e){te?function(e){q[e]=q[e]+1,F(q.slice())}(e):me(e)},me=function(e){var t="",a=A,n=Q;if(V)return x[e]=!0,D(x.slice()),I[e]="black",void N(I.slice());if(a===e)I[e]="grey",a=-1,t="Deselected Start Location";else if(a<0&&n===e)n=-1,t="Deselected End Location";else if(a<0)a=e,I[e]="startMarker",t="Start Location Selected";else if(n===e)n=-1,t="Deselected End Location";else{if(!(n<0))return;n=e,I[e]="endMarker",t="Selected End Location"}return L(a),U(n),N(I),$(t,{appearance:"info",autoDismiss:!0})},pe=function(){for(var e=0;e<I.length;e++)"green"!==I[e]&&"gold"!==I[e]||(I[e]="grey");N(I.slice())},fe=function(){F(Array(e.height*e.width).fill(1))},ge=function(){X(!V),te&&ve(),document.getElementById("barrier").innerText=V?"Draw Barrier":"Disable Barrier"},ve=function(){ae(!te),V&&ge(),document.getElementById("addWeights").innerText=te?"Set Weights":"Toggle Weights Off"},ke=function(){var e=Object(b.a)(h.a.mark((function e(){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new Date,d(!0),se(),ne("Sending data for random weight generation","Frontend"),e.next=6,j.a.post(t+"weightGeneration",{SIZE:Oe}).then((function(e){d(!1),re(a,e.data[0]),F(e.data[1])}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ee=function(){var a=Object(b.a)(h.a.mark((function a(){var n;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n=new Date,d(!0),se(),ne("Sending data for maze generation","Frontend"),a.next=6,j.a.post(t+"generateMaze",{startMarkerIndex:A,endMarkerIndex:Q,SIZE:Oe,WIDTH:je,HEIGHT:Se,squares:I,blockedNodes:x,weights:q}).then((function(t){d(!1),re(n,t.data[0]);for(var a=t.data[1],r=Array(e.height*e.width).fill(!1),i=0;i<a.length;i++)"black"===a[i]&&(r[i]=!0);D(r),N(t.data[1])})).catch((function(e){console.error(e)}));case 6:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}(),we=[],ye=0,Se=e.height,je=e.width,Oe=Se*je,xe=0;xe<Se;xe++){for(var De=[],Be=0;Be<je;Be++)De.push(he(ye)),ye++;we.push(c.a.createElement("div",{key:xe,className:"board-row"},De))}var Me="dropdown-menu ".concat(G?" show":"");return c.a.createElement("div",{id:"box"},c.a.createElement("div",{id:"leftBox"},c.a.createElement("div",{id:"buttons1",className:"btn-group-vertical",role:"group"},c.a.createElement("div",{className:"btn-group",role:"group"},c.a.createElement("button",{id:"btnGroupDrop1",type:"button",onClick:function(){return Z(!G)}.bind(void 0),className:"btn btn-primary dropdown-toggle","data-toggle":"dropdown-menu","aria-haspopup":"true","aria-expanded":"false"},"Algorithms"),c.a.createElement("div",{className:Me,"aria-labelledby":"btnGroupDrop1"},c.a.createElement("a",{id:"menuButton",className:"btn btn-primary-controlButton",onClick:oe.bind(void 0)},"Backend DFS> Depth First Search",c.a.createElement("p",null," (Does path Exist)")),c.a.createElement("a",{id:"menuButton",className:"btn btn-primary-controlButton",onClick:ce.bind(void 0)},"Breath-First Search",c.a.createElement("p",null,"(Shortest Path)")),c.a.createElement("a",{id:"menuButton",className:"btn btn-primary-controlButton",onClick:ie.bind(void 0)},"Dijkstra's SPF"))),c.a.createElement(f.a,{className:"btn btn-lg btn-primary-controlButton",onClick:function(){!function(){for(var t=0;t<I.length;t++)I=Array(e.height*e.width).fill(null),N(Array(e.height*e.width).fill(null))}(),D(Array(e.height*e.width).fill(!1)),L(-1),U(-1),fe()}.bind(void 0)},"Clear Graph"),c.a.createElement(f.a,{className:"btn btn-lg btn-primary-controlButton",id:"barrier",onClick:ge.bind(void 0)},"Draw Barrier"),c.a.createElement(f.a,{className:"btn btn-lg btn-primary-controlButton",id:"addWeights",onClick:ve.bind(void 0)},"Set Weights"),c.a.createElement(f.a,{className:"btn btn-lg btn-primary-controlButton",id:"maze",onClick:Ee.bind(void 0)},"Generate Maze"),c.a.createElement(f.a,{className:"btn btn-lg btn-primary-controlButton",id:"randomizeWeights",onClick:ke.bind(void 0)},"Randomize Weights"),c.a.createElement(f.a,{className:"btn btn-lg btn-primary-controlButton",id:"randomizeWeights",onClick:fe.bind(void 0)},"Remove Weights"))),c.a.createElement("div",{id:"centerBox"},we,c.a.createElement("div",{id:"rightBox"},c.a.createElement(k,{loading:u,clearMessages:function(){i([]),w([])}.bind(void 0),messages:r,header:v}))))},x=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={height:40,width:40},r}return Object(r.a)(a,[{key:"render",value:function(){return c.a.createElement("div",{id:"body",className:"game"},c.a.createElement("div",{className:"game-board"},c.a.createElement(E.ToastProvider,{autoDismissTimeout:2e3,placement:"bottom-center"},c.a.createElement(O,{height:this.state.height,width:this.state.width}))),c.a.createElement("div",{className:"game-info"}))}}]),a}(c.a.Component);u.a.render(c.a.createElement(x,null),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.e00db152.chunk.js.map