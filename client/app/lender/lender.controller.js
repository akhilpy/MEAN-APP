
'use strict';

(function() {

  class LenderController{
    constructor($scope, $rootScope, Lender, $state) {
      var vm = this;
      vm.$scope = $scope;
      vm.Lender = Lender;
      vm.$state = $state;
      vm.$rootScope=$rootScope;
      //vm.$rootscope=$rootscope;

      vm.lender ={
        Country:'', 
       
      };
      vm.lenderHO ={
        country:'', 
       
      };

      /*****
      oa= Office Address
      hoa = Head Office Address
      *****/
      //vm.$rootscope.waiting;
      //vm.$rootscope.progress;
     // vm.$rootscope.complete;
      vm.oa={}; 
      vm.hoa={}; 
      vm.lenderinfo={};
      vm.customizations=false;
      vm.integration=false;
      vm.directory=false;
      vm.govtprogram=false;
      vm.zip = /^\d+$/;
      vm.waitingIsOn = true;
      vm.progressIsOn = false;
      vm.completeIsOn = false;

      /* line 30-33  To hide/show part of pages on NEXT/BACK button.*/
      vm.first=  false;
      vm.second= true;
      vm.third=  true;  
      vm.fourth= true;

      vm.countries = Lender.getCountry();
      vm.customertypes = Lender.getCustomerType();
      vm.customersubtypes = Lender.getCustomerSubType();
      vm.conCustomersubtypes = angular.copy(vm.customersubtypes);
      vm.businessCustomersubtypes = angular.copy(vm.customersubtypes);
      vm.producttypes = Lender.getProductType();
      vm.consumerProducttypes =angular.copy(vm.producttypes);
      vm.businessProducttypes =angular.copy(vm.producttypes);
      vm.commercialProducttypes =angular.copy(vm.producttypes);
      vm.INDproducttypes = Lender.getProductTypeWithIND();
      vm.INDconsumersProductTypes = angular.copy(vm.INDproducttypes);
      vm.INDbusinessProductTypes = angular.copy(vm.INDproducttypes);
      vm.INDcommercialProductTypes = angular.copy(vm.INDproducttypes);
      vm.techadmins ={fname:[''],
                      lname:[],
                      email:[]
                     };
      vm.bizOwners = {fname:[''],
                      lname:[],
                      email:[]
                     };
      vm.managers = {fname:[''],
                      lname:[],
                      email:[]
                     };
      
    }
    /* update address to head office address on checked */
    update(){
      this.hoa = angular.copy(this.oa);
      this.lenderHO.country = angular.copy(this.lender.Country);
    }


      /****** Get Financial Institution  list on basis of selected country *****/
    getFinancerList(){
      this.list = this.Lender.getFinancerList(this.lender.Country);
      console.log(this.list);
    }

     /***** Get  government program list on basis of selected country *****/
    getgovtProgram() {
     this.countryGovtPrograms = this.Lender.getgovtProgram(this.lender.Country);
    }

    /***** Add/Remove dynamically input field for adding more list *****/

    addField(type) {
      if(type=='admin'){
       newItemNo = (Object.keys(this.techadmins.fname).length)+1;
        this.techadmins.fname.push('');
        this.techadmins.lname.push('');
        this.techadmins.email.push('');
        //console.log(newItemNo);
      }
      if(type=='owner'){
        var newItemNo =(Object.keys(this.bizOwners.fname).length)+1;
        this.bizOwners.fname.push('');
        this.bizOwners.lname.push('');
        this.bizOwners.email.push('');
      }
      if(type=='manager'){
        var newItemNo = (Object.keys(this.managers.fname).length)+1;
        this.managers.fname.push('');
        this.managers.lname.push('');
        this.managers.email.push('');
      }
    }

    removeField(type){
      if(type=='admin'){
        var lastItem = (Object.keys(this.techadmins.fname).length)-1;;
        this.techadmins.fname.splice(lastItem);
        this.techadmins.lname.splice(lastItem);
        this.techadmins.email.splice(lastItem);
        //console.log(lastItem)
      }
      if(type=='owner'){
        var lastItem = (Object.keys(this.bizOwners.fname).length)-1;;
        //this.bizOwners.splice(lastItem);
        this.bizOwners.fname.splice(lastItem);
        this.bizOwners.lname.splice(lastItem);
        this.bizOwners.email.splice(lastItem);
      }
      if(type=='manager'){
        var lastItem=(Object.keys(this.managers.fname).length)-1;;
        this.managers.fname.splice(lastItem);
        this.managers.lname.splice(lastItem);
        this.managers.email.splice(lastItem);
      }
    }

    /***** END  Add/Remove dynamically input field*****/

    submit(){

       var financialInstitution=[];
       var govtProgram=[];
       var custType=[];
       var subType=[];
       var bizzType=[];
       var consumerProductType=[];
       var commercialProductType=[];
       var businessProducttype=[];
       var INDconsumersProductType=[];
       var INDbusinessProductType=[];
       var INDcommercialProductType=[];
       
      angular.forEach(this.list, function(item){
        if(!!item.selected)financialInstitution.push(item.value);
      })
      if(this.otherfinancer){
      financialInstitution.push(this.otherfinancer);
    }
     
      angular.forEach(this.countryGovtPrograms, function(govtprogram){
        if(!!govtprogram.selected)govtProgram.push(govtprogram.value);
      })

      angular.forEach(this.customertypes, function(customer){
        if(!!customer.status)custType.push(customer.value);
      })
      angular.forEach(this.conCustomersubtypes, function(item){
        if(!!item.selected)subType.push(item.value);
      })
      angular.forEach(this.businessCustomersubtypes, function(item){
        if(!!item.selected)bizzType.push(item.value);
      })
      angular.forEach(this.consumerProducttypes, function(item){
        if(!!item.selected)consumerProductType.push(item.value);
      })
      angular.forEach(this.commercialProducttypes, function(item){
        if(!!item.selected)commercialProductType.push(item.value);
      })
      angular.forEach(this.businessProducttypes, function(item){
        if(!!item.selected)businessProducttype.push(item.value);
      })
      angular.forEach(this.INDconsumersProductTypes, function(item){
        if(!!item.selected)INDconsumersProductType.push(item.value);
      })
      angular.forEach(this.INDbusinessProductTypes, function(item){
        if(!!item.selected)INDbusinessProductType.push(item.value);
      })
      angular.forEach(this.INDcommercialProductTypes, function(item){
        if(!!item.selected)INDcommercialProductType.push(item.value);
      })

      var data ={
        lender:this.lenderinfo,
        country:this.lender.Country,
        officeAddress:this.oa,
        headOfficeAddress:this.hoa,
        instituteName:this.institutename,
        financialInstitution:financialInstitution,
        govtPrograms:govtProgram,
        custType:custType,
        consumerSubType:subType,
        businessSubType:bizzType,
        consumerProductType: consumerProductType,
        businessProducttype:businessProducttype,
        commercialProductType:commercialProductType,
        INDconsumersProductType: INDconsumersProductType,
        INDbusinessProductType: INDbusinessProductType,
        INDcommercialProductType: INDcommercialProductType,
        startDate:this.startdate,
        customizationLead:{
          firstName:this.primaryLeadFName,
          lastName:this.primaryLeadLname,
          email:this.primaryLeadEmail
        },
        integrationLead:{
          firstName:this.integratorFname,
          lastName:this.integratorLname,
          email:this.integratorEmail
        },
        directoryLead:{

          firstName:this.directoryFname,
          lastName:this.directoryLname,
          email:this.directoryEmail
        },
        acceptBilling:{
          signature:this.signature,
          date:this.acceptdate
        },
        techadmins:this.techadmins,
        businessOwners:this.bizOwners,
        managers:this.managers,
      }
      alert(JSON.stringify(data));
      this.Lender.setLenderDetails(data);
      this.$state.go('lender.info');
    }
    
}
angular.module('investnextdoorCaApp')
.controller('LenderController', LenderController);
})();
