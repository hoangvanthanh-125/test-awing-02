import { Box, Button, Container, Divider, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import CampaignForm from "../../components/Campaign/CampaignForm";
import SubCampaignForm from "../../components/Campaign/SubCampaignForm";
import { REGEX_INPUT } from "../../constants/common";
import {
  AdsInput,
  Campaign,
  Information,
  InformationInput,
  InputClass,
  SubCampaign,
  SubCampaigninput,
} from "../../type/CampaignType";

const CampaignPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [informationData, setInfomationData] = useState<InformationInput>({
    name: new InputClass({ rule: REGEX_INPUT.IS_NOT_BLANK }),
    describe: new InputClass(),
  });
  const [informationErrors, setInformationErrors] = useState({ name: false });
  const [subCampaigns, setSubCampaigns] = useState<SubCampaigninput[]>([
    {
      key: 0,
      name: new InputClass({
        rule: REGEX_INPUT.IS_NOT_BLANK,
        value: "Chiến dịch con 1",
      }),
      status: new InputClass({ value: true }),
      ads: [
        {
          key: 1,
          name: new InputClass({
            rule: REGEX_INPUT.IS_NOT_BLANK,
            value: "Quảng cáo 1",
          }),
          quantity: new InputClass({
            rule: REGEX_INPUT.UNSIGN_INTEGER,
            value: 0,
          }),
        },
      ],
    },
  ]);

  // Handle change infomation data
  const handleSetInfomationData =
    (key: keyof Information) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      const rule = informationData[key]?.rule;
      const isError = rule ? !rule.test(newValue) : false;
      setInfomationData({
        ...informationData,
        [key]: new InputClass({
          ...informationData[key],
          value: newValue,
          error: submitted ? isError : false,
        }),
      });
      if (submitted) {
        setInformationErrors({
          ...informationErrors,
          [key]: !newValue,
        });
      }
    };

  // Validate
  const validate = () => {
    // validate informationName
    let flagError = informationData.name.validate();
    setInfomationData({
      ...informationData,
      name: new InputClass({
        ...informationData.name,
        error: flagError,
      }),
    });

    // Valudate subCampaigns
    const newSubCampaigns = [...subCampaigns];
    newSubCampaigns.forEach((sub: SubCampaigninput) => {
      const isErrorName = sub.name.validate();
      sub.name.error = isErrorName;
      if (isErrorName) {
        flagError = true;
      }

      // Check Error List Ads
      const listAds = sub.ads;
      if (listAds.length === 0) {
        flagError = true;
      }
      listAds.forEach((ads: AdsInput, index: number) => {
        const isErrorNameAds = ads.name.validate();
        const isQuantityError = ads.quantity.validate();
        listAds[index].name.error = isErrorNameAds;
        listAds[index].quantity.error = isQuantityError;
        if (isErrorNameAds || isQuantityError) {
          flagError = true;
        }
      });
    });
    setSubCampaigns(newSubCampaigns);
    return !flagError;
  };
  // SUBMIT FORM
  const handleSubmit = () => {
    setSubmitted(true);

    if (!validate()) {
      alert("Vui lòng điền đúng và đầy đủ thông tin.");
      return;
    } else {
      const finalData: Campaign = {
        information: {
          name: informationData.name.value as string,
          describe: informationData.describe?.value as string,
        },
        subCampaigns: subCampaigns.map((sub: SubCampaigninput) => {
          const listAds = sub.ads;
          const subFinal: SubCampaign = {
            name: sub.name.value as string,
            status: sub.status.value as boolean,
            ads: listAds.map((ad: AdsInput) => ({
              name: ad.name.value as string,
              quantity: ad.quantity.value as number,
            })),
          };
          return subFinal;
        }),
      };
      alert(
        `Thêm thành công chiến dịch\n${JSON.stringify({ Campaign: finalData })}`
      );
    }
  };

  return (
    <Container>
      <Box display={"flex"} justifyContent={"flex-end"} mt={2} mb={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <Divider></Divider>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
        <Tab label="Thông tin" />
        <Tab label="Chiến dịch con" />
      </Tabs>
      {tab === 0 && (
        <CampaignForm
          infomationData={informationData}
          handleSetInfomationData={handleSetInfomationData}
          errors={informationErrors}
        />
      )}
      {tab === 1 && (
        <SubCampaignForm
          submitted={submitted}
          subCampaigns={subCampaigns}
          setSubCampaigns={setSubCampaigns}
        />
      )}
    </Container>
  );
};

export default CampaignPage;
