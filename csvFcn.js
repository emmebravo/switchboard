import csv from "csvtojson";
import DonorModel from "./models/DonorModel.js";

const csvFcn = async () => {
  try {
    const data = await csv().fromFile("donations.csv");

    DonorModel.create(
      data.map((obj) => ({
        id: obj.id,
        donor: {
          firstname: obj.donor_firstname,
          lastname: obj.donor_lastname,
          add1: obj.donor_add1,
          city: obj.donor_city,
          state: obj.donor_state,
          zip: obj.donor_zip,
          isEligibleForExpressLane:
            obj.donor_is_eligible_for_express_lane === "true" ? true : false,
          email: obj.donor_email,
          phone: obj.donor_phone,
        },
        contribution: {
          createdAt: obj.created_at,
          orderNumber: obj.order_number,
          contributionForm: obj.contribution_form,
          refcodes: {
            refcode: obj.refcode,
          },
          refcode: obj.refcode,
          recurringPeriod: obj.recurring_period,
          recurringDuration:
            obj.recurring_duration === "infinite"
              ? Infinity
              : obj.recurring_duration,
          isPaypal: obj.is_paypal === "true" ? true : false,
          isMobile: obj.is_mobile === "true" ? true : false,
          isExpress: obj.is_express === "true" ? true : false,
          withExpressLane: obj.with_express_lane === "true" ? true : false,
          expressSignup: obj.express_signup === "true" ? true : false,
          uniqueIdentifier: obj.unique_identifier,
          textMessageOption: obj.text_message_option,
          status: obj.status,
        },
        lineitems: [
          {
            sequence: +obj.sequence,
            entityId: +obj.entity_id,
            committeeName: obj.committee_name,
            amount: obj.amount,
            paidAt: obj.paid_at.substring(0, 10),
            paymentId: "",
            lineitemId: +obj.lineitem_id,
          },
        ],
        form: {
          name: obj.form_name,
          managingEntityName: obj.form_managing_entity_name,
          managingEntityCommitteeName: obj.form_managing_entity_committee_name,
        },
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

export default csvFcn;
