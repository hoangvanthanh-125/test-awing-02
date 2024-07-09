import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { REGEX_INPUT } from "../../constants/common";
import {
  Ads,
  AdsInput,
  InputClass,
  SubCampaigninput,
} from "../../type/CampaignType";
import { findIndexByKey } from "../../utils/helper";

interface LisAdsProps {
  listAds: AdsInput[];
  submitted: boolean;
  activeSubCampaignKey: number;
  subCampaignActive: SubCampaigninput;
  subCampaigns: SubCampaigninput[];
  setSubCampaigns: (list: SubCampaigninput[]) => void;
}

const LisAds: React.FC<LisAdsProps> = ({
  subCampaignActive,
  setSubCampaigns,
  subCampaigns,
  submitted,
  activeSubCampaignKey,
}) => {
  const [selectedAds, setSelectedAds] = useState<number[]>([]);

  // Change Ads
  const handleAdsChange = (
    subKey: number,
    adKey: number,
    field: keyof Ads,
    value: any
  ) => {
    const subIndex = findIndexByKey<SubCampaigninput>(
      subCampaigns,
      "key",
      subKey
    );
    if (subIndex < 0) {
      return;
    }
    const newSubCampaigns = [...subCampaigns];
    const currentAds = [...newSubCampaigns[subIndex].ads];

    const adIndex = findIndexByKey<AdsInput>(currentAds, "key", adKey);
    if (adIndex < 0) {
      return;
    }
    const rule = currentAds[adIndex][field].rule;
    const isError = rule ? !rule.test(value) : false;
    currentAds[adIndex][field] = new InputClass({
      ...currentAds[adIndex][field],
      value,
      error: submitted ? isError : false,
    });
    newSubCampaigns[subIndex].ads = [...currentAds];
    setSubCampaigns(newSubCampaigns);
  };

  // Add Ads
  const addAds = () => {
    const index = findIndexByKey<SubCampaigninput>(
      subCampaigns,
      "key",
      activeSubCampaignKey
    );
    if (index < 0) {
      return;
    }
    const newAds: AdsInput = {
      key: Date.now(),
      name: new InputClass({
        rule: REGEX_INPUT.IS_NOT_BLANK,
        value: "Quảng cáo " + (subCampaigns[index].ads.length + 1),
      }),
      quantity: new InputClass({
        rule: REGEX_INPUT.UNSIGN_INTEGER,
        value: 0,
        error: submitted,
      }),
    };
    const newSubCampaigns = [...subCampaigns];
    newSubCampaigns[index].ads.push(newAds);
    setSubCampaigns(newSubCampaigns);
  };

  // Select All
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedAds = subCampaignActive.ads.map((ad) => ad.key!);
      setSelectedAds(newSelectedAds);
      return;
    }
    setSelectedAds([]);
  };

  const handleSelectClick = (key: number) => {
    const selectedIndex = selectedAds.indexOf(key);
    let newSelectedAds: number[] = [...selectedAds];

    if(selectedIndex < 0){
      newSelectedAds.push(key)
    }
    else{
      newSelectedAds.splice(selectedIndex,1)
    }
    setSelectedAds(newSelectedAds);
  };

  // Delete Selected Ads
  const deleteSelectedAds = (selectedAds: number[]) => {
    const index = findIndexByKey<SubCampaigninput>(
      subCampaigns,
      "key",
      activeSubCampaignKey
    );
    if (index < 0) {
      return;
    }
    const newSubCampaigns = [...subCampaigns];
    newSubCampaigns[index].ads = newSubCampaigns[index].ads.filter(
      (ad) => !selectedAds.includes(ad.key!)
    );
    setSubCampaigns(newSubCampaigns);
    setSelectedAds([]);
  };

  return (
    <>
      <Typography mt={2} mb={2} textAlign={"start"} variant="h5">
        Danh sách quảng cáo
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedAds.length > 0 &&
                    selectedAds.length < subCampaignActive.ads.length
                  }
                  checked={
                    subCampaignActive.ads.length > 0 &&
                    selectedAds.length === subCampaignActive.ads.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>
                {selectedAds.length > 0 ? (
                  <Box display="flex" justifyContent="flex-start">
                    <IconButton
                      onClick={() => deleteSelectedAds(selectedAds)}
                      color="default"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <span>Tên quảng cáo</span>
                )}
              </TableCell>
              <TableCell>
                {selectedAds.length === 0 ? <span>Số lượng</span> : ""}
              </TableCell>
              <TableCell align="right">
                {" "}
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => addAds()}
                  >
                    Thêm
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subCampaignActive.ads.map((ad) => (
              <TableRow
                key={ad.key}
                selected={selectedAds.indexOf(ad.key!) !== -1}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAds.indexOf(ad.key!) !== -1}
                    onChange={() => handleSelectClick(ad.key!)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={ad.name.value}
                    onChange={(e) =>
                      handleAdsChange(
                        subCampaignActive.key!,
                        ad.key!,
                        "name",
                        e.target.value
                      )
                    }
                    required
                    fullWidth
                    error={ad.name.error}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={ad.quantity.value}
                    onChange={(e) =>
                      handleAdsChange(
                        subCampaignActive.key!,
                        ad.key!,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                    required
                    fullWidth
                    type="number"
                    error={ad.quantity.error}
                    inputProps={{ min: 1 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                  disabled={selectedAds.length > 0}
                    onClick={() => deleteSelectedAds([ad.key!])}
                    color="default"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LisAds;
