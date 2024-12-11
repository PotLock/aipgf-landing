export const labelIcons: any = {
    MVP: { icon: "Crown.svg", color: "rgba(242, 46, 118, 0.08)", textColor: "rgba(242, 46, 118, 1)" },
    Bounty: { icon: "bounty.svg", color: "rgba(4, 164, 110, 0.08)", textColor: "rgba(4, 164, 110, 1)" },
    "Quick Start": {
        icon: "Timer.svg",
        color: "rgba(241, 238, 254, 1)",
        textColor: "rgba(109, 57, 228, 1)",
    },
    "A small build": {icon: "small.svg", color: "rgba(254, 246, 238, 1)", textColor: "rgba(255, 122, 0, 1)"}
};


export const timelineStyle: any = {
    DRAFT: {icon: "dart.svg", color: "#757575"},
    REVIEW: {icon: "review.svg", color: "#2388FF"},
    APPROVED:{icon: "check.svg", color: "#04A46E"},
    APPROVED_CONDITIONALLY: {icon: "check.svg", color: "#04A46E"},
    FUNDED: {icon: "check.svg", color: "#43a047"},
    PAYMENT_PROCESSING: {icon: "processing.svg", color: "rgba(255, 207, 39, 1)"},
    CANCELLED: {icon: "cancel.svg", color: "#F22E76"},
    REJECTED:{icon: "rejected.svg", color: "#F22E76"},
    ACCEPTING_SUBMISSIONS: {icon: "like.svg", color: "#2388FF"}
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

export const sortOptions = [
  {icon: "all.svg", label: "All"},
  {icon: "recent.svg", label: "Most recent"},
  {icon: "view.svg", label: "Most viewed"}
]

export const categoryOptions = [
  {icon: "all.svg", label: "All"},
  {icon: "draft-gray.svg", label: "Quick Start"},
  {icon: "check-gray.svg", label: "A small build"},
  {icon: "view.svg", label: "Bounty"},
  {icon: "approved-gray.svg", label: "MVP"}
]

export const stageOptions = [
  {icon: "all.svg", label: "All"},
  {icon: "draft-gray.svg", label: "Draft"},
  {icon: "view.svg", label: "Review"},
  {icon: "approved-gray.svg", label: "Approved"},
  {icon: "funded.svg", label: "Funded"},
  {icon: "check-gray.svg", label: "Approved - Conditional"},
  {icon: "rejected-gray.svg", label: "Rejected"},
  {icon: "cancel-gray.svg", label: "Cancelled"},
  {icon: "processing-gray.svg", label: "Payment - Processing"},
]

export const stageOptionsForRFPs = [
  {icon: "all.svg", label: "All"},
  {icon: "like-gray.svg", label: "Accepting Submissions"},
  {icon: "evaluation.svg", label: "Evaluation"},
  {icon: "approved-gray.svg", label: "Proposal Selected"},
  {icon: "cancelled.svg", label: "Cancelled"},
]
