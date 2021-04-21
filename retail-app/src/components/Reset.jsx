import React from 'react';
import { Button } from 'antd';

function Reset(props) {
  const clearInput = () => props.form.resetFields();
  return (
    <Button
      className='reset-btn'
      type='link'
      htmlType='button'
      onClick={() => clearInput()}
    >
      Reset
    </Button>
  );
}
export default Reset;
