'use strict';

(function() {

  function TeamService() {

    var Team = {

      /**
       * Get team members
       *
       * @return {String}
       */
      getTeam() {
        return [
          {
            image: 'assets/images/about/tabitha-creighton-150x150.jpg',
            name: 'Tabitha Creighton',
            title: 'CEO, Co-Founder',
            bio: '<p>Tabitha Creighton is CEO and co-founder of InvestNextDoor. She brings 18 years of experience to the role, much of it working with small businesses and financial technology. Tabitha has dedicated much of her recent career on crowdfunding and alternative finance models for small business. She sees these areas as creating a new model of capital access that is sorely needed.</p><p>Tabitha’s focus has been on developing models of business growth for firms of all sizes, using technology to eliminate barriers and creating new ways of solving old problems. In these roles she spent several years at Microsoft advising large and small corporations on how to make technology a strategic part of their business model.</p><p>Outside of her professional career, Tabitha has dedicated most of the last decade to several non-profit groups, supporting both the arts and the advancement of women and girls in technology.</p>'
          },
          {
            image: 'assets/images/about/lisa-ohman-150x150.jpg',
            name: 'Lisa Ohman',
            title: 'COO, Co-Founder',
            bio: '<p>Lisa Ohman is the Chief Operating Officer and co-founder of InvestNextDoor. She brings over a decade of experience in technology, professional services, community engagement, finance and international operations.</p><p>Prior to InvestNextDoor, Lisa ran the Strategic Initiatives and Mergers &amp; Acquisition integration teams at Active Network, a public software company recently acquired by Vista Equity Partners. During her professional career, Lisa has led large professional services teams responsible for implementing software and community engagement solutions for cities and municipalities. She has been a consultant for dozens of cities in North America, including the City of San Francisco and City of Orlando. Lisa is passionate about building strong local economies and supporting independent small businesses.</p><p>In her “spare” time she is an adventurer who enjoys everything from ice trekking in Antarctica to riding with the herds in the Okavango Delta of Botswana.</p>'
          },
          {
            image: 'assets/images/about/mike-morreale-150x150.png',
            name: 'Mike Morreale',
            title: 'Director, Community Capital',
            bio: '<p>Mike Morreale is the Managing Director, Community Capital Pools at InvestNextDoor. A native of Hamilton, Ontario, Mike has held several prominent roles after an award winning 12 year career in the Canadian Football League. Following his football career, he served as Director of Marketing and President of the CFL Players’ Association, Director of Business Development for First Canadian Title, and Vice President of FFM Capital. During this time Mike also excelled in the Private Capital markets and worked under several Exempt Market Dealers introducing accredited investors to alternative securities. Mike serves on several charitable boards and is a commentator on Sportsnet and panelist on TiCats TV. Mike currently resides in Grimsby, Ontario, with his wife Jennifer and his two daughters.</p>'
          }
        ];
      },


      /**
       * Get team advisors
       *
       * @return {String}
       */
      getAdvisors() {
        return [
          {
            image: 'assets/images/about/richard-swart-150x150.jpg',
            name: 'Richard Swart',
            title: 'Crowdfunding and Research Advisor',
            bio: '<p>Richard Swart is the Director of Research at the University of California, Berkeley overseeing the policies, best practices and innovation in entrepreneurial finance, including crowdfunding. Swart holds a PhD in information systems from Utah State University and studied at the University of Utah and Stanford University. He has more than 20 years of experience extending throughout the fields of finance, entrepreneurship, education and government. Following the passage of the JOBS Act, Swart assisted administration officials to coordinate several educational events throughout the United States. He currently serves as a consultant for Goldman Sachs’ 10,000 Small Businesses Program and is an active advisor or board member to several startup companies.</p>'
          },
          {
            image: 'assets/images/about/jim-creighton-150x150.jpg',
            name: 'Jim Creighton',
            title: 'Chief Investment & Risk Advisor',
            bio: '<p>Jim Creighton is currently a partner at Manifold Partners, LLC and Chief Executive Officer at Creighton Capital Management, LLC. Jim has over 30 years of experience in the financial industry. He was the Global Chief Investment Officer at Barclays Global Investors, Deutsche Asset Management, and Northern Trust. Mr. Creighton has also had roles in three successful startup investment organizations. He has extensive experience in the management and trading of quantitative portfolios at the highest level of institutional scale.</p>'
          },
          {
            image: 'assets/images/about/placeholder-1.png',
            name: 'Diane Rinnovatore',
            title: 'Securitization Advisor',
            bio: '<p>Diane Rinnovatore is a senior advisor to InvestNextDoor. She is currently a managing director with Star Mountain Capital, LLC, and an expert in small business debt and institutional placement structures. Her career spans managing directorships for debt capital markets and securitizations, at firms such as Barclay’s and Lehman Brothers. Diane provides guidance and advice to the company on topics related to product development and corporate strategy.</p>'
          },
          {
            image: 'assets/images/about/placeholder-2.jpg',
            name: 'Les Fabuss',
            title: 'Market and Partnerships Advisor',
            bio: '<p>Les Fabuss has been Senior Managing Director of Evercore Partners Inc. since joining it in October 30, 2008. At Evercore, Les advises corporate clients on mergers and acquisitions and other strategic transactions. He has extensive experience in the aerospace and defense industry and in working with private equity firms. Les had a 25-year career at Lehman Brothers, where he most recently served as a Vice Chairman of Global Investment Banking.</p>'
          },
          {
            image: 'assets/images/about/barry-abbott-150x150.jpg',
            name: 'Barry A. Abbott',
            title: 'Lead External Counsel',
            bio: '<p>Barry Abbott concentrates his practice on financial services, general corporate, payments and e-commerce law. Barry has represented numerous international and domestic institutions and has extensive experience in corporate law and financial services,including bank regulatory (and payment) issues, insurance law, and non-profit law. He has also been extremely active in e-commerce matters and has represented established companies and startups (including gaming companies) in all aspects of their Internet and e-commerce businesses.</p><p>Barry has been named by The Best Lawyers in America® for his expertise in banking and finance law, corporate law, financial services regulation law and insurance law.</p>'
          }
        ];
      },

    };

    return Team;
  }

  angular.module('investnextdoorCaApp')
    .factory('TeamService', TeamService);

})();
