'use strict';

(function() {

  class ConsumerLoanController {
    constructor($scope, $rootScope) {
      var vm = this;
      vm.$scope= $scope;
      vm.$rootScope = $rootScope;
      //vm.$status=$status;
      vm.cProductScoreLimit={};
      vm.cSummary={};
      vm.cInfoSuperintendentOfBankruptcy={};
      vm.cCollection={};
      vm.cFinancingStatement={};
      vm.cJudgement={};
      vm.cMemberTrade={};
      vm.waitingIsOn = true;
      vm.progIsOn = false;
      vm.completeIsOn = false;
      vm.abc="hello";
     
      
} 
callSubmit(){
  /*alert("submit");
  this.$scope.$emit('changeValue', "2");*/
      this.$rootScope.$broadcast('changeValue', "2");
      this.waitingIsOn = false;  
      this.progIsOn = false;
      this.completeIsOn = true;
}



 saveProgress(){
  //   alert("Prog");

  //     this.waitingIsOn = false;  
  //     this.progIsOn = true;
  //     this.completeIsOn = false;

  // this.$rootScope.$broadcast('changeValue', "1");

  //Personal :this., Product Score
    this.cProductScoreLimit = {
    // Equifax Risk Score
    eQuiFaxRiskScore :this.eQuiFaxRiskScore,
    eQuiFaxRiskScoreApproveLimit :this.eQuiFaxRiskScoreApproveLimit,
    eQuiFaxRiskScoreDeclineLimit :this.eQuiFaxRiskScoreDeclineLimit,
    eQuiFaxRiskScoreAutoApprove :this.eQuiFaxRiskScoreAutoApprove,
    eQuiFaxRiskScoreAutoDecline :this.eQuiFaxRiskScoreAutoDecline,
    // bankruptcyNavigatorIndex
    bankruptcyNavigatorIndex :this.bankruptcyNavigatorIndex, 
    bankruptcyNavigatorIndexApproveLimit :this.bankruptcyNavigatorIndexApproveLimit, 
    bankruptcyNavigatorIndexDeclineLimit :this.bankruptcyNavigatorIndexDeclineLimit, 
    bankruptcyNavigatorIndexAutoApprove :this.bankruptcyNavigatorIndexAutoApprove, 
    bankruptcyNavigatorIndexAutoDecline :this.bankruptcyNavigatorIndexAutoDecline, 
};
 
  
// Personal :Summary
  this.cSummary = {
    //Pub/Other
    pubOther :this.pubOther, 
    pubOtherApproveLimit :this.pubOtherApproveLimit, 
    pubOtherDeclineLimit :this.pubOtherDeclineLimit,
    pubOtherAutoApprove :this.pubOtherAutoApprove, 
    pubOtherAutoDecline :this.pubOtherAutoDecline, 

    tradeOldest :this.tradeOldest, 
    tradeOldestApproveLimit :this.tradeOldestApproveLimit,
    tradeOldestDeclineLimit :this.tradeOldestDeclineLimit,
    tradeOldestAutoApprove :this.tradeOldestAutoApprove, 
    tradeOldestAutoDecline :this.tradeOldestAutoDecline, 
    
    tradeNewest :this.tradeNewest,
    tradeNewestApproveLimit :this.tradeNewestApproveLimit, 
    tradeNewestDeclineLimit :this.tradeNewestDeclineLimit, 
    tradeNewestAutoApprove :this.tradeNewestAutoApprove, 
    tradeNewestAutoDecline :this.tradeNewestAutoDecline, 
    
    total :this.total, 
    totalApproveLimit :this.totalApproveLimit,
    totalDeclineLimit :this.totalDeclineLimit, 
    totalAutoApprove :this.totalAutoApprove, 
    totalAutoDecline :this.totalAutoDecline, 

    highCredit :this.highCredit, 
    highCreditApproveLimit :this.highCreditApproveLimit, 
    highCreditDeclineLimit :this.highCreditDeclineLimit, 
    highCreditAutoApprove :this.highCreditAutoApprove, 
    highCreditAutoDecline :this.highCreditAutoDecline,

    rating :this.rating, 
    ratingApproveLimit :this.ratingApproveLimit,
    ratingDeclineLimit :this.ratingDeclineLimit, 
    ratingAutoApprove :this.ratingAutoApprove, 
    ratingAutoDecline :this.ratingAutoDecline, 
};

// Personal :this., Information from the Superintendent of bankruptcy
 this.cInfoSuperintendentOfBankruptcy ={
    filed:this.filed, 
    filedApproveLimit:this.filedApproveLimit, 
    filedDeclineLimit:this.filedDeclineLimit, 
    filedAutoApprove:this.filedAutoApprove,
    filedAutoDecline:this.filedAutoDecline, 

    ofType :this.ofType,
    ofCourtName :this.ofCourtName, 
    courtNo :{
        No :this.courtNo, 
    },
    liability :this.liability,
    assetFiledBy :this.assetFiledBy, 
    ofSubject :this.ofSubject, 
    caseNoTrusteeName :{
        caseNo :this.caseNo,
        trusteeName :this.trusteeName,
    },
    disposition :this.dispositions, 
    ofDescription :this.ofDescription, 
};

// Personal :this., Collection
this.cCollection = {
    rptd :this.rptd, 
    rptdApproveLimit :this.rptdApproveLimit, 
    rptdDeclineLimit :this.rptdDeclineLimit, 
    rptdAutoApprove :this.rptdAutoApprove, 
    rptdAutoDecline :this.rptdAutoDecline, 

    type :this.collenctionType,
    amount :this.colAmount,
    dla :this.dla, 
    bal :this.bal,
    reason :this.reason, 
    ledgerNumber :this.ledgerNumber,
    verifiedDate :this.verifiedDate,
    acctCredit :this.acctCredit, 
    ofDescription :this.ofDescription, 
};

// Personal :this., Financing Statement
this.cFinancingStatement = {
    filed :this.finanaceFiled, 
    filedApproveLimit :this.finanaceApproveLimit, 
    filedDeclineLimit :this.finanaceDeclineLimit, 
    filedAutoApprove :this.financeAutoApprove, 
    filedAutoDecline :this.financeAutoDecline, 

    ofCourtName :this.financeOfCourtName,
    courtNo :{
        No :this.financeCourtNo,
    },
    maturity :this.maturity, 
};

// Personal :Judgement
this.cJudgement = {
    filed :this.judgementField, 
    filedApproveLimit :this.judgementApproveLimit, 
    filedDeclineLimit :this.judgementDeclineLimit, 
    filedAutoApprove :this.judgementAutoApprove, 
    filedAutoDecline :this.judgementAutoDecline,

    type :this.judgementType, 
    ofCourtName :this.judgementOfCourtName, 
    amt :this.judgementAmt, 
    status :this.judgementStatus, 
    judgementDate :this.judgementDate, 
    defendant :this.judgementDefendant, 
    caseNo :this.judgementCaseNo, 
    ofPlantiff :this.jOfPlantiff, 
    ofDescription :this.JofDescription, 
};

// Personal :this., Member trade
this.cMemberTrade = {
    creditLimit :this.creditLimit,
    creditLimitApproveLimit :this.creditLimitApproveLimit, 
    creditLimitDeclineLimit :this.creditLimitDeclineLimit,
    creditLimitAutoApprove :this.creditLimitAutoApprove, 
    creditLimitAutoDecline :this.creditLimitAutoDecline, 

    highCredit :this.mtHighCredit, 
    highCreditApproveLimit :this.mtHighCreditApproveLimit, 
    highCreditDeclineLimit :this.mtHighCreditDeclineLimit, 
    highCreditAutoApprove :this.mtHighCreditAutoApprove, 
    highCreditAutoDecline :this.mtHighCreditAutoDecline, 

    balance :this.balance, 
    balanceApproveLimit :this.balanceApproveLimit, 
    balanceDeclineLimit :this.balanceDeclineLimit, 
    balanceAutoApprove :this.balanceAutoApprove, 
    balanceAutoDecline :this.balanceAutoDecline, 

    pastDue :this.pastDue,  
    pastDueApproveLimit :this.pastDueApproveLimit,  
    pastDueDeclineLimit :this.pastDueDeclineLimit,  
    pastDueAutoApprove :this.pastDueAutoApprove,  
    pastDueAutoDecline :this.pastDueAutoDecline,  

    frstDelq :this.frstDelq,
    frstDelqApproveLimit :this.frstDelqApproveLimit,
    frstDelqDeclineLimit :this.frstDelqDeclineLimit, 
    frstDelqAutoApprove :this.frstDelqAutoApprove,  
    frstDelqAutoDecline :this.frstDelqAutoDecline,  

    tradePaymentProfile :this.tradePaymentProfile,  
    tradePaymentProfileApproveLimit :this.tradePaymentProfileApproveLimit,  
    tradePaymentProfileDeclineLimit :this.tradePaymentProfileDeclineLimit,  
    tradePaymentProfileAutoApprove :this.tradePaymentProfileAutoApprove,  
    tradePaymentProfileAutoDecline :this.tradePaymentProfileAutoDecline,  

    creditUtilization :this.creditUtilization,  
    creditUtilizationApproveLimit :this.creditUtilizationApproveLimit,  
    creditUtilizationDeclineLimit :this.creditUtilizationDeclineLimit,  
    creditUtilizationAutoApprove :this.creditUtilizationAutoApprove,  
    creditUtilizationAutoDecline :this.creditUtilizationAutoDecline,  

    amount:this.amount, 
    amountApproveLimit :this.amountApproveLimit, 
    amountDeclineLimit :this.amountDeclineLimit, 
    amountAutoApprove :this.amountAutoApprove,  
    amountAutoDecline :this.amountAutoDecline,
};

alert(JSON.stringify(this.cMemberTrade));
    /*this.
    this.process*/

}
}

  angular.module('investnextdoorCaApp')
    .controller('ConsumerLoanController', ConsumerLoanController);

})();
