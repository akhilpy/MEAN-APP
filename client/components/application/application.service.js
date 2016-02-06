'use strict';

(function() {

function ApplicationService($location, $cookies, $resource, Auth, User) {

  var Application = {


    /**
     * Get application status
     *
     * @return {String}
     */
    getStatus() {
      return 'in-progress';
    },


    /**
     * Get application status
     *
     * @return {String}
     */
    getApplication(applicationId) {

      if( !applicationId ) {
        return {};
      } else {
        var currentApplication = $resource('/api/applications/:id', {id: '@_id'});
        return currentApplication.get({id: applicationId});
      }

    },


    /**
     * Get application ID
     *
     * @return {String}
     */
    getID() {
      var user = User.get(function(user) {
        var applications = user.borrower.applications;

        if( 0 >= applications.length ) {
          return false;
        } else {
          return applications[0];
        }
      });
    },


    /**
     * Save application page
     *
     * @return {String}
     */
    pageData(application, page) {

      if( page === 'general' ) {

        var address = {};

        if( application.generalInfo.address ) {
          address = {
            street: application.generalInfo.address.street,
            city: application.generalInfo.address.city,
            province: application.generalInfo.address.province,
            postal: application.generalInfo.address.postal
          };
        }

        return {
          businessName: application.generalInfo.businessName,
      		doingBusinessName: application.generalInfo.doingBusinessName,
      		contactName: application.generalInfo.contactName,
      		email: application.generalInfo.email,
      		phone: application.generalInfo.phone,
      		website: application.generalInfo.website,
      		address: address,
      		founded: application.generalInfo.founded,
      		structure: application.generalInfo.structure,
      		industry: application.generalInfo.industry,
      		naics: application.generalInfo.naics,
      		employees: application.generalInfo.employees
        };

      } else if( page === 'details' ) {

        return {
          title: application.listingDetails.title,
          listingType: application.listingDetails.listingType,
          usage: application.listingDetails.usage,
          term: application.listingDetails.term,
          amount: application.listingDetails.amount,
          jobs: application.listingDetails.jobs,
          loanPartners: application.listingDetails.loanPartners,
          reason: application.listingDetails.reason
        };

      } else if( page === 'financial' ) {

        return {
          businessNumber: application.financial.businessNumber,
          commercialSpace: application.financial.commercialSpace,
          owners: application.financial.owners,
          revenue: application.financial.revenue,
          projection: application.financial.projection,
          debt: application.financial.debt,
          repayments: application.financial.repayments,
          bankStatements: application.financial.bankStatements,
          taxReturns: application.financial.taxReturns,
          whyInvest: application.financial.whyInvest,
          provideMore: application.financial.provideMore,
          upToDate: application.financial.upToDate,
          assets: application.financial.assets,
          inventory: application.financial.inventory,
          receivable: application.financial.receivable,
          liabilities: application.financial.liabilities,
          financialStatements: application.financial.financialStatements,
          additionalDocuments: application.financial.additionalDocuments,
          additionalInfo: application.financial.additionalInfo
        };

      } else if( page === 'social' ) {

        return {
          managers: application.socialMedia.managers,
          video: application.socialMedia.video,
          facebook: application.socialMedia.facebook,
          twitter: application.socialMedia.twitter,
          linkedin: application.socialMedia.linkedin,
          youtube: application.socialMedia.youtube,
          yelp: application.socialMedia.yelp,
          reviews: application.socialMedia.reviews,
          images: application.socialMedia.images
        };

      } else if( page === 'terms' ) {

        return {
          businessAgreements: application.terms.businessAgreements,
          authority: application.terms.authority,
          moreRequired: application.terms.moreRequired,
          certified: application.terms.certified,
          fullName: application.terms.fullName,
          position: application.terms.position,
          phone: application.terms.phone,
          signature: application.terms.signature
        };

      }

    },


    /**
     * Get application section status
     *
     * @return {String}
     */
    getPageStatus(page) {
      if( page === 'general' ) {
        return 'incomplete';
      } else if( page === 'details' ) {
        return 'fresh';
      } else if( page === 'financial' ) {
        return 'incomplete';
      } else if( page === 'social' ) {
        return 'complete';
      } else if( page === 'terms' ) {
        return 'incomplete';
      }
    }

  };

  return Application;
}

angular.module('investnextdoorCaApp')
  .factory('Application', ApplicationService);

})();
