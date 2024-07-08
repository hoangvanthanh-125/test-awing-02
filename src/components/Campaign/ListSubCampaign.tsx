import React from "react";
import { SubCampaigninput } from "../../type/CampaignType";
import SubCampaignCard from "./SubCampaignCard";
interface ListSubCampaignProps {
  subCampaigns: SubCampaigninput[];
  activeSubCampaignKey: number;
  setActiveSubCampaignKey: (activeNum: number) => void;
}
const ListSubCampaign: React.FC<ListSubCampaignProps> = ({
  subCampaigns,
  activeSubCampaignKey,
  setActiveSubCampaignKey,
 
}) => {
  return (
    <>
    {subCampaigns?.map((subCampaign) => (
    <SubCampaignCard
      activeSubCampaignKey={activeSubCampaignKey}
      setActiveSubCampaignKey={setActiveSubCampaignKey}
      subCampaign={subCampaign}
      key={subCampaign.key}
    />
  ))}
  </>
  )
};
export default ListSubCampaign;
