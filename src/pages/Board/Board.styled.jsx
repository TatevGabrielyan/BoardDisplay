import styled from 'styled-components';
import { Form, Typography, Button } from 'antd';

export const FormItem = styled(Form.Item)`
  margin: 0;
`;

export const TypographyLink = styled(Typography.Link)`
  margin-right: 8;
`;

export const AddButton = styled(Button)`
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 16px;
`;

export const FormComponent = styled('div')`
  border: 1px solid #ddd; 
  padding: 16px;
  text-align: center; 
  border: 1px solid #ddd;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

