import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { useState } from "react";
import { getVerificationComp, verificationStepsData } from "./useProfileData";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { Span } from "@client/comps/span/Span";
import { SvgCheck } from "@client/svgs/common/SvgCheck";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import "./VerificationStepper.scss";
export const VerificationStepper = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const [step, setStep] = useState(0);

  return (
    <Conditional
      value={layout}
      mobile={
        <MobileContent
          step={step}
          setStep={setStep}
        />
      }
      tablet={
        <NonMobileContent
          step={step}
          setStep={setStep}
        />
      }
      laptop={
        <NonMobileContent
          step={step}
          setStep={setStep}
        />
      }
      desktop={
        <NonMobileContent
          step={step}
          setStep={setStep}
        />
      }
    />
  );
};

const MobileContent = ({ step, setStep }: { step: number; setStep: any }) => {
  let verificationItem = verificationStepsData[step];
  return (
    <Div
      fx
      column
    >
      <Div
        flexFlow="row"
        justify="space-between"
      >
        {verificationStepsData.map((stepperItem, index) => (
          <Div
            border
            borderWidth={2}
            borderColor={stepperItem.completed && step != index ? "yellow" : "brown-4"}
            bg={step == index ? "yellow" : undefined}
            py={6}
            px={6}
            onClick={() => setStep(index)}
          >
            <Div
              align="center"
              justify="space-between"
            >
              {stepperItem.completed && step != index ? (
                <Div>
                  <Vector
                    as={SvgCheck}
                    color={"sand"}
                  />
                </Div>
              ) : (
                <Div>
                  {" "}
                  <Div
                    py={2}
                    px={3}
                    fontSize={13}
                    color={step == index ? "brown-5" : "sand"}
                  >
                    {" "}
                    {index + 1}
                  </Div>
                </Div>
              )}
            </Div>
          </Div>
        ))}
      </Div>
      <Div mt={20}>
        {verificationItem && verificationItem.name
          ? getVerificationComp(verificationItem.name)
          : null}
      </Div>
    </Div>
  );
};

const NonMobileContent = ({ step, setStep }: { step: number; setStep: any }) => {
  let verificationItem = verificationStepsData[step];
  return (
    <Div
      column
      width={"full"}
    >
      <Div
        flexFlow="row"
        justify="space-between"
        // width={"full"}
      >
        {verificationStepsData.map((stepperItem, index) => (
          <Div
            width={"full"}
            justify="space-around"
          >
            <Div
              border
              borderColor="brown-4"
              onClick={() => setStep(index)}
            >
              <Div
                bg={step == index ? "brown-4" : "brown-7"}
                py={8}
                align="center"
                justify="space-between"
              >
                {stepperItem.completed ? (
                  <Div
                    p={2}
                    mr={3}
                    ml={10}
                  >
                    <Vector
                      as={SvgCheckCircle}
                      color={"sand"}
                    />
                  </Div>
                ) : (
                  <Div
                    border
                    borderColor="brown-4"
                    py={3}
                    px={4}
                    mr={3}
                    ml={10}
                    bg={step == index ? "yellow" : undefined}
                  >
                    {" "}
                    <Div
                      py={2}
                      px={3}
                      fontSize={13}
                      color={step == index ? "brown-5" : "sand"}
                    >
                      {" "}
                      {index + 1}
                    </Div>
                  </Div>
                )}
                <Span
                  p={5}
                  px={16}
                  color={step == index ? "yellow" : "brown-10"}
                >
                  {stepperItem.label}
                </Span>
              </Div>
            </Div>
            {index != verificationStepsData.length - 1 && (
              <Div className="arrow-right">
                <Vector
                  as={SvgArrowRight}
                  color="dark-sand"
                  size={12}
                />
              </Div>
            )}
          </Div>
        ))}
      </Div>
      <Div mt={20}>
        {verificationItem && verificationItem.name
          ? getVerificationComp(verificationItem.name)
          : null}
      </Div>
    </Div>
  );
};
