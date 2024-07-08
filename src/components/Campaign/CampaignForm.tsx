import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { InformationInput } from '../../type/CampaignType';

interface CampaignFormProps {
  handleSetInfomationData: (describe: keyof InformationInput) => (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  infomationData: InformationInput;
  errors: { name: boolean };
}

const CampaignForm: React.FC<CampaignFormProps> = ({ infomationData, handleSetInfomationData, errors }) => {
  return (
    <Box>
      <Typography variant="h6">Thông tin</Typography>
      <TextField
        label="Tên chiến dịch"
        value={infomationData.name.value}
        onChange={handleSetInfomationData("name")}
        required
        fullWidth
        margin="normal"
        variant="standard"
        error={infomationData.name.error}
        helperText={infomationData.name.error ? 'Tên chiến dịch là bắt buộc' : ''}
      />
      <TextField
        label="Mô tả"
        value={infomationData.describe?.value}
        onChange={handleSetInfomationData("describe")}
        fullWidth
        margin="normal"
        variant="standard"
      />
    </Box>
  );
};
export default CampaignForm;