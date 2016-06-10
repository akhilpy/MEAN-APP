'use strict';

(function() {

  function EmailService($http, $location) {
    var emailFrom = '"InvestNextDoor" <service@investnextdoor.ca>';
    var emailTo = 'development@thesnug.io';
    var siteURL = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    var dashboard = '<a href="' + siteURL + '/dashboard">Dashboard</a>';
    var marketplace = '<a href="' + siteURL + '/marketplace">Marketplace</a>';

    var Emails = {

      /**
       * Send a new email
       */
      new(email) {
        email.from = emailFrom;

        return $http.post('/api/mails', email)
        .then(response => {
          if(response.statusText === "Created") {
            return true;
          } else {
            return false;
          }
        })
        .catch(err => {
          return false;
        })
      },

      businessLink(name, id) {
        return '<a href="' + siteURL + '/marketplace/listing/' + id + '/profile" target="_blank">' + name + '</a>';
      },

      listingNewComment(args) {
        var html = '';
        html += '<p>Hello, ' + args.firstname + ',</p>';
        html += '<p><em>' + args.author + '</em> has left you a comment on ' + Emails.businessLink(args.business.name, args.business.id) + ' listing page.</p>';
        html += '<p>Comment:<br><em>"' + args.comment + '"</em></p>';
        html += '<p>Visit your listing page to reply ' + Emails.businessLink(args.business.name, args.business.id) + '.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Someone has left you a comment',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingCommentReply(args) {
        var html = '';
        html += '<p>Hello, ' + args.firstname + ',</p>';
        html += '<p><em>' + args.author + '</em> has replied to your comment on ' + Emails.businessLink(args.business.name, args.business.id) + ' listing page.</p>';
        html += '<p>Original Comment:<br><em>"' + args.originalComment + '"</em></p>';
        html += '<p>Comment:<br><em>"' + args.comment + '"</em></p>';
        html += '<p>Visit your listing page to view and reply ' + Emails.businessLink(args.business.name, args.business.id) + '.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Someone has replied to your comment',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingNewOffer(args) {
        var html = '';
        html += '<p>Hello, ' + args.firstname + ',</p>';
        html += '<p>' + args.username + ' is interested in your listing and has made you an offer!</p>';
        html += '<p>Offered Amount: ' + args.amount + '</p>';
        html += '<p>Offered Rate: ' + args.rate + '%</p>';
        html += '<p>You can view offers on your ' + dashboard + '.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'You have a new offer!',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingSubmitted(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Your listing has been submitted. In order to process your application the following steps need to be completed:</p>';
        html += '<p>1. Verify your Bank Account - within 3 days you will recieve two small deposits in your bank account. You will need to enter these amounts in your dashboard ' + Emails.businessLink(args.business.name, args.business.id) + '.<br>2. Owners with >25% ownership will need to complete a personal gaurantee form which has been emailed to them.</p>';
        html += '<p>Once your account has been verified and we receive the owner forms we will process your application. You should expect a response within 2 business days. You will then be able to review, update and publish your listing.</p>';
        html += '<p>Don\'t hesitate to let us know if you have questions.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your listing has been submitted',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingApproved(args) {
        var html = '';
        html += '<p>Congratulations ' + args.firstname + ', your listing has been approved.</p>';
        html += '<p>You can now set your interest rate and have it published on our Marketplace ' + Emails.businessLink(args.business.name, args.business.id) + '.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your listing has been approved!',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingPublished(args) {
        var html = '';
        html += '<p>Congratulations ' + args.firstname + ', your listing is now published.</p>';
        html += '<p>You can use the link below to promote your listing to your network.  We\'ve found that getting a few investors through your network to create offers early on will help the success rate of your listing.</p>';
        html += '<p>' + Emails.businessLink(args.business.name, args.business.id) + '</p>';
        html += '<p>For status updates on your listing please go to your ' + dashboard + '. You can now start promoting your listing to your network, respond to questions on your discussion board and approve access requests to potential investors.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your listing has been published!',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingFundingPending(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Congratulations you have recieved offers that match your funding target!</p>';
        html += '<p>You can either accept the offers now or wait to see if you get better offers prior to your listing\'s expiration date.</p>';
        html += '<p>For: ' + Emails.businessLink(args.business.name, args.business.id) + '<br>Offered Amount: $' + args.amount + '<br>Listing Deadline: ' + args.deadline + '</p>';
        html += '<p>To accept the offers:</p>'
        html += '<p>Go to your dashboard ' + dashboard + ' to confirm that all of the steps below are complete.</p>';
        html += '<p>1. Review offers and sign agreements.<br>2. Confirm repayment information</p>';
        html += '<p>Once these steps are complete funds will be transferred to your account, it typically only takes two to three business days to recieve funds.</p>';
        html += '<p>If you have any questions please don’t hesitate to contact us, we are here to help.</p>'
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'You have $' + args.amount + ' in offers',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingExpiredFundingPending(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Congratulations you have recieved offers that match your funding target!</p>';
        html += '<p>Please review the offers on your listing today, funds will only be available for 5 business days and then they will be returned to the investors.</p>';
        html += '<p>For: ' + Emails.businessLink(args.business.name, args.business.id) + '<br>Offered Amount: $[amount]<br>Listing Deadline: [deadline]</p>';
        html += '<p>To accept the offers:</p>'
        html += '<p>Go to your dashboard ' + dashboard + ' to confirm that all of the steps below are complete.</p>';
        html += '<p>1. Review offers and sign agreements.<br>2. Confirm repayment information</p>';
        html += '<p>Once these steps are complete funds will be transferred to your account, it typically only takes two to three business days to recieve funds.</p>';
        html += '<p>If you have any questions please don’t hesitate to contact us, we are here to help.</p>'
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Action Required: Offers Available',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingFundingComplete(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Congratulations on a successful listing!  Funds are on their way.</p>';
        html += '<p>Total Raised: $' + args.target + '<br>Fees: $' + args.fees + '<br>Total Transferred: ' + args.afterFees + '</p>';
        html += '<p>You can expect to recieve the funds within 3 business days.  Please visit your ' + dashboard + ' to view your agreements, repayment schedule and investment details.</p>'
        html += '<p>If you have any questions please don’t hesitate to contact us, we are here to help.</p>'
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your listing has been completed',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingRejected(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>We are sorry, but your application could not be accepted at this time. We have refunded your application fee back to your bank account and you should see it within the next 3-5 business days. If you have any question, you can email us at support@investnextdoor.ca.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your listing has been cancelled',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingCancelled(args) {
        var html = '';
        html += '<p>' + args.firstname + ', your listing is now closed.</p>';
        html += '<p>For more details go to your ' + dashboard + ' or contact us.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your listing has been closed',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingExpiringSoon(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Your listing will expire on [expiration].  Remember to promote your listing through your network, review your offers and respond to any questions from potential investors.</p>';
        html += '<p>If you have any questions please contact us.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your listing will expire soon',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingInvestorRequest(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>The following potential investor has requested access to ' + Emails.businessLink(args.business.name, args.business.id) + ' Financial details tab. The information within this email is confidential and should only be used for purposes of approving access to your listing.</p>';
        html += '<p>User Name: ' + args.investor.username + '<br>User Email: ' + args.investor.email + '<br>Phone: ' + args.investor.phone + '<br>City: ' + args.investor.city + '<br>Province: ' + args.investor.province + '<br>Investor Status: ' + args.investor.status + '</p>';
        html += '<p>' + dashboard + '</p>';
        html += '<p>Allowing potential investors access to your information can help them make a more informed decision in how much they are willing to offer.</p>';
        html += '<p>If you have any questions please contact us.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Potential Investor Access Request',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingInvestorApproved(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>' + args.business.name + ' has accepted your request to view their financial information. You can see the information on their markplace listing here ' + Emails.businessLink(args.business.name, args.business.id) + '.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Access approved for ' + args.business.name,
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingGuaranteeRequest(args) {
        var html = '';
        html += '<p>' + args.firstname + ',</p>';
        html += '<p>[business name] has created a listing on InvestNextDoor for the purposes of looking for funding for ' + Emails.businessLink(args.business.name, args.business.id) + '. Please complete the forms in the link below:</p>';
        html += '<p>[guarantee link]</p>';
        html += '<p>Until the forms are completed we will not be able to process the application.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Personal guarantee requested',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      listingGuaranteeApproved(args) {
        var html = '';
        html += '<p>' + args.firstname + ',</p>';
        html += '<p>[owner name] has completed the personal gaurantee form for listing ' + Emails.businessLink(args.business.name, args.business.id) + ' created by [borrower username].</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Personal guarantee provided',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      welcomeBorrower(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Welcome to the InvestNextDoor Community!</p>';
        html += '<p>At InvestNextDoor you have the opportunity to grow your business on your terms. We connect you with local investors who are just as passionate about growing their community as you are!</p>';
        html += '<p>Log in and start your listing today! ' + dashboard + '</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Welcome to InvestNextDoor',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      welcomeInvestor(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Welcome to the InvestNextDoor Community!</p>';
        html += '<p>At InvestNextDoor we are all about connecting investors like you with local businesses. You have the opportunity to ean a market rate of retrun while helping your community prosper.</p>';
        html += '<p>Log in and checkout our marketplace listings today! ' + dashboard + '</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Welcome to InvestNextDoor',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      welcomeAffiliate(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Welcome to the InvestNextDoor Community!</p>';
        html += '<p>We created InvestNextDoor to foster local peer investing opportunities that support community growth and prosperity. Locals helping local businesses thrive can be a win-win situation. We connect qualified businesses and local investors together so that businesses can get access to reasonable rates and investors can earn great returns.</p>';
        html += '<p>We look forward to connecting with you to discuss partner and affiliate opportunities. Please provide your availability for a call so that we can discuss next steps!</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Welcome to InvestNextDoor',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      resetPassword(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>We have recieved a request to reset your InvestNextDoor password.</p>';
        html += '<p>[reset password link]</p>';
        html += '<p>If you ignore this message, your password won\'t be changed.</p>';
        html += '<p>If you didn\'t request a password reset, let us know.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Reset your password',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      offerPending(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Your offer of $' + args.amount + ' for ' + args.rate + '% to ' + Emails.businessLink(args.business.name, args.business.id) + ' is pending.</p>';
        html += '<p>We will be contacting you shortly to complete the processing of your offer.  Please contact us within 48 hours if you wish to cancel your offer.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your offer is pending',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      offerApproved(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Your offer of $' + args.amount + ' for ' + args.rate + '% to ' + Emails.businessLink(args.business.name, args.business.id) + ' is now live.</p>';
        html += '<p>We will let you know if your offer is outbid or is accepted.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your offer is now live',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      offerRejected(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Unfortunately your offer to ' + Emails.businessLink(args.business.name, args.business.id) + ' has been rejected.  You can either place another bid or check out our Marketplace for another potential business who would really appreciate your help! ' + marketplace + '</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your offer has been rejected',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      offerAccepted(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Your recent offer was successful!</p>';
        html += '<p>You are now an investor in ' + Emails.businessLink(args.business.name, args.business.id) + '!<br>Investment: $[amount]<br>Rate: [rate]%<br>Term: [term] months</p>';
        html += '<p>You can find the details of your investment and access to copies of the completed agreements on your online ' + dashboard + '. Congratulations! Please don\t hesitate to contact us with any questions or concerns.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your offer has been accepted!',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      offerOutbid(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Your recent offer was outbid!</p>';
        html += '<p>Please log in to your InvestNextDoor account to submit a new offer on ' + Emails.businessLink(args.business.name, args.business.id) + '.</p>';
        html += '<p>The details of your bid can be found in your online ' + dashboard + ':</p>';
        html += '<p>Company: ' + Emails.businessLink(args.business.name, args.business.id) + '<br>Offered Amount: $[amount]<br>Offered Rate: [rate]%<br>Term: [term] months<br>Current Lowest Bid: $[lowest]</p>';
        html += '<p>If you don\'t want to rebid on this offer, browse our ' + marketplace + ' for other opportunities.</p>';
        html += '<p>Please don\'t hesitate to contact us with any questions or concerns.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your offer has been outbid',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      investorStatusUpdate(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Your status has been updated to accredited investor.</p>';
        html += '<p>Maximum offer limit: $' + args.maxOffer + '<br>Maximum annual limit $' + args.maxLimit + '</p>';
        html += '<p>Please note that businesses will be responsible for reviewing this information prior to completing any offers. You can now visit the ' + marketplace + ' and find a business to invest!</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Your investor status has updated',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      paymentsReceipt(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>This email contains important information regarding your recent InvestNextDoor transaction, please save it for your records.</p>';
        html += '<table><thead><tr><th>Item</th><th>Price</th><th>Discount</th><th>Total</th></tr></thead><tbody><tr><td>' + Emails.businessLink(args.business.name, args.business.id) + '</td><td>$[amount]</td><td>$[discount]</td><td>$[total]</td></tr><tr><td>InvestNextDoor Fee</td><td>&nbsp;</td><td>&nbsp;</td><td>$[fee]</td></tr></tbody></table>';
        html += '<p>It may take up to 3 business days for transactions to be completed.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'InvestNextDoor Payment Receipt',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      paymentsUpcoming(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Please note that your monthly repayment of $[repayment] will be withdrawn from your account on [date]</p>';
        html += '<p>' + Emails.businessLink(args.business.name, args.business.id) + '<br>Amount: $[amount]<br>Date: [date]<br>Repayments Remaining: [number of repayments]</p>';
        html += '<p>The details of your account can be found in your online ' + dashboard + '.</p>';
        html += '<p>Please don\'t hesitate to contact us with any questions or concerns.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Monthly Repayment Reminder',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      paymentsReceived(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>You have received a repayment deposit:</p>';
        html += '<p>' + Emails.businessLink(args.business.name, args.business.id) + '<br>Amount: $[amount]<br>Date: [date]<br>Repayments Remaining: [number of repayments]</p>';
        html += '<p>The details of your account can be found in your online ' + dashboard + '.</p>';
        html += '<p>Please don\'t hesitate to contact us with any questions or concerns.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: '[business name] Repayment Notice',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      bankValidation(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>Please verify your account in order to complete the setup of your account.</p>';
        html += '<p>Within three business days of creating your account you should have recieved two small deposits to your bank account. When you have them please login to your Dashboard and select "My Actions" and then the "verify bank account" action.</p>';
        html += '<p>' + dashboard + '.</p>';
        html += '<p>Please don\t hesitate to contact us if you have questions, we look forward to assisting you.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Bank Account Validation Required',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

      bankReminder(args) {
        var html = '';
        html += '<p>Hello ' + args.firstname + ',</p>';
        html += '<p>This is a reminder that your bank account needs to be verified. Please verify your account in order to complete the setup of your account.</p>';
        html += '<p>Within three business days of creating your account you should have recieved two small deposits to your bank account. When you have them please login to your Dashboard and select "My Actions" and then the "verify bank account" action.</p>';
        html += '<p>' + dashboard + '.</p>';
        html += '<p>Please don\t hesitate to contact us if you have questions, we look forward to assisting you.</p>';
        html += '<p>Thank you,<br>The InvestNextDoor Team</p>';

        var email = {
          from: emailFrom,
          to: args.email || emailTo,
          subject: 'Bank Account Validation Reminder',
          html: html
        }

        return Emails.new(email)
        .then(response => {
          return response;
        })
        .catch(err => {
          return response;
        });
      },

    }

    return Emails;

  }

angular.module('investnextdoorCaApp')
  .factory('Emails', EmailService);

})();
