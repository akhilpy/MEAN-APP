'use strict';

describe('Controller: FaqController', function() {

  // load the controller's module
  beforeEach(module('investnextdoorCaApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var FaqController;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/faqs')
      .respond([
        {
          question: 'What does InvestNextDoor do?',
          answer: '<p>Our goal is to make investing in small businesses a smart and accessible investment option for everyone and provide businesses with access to fair market rates.</p>'
        },
        {
          question: 'What do you offer today?',
          answer: '<p>We are working towards this goal by partnering with leading community capital and credit groups such as Meridian Credit Union and Equifax.  We’ll seek to have conversations with communities across Canada. We want to talk to you about small business borrowing and credit, and how we can be part of making it a community-engaged experience.</p>'
        },
        {
          question: 'Why does community matter when it comes to small business borrowing?',
          answer: '<p>The economic challenges we have seen show us that small businesses thrive when they have the support of their core market.  That coffee shop you love, the dry cleaner that does your shirts just right, the bakery that has the best treats, all survive because of your support.</p><p>But guess what? The banks can’t love them like you do. It’s nothing personal, but their risk models compare them to the big companies, or the ones with lots of property or cash.  Unfortunately, that leaves small businesses with fewer options</p><p>This means giving businesses another borrowing option, and providing their customers and community, another way to express loyalty.  That starts with creating a level playing field with good information.</p>'
        }
      ]);

    scope = $rootScope.$new();
    state = $state;
    FaqController = $controller('FaqController', {
      $scope: scope
    });
  }));

  it('should attach a list of faqs to the controller', function() {
    $httpBackend.flush();
    expect(FaqController.allFaqs.length).toBe(3);
  });
});
