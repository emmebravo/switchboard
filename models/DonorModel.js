import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({
  id: { type: String },
  donor: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    addr1: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    country: {
      type: String,
    },
    isEligibleForExpressLane: {
      type: Boolean,
    },
    employerData: {
      employer: {
        type: String,
      },
      occupation: {
        type: String,
      },
      employerAddr1: {
        type: mongoose.Schema.Types.Mixed,
      },
      employerCity: {
        type: mongoose.Schema.Types.Mixed,
      },
      employerState: {
        type: mongoose.Schema.Types.Mixed,
      },
      employerCountry: {
        type: mongoose.Schema.Types.Mixed,
      },
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  contribution: {
    createdAt: {
      type: String,
    },
    orderNumber: {
      type: String,
    },
    contributionForm: {
      type: String,
    },
    refcodes: {
      refcode: {
        type: String,
      },
    },
    refcode: {
      type: String,
    },
    refcode2: {
      type: mongoose.Schema.Types.Mixed,
    },
    creditCardExpiration: {
      type: mongoose.Schema.Types.Mixed,
    },
    recurringPeriod: {
      type: String,
    },
    recurringDuration: {
      type: Number,
    },
    weeklyRecurringSunset: {
      type: mongoose.Schema.Types.Mixed,
    },
    abTestName: {
      type: mongoose.Schema.Types.Mixed,
    },
    isRecurring: {
      type: Boolean,
    },
    isPaypal: {
      type: Boolean,
    },
    isMobile: {
      type: Boolean,
    },
    abTestVariation: {
      type: mongoose.Schema.Types.Mixed,
    },
    isExpress: {
      type: Boolean,
    },
    withExpressLane: {
      type: Boolean,
    },
    expressSignup: {
      type: Boolean,
    },
    uniqueIdentifier: {
      type: String,
    },
    textMessageOption: {
      type: String,
    },
    giftDeclined: {
      type: mongoose.Schema.Types.Mixed,
    },
    giftIdentifier: {
      type: mongoose.Schema.Types.Mixed,
    },
    shippingName: {
      type: mongoose.Schema.Types.Mixed,
    },
    shippingAddr1: {
      type: mongoose.Schema.Types.Mixed,
    },
    shippingCity: {
      type: mongoose.Schema.Types.Mixed,
    },
    shippingState: {
      type: mongoose.Schema.Types.Mixed,
    },
    shippingZip: {
      type: mongoose.Schema.Types.Mixed,
    },
    shippingCountry: {
      type: mongoose.Schema.Types.Mixed,
    },
    smartBoostAmount: {
      type: mongoose.Schema.Types.Mixed,
    },
    customFields: {
      type: [],
    },
    status: {
      type: String,
    },
    thanksUrl: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  lineitems: {
    type: [mongoose.Schema.Types.Mixed],
  },
  form: {
    name: {
      type: String,
    },
    kind: {
      type: String,
    },
    ownerEmail: {
      type: mongoose.Schema.Types.Mixed,
    },
    managingEntityName: {
      type: String,
    },
    managingEntityCommitteeName: {
      type: String,
    },
  },
});

const DonorModel = mongoose.model("donor", DonorSchema);

export default DonorModel;
