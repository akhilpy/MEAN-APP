'use strict';

class NavbarController {
  //start-non-standard
  menu = [
    {
      'title': 'Become a Borrower',
      'state': 'login',
      'class': 'has-button'
    },
    {
      'title': 'Borrow',
      'state': 'borrow',
      'class': ''
    },
    {
      'title': 'Invest',
      'state': 'invest',
      'class': ''
    },
    {
      'title': 'FAQ',
      'state': 'faq',
      'class': ''
    }
  ];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, appConfig) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.isBorrower = Auth.isBorrower;
    this.isInvestor = Auth.isInvestor;
    this.getCurrentUser = Auth.getCurrentUser;
    this.site = appConfig.SITE;
  }
}

angular.module('investnextdoorCaApp')
  .controller('NavbarController', NavbarController);
