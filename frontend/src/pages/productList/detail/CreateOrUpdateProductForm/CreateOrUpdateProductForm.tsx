import React, { useEffect, useState } from "react";
import { BaseForm } from "@src/components/common/forms/BaseForm/BaseForm";
import { BaseButton } from "@src/components/common/BaseButton/BaseButton";
import { notificationController } from "@src/controllers/notificationController";
import { BaseInput } from "@src/components/common/inputs/BaseInput/BaseInput";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import * as S from "./CreateOrUpdateProductForm.styles";
import { BaseCard } from "@src/components/common/BaseCard/BaseCard";
import { createProduct, updateProduct } from "@src/api/products.api";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PATH } from "@src/components/router/AppRouter";

interface Product {
  id?: number;
  name?: string;
  description?: string;
  logoUrl?: string;
  imageUrls?: Array<{ id: string; url: string }>;
}

interface CreateOrUpdateProductFormProps {
  product?: Product;
}

export const CreateOrUpdateProductForm: React.FC<
  CreateOrUpdateProductFormProps
> = ({ product }) => {
  const navigate = useNavigate();

  const [form] = BaseForm.useForm<{
    name: string;
    description?: string;
    logoUrl?: string;
    imageUrls?: string[];
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("Create Product");

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        logoUrl: product.logoUrl,
        imageUrls: product.imageUrls?.map(({ url }) => url),
      });
      setTitle("Update Product");
    }
  }, [product, form]);

  const onSubmit = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        if (product) {
          await updateProduct({ ...values, id: product.id! });
        } else {
          await createProduct(values);
        }

        notificationController.success({ message: "Success" });
        setIsLoading(false);
        navigate(DASHBOARD_PATH, { replace: true });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setIsLoading(false);
      });
  };

  return (
    <BaseCard id="createOrUpdateForm" title={title} padding="1.25rem 1.25rem 0">
      <BaseForm
        title={title}
        form={form}
        name="createOrUpdateForm"
        onValuesChange={(changedValues, allValues) => {
          // Do something when a field value changes
          console.log("Changed Values:", changedValues);
          console.log("All Values:", allValues);
        }}
      >
        <S.FormContent>
          <BaseForm.Item
            name="name"
            label="Name"
            initialValue={product?.name}
            rules={[{ required: true, message: "Product name is required" }]}
          >
            <BaseInput />
          </BaseForm.Item>
          <BaseForm.Item
            name="description"
            label="Description"
            initialValue={product?.description}
          >
            <BaseInput />
          </BaseForm.Item>
          <BaseForm.Item
            name="logoUrl"
            label="Logo URL"
            initialValue={product?.logoUrl}
          >
            <BaseInput />
          </BaseForm.Item>

          <BaseForm.List
            name="imageUrls"
            initialValue={product?.imageUrls?.map((url) => ({ url }))}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <BaseForm.Item
                    key={key}
                    {...restField}
                    name={name}
                    label={`Image URL ${key + 1}`}
                    rules={[
                      {
                        required: true,
                        message: `Please input image URL ${key + 1}!`,
                      },
                    ]}
                  >
                    <BaseInput
                      placeholder={`Input image URL ${key + 1}`}
                      style={{ width: "80%" }}
                      suffix={
                        fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(name)}
                          />
                        ) : null
                      }
                    />
                  </BaseForm.Item>
                ))}
                <BaseForm.Item>
                  <BaseButton
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Image URL
                  </BaseButton>
                </BaseForm.Item>
              </>
            )}
          </BaseForm.List>
        </S.FormContent>

        <BaseButton type="primary" onClick={onSubmit} loading={isLoading}>
          Submit
        </BaseButton>
      </BaseForm>
    </BaseCard>
  );
};
