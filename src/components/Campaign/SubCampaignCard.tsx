import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { SubCampaigninput } from "../../type/CampaignType";
interface SubCampaignCardProps {
  activeSubCampaignKey: number;
  setActiveSubCampaignKey: (activeNum: number) => void;
  subCampaign: SubCampaigninput;
}
const SubCampaignCard: React.FC<SubCampaignCardProps> = ({
  activeSubCampaignKey,
  setActiveSubCampaignKey,
  subCampaign,
}) => {
  const getErr = () => {
    if (subCampaign.name.error) {
      return true;
    }
    if (subCampaign.ads.length === 0) {
      return true;
    }
    for (let index = 0; index < subCampaign.ads.length; index++) {
      const currentAds = subCampaign.ads[index];

      if (currentAds.name.error || currentAds.quantity.error) {
        return true;
      }
    }
    return false;
  };
  return (
    <Card
    sx={{ minWidth: 150, margin: 1, flexShrink: 0 }}
      onClick={() => setActiveSubCampaignKey(subCampaign.key!)}
      style={{
        margin: 10,
        cursor: "pointer",
        border:
          activeSubCampaignKey === subCampaign.key
            ? "2px solid blue"
            : "1px solid gray",
      }}
    >
      <CardContent>
        <Typography alignItems={"center"} color={getErr() ? "red" : ""}>
          {subCampaign.name.value}
          <img style={{
          width:14,
          height:14,
          marginLeft:5
        }} src= {subCampaign.status.value ? "/active.svg" :"/inactive.svg"} />
        </Typography>
       
        <Typography variant="h6">
          {subCampaign.ads.reduce(
            (acc, ad) =>
              acc + (ad.quantity.value ? Number(ad.quantity.value) : 0),
            0
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default SubCampaignCard;
