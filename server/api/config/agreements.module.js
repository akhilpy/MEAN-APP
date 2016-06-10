import config from '../../config/environment';
import PDFDocument from 'pdfkit';

var S3 = require('aws-sdk').S3;
var S3S = require('s3-streams');

var Agreements = function() {};

// return typical month and day formats for file structure
function addLeadingChars(string, nrOfChars, leadingChar) {
  string = string + '';
  return Array(Math.max(0, (nrOfChars || 2) - string.length + 1)).join(leadingChar || '0') + string;
}

// build folder structure
function createPath(fileName) {
  var today = new Date();
  var year = today.getFullYear();
  var month = addLeadingChars(today.getMonth() + 1);
  var day = addLeadingChars(today.getDate());
  return year + '/' + month + '/' + day + '/';
}

function createDoc(content) {
  var doc = new PDFDocument;

  var upload = S3S.WriteStream(new S3(), {
    Bucket: process.env.AWS_bucket,
    Key: url,
    ContentType: 'application/pdf',
    ACL: 'public-read'
  });

  doc.pipe(upload);

  for(var i = 0; i < content.length; i++) {
    var section = content[i];

    // output the section title
    if(section.title) {
      doc.font('Times-Bold')
      .text(section.title, {
        align: 'center'
      })
      .moveDown()
    }

    // output each paragraph in the section
    for(var j = 0; j < content[i].paragraphs.length; j++) {
      doc.font('Times-Roman')
      .text(content[i].paragraphs[j], {
        align: 'left'
      })
      .moveDown()
    }

  }

  doc.end();
}

