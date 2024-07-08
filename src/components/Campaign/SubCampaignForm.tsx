import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { REGEX_INPUT } from "../../constants/common";
import {
  AdsInput,
  InputClass,
  SubCampaigninput,
} from "../../type/CampaignType";
import { findIndexByKey, findItemByKey } from "../../utils/helper";
import LisAds from "./ListAds";
import ListSubCampaign from "./ListSubCampaign";

interface SubCampaignFormProps {
  subCampaigns: SubCampaigninput[];
  setSubCampaigns: (subCampaigns: SubCampaigninput[]) => void;
  submitted: boolean;
}

const SubCampaignForm: React.FC<SubCampaignFormProps> = ({
  subCampaigns,
  setSubCampaigns,
  submitted,
}) => {
  const [activeSubCampaignKey, setActiveSubCampaignKey] = useState<number>(0);

  // Add Sub Campaign
  const addSubCampaign = () => {
    const subKey = Date.now();
    const initAds: AdsInput = {
      name: new InputClass({
        rule: REGEX_INPUT.IS_NOT_BLANK,
        value: "Quảng cáo 1",
      }),
      quantity: new InputClass({
        rule: REGEX_INPUT.UNSIGN_INTEGER,
        value: 0,
        error: submitted,
      }),
      key: 1,
    };
    const newSubCampaign: SubCampaigninput = {
      key: subKey,
      name: new InputClass({
        rule: REGEX_INPUT.IS_NOT_BLANK,
        value: "Chiến dịch con " + (subCampaigns.length + 1),
      }),
      status: new InputClass({ value: true }),
      ads: [initAds],
    };
    setSubCampaigns([...subCampaigns, newSubCampaign]);
    setActiveSubCampaignKey(subKey);
  };

  // Change SubCampaign
  const handleChangeSubCampaignInfo = (
    field: keyof Omit<SubCampaigninput, "ads" | "key">,
    value: any
  ) => {
    const index = findIndexByKey<SubCampaigninput>(
      subCampaigns,
      "key",
      activeSubCampaignKey
    );
    if (index < 0) {
      return;
    }
    const newSubCampaigns = [...subCampaigns];
    const rule = newSubCampaigns[index][field].rule;
    const isError = rule ? !rule.test(value) : false;
    newSubCampaigns[index][field] = new InputClass({
      ...newSubCampaigns[index][field],
      value: value,
      error: submitted ? isError : false,
    });
    setSubCampaigns(newSubCampaigns);
  };

  // get Active
  const subCampaignActive = findItemByKey<SubCampaigninput>(
    subCampaigns,
    "key",
    activeSubCampaignKey
  );
  return (
    <Box mt={2}>
      <Box display="flex" mb={2} alignItems={"flex-start"}>
        <IconButton
          style={{
            flexShrink: 0,
            height: 40,
            width: 40,
            background: "lightgray",
            marginTop: 10,
          }}
          color="error"
          onClick={addSubCampaign}
        >
          <AddIcon />
        </IconButton>
        <Box display="flex" overflow="auto" flexWrap={"nowrap"}>
          <ListSubCampaign
            setActiveSubCampaignKey={setActiveSubCampaignKey}
            subCampaigns={subCampaigns}
            activeSubCampaignKey={activeSubCampaignKey}
          />
        </Box>
      </Box>
      {activeSubCampaignKey !== null && (
        <Box mb={2}>
          <Grid container>
            <Grid item xs={10}>
              <TextField
                variant="standard"
                label="Tên chiến dịch con"
                value={subCampaignActive?.name.value}
                onChange={(e) =>
                  handleChangeSubCampaignInfo("name", e.target.value)
                }
                required
                fullWidth
                margin="normal"
                error={subCampaignActive?.name?.error}
                helperText={
                  subCampaignActive?.name?.error
                    ? "Tên chiến dịch con là bắt buộc"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subCampaignActive?.status.value as boolean}
                    onChange={(e) =>
                      handleChangeSubCampaignInfo("status", e.target.checked)
                    }
                  />
                }
                label="Đang hoạt động"
              />
            </Grid>
          </Grid>

          <LisAds
            activeSubCampaignKey={activeSubCampaignKey}
            listAds={subCampaignActive!.ads}
            subCampaignActive={subCampaignActive!}
            subCampaigns={subCampaigns}
            setSubCampaigns={setSubCampaigns}
            submitted={submitted}
          />
        </Box>
      )}
    </Box>
  );
};

export default SubCampaignForm;
