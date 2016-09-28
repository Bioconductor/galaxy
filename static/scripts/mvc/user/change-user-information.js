define(["mvc/form/form-view","mvc/ui/ui-misc","mvc/user/add-edit-address"],function(a,b,c){var d=Backbone.View.extend({initialize:function(c,d,e){var f=this;this.app=c,this.model=d&&d.model||new Backbone.Model(d),this.original_email=d.email,this.original_username=d.username,this.loginform=new a({title:"Login Information",inputs:d.user_login_form,operations:{back:new b.ButtonIcon({icon:"fa-caret-left",tooltip:"Return to user preferences",title:"Preferences",onclick:function(){f.loginform.$el.remove(),f.addressform.$el.remove(),c.showPreferences()}})},buttons:{save:new b.Button({tooltip:"Save",title:"Save",cls:"ui-button btn btn-primary",floating:"clear",onclick:function(){f._saveEmailName(d,f,"login_info")}})}}),this.setElement("<div/>"),this.$el.append(this.loginform.$el),(d.values||d.user_info_forms.length>0)&&(this.userinfoform=this._buildUserInfoForm(f,d,c,$el),this.$el.append(f.userinfoform.$el)),this.addressform=f._buildAddressForm(f,d,c),this.$el.append(f.addressform.$el),f._applyFilter(d.active_filter,f),e&&f.addressform.message.update({message:e.message,status:"error"===e.status?"danger":"success"})},_buildUserInfoForm:function(c,d){return new a({title:"User Information",inputs:d.user_info_form,buttons:{save:new b.Button({tooltip:"Save",title:"Save",cls:"ui-button btn btn-primary",floating:"clear",onclick:function(){c._saveEmailName(d,c,"edit_user_info")}})}})},_buildAddressForm:function(c,d,e){var f=this.$el;return new a({title:"User Addresses",inputs:d.user_address_list,buttons:{addaddress:new b.ButtonIcon({id:"add-address",type:"submit",cls:"ui-button-icon",tooltip:"Add new address",title:"Add new address",icon:"fa-plus",floating:"clear",onclick:function(){c._addAddress(c,f,e)}})},onchange:function(){var a=c.addressform.data.create().active_filter;d.active_filter!==a&&c._applyAddressFilter(e,f,c),c._addressOperations(e,f,c)}})},_addressOperations:function(a,b,c){var d=c.addressform.data.create(),e="",f=null;for(var g in d)if(f=d[g],null!==f&&f.indexOf("_")>0){var h=f.split("_");e=h[0],address_id=h[1];break}switch(e){case"edit":c._editAddress(c,b,a,address_id);break;case"delete":c._deleteAddress(c,b,a,address_id);break;case"undelete":c._undeleteAddress(c,b,a,address_id)}},_applyAddressFilter:function(a,b,c){var d="";d=c.addressform.data.create().active_filter,$.getJSON(Galaxy.root+"api/user_preferences/manage_user_info/",{show_filter:d},function(e){c._updateAddressForm(a,b,c,e),c._applyFilter(d,c)})},_applyFilter:function(a,b){var c=b.addressform.field_list[b.addressform.data.match("active_filter")];c.value(a)},_updateAddressForm:function(a,b,c,d){c.addressform.$el.remove(),c.addressform=c._buildAddressForm(c,d,a,b),b.append(c.addressform.$el)},_editAddress:function(a,b,d,e){a.loginform.$el.remove(),a.addressform.$el.remove(),$.getJSON(Galaxy.root+"api/user_preferences/manage_user_info/",{address_id:e,call:"edit_address"},function(e){address=new c.AddEditAddress(b,d,e),a._applyFilter("All",a)})},_deleteAddress:function(a,b,c,d){a.addressform.data.create().address_filters;$.getJSON(Galaxy.root+"api/user_preferences/manage_user_info/",{address_id:d,call:"delete_address"},function(d){a._updateAddressForm(c,b,a,d),a.addressform.message.update({message:d.message,status:"error"===d.status?"danger":"success"}),a._applyFilter("All",a)})},_undeleteAddress:function(a,b,c,d){$.getJSON(Galaxy.root+"api/user_preferences/manage_user_info/",{address_id:d,call:"undelete_address"},function(d){a._updateAddressForm(c,b,a,d),a.addressform.message.update({message:d.message,status:"error"===d.status?"danger":"success"}),a._applyFilter("All",a)})},_addAddress:function(a,b,d){var e;a.loginform.$el.remove(),a.addressform.$el.remove(),e=new c.AddEditAddress(b,d)},_renderMessage:function(a,b,c){a.message.update({message:b,status:c})},_validateString:function(a,b){var c=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,d=/^[a-z0-9\-]{3,255}$/;return"email"===b?c.test(a):"username"===b?d.test(a):void 0},_saveEmailName:function(a,b,c){var d=Galaxy.root+"api/user_preferences/manage_user_info",a={},e="Please enter your valid email address.",f="Email cannot be more than 255 characters in length.",g='Public name must contain only lowercase letters, numbers and "-". It also has to be shorter than 255 characters but longer than 2.',h=b.loginform.data.create(),i=h.email,j=h.username,k=!0,l=a.email===i&&a.username===j;return a.email!==i&&(i.length>255?(b._renderMessage(b.loginform,f,"danger"),k=!1):b._validateString(i,"email")||(b._renderMessage(b.loginform,e,"danger"),k=!1)),a.username!==j&&(j&&!b._validateString(j,"username")||j.length<3)&&(b._renderMessage(b.loginform,g,"danger"),k=!1),l?void b._renderMessage(b.loginform,"Nothing has changed.","success"):void(!l&&k&&(a={email:i,username:j,save_type:c,call:"edit_info"},"edit_user_info"===c&&(a.user_type_fd_id=b.userinfoform.data.create().user_type_fd_id),$.getJSON(d,a,function(a){b.original_email=i,b.original_username=j,b.loginform.message.update({message:a.message,status:"error"===a.status?"danger":"success"})},"json")))}});return{ManageUserInformation:d}});
//# sourceMappingURL=../../../maps/mvc/user/change-user-information.js.map