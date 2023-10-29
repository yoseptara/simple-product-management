import React, { useState, useEffect, useCallback } from "react";
import { BaseTable } from "@src/components/common/BaseTable/BaseTable";
import { Pagination } from "@src/api/table.api";
import { EditableCell } from "./EditableProductCell";
import { BaseButton } from "@src/components/common/BaseButton/BaseButton";
import { useMounted } from "@src/hooks/useMounted";
import { BaseForm } from "@src/components/common/forms/BaseForm/BaseForm";
import { BaseSpace } from "@src/components/common/BaseSpace/BaseSpace";
import { Product, ProductList, getProducts } from "@src/api/products.api";
import { useNavigate } from "react-router-dom";
import {
  DASHBOARD_PATH,
  PRODUCTS_PATH,
  UPDATE_PATH,
} from "@src/components/router/AppRouter";

const initialPagination: Pagination = {
  current: 1,
  pageSize: 10,
};

export const EditableTable: React.FC = () => {
  const navigate = useNavigate();

  const [form] = BaseForm.useForm();
  const [tableData, setTableData] = useState<{
    data: ProductList;
    pagination: Pagination;
    loading: boolean;
  }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const [editingKey, setEditingKey] = useState(0);
  const { isMounted } = useMounted();

  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      getProducts(pagination.current ?? 0, pagination.pageSize ?? 0).then(
        ({ products, total }) => {
          if (isMounted.current) {
            setTableData({
              data: products,
              pagination: { ...pagination, total },
              loading: false,
            });
          }
        }
      );
    },
    [isMounted]
  );

  useEffect(() => {
    fetch(initialPagination);
  }, [fetch]);

  const handleTableChange = (pagination: Pagination) => {
    fetch(pagination);
    cancel();
  };

  const isEditing = (record: Product) => record.id === editingKey;

  // const edit = (record: Partial<Product> & { key: React.Key }) => {
  //   form.setFieldsValue({ name: "", description: "", images: "", ...record });
  //   setEditingKey(record.id!);
  // };

  const edit = (productId: number) => {
    navigate(`${PRODUCTS_PATH}/${productId}${UPDATE_PATH}`);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const handleViewDetail = (productId: number) => {
    navigate(DASHBOARD_PATH + productId);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "15%",
      editable: true,
    },
    // {
    //   title: "Images",
    //   dataIndex: "images",
    //   width: "30%",
    //   editable: true,
    //   render: (images: { id: number; url: string }[]) =>
    //     images.map((image) => <img src={image.url} alt="" />),
    // },
    {
      title: "Logo",
      dataIndex: "logo",
      width: "30%",
      editable: true,
      render: (logo: { id: number; url: string } | undefined) =>
        logo ? (
          <img
            src={logo.url}
            alt="Logo"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        ) : null,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "15%",
      render: (_: string, record: Product) => {
        // const editable = isEditing(record);
        return (
          <BaseSpace>
            {/* {editable ? (
              <>
                <BaseButton type="primary" onClick={() => save(record.id)}>
                  Save
                </BaseButton>
                <BasePopconfirm title="Are you sure?" onConfirm={cancel}>
                  <BaseButton type="dashed">Cancel</BaseButton>
                </BasePopconfirm>
              </>
            ) :  */}

            <>
              <BaseButton
                type="dashed"
                disabled={editingKey !== 0}
                onClick={() => edit(record.id)}
                // onClick={() => edit({ ...record, key: record.id })}
              >
                Edit
              </BaseButton>
              <BaseButton
                type="default"
                block
                onClick={() => handleViewDetail(record.id)}
              >
                View Detail
              </BaseButton>
            </>
            {/* } */}
          </BaseSpace>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Product) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <BaseForm form={form} component={false}>
      <BaseTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={tableData.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          ...tableData.pagination,
          onChange: cancel,
        }}
        onChange={handleTableChange}
        loading={tableData.loading}
        scroll={{ x: 800 }}
      />
    </BaseForm>
  );
};