// create a listing's term sheet and upload to AWS
Agreements.prototype.termSheet = function(listing, listingID) {
  var termSheetUrl = '';

  if(listing.general.structure) {
    var path = 'term-sheets/';
    var prefix = 'https://' + process.env.AWS_bucket + '.s3.amazonaws.com/';
    var url = path + listingID + '-term-sheet.pdf';
    termSheetUrl = prefix + url;
    var termSheet = new PDFDocument;

    var upload = S3S.WriteStream(new S3(), {
      Bucket: process.env.AWS_bucket,
      Key: url,
      ContentType: 'application/pdf',
      ACL: 'public-read'
    });

    termSheet.pipe(upload);
    termSheet.font('Times-Bold')
    .text(listing.general.businessName, {
      align: 'center'
    })
    .moveDown()
    .text('SUMMARY OF PROPOSED TERMS FOR', {
      align: 'center'
    })
    .text('PROMISSORY NOTE FINANCING', {
      align: 'center'
    })
    .moveDown()
    .font('Times-Roman')
    .text('The following is a summary of the basic terms and conditions of a proposed promissory note financing of ' + listing.general.businessName + ', a ' + listing.general.structure + ' (the “Business”).  This term sheet is for discussion purposes only and is not binding on the Business or any Investor (as defined below), nor is the Business or any Investor obligated to consummate the promissory note financing (the “Financing”) until a definitive note purchase agreement has been agreed to and executed by the Business and the Investor.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Financing Amount:')
    .font('Times-Roman')
    .text('Up to $' + listing.details.amount + ' in aggregate principal amount (the “Authorized Amount”) of promissory notes (the “Notes”), with a minimum aggregate principal amount of $' + listing.details.amount + ' (the “Minimum Amount”). ', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Use of Proceeds:')
    .font('Times-Roman')
    .text(listing.details.usage, {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Eligible Investors:')
    .font('Times-Roman')
    .text('Each investor must be a resident of Ontario and must be an "accredited investor", as defined in National Instrument 45-106 - Prospectus Exemptions or meet another applicable prospectus exemption under the securities laws of the Province of Ontario. ', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Closings:')
    .font('Times-Roman')
    .text('The Business may close the sale of the Notes in one or more closings with one or more investors of the Notes acceptable to the Business (the “Investors”), subject to reaching the Minimum Amount.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Definitive Agreement:')
    .font('Times-Roman')
    .text('Each Note will be issued and sold pursuant to a note purchase subscription agreement (the “Note Purchase Agreement”) in a form satisfactory to the Business, IND (as herein defined), the Investor and their respective counsel, and to which the form of promissory note, the Guarantee (as herein defined) and any other related documents will be attached (collectively, the “Financing Documents”).', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Offers:')
    .font('Times-Roman')
    .text('The Business will allow each potential Investor to indicate the maximum amount he, she or it is willing to invest in the Note financing (“Maximum Investment”) and the minimum per annum interest rate at which he, she or it would be willing to accept on the Notes issued (“Minimum Interest”). In order to close the Financing, the Business will fill at least the Minimum Amount, up to the Authorized Amount, at the lowest interest rates offered.  If the Authorized Amount is not reached on the first closing, there may be additional closings within 60 days following the first closing, where additional Notes can be sold, but not at higher interest rates than the highest rate paid at the first closing. ', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Repayment; Maturity Date:')
    .font('Times-Roman')
    .text('The Business shall make equal successive monthly payments to the Investors, ' + listing.details.term + ' month amortization of the principal and interest to be payable,] beginning on the ___ day of the first month following the date of the Notes.  All remaining outstanding principal and unpaid accrued interest on the Notes will be due and payable ' + listing.details.term + ' months from the date of the Note (the “Maturity Date”).', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Interest:')
    .font('Times-Roman')
    .text('Interest will be due and payable on the principal amount outstanding under each Note at the rate agreed to by the Business and each Investor.  Interest will not be compounded, and payments will be predetermined over the amortization period. If the Business fails to make a payment due within 5 business days of its due date, the Business shall pay Investor a late charge of [5]% of the payment.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Pre-Payment:')
    .font('Times-Roman')
    .text('The principal and accrued interest may be prepaid at any time by the Business without penalty; provided, however, that any such pre-payment shall be made proportionally to all Investors based on the amount owed each Investor, as compared to the amount owed to all Investors.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Amendment and Waiver:')
    .font('Times-Roman')
    .text('The Financing Documents may be amended, or any term thereof waived, upon the written consent of the Business and Investor.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Affirmative Covenants:')
    .font('Times-Roman')
    .text('The Notes will contain customary affirmative covenants including, without limitation, as to: (i) permitted use of proceeds; (ii) punctual payment and performance of outstanding obligations; (iii) preservation of legal existence; and (iv) notice of any event of default, legal proceedings and change of control of the Business.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Restrictive Covenants:')
    .font('Times-Roman')
    .text('The Notes will contain customary restrictive covenants on the Business, including, without limitation as to: (i) incurring additional indebtedness; (ii) sell or otherwise dispose of principal assets; (iii) use the proceeds of the Financing for purposes other than permitted; (iv) paying of dividends or making of other distributions or the repurchase or redemption of capital stock; (v) the prepayment, redemption or repurchase of certain debt; (vi) the making of loans or investments; (vii) incurring of liens; (viii) entering into agreements restricting subsidiaries’ ability to pay dividends; and (ix) entering into agreements to consolidate, amalgamate, merge or sell all or substantially all of the assets of the Business. These covenants will be subject to a number of important exceptions and qualifications.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Events of Default:')
    .font('Times-Roman')
    .text('The Notes will contain customary events of default including, without limitation: (i) failure to pay interest and principal as they come due; (ii) breach of covenants set out in the Notes; (iii) bankruptcy or wind-up; and (iv) cross default to other indebtedness for borrowed money.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Unsecured Obligations:')
    .font('Times-Roman')
    .text('The Notes will be unsecured obligations of the Business but individuals directly or indirectly holding 25% or more of the voting rights associated with the Business will personally guarantee the Notes under a guarantee on a joint and several basis (the “Guarantee”).', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Ranking:')
    .font('Times-Roman')
    .text('The holders of each series of Notes will rank equally with other Notes of the same or different series and without preference in right of payment pursuant to the terms of the Notes. The Notes will rank behind any existing senior indebtedness or other prior ranking security against the Business. ', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Fees and Expenses:')
    .font('Times-Roman')
    .text('Each Investor will bear his, her or its own fees and expenses incurred in the transactions contemplated by this term sheet, with the sole exception that the Business will pay to facilitate the transfer of money from the Investor’s account to the Business’s escrow or other account for purposes of the Investor making the investment.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Commitment of Investment Funds:')
    .font('Times-Roman')
    .text('Each Investor will deliver the Principal Amount to the Business’s account within three (3) business days of being accepted by the Business at the Minimum Interest (“Acceptance Notice”). In the event that the closing does not take place within seven (7) days after the Business sends out the Acceptance Notice (“Refund Date”), whether due to the Minimum Amount not being fulfilled or otherwise, all money Investor deposited for the Note purchase shall be promptly returned to the Investor.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Agent:')
    .font('Times-Roman')
    .text('9424946 Canada Corp. – dba InvestNextDoor Canada (“IND”) an exempt market dealer registered in the Province of Ontario.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Commissions and Fees:')
    .font('Times-Roman')
    .text('The Business will pay IND a $500 filing fee plus a cash commission equal to 3% of the gross proceeds realized by the Business in respect of the sale of the Notes. The Business will also pay IND a cash fee equal to 1% of each monthly payment amount and the Investor will pay IND a cash fee equal to 1% of each monthly payment amount.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Approvals:')
    .font('Times-Roman')
    .text('The Financing is conditional upon, among other things, the Business and/or Investor obtaining any required third party approvals and consents.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Resale Restrictions:')
    .font('Times-Roman')
    .text('The Business is not a reporting issuer in any jurisdiction. There is no public market for the Notes. The Notes will be subject to a statutory hold period in Canada of the later of (i) four months and one day after the Closing Date; and (ii) the date the Corporation becomes a reporting issuer in a jurisdiction of Canada and will not be freely tradable by the subscribers during that time other than pursuant to applicable prospectus exemptions. The Notes are not assignable by the Investor except with the consent of the Business.', {
      align: 'left'
    })
    .moveDown()
    .font('Times-Bold')
    .text('Currency:')
    .font('Times-Roman')
    .text('All references to currency used herein refer to Canadian dollars.', {
      align: 'left'
    })
    .moveDown()

    termSheet.end();
  }

  return termSheetUrl;
}

module.exports = Agreements;
