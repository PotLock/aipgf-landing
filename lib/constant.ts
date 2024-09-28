export const labelIcons: any = {
    MVP: { icon: "solarcrownbroken.svg", color: "#f0cf8e" },
    Bounty: { icon: "bounty.svg", color: "#7b66dc", textColor: "#fff" },
    "Quick Start": {
        icon: "QuickStart.svg",
        color: "#0646bc",
        textColor: "#fff",
    },
};


export const timelineStyle: any = {
    DRAFT: "#757575",
    REVIEW: "#1976d2",
    APPROVED:"#43a047",
    APPROVED_CONDITIONALLY: "#43a047",
    FUNDED: "#43a047",
    PAYMENT_PROCESSING: "#ff9800",
    CANCELLED: "#f44336",
    REJECTED:"#f44336"
}

export const proposalStatusOptions = [
    {
      label: "Draft",
      value: { status: "DRAFT" },
    },
    {
      label: "Review",
      value: {
        status: "REVIEW",
        sponsor_requested_review: false,
        reviewer_completed_attestation: false,
      },
    },
    {
      label: "Approved",
      value: {
        status: "APPROVED",
        sponsor_requested_review: true,
        reviewer_completed_attestation: false,
      },
    },
    {
      label: "Approved-Conditionally",
      value: {
        status: "APPROVED_CONDITIONALLY",
        sponsor_requested_review: true,
        reviewer_completed_attestation: false,
      },
    },
    {
      label: "Rejected",
      value: {
        status: "REJECTED",
        sponsor_requested_review: true,
        reviewer_completed_attestation: false,
      },
    },
    {
      label: "Canceled",
      value: {
        status: "CANCELED",
        sponsor_requested_review: false,
        reviewer_completed_attestation: false,
      },
    },
    {
      label: "Payment-processing",
      value: {
        status: "PAYMENT_PROCESSING",
        kyc_verified: false,
        test_transaction_sent: false,
        request_for_trustees_created: false,
        sponsor_requested_review: true,
        reviewer_completed_attestation: false,
      },
    },
    {
      label: "Funded",
      value: {
        status: "FUNDED",
        trustees_released_payment: true,
        kyc_verified: true,
        test_transaction_sent: true,
        request_for_trustees_created: true,
        sponsor_requested_review: true,
        reviewer_completed_attestation: false,
      },
    },
];