'use strict';

(function() {

function ListingService($location, $cookies, $resource, Auth, User) {

  var Listing = {


    /**
     * Get listing status
     *
     * @return {String}
     */
    getStatus() {
      return 'in-progress';
    },


    /**
     * Get listing status
     *
     * @return {String}
     */
    getListing(listingId) {

      if( !listingId ) {
        return {};
      } else {
        var currentListing = $resource('/api/listings/:id', {id: '@_id'});
        return currentListing.get({id: listingId});
      }

    },


    /**
     * Get listing ID
     *
     * @return {String}
     */
    getID() {
      var user = User.get(function(user) {
        var listings = user.borrower.listings;

        if( 0 >= listings.length ) {
          return false;
        } else {
          return listings[0];
        }
      });
    },


    /**
     * Save listing page
     *
     * @return {String}
     */
    pageData(listing, page) {

      if( page === 'general' ) {

        var address = {};

        if( listing.general.address ) {
          address = {
            street: listing.general.address.street,
            city: listing.general.address.city,
            province: listing.general.address.province,
            postal: listing.general.address.postal
          };
        }

        return {
          businessName: listing.general.businessName,
      		doingBusinessName: listing.general.doingBusinessName,
      		contactName: listing.general.contactName,
      		email: listing.general.email,
      		phone: listing.general.phone,
      		website: listing.general.website,
      		address: address,
      		founded: listing.general.founded,
      		structure: listing.general.structure,
      		industry: listing.general.industry,
      		naics: listing.general.naics,
      		employees: listing.general.employees
        };

      } else if( page === 'details' ) {

        return {
          title: listing.details.title,
          listingType: listing.details.listingType,
          usage: listing.details.usage,
          term: listing.details.term,
          amount: listing.details.amount,
          jobs: listing.details.jobs,
          loanPartners: listing.details.loanPartners,
          reason: listing.details.reason
        };

      } else if( page === 'financial' ) {

        return {
          businessNumber: listing.financial.businessNumber,
          commercialSpace: listing.financial.commercialSpace,
          owners: listing.financial.owners,
          revenue: listing.financial.revenue,
          projection: listing.financial.projection,
          debt: listing.financial.debt,
          repayments: listing.financial.repayments,
          bankStatements: listing.financial.bankStatements,
          taxReturns: listing.financial.taxReturns,
          whyInvest: listing.financial.whyInvest,
          provideMore: listing.financial.provideMore,
          upToDate: listing.financial.upToDate,
          assets: listing.financial.assets,
          inventory: listing.financial.inventory,
          receivable: listing.financial.receivable,
          liabilities: listing.financial.liabilities,
          financialStatements: listing.financial.financialStatements,
          additionalDocuments: listing.financial.additionalDocuments,
          additionalInfo: listing.financial.additionalInfo
        };

      } else if( page === 'social' ) {

        return {
          managers: listing.social.managers,
          video: listing.social.video,
          facebook: listing.social.facebook,
          twitter: listing.social.twitter,
          linkedin: listing.social.linkedin,
          youtube: listing.social.youtube,
          yelp: listing.social.yelp,
          reviews: listing.social.reviews,
          images: listing.social.images
        };

      } else if( page === 'terms' ) {

        return {
          businessAgreements: listing.terms.businessAgreements,
          authority: listing.terms.authority,
          moreRequired: listing.terms.moreRequired,
          certified: listing.terms.certified,
          fullName: listing.terms.fullName,
          position: listing.terms.position,
          phone: listing.terms.phone,
          signature: listing.terms.signature
        };

      }

    },


    /**
     * Get listing section status
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

  return Listing;
}

angular.module('investnextdoorCaApp')
  .factory('Listing', ListingService);

})();