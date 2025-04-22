import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserDocument } from "@core/types/users/UserDocument";
import { SumsubApplicantDataDocument } from "@core/types/verification/SumsubApplicantDataDocument";
import { CardSection } from "@client/comps/cards/CardSection";
import { Heading } from "@client/comps/heading/Heading";
import { Button } from "@client/comps/button/Button";
import { Card } from "@client/comps/cards/Card";
import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { PageLoading } from "@client/comps/page/PageLoading";
import { Verification } from "#app/services/verification";
import { SumsubSection } from "./SumsubSection";

export const SumsubCard = ({ user }: { user: UserDocument }) => {
  const userId = user._id;

  const query = useQuery({
    queryKey: ["sumsub-applicant-data", userId],
    queryFn: () => Verification.getSumsubApplicantData({ userId }),
    placeholderData: (prev) => prev,
  });

  let applicantData: SumsubApplicantDataDocument | undefined =
    query.data?.applicantData;

  function calculateAge(birthday: string) {
    const bday = new Date(birthday);
    const ageDifMs = Date.now() - bday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  let bodyContent;
  let reviewContent;

  if (!applicantData) {
    bodyContent = <PageLoading />;
  } else {
    const reviewAnswer = applicantData.review?.reviewResult?.reviewAnswer;
    const pdfUrl = `https://cockpit.sumsub.com/checkus#/applicants/${applicantData.id}/applicantReport?clientId=${applicantData.clientId}`;

    reviewContent =
      reviewAnswer === "GREEN" ? (
        <Fragment></Fragment>
      ) : (
        <Div gap={16}>
          <SumsubSection
            heading="Rejection Type"
            value={applicantData.review?.reviewResult?.reviewRejectType || ""}
          />
          <SumsubSection
            heading="Rejection Labels"
            value={
              applicantData.review?.reviewResult?.rejectLabels?.join(", ") || ""
            }
          />
        </Div>
      );

    bodyContent = (
      <Fragment>
        <CardSection position="header">
          <Heading>{"Applicant Info"}</Heading>
        </CardSection>
        <CardSection
          column
          gap={16}
        >
          <Div gap={16}>
            <SumsubSection
              heading="User ID"
              value={applicantData?.externalUserId || ""}
            />
            <SumsubSection
              heading="Email"
              value={applicantData.email || ""}
            />
          </Div>
          <Div gap={16}>
            <SumsubSection
              heading="First Name"
              value={applicantData.info?.firstNameEn || ""}
            />
            <SumsubSection
              heading="Last Name"
              value={applicantData.info?.lastNameEn || ""}
            />
          </Div>
          <Div gap={16}>
            <SumsubSection
              heading="Age"
              value={calculateAge(applicantData.info?.dob || "")}
            />
            <SumsubSection
              heading="Gender"
              value={applicantData.info?.gender || ""}
            />
            <SumsubSection
              heading="Country"
              value={applicantData.info?.country || ""}
            />
          </Div>
          <Div gap={16}>
            <SumsubSection
              heading="Review Status"
              value={reviewAnswer || ""}
            />
          </Div>
          <Div gap={16}>
            <Link
              type="a"
              href={pdfUrl}
              target="_blank"
              hover="none"
            >
              <Button
                kind="primary"
                label="PDF"
              />
            </Link>
          </Div>
          {reviewContent}
        </CardSection>
      </Fragment>
    );
  }

  return <Card column>{bodyContent}</Card>;
};
