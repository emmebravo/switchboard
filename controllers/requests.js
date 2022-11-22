import "dotenv/config";
import DonorModel from "../models/DonorModel.js";

const getInfo = async (request, response) => {
  try {
    const donorInfo = await DonorModel.find();

    response.json({ donorInfo });
  } catch (error) {
    console.log(error);
  }
};

const webhook = async (request, response) => {
  try {
    const { donor, contribution, lineitems, form } = request.body;

    DonorModel.create({
      donor: {
        firstname: donor.firstname,
        lastname: donor.lastname,
        addr1: donor.addr1,
        city: donor.city,
        state: donor.state,
        zip: donor.zip,
        country: donor.country,
        isEligibleForExpressLane: donor.isEligibleForExpressLane,
        employerData: {
          employer: donor.employerData.employer,
          occupation: donor.employerData.occupation,
          employerAddr1: donor.employerData.employerAddr1,
          employerCity: donor.employerData.employerCity,
          employerState: donor.employerData.employerState,
          employerCountry: donor.employerData.employerCountry,
        },
        email: donor.email,
        phone: donor.phone,
      },
      contribution: {
        createdAt: contribution.createdAt,
        orderNumber: contribution.orderNumber,
        contributionForm: contribution.contributionForm,
        refcodes: {
          refcode: contribution.refcodes.refcode,
        },
        refcode: contribution.refcode,
        refcode2: contribution.refcodes2,
        creditCardExpiration: contribution.creditCardExpiration,
        recurringPeriod: contribution.recurringPeriod,
        recurringDuration: contribution.recurringDuration,
        weeklyRecurringSunset: contribution.weeklyRecurringSunset,
        abTestName: contribution.abTestName,
        isRecurring: contribution.isRecurring,
        isPaypal: contribution.isPaypal,
        isMobile: contribution.isMobile,
        abTestVariation: contribution.abTestVariation,
        isExpress: contribution.isExpress,
        withExpressLane: contribution.withExpressLane,
        expressSignup: contribution.expressSignup,
        uniqueIdentifier: contribution.uniqueIdentifier,
        textMessageOption: contribution.textMessageOption,
        giftDeclined: contribution.giftDeclined,
        giftIdentifier: contribution.giftIdentifier,
        shippingName: contribution.shippingName,
        shippingAddr1: contribution.shippingAddr1,
        shippingCity: contribution.shippingCity,
        shippingState: contribution.shippingState,
        shippingZip: contribution.shippingZip,
        shippingCountry: contribution.shippingCountry,
        smartBoostAmount: contribution.smartBoostAmount,
        customFields: contribution.customFields,
        status: contribution.status,
        thanksUrl: contribution.thanksUrl,
      },
      lineitems: [
        {
          sequence: lineitems[0].sequence,
          entityId: lineitems[0].entityId,
          fecId: lineitems[0].fecId,
          committeeName: lineitems[0].committeeName,
          amount: lineitems[0].amount,
          paidAt: lineitems[0].paidAt.substring(0, 10),
          paymentId: lineitems[0].paymentId,
          lineitemId: lineitems[0].lineitemId,
        },
      ],
      form: {
        name: form.name,
        kind: form.kind,
        ownerEmail: form.ownerEmail,
        managingEntityName: form.managingEntityName,
        managingEntityCommitteeName: form.managingEntityCommitteeName,
      },
    });

    response.status(200).json({ message: "webhooked received" });
  } catch (error) {
    console.log(error);
  }
};

export { getInfo, webhook };
