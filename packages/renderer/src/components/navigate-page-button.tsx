import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function NavigatePageButton({ step, Icon }: { step: number; Icon: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(step)} variant='text' color='default' size="large">
      {Icon}
    </Button>
  );
}

export default NavigatePageButton;
