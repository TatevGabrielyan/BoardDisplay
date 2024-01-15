import React, { useState } from 'react';
import { Form, InputNumber, Popconfirm, Table, Typography } from 'antd';
import BoardDisplay from '../../components/BoardDisplay/BoardDisplay';
import calculateOptimalLayout from '../../components/utils/utils';
import * as Styled from './Board.styled'

const originData = [];

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = <InputNumber min={1}/>;
  return (
    <td {...restProps}>
      {editing ? (
        <Styled.FormItem
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Styled.FormItem>
      ) : (
        children
      )}
    </td>
  );
};

const App = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [boards, setBoards] = useState([]);
  const [scraps, setScraps] = useState([]); 
  
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      height: '',
      length: '',
      quantity: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
  
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
        
        const { boards: updatedBoards, scraps: updatedScraps } = calculateAndDisplayLayout(newData);
        setBoards(updatedBoards);
        setScraps(updatedScraps);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const handleDelete = (key) => {
    setData((prevData) => {
      const newData = prevData.filter((item) => item.key !== key);
  
      const { boards: updatedBoards, scraps: updatedScraps } = calculateAndDisplayLayout(newData);
  
      setBoards(updatedBoards);
      setScraps(updatedScraps);
  
      return newData;
    });
  };
  
  
  const handleAdd = () => {
    form.validateFields().then((values) => {
      const tempValues = {
        height: values.editable_height,
        length: values.editable_length,
        quantity: values.editable_quantity,
      };
  
      const isFormFilled = Object.values(tempValues).every((value) => value !== undefined && value !== null);
  
      if (isFormFilled) {
        const newKey = data.length.toString();
        const newRow = { key: newKey, ...tempValues };
  
        const updatedData = [...data, newRow];
        setData(updatedData);
        form.resetFields(['editable_height', 'editable_length', 'editable_quantity']);
  
        calculateAndDisplayLayout(updatedData); 
      }
    });
  };
  
  const calculateAndDisplayLayout = (updatedData) => {
    const dimensions = updatedData.map(({ length, height }) => ({ length, height }));
    const { boards, scraps } = calculateOptimalLayout(updatedData);
    console.log('Optimized Cut Layout:');
    console.log('Number of Boards:', boards.length);
    console.log('Boards:', boards);
    console.log('Scraps:', scraps);
    setBoards(boards);
    return { boards, scraps };
  };
  
  const columns = [
    {
      title: 'Height',
      dataIndex: 'height',
      width: '25%',
      editable: true,
    },
    {
      title: 'Length',
      dataIndex: 'length',
      width: '15%',
      editable: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '40%',
      editable: true,
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Styled.TypographyLink onClick={() => save(record.key)}>
              Save
            </Styled.TypographyLink>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a> Cancel </a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (_, record) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <a> Delete</a>
        </Popconfirm>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'length' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Styled.FormComponent>
      <Form.Item label="Height" name="editable_height">
            <InputNumber min={1}/>
          </Form.Item>
          <Form.Item label="Length" name="editable_length">
            <InputNumber min={1}/>
          </Form.Item>
          <Form.Item label="Quantity" name="editable_quantity">
            <InputNumber min={1}/>
          </Form.Item>
          <Styled.ButtonContainer>
          <Styled.AddButton type="submit" onClick={handleAdd}>
            Add
          </Styled.AddButton>
          </Styled.ButtonContainer>
        </Styled.FormComponent>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
         <BoardDisplay dimensions={data} boards={boards} />
    </Form>
  );
};

export default App;
