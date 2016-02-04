'use strict';

(function() {

function ApplicationService($location, $cookies, $resource, Auth) {
  var currentUser = Auth.getCurrentUser();

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
      var Application =  $resource('/api/applications/:id', {id: '@_id'});
      return Application.get({id: applicationId});
    },


    /**
     * Get application ID
     *
     * @return {String}
     */
    getID() {
      return currentUser.borrower.applications[0];
    },


    /**
     * Save application page
     *
     * @return {String}
     */
    pageData(application, page) {

      if( page === 'general' ) {

        var address = {};
        var structure;
        var industry;

        if( application.generalInfo.address ) {
          var province;

          if( application.generalInfo.address.province ) {
            province = application.generalInfo.address.province.value;
          }

          address = {
            street: application.generalInfo.address.street,
            city: application.generalInfo.address.city,
            province: province,
            postal: application.generalInfo.address.postal
          };
        }

        if( application.generalInfo.structure ) {
          structure = application.generalInfo.structure.value;
        }

        if( application.generalInfo.industry ) {
          industry = application.generalInfo.industry.value;
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
      		structure: structure,
      		industry: industry,
      		naics: application.generalInfo.naics,
      		employees: application.generalInfo.employees
        };

      } else if( page === 'details' ) {

        var listingType;
        var usage;
        var term;
        var loanPartners;

        if( application.listingDetails.listingType ) {
          listingType = application.listingDetails.listingType.value;
        }

        if( application.listingDetails.term ) {
          term = application.listingDetails.term.value;
        }

        return {
          title: application.listingDetails.title,
          listingType: listingType,
          usage: application.listingDetails.usage,
          term: term,
          amount: application.listingDetails.amount,
          jobs: application.listingDetails.jobs,
          loanPartners: application.listingDetails.loanPartners,
          reason: application.listingDetails.reason
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
