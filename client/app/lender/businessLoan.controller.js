'use strict';

(function() {

	class BusinessLoanController {
		constructor($scope) {
			var vm = this;
			vm.$scope=$scope;
			vm.bScoreSummary={};
			vm.bDerogatorySummary={};
			vm.bCreditReferenceSummary={};
			vm.bQuarterlyPaymentTrend={}; 
			vm.bCollectionDetail={};
			vm.bLegalDetails={};
			vm.bCreditReferenceSummary={};
			vm.bOthersDetails={};
			vm.test={};
		}

		submit(){
       // Business:this., Score Summary
		var  name ={a:'ram'};
		alert(name);

        this.bScoreSummary={
       	getPaid:this.getPaid, 
       	getPaidApproveLimit:this.getPaidApproveLimit, 
       	getPaidDeclineLimit:this.getPaidDeclineLimit, 
       	getPaidAutoApprove:this.getPaidAutoApprove,
       	getPaidAutoDecline:this.getPaidAutoDecline,
       	severeDelinquency:this.severeDelinquency, 
       	severeDelinquencyApproveLimit:this.severeDelinquencyApproveLimit, 
       	severeDelinquencyDeclineLimit:this.severeDelinquencyDeclineLimit, 
       	severeDelinquencyAutoApprove:this.severeDelinquencyAutoApprove,
       	severeDelinquencyAutoDecline:this.severeDelinquencyAutoDecline,

       	whenGetPaid:this.whenGetPaid, 
       	whenGetPaidApproveLimit:this.whenGetPaidApproveLimit, 
       	whenGetPaidDeclineLimit:this.whenGetPaidDeclineLimit, 
       	whenGetPaidAutoApprove:this.whenGetPaidAutoApprove,
       	whenGetPaidAutoDecline:this.whenGetPaidAutoDecline,

       	ceaseBusiness:this.ceaseBusiness, 
       	ceaseBusinessApproveLimit:this.ceaseBusinessApproveLimit, 
       	ceaseBusinessDeclineLimit:this.ceaseBusinessDeclineLimit, 
       	ceaseBusinessAutoApprove:this.ceaseBusinessAutoApprove,
       	ceaseBusinessAutoDecline:this.ceaseBusinessAutoDecline,

       	bankReportOnFile:this.bankReportOnFile, 
       	bankReportOnFileApproveLimit:this.bankReportOnFileApproveLimit, 
       	bankReportOnFileDeclineLimit:this.bankReportOnFileDeclineLimit, 
       	bankReportOnFileAutoApprove:this.bankReportOnFileAutoApprove,
       	bankReportOnFileAutoDecline:this.bankReportOnFileAutoDecline,

       	corporateSearchOnFile:this.corporateSearchOnFile, 
       	corporateSearchOnFileApproveLimit:this.corporateSearchOnFileApproveLimit, 
       	corporateSearchOnFileDeclineLimit:this.corporateSearchOnFileDeclineLimit, 
       	corporateSearchOnFileAutoApprove:this.corporateSearchOnFileAutoApprove,
       	corporateSearchOnFileAutoDecline:this.corporateSearchOnFileAutoDecline,

       	numberOfInquiriesOnFile:this.numberOfInquiriesOnFile, 
       	numberOfInquiriesOnFileApproveLimit:this.numberOfInquiriesOnFileApproveLimit, 
       	numberOfInquiriesOnFileDeclineLimit:this.numberOfInquiriesOnFileDeclineLimit, 
       	numberOfInquiriesOnFileAutoApprove:this.numberOfInquiriesOnFileAutoApprove,
       	numberOfInquiriesOnFileAutoDecline:this.numberOfInquiriesOnFileAutoDecline,

       	numberOfAccountsReporting:this.numberOfAccountsReporting, 
       	numberOfAccountsReportingApproveLimit:this.numberOfAccountsReportingApproveLimit, 
       	numberOfAccountsReportingDeclineLimit:this.numberOfAccountsReportingDeclineLimit, 
       	numberOfAccountsReportingAutoApprove:this.numberOfAccountsReportingAutoApprove,
       	numberOfAccountsReportingAutoDecline:this.numberOfAccountsReportingAutoDecline,

       	amount:this.amount, 
       	amountApproveLimit:this.amountApproveLimit, 
       	amountDeclineLimit:this.amountDeclineLimit, 
       	amountAutoApprove:this.amountAutoApprove,
       	amountAutoDecline:this.amountAutoDecline,

       	numberOfDelinquencies:this.numberOfDelinquencies, 
       	numberOfDelinquenciesApproveLimit:this.numberOfDelinquenciesApproveLimit, 
       	numberOfDelinquenciesDeclineLimit:this.numberOfDelinquenciesDeclineLimit, 
       	numberOfDelinquenciesAutoApprove:this.numberOfDelinquenciesAutoApprove,
       	numberOfDelinquenciesAutoDecline:this.numberOfDelinquenciesAutoDecline,

       	mostSevereStatusDate:this.mostSevereStatusDate, 
       	mostSevereStatusDateApproveLimit:this.mostSevereStatusDateApproveLimit, 
       	mostSevereStatusDateDeclineLimit:this.mostSevereStatusDateDeclineLimit, 
       	mostSevereStatusDateAutoApprove:this.mostSevereStatusDateAutoApprove,
       	mostSevereStatusDateAutoDecline:this.mostSevereStatusDateAutoDecline,

       	numberOfAccountsChargedOff:this.numberOfAccountsChargedOff, 
       	numberOfAccountsChargedOffApproveLimit:this.numberOfAccountsChargedOffApproveLimit, 
       	numberOfAccountsChargedOffDeclineLimit:this.numberOfAccountsChargedOffDeclineLimit, 
       	numberOfAccountsChargedOffAutoApprove:this.numberOfAccountsChargedOffAutoApprove,
       	numberOfAccountsChargedOffAutoDecline:this.numberOfAccountsChargedOffAutoDecline,

       	largestWriteOff:{
       		amount:this.writeOffAmount, 
       		amountApproveLimit:this.writeOffAmountApproveLimit, 
       		amountDeclineLimit:this.writeOffAmountDeclineLimit, 
       		amountAutoApprove:this.writeOffAmountAutoApprove,
       		amountAutoDecline:this.writeOffAmountAutoDecline,

       		writeOffdate:this.writeOffdate, 
       		writeOffdateApproveLimit:this.writeOffdateApproveLimit, 
       		writeOffdateDeclineLimit:this.writeOffdateDeclineLimit, 
       		writeOffdateAutoApprove:this.writeOffdateAutoApprove,
       		writeOffdateAutoDecline:this.writeOffdateAutoDecline,
       	},
       	totalCurrentCreditExposure:this.totalCurrentCreditExposure, 
       	totalCurrentCreditExposureApproveLimit:this.totalCurrentCreditExposureApproveLimit, 
       	totalCurrentCreditExposureDeclineLimit:this.totalCurrentCreditExposureDeclineLimit, 
       	totalCurrentCreditExposureAutoApprove:this.totalCurrentCreditExposureAutoApprove,
       	totalCurrentCreditExposureAutoDecline:this.totalCurrentCreditExposureAutoDecline,

       	totalOutstanding:this.totalOutstanding, 
       	totalOutstandingApproveLimit:this.totalOutstandingApproveLimit, 
       	totalOutstandingDeclineLimit:this.totalOutstandingDeclineLimit, 
       	totalOutstandingAutoApprove:this.totalOutstandingAutoApprove,
       	totalOutstandingAutoDecline:this.totalOutstandingAutoDecline,

       	totalCurrentBalance:this.totalCurrentBalance, 
       	totalCurrentBalanceApproveLimit:this.totalCurrentBalanceApproveLimit, 
       	totalCurrentBalanceDeclineLimit:this.totalCurrentBalanceDeclineLimit, 
       	totalCurrentBalanceAutoApprove:this.totalCurrentBalanceAutoApprove,
       	totalCurrentBalanceAutoDecline:this.totalCurrentBalanceAutoDecline, 
       };

       alert(JSON.stringify(this.bScoreSummary));


// Derogatory Summary
  this.bDerogatorySummary = {
	numberOnFileReturnedCheques:this.numberOnFileReturnedCheques, 
	numberOnFileReturnedChequesApproveLimit:this.numberOnFileReturnedChequesApproveLimit, 
	numberOnFileReturnedChequesDeclineLimit:this.numberOnFileReturnedChequesDeclineLimit, 
	numberOnFileReturnedChequesAutoApprove:this.numberOnFileReturnedChequesAutoApprove,
	numberOnFileReturnedChequesAutoDecline:this.numberOnFileReturnedChequesAutoDecline,

	numberOnFileCollections:this.numberOnFileCollections, 
	numberOnFileCollectionsApproveLimit:this.numberOnFileCollectionsApproveLimit, 
	numberOnFileCollectionsDeclineLimit:this.numberOnFileCollectionsDeclineLimit, 
	numberOnFileCollectionsAutoApprove:this.numberOnFileCollectionsAutoApprove,
	numberOnFileCollectionsAutoDecline:this.numberOnFileCollectionsAutoDecline,

	numberOnFileLegalSuits:this.numberOnFileLegalSuits, 
	numberOnFileLegalSuitsApproveLimit:this.numberOnFileLegalSuitsApproveLimit, 
	numberOnFileLegalSuitsDeclineLimit:this.numberOnFileLegalSuitsDeclineLimit, 
	numberOnFileLegalSuitsAutoApprove:this.numberOnFileLegalSuitsAutoApprove,
	numberOnFileLegalSuitsAutoDecline:this.numberOnFileLegalSuitsAutoDecline,

	numberOnFileJudgements:this.numberOnFileJudgements, 
	numberOnFileJudgementsApproveLimit:this.numberOnFileJudgementsApproveLimit, 
	numberOnFileJudgementsDeclineLimit:this.numberOnFileJudgementsDeclineLimit, 
	numberOnFileJudgementsAutoApprove:this.numberOnFileJudgementsAutoApprove,
	numberOnFileJudgementsAutoDecline:this.numberOnFileJudgementsAutoDecline,

	numberOnFileOtherLegalInfo:this.numberOnFileOtherLegalInfo, 
	numberOnFileOtherLegalInfoApproveLimit:this.numberOnFileOtherLegalInfoApproveLimit, 
	numberOnFileOtherLegalInfoDeclineLimit:this.numberOnFileOtherLegalInfoDeclineLimit, 
	numberOnFileOtherLegalInfoAutoApprove:this.numberOnFileOtherLegalInfoAutoApprove,
	numberOnFileOtherLegalInfoAutoDecline:this.numberOnFileOtherLegalInfoAutoDecline,

	numberOnFileLiens:this.numberOnFileLiens, 
	numberOnFileLiensApproveLimit:this.numberOnFileLiensApproveLimit, 
	numberOnFileLiensDeclineLimit:this.numberOnFileLiensDeclineLimit, 
	numberOnFileLiensAutoApprove:this.numberOnFileLiensAutoApprove,
	numberOnFileLiensAutoDecline:this.numberOnFileLiensAutoDecline,


	totalAmountOnFile:this.totalAmountOnFile, 
	totalAmountOnFileApproveLimit:this.totalAmountOnFileApproveLimit, 
	totalAmountOnFileDeclineLimit:this.totalAmountOnFileDeclineLimit, 
	totalAmountOnFileAutoApprove:this.totalAmountOnFileAutoApprove,
	totalAmountOnFileAutoDecline:this.totalAmountOnFileAutoDecline,

	dateOfLastitem:this.dateOfLastitem, 
	commentsOnFile:this.commentsOnFile, 
};

// Credit Reference Summary
 this.bCreditReferenceSummary = {
	pIScore90Day:this.pIScore90Day, 
	pIScore90DayApproveLimit:this.pIScore90DayApproveLimit, 
	pIScore90DayDeclineLimit:this.pIScore90DayDeclineLimit, 
	pIScore90DayAutoApprove:this.pIScore90DayAutoApprove,
	pIScore90DayAutoDecline:this.pIScore90DayAutoDecline,

	pIScore13Month:this.pIScore13Month, 
	pIScore13MonthApproveLimit:this.pIScore13MonthApproveLimit, 
	pIScore13MonthDeclineLimit:this.pIScore13MonthDeclineLimit, 
	pIScore13MonthAutoApprove:this.pIScore13MonthAutoApprove,
	pIScore13MonthAutoDecline:this.pIScore13MonthAutoDecline,

	pIScoreAllReferences:this.pIScoreAllReferences, 
	pIScoreAllReferencesApproveLimit:this.pIScoreAllReferencesApproveLimit, 
	pIScoreAllReferencesDeclineLimit:this.pIScoreAllReferencesDeclineLimit, 
	pIScoreAllReferencesAutoApprove:this.pIScoreAllReferencesAutoApprove,
	pIScoreAllReferencesAutoDecline:this.pIScoreAllReferencesAutoDecline,

	highCredit:this.highCredit, 
	highCreditApproveLimit:this.highCreditApproveLimit, 
	highCreditDeclineLimit:this.highCreditDeclineLimit, 
	highCreditAutoApprove:this.highCreditAutoApprove,
	highCreditAutoDecline:this.highCreditAutoDecline,

	totalOwing:this.totalOwing, 
	totalOwingApproveLimit:this.totalOwingApproveLimit, 
	totalOwingDeclineLimit:this.totalOwingDeclineLimit, 
	totalOwingAutoApprove:this.totalOwingAutoApprove,
	totalOwingAutoDecline:this.totalOwingAutoDecline,

	current:this.current, 
	currentApproveLimit:this.currentApproveLimit, 
	currentDeclineLimit:this.currentDeclineLimit, 
	currentAutoApprove:this.currentAutoApprove,
	currentAutoDecline:this.currentAutoDecline,

	totalPastDue:this.totalPastDue, 
	totalPastDueApproveLimit:this.totalPastDueApproveLimit, 
	totalPastDueDeclineLimit:this.totalPastDueDeclineLimit, 
	totalPastDueAutoApprove:this.totalPastDueAutoApprove,
	totalPastDueAutoDecline:this.totalPastDueAutoDecline,

	balanceAmount:this.balanceAmount, 
	balanceAmountApproveLimit:this.balanceAmountApproveLimit, 
	balanceAmountDeclineLimit:this.balanceAmountDeclineLimit, 
	balanceAmountAutoApprove:this.balanceAmountAutoApprove,
	balanceAmountAutoDecline:this.balanceAmountAutoDecline,

	currentBalance:this.currentBalance, 
	currentBalanceApproveLimit:this.currentBalanceApproveLimit, 
	currentBalanceDeclineLimit:this.currentBalanceDeclineLimit, 
	currentBalanceAutoApprove:this.currentBalanceAutoApprove,
	currentBalanceAutoDecline:this.currentBalanceAutoDecline, 
};

// Quarterly Payment Trend
 this.bQuarterlyPaymentTrend = {
	paymentIndex:this.paymentIndex, 
	paymentIndexApproveLimit:this.paymentIndexApproveLimit, 
	paymentIndexDeclineLimit:this.paymentIndexDeclineLimit, 
	paymentIndexAutoApprove:this.paymentIndexAutoApprove,
	paymentIndexAutoDecline:this.paymentIndexAutoDecline,

	creditInformationScore:this.creditInformationScore, 
	creditInformationScoreApproveLimit:this.creditInformationScoreApproveLimit, 
	creditInformationScoreDeclineLimit:this.creditInformationScoreDeclineLimit, 
	creditInformationScoreAutoApprove:this.creditInformationScoreAutoApprove,
	creditInformationScoreAutoDecline:this.creditInformationScoreAutoDecline,

	totalAmount:this.totalAmount, 
	totalAmountApproveLimit:this.totalAmountApproveLimit, 
	totalAmountDeclineLimit:this.totalAmountDeclineLimit, 
	totalAmountAutoApprove:this.totalAmountAutoApprove,
	totalAmountAutoDecline:this.totalAmountAutoDecline,

	currentAmount:this.currentAmount, 
	currentAmountApproveLimit:this.currentAmountApproveLimit, 
	currentAmountDeclineLimit:this.currentAmountDeclineLimit, 
	currentAmountAutoApprove:this.currentAmountAutoApprove,
	currentAmountAutoDecline:this.currentAmountAutoDecline, 
};

// Collection Detail
this.bCollectionDetail = {
	reported:this.reported, 
	reportedApproveLimit:this.reportedApproveLimit, 
	reportedDeclineLimit:this.reportedDeclineLimit, 
	reportedAutoApprove:this.reportedAutoApprove,
	reportedAutoDecline:this.reportedAutoDecline,

	creditor:this.creditor, 
	collectionAgency:this.collectionAgency, 
	debtor:this.debtor, 
	claimPlaced:this.claimPlaced, 
	claimAmount:this.claimAmount, 
	statusUpdate:this.statusUpdate, 
	amountPaid:this.amountPaid, 
	datePaid:this.datePaid, 
	accountBalance:this.accountBalance, 
	status:this.status, 
};

// Legal Details
this.bLegalDetails = {
	reported:this.legalReported, 
	reportedApproveLimit:this.legalReportedApproveLimit, 
	reportedDeclineLimit:this.legalReportedDeclineLimit, 
	reportedAutoApprove:this.legalReportedAutoApprove,
	reportedAutoDecline:this.legalReportedAutoDecline,

	legalAction:this.legalAction, 
	court:this.legalCourt, 
	defendant:this.defendant, 
	claim:{
		claimDate:this.claimDate, 
		claimNumber:this.claimNumber, 
	},
	plantiff:this.plantiff, 
	amount:this.legalAmount, 
	security:this.security, 
	reason:this.reason
};


   this.businessCreditDataEssentials = {
 	employeeSize:this.businessEmployeeSize,
    employeeSizeApproveLimit:this.bEmployeeSizeApproveLimit,
 	employeeSizeDeclineLimit:this.bEmployeeSizeDeclineLimit,
 	employeeSizeAutoApprove:this.bEmployeeSizeAutoApprove,
 	employeeSizeAutoDecline:this.bEmployeeSizeAutoDecline,

 	salesVolume:this.salesVolume, 
 	salesVolumeApproveLimit:this.salesVolumeApproveLimit, 
 	salesVolumeDeclineLimit:this.salesVolumeDeclineLimit, 
 	salesVolumeAutoApprove:this.salesVolumeAutoApprove,
 	salesVolumeAutoDecline:this.salesVolumeAutoDecline,

 	ofSIC:this.ofSIC, 
 	ofSICApproveLimit:this.ofSICApproveLimit, 
 	ofSICDeclineLimit:this.ofSICDeclineLimit, 
 	ofSICAutoApprove:this.ofSICAutoApprove,
 	ofSICAutoDecline:this.ofSICAutoDecline,

 	ofNAICS:this.ofNAICS, 
 	ofNAICSApproveLimit:this.ofNAICSApproveLimit, 
 	ofNAICSDeclineLimit:this.ofNAICSDeclineLimit, 
 	ofNAICSAutoApprove:this.ofNAICSAutoApprove,
 	ofNAICSAutoDecline:this.ofNAICSAutoDecline,

 };
 // Other Details
this.bOthersDetails={
	ofEmployeeSizeCategory:this.ofEmployeeSizeCategory, 
	ofEmployeeSizeCategoryApproveLimit:this.ofEmployeeSizeCategoryApproveLimit, 
	ofEmployeeSizeCategoryDeclineLimit:this.ofEmployeeSizeCategoryDeclineLimit, 
	ofEmployeeSizeCategoryAutoApprove:this.ofEmployeeSizeCategoryAutoApprove,
	ofEmployeeSizeCategoryAutoDecline:this.ofEmployeeSizeCategoryAutoDecline,

	miscSalesVolumes:{
		sales:this.sales,
		salesApproveLimit:this.salesApproveLimit,
		salesDeclineLimit:this.salesDeclineLimit,
		salesAutoApprove:this.salesAutoApprove,
		salesAutoDecline:this.salesAutoDecline,

		ofSalesVolume:this.ofSalesVolume,
		ofSalesVolumeApproveLimit:this.ofSalesVolumeApproveLimit,
		ofSalesVolumeDeclineLimit:this.ofSalesVolumeDeclineLimit,
		ofSalesVolumeAutoApprove:this.ofSalesVolumeAutoApprove,
		ofSalesVolumeAutoDecline:this.ofSalesVolumeAutoDecline, 
	},
	numberOfAccounts:this.numberOfAccounts, 
	numberOfAccountsApproveLimit:this.numberOfAccountsApproveLimit, 
	numberOfAccountsDeclineLimit:this.numberOfAccountsDeclineLimit, 
	numberOfAccountsAutoApprove:this.numberOfAccountsAutoApprove,
	numberOfAccountsAutoDecline:this.numberOfAccountsAutoDecline,

	balance:this.balance, 
	balanceApproveLimit:this.balanceApproveLimit, 
	balanceDeclineLimit:this.balanceDeclineLimit, 
	balanceAutoApprove:this.balanceAutoApprove,
	balanceAutoDecline:this.balanceAutoDecline,

	numberOfReturnedCheques:this.numberOfReturnedCheques, 
	numberOfReturnedChequesApproveLimit:this.numberOfReturnedChequesApproveLimit, 
	numberOfReturnedChequesDeclineLimit:this.numberOfReturnedChequesDeclineLimit, 
	numberOfReturnedChequesAutoApprove:this.numberOfReturnedChequesAutoApprove,
	numberOfReturnedChequesAutoDecline:this.numberOfReturnedChequesAutoDecline,

	numberOfCreditLines:this.numberOfCreditLines, 
	numberOfCreditLinesApproveLimit:this.numberOfCreditLinesApproveLimit, 
	numberOfCreditLinesDeclineLimit:this.numberOfCreditLinesDeclineLimit, 
	numberOfCreditLinesAutoApprove:this.numberOfCreditLinesAutoApprove,
	numberOfCreditLinesAutoDecline:this.numberOfCreditLinesAutoDecline,

	ofRating:this.ofRating,
	ofRatingApproveLimit:this.ofRatingApproveLimit,
	ofRatingDeclineLimit:this.ofRatingDeclineLimit,
	ofRatingAutoApprove:this.ofRatingAutoApprove,
	ofRatingAutoDecline:this.ofRatingAutoDecline,

	authorizedAmount:this.authorizedAmount, 
	authorizedAmountApproveLimit:this.authorizedAmountApproveLimit, 
	authorizedAmountDeclineLimit:this.authorizedAmountDeclineLimit, 
	authorizedAmountAutoApprove:this.authorizedAmountAutoApprove,
	authorizedAmountAutoDecline:this.authorizedAmountAutoDecline,

	numberOfLoans:this.numberOfLoans, 
	numberOfLoansApproveLimit:this.numberOfLoansApproveLimit, 
	numberOfLoansDeclineLimit:this.numberOfLoansDeclineLimit, 
	numberOfLoansAutoApprove:this.numberOfLoansAutoApprove,
	numberOfLoansAutoDecline:this.numberOfLoansAutoDecline,

	balanceOwing:this.balanceOwing, 
	balanceOwingApproveLimit:this.balanceOwingApproveLimit, 
	balanceOwingDeclineLimit:this.balanceOwingDeclineLimit, 
	balanceOwingAutoApprove:this.balanceOwingAutoApprove,
	balanceOwingAutoDecline:this.balanceOwingAutoDecline, 
};
 
} 
}

angular.module('investnextdoorCaApp')
.controller('BusinessLoanController', BusinessLoanController);

})();
