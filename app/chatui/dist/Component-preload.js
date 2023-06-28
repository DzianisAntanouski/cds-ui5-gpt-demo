//@ui5-bundle chatui/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"chatui/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","chatui/model/models"],function(e,t,i){"use strict";return e.extend("chatui.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"chatui/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("chatui.controller.App",{onInit(){}})});
},
	"chatui/controller/Chat.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("chatui.controller.Chat",{onInit:function(){this.showFeedInput(false)},showFeedInput:function(e){const t=this.byId("feedInput");t.setVisible(e)},onPressGoToMaster:function(e){const t=e.getSource().getBindingContext();const s=this.byId("chats");s.setBindingContext(t);this.showFeedInput(true)},onPost:function(e){this.byId("chats").setBusy(true);const t=e.getSource().getBindingContext().getObject().ID;const s=this.getView().getModel();s.callFunction("/sendMessage",{method:"GET",urlParameters:{sMessage:e.getParameters().value,nSessionId:t},success:function(e,t){if(e.sendMessage==="OK"){this.getView().getModel().refresh();this.byId("chats").setBusy(false)}else{this.getView().getModel().refresh();this.byId("chats").setBusy(false);alert("GhatGPT API error")}}.bind(this),error:e=>{console.error(e)}})},onPressClear:function(e){const t=e.getSource().getBindingContext().getObject().ID;const s=this.getView().getModel();s.callFunction("/clearSession",{method:"GET",urlParameters:{nSessionId:t},success:function(e,t){this.getView().getModel().refresh();alert(e.clearSession)}.bind(this),error:e=>{console.error(e);alert("Error")}})}})});
},
	"chatui/i18n/i18n.properties":'# This is the resource bundle for chatui\r\n\r\n#Texts for manifest.json\r\n\r\n#XTIT: Application name\r\nappTitle=Chat GPT\r\n\r\n#YDES: Application description\r\nappDescription=A Fiori Chat GPT application.\r\n#XTIT: Main view title\r\ntitle=Chat GPT\r\n\r\nflpTitle=chatui\r\n\r\nflpSubtitle=\r\n',
	"chatui/manifest.json":'{"_version":"1.49.0","sap.app":{"id":"chatui","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.8.6","toolsId":"38aff9df-69a8-420a-a022-7c6464e16863"},"dataSources":{"mainService":{"uri":"v2/gpt/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"2.0"}}},"crossNavigation":{"inbounds":{"chatui-inbound":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"chatui","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","icon":""}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.115.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"chatui.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"chatui.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"Routechat","pattern":":?query:","target":["Targetchat"]}],"targets":{"Targetchat":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"Chat","viewName":"Chat"}}},"rootView":{"viewName":"chatui.view.App","type":"XML","async":true,"id":"App"}}}',
	"chatui/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"chatui/utils/locate-reuse-libs.js":'(function(e){var t=function(e,t){var n=["sap.apf","sap.base","sap.chart","sap.collaboration","sap.f","sap.fe","sap.fileviewer","sap.gantt","sap.landvisz","sap.m","sap.ndc","sap.ovp","sap.rules","sap.suite","sap.tnt","sap.ui","sap.uiext","sap.ushell","sap.uxap","sap.viz","sap.webanalytics","sap.zen"];Object.keys(e).forEach(function(e){if(!n.some(function(t){return e===t||e.startsWith(t+".")})){if(t.length>0){t=t+","+e}else{t=e}}});return t};var n=function(e){var n="";if(e){if(e["sap.ui5"]&&e["sap.ui5"].dependencies){if(e["sap.ui5"].dependencies.libs){n=t(e["sap.ui5"].dependencies.libs,n)}if(e["sap.ui5"].dependencies.components){n=t(e["sap.ui5"].dependencies.components,n)}}if(e["sap.ui5"]&&e["sap.ui5"].componentUsages){n=t(e["sap.ui5"].componentUsages,n)}}return n};var r=function(e){var t=e;return new Promise(function(r,a){$.ajax(t).done(function(e){r(n(e))}).fail(function(){a(new Error("Could not fetch manifest at \'"+e))})})};var a=function(e){if(e){Object.keys(e).forEach(function(t){var n=e[t];if(n&&n.dependencies){n.dependencies.forEach(function(e){if(e.url&&e.url.length>0&&e.type==="UI5LIB"){jQuery.sap.log.info("Registering Library "+e.componentId+" from server "+e.url);jQuery.sap.registerModulePath(e.componentId,e.url)}})}})}};e.registerComponentDependencyPaths=function(e){return r(e).then(function(e){if(e&&e.length>0){var t="/sap/bc/ui2/app_index/ui5_app_info?id="+e;var n=jQuery.sap.getUriParameters().get("sap-client");if(n&&n.length===3){t=t+"&sap-client="+n}return $.ajax(t).done(a)}})}})(sap);var scripts=document.getElementsByTagName("script");var currentScript=document.getElementById("locate-reuse-libs");if(!currentScript){currentScript=document.currentScript}var manifestUri=currentScript.getAttribute("data-sap-ui-manifest-uri");var componentName=currentScript.getAttribute("data-sap-ui-componentName");var useMockserver=currentScript.getAttribute("data-sap-ui-use-mockserver");var bundleResources=function(){jQuery.sap.require("jquery.sap.resources");var e=sap.ui.getCore().getConfiguration().getLanguage();var t=jQuery.sap.resources({url:"i18n/i18n.properties",locale:e});document.title=t.getText("appTitle")};sap.registerComponentDependencyPaths(manifestUri).catch(function(e){jQuery.sap.log.error(e)}).finally(function(){sap.ui.getCore().attachInit(bundleResources);if(componentName&&componentName.length>0){if(useMockserver&&useMockserver==="true"){sap.ui.getCore().attachInit(function(){sap.ui.require([componentName.replace(/\\./g,"/")+"/localService/mockserver"],function(e){e.init();sap.ushell.Container.createRenderer().placeAt("content")})})}else{sap.ui.require(["sap/ui/core/ComponentSupport"]);sap.ui.getCore().attachInit(bundleResources)}}else{sap.ui.getCore().attachInit(function(){sap.ushell.Container.createRenderer().placeAt("content")})}});sap.registerComponentDependencyPaths(manifestUri);',
	"chatui/view/App.view.xml":'<mvc:View controllerName="chatui.controller.App"\r\n    xmlns:html="http://www.w3.org/1999/xhtml"\r\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\r\n    xmlns="sap.m"><App id="app"></App></mvc:View>\r\n',
	"chatui/view/Chat.view.xml":'<mvc:View controllerName="chatui.controller.Chat"\r\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\r\n    xmlns="sap.m"><SplitApp id="SplitAppDemo" initialDetail="detail" initialMaster="master"><masterPages><Page id="context" title="Sessions" backgroundDesign= "List" class="test"><List items="{/Session}"><StandardListItem title="{Name}" type="Navigation" press=".onPressGoToMaster" /></List></Page></masterPages><detailPages><Page id="chats" title="Chat" backgroundDesign= "Solid" busyIndicatorDelay="0" class="test"><List headerText="{Name}" id="messageList" items="{Messages}"><FeedListItem \r\n                        id="chatList" \r\n                        sender="{= ${role} === \'user\' ? \'You\' : \'GPT bot\'}" \r\n                        senderActive="{= ${role} === \'user\'}" \r\n                        icon="{= ${role} === \'user\' ? \'sap-icon://person-placeholder\' : \'sap-icon://key-user-settings\'}" \r\n                        iconDensityAware="false"\r\n                        timestamp="{Date}" \r\n                        text="{content}" \r\n                        convertLinksToAnchorTags="All"/></List><FeedInput id="feedInput" post="onPost" icon="sap-icon://person-placeholder" class="sapUiSmallMarginTopBottom" /><footer><OverflowToolbar><ToolbarSpacer/><Button text="Clear" press="onPressClear" /></OverflowToolbar></footer></Page></detailPages></SplitApp></mvc:View>'
}});