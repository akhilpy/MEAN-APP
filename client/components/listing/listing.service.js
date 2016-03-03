'use strict';

(function() {

function ListingService($location, $cookies, $q, $resource, $http, Auth, User) {

  var Listing = {


    /**
     * Get current user
     *
     * @return {String}
     */
    getCurrentUser() {
      return Auth.getCurrentUser(null)
      .then(user => {
        if(!user.borrower.listings[0]) {
          var currentUser = User.get();
          var value = (currentUser.hasOwnProperty('$promise')) ?
            currentUser.$promise : currentUser;
          return $q.when(value)
            .then(user => {
              return user;
            }, () => {
              return {};
            });
        } else {
          return user;
        }
      });
    },



    /**
     * Get users
     *
     * @return {String}
     */
    getUser(userID) {
      return User.getOne({id: userID});
    },



    /**
     * Get users
     *
     * @return {String}
     */
    getUsers(role) {
      return $http.get('/api/users/role/' + role);
    },



    /**
     * Get listing status
     *
     * @return {String}
     */
    getStatus() {
      return 'in-progress';
    },


    /**
     * Get all listings
     *
     * @return {String}
     */
    getAll(status) {
      return $http.get('/api/listings/status/' + status);
    },



    /**
     * Get listing
     *
     * @return {String}
     */
    getOne(listingID) {

      if(listingID) {
        return $http.get('/api/listings/' + listingID);
      } else {
        return Listing.getCurrentUser()
          .then(user => {
            var listingID = user.borrower.listings[0];
            if(listingID) {
              return $http.get('/api/listings/' + listingID);
            } else {
              return {};
            }
          });
      }
    },



    /**
     * Create listing
     *
     * @return {String}
     */
    createOne(listing) {
      return Auth.getCurrentUser(null)
        .then(user => {
          return $http.post('/api/listings', {
            user: user,
            listing: listing
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },



    /**
     * Save listing
     *
     * @return {String}
     */
    saveOne(listing, listingID) {
      return $http.put('/api/listings/' + listingID, listing);
    },



    /**
     * Submit listing
     *
     * @return {String}
     */
    submitOne(listingID) {
      return Listing.getOne(listingID)
        .then(listing => {
          listing.status = 'review';
          return $http.put('/api/listings/' + listingID, listing);
        });
    },



    /**
     * Approve listing
     *
     * @return {String}
     */
    approveOne(listingID) {
      return Listing.getOne(listingID)
        .then(listing => {
          console.log(listing);
          listing.status = 'approved';
          return $http.put('/api/listings/' + listingID, listing);
        });
    },



    /**
     * Add a new comment
     *
     * @return {String}
     */
    addComment(comment, listing) {
      return Auth.getCurrentUser(null)
        .then(user => {
          return $http.put('/api/listings/comment/' + listing._id, {
            user: user,
            comment: comment,
            listing: listing
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },




    /**
     * Add a new comment reply
     *
     * @return {String}
     */
    addReply(listing, comment, reply) {
      return Auth.getCurrentUser(null)
        .then(user => {
          return $http.put('/api/listings/reply/' + listing._id, {
            user: user,
            comment: comment,
            reply: reply
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },




    /**
     * Request more details on a listing
     *
     * @return {String}
     */
    requestMore(listing) {
      return Auth.getCurrentUser(null)
        .then(user => {
          return $http.put('/api/listings/request-more/' + listing._id, {
            user: user
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },




    /**
     * Add a listing to your bookmarks
     *
     * @return {String}
     */
    addBookmark(listing) {
      return Auth.getCurrentUser(null)
        .then(user => {
          return $http.put('/api/listings/bookmark/' + listing._id, {
            user: user
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },




    /**
     * Get listing rates
     *
     * @return {String}
     */
    getRates() {
      return [
        {label: '6%', value: 6},
        {label: '7%', value: 7},
        {label: '8%', value: 8},
        {label: '9%', value: 9},
        {label: '10%', value: 10},
        {label: '11%', value: 11},
        {label: '12%', value: 12},
        {label: '13%', value: 13},
        {label: '14%', value: 14},
        {label: '15%', value: 15},
        {label: '16%', value: 16},
        {label: '17%', value: 17},
        {label: '18%', value: 18},
        {label: '19%', value: 19},
        {label: '20%', value: 20},
        {label: '21%', value: 21},
        {label: '22%', value: 22},
        {label: '23%', value: 23},
        {label: '24%', value: 24},
        {label: '25%', value: 25}
      ];
    },




    /**
     * Get listing terms
     *
     * @return {String}
     */
    getTerms() {
      return [
        {label: '6 Months', value: 6},
        {label: '12 Months', value: 12},
        {label: '18 Months', value: 18},
        {label: '24 Months', value: 24},
        {label: '36 Months', value: 36},
        {label: '48 Months', value: 48},
        {label: '60 Months', value: 60}
      ];
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
  .factory('ListingService', ListingService);

})();
