import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from 'react-router-dom';
import {Form, Input, Button, Col, Row, Typography} from 'antd';
import {IRootState} from "../../redux/store";
import {axiosAuth} from "../../axios-instances";
import {CategoryInterface} from "../../types/categories";
import {addCategory, updateCategory} from "../../redux/actions/categoriesActions";

interface CategoryValues {
    name: string,
    description?: string
}

const AddAndEditCategory: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [editCategory, setEditCategory] = useState<CategoryInterface | undefined>(undefined);
    const isLoading = useSelector<IRootState, boolean>((state) => state.categories.isLoading);
    const [form] = Form.useForm();
    const {TextArea} = Input;
    const {Title} = Typography;
    useEffect(() => {
        if (location.state && location.state.categoryId) {
            axiosAuth.get(`/api/categories/${location.state.categoryId}`).then((response): void => {
                setEditCategory(response.data);
            });
        }
    }, [location])
    useEffect(() => {
        if (editCategory) {
            let {name, description} = editCategory;
            form.setFieldsValue({
                name, description
            })
        }
    }, [editCategory, form]);
    const onFinish = (values: CategoryValues) => {
        if (editCategory) {
            dispatch(updateCategory({
                id: editCategory.id,
                ...values
            }))
        } else {
            dispatch(addCategory(values));
        }
    };
    return (
        <Form
            name="cats-form"
            className="add-and-edit-category"
            form={form}
            layout={'vertical'}
            onFinish={onFinish}
        >
            <Title level={3}>{editCategory ? 'Редактировать категорию' : 'Добавить категорию'}</Title>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="name"
                        label="Название"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите название',
                            },
                        ]}
                    >
                        <Input type={'text'}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="description"
                        label="Описание"
                    >
                        <TextArea/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item>
                                <Button type="primary" onClick={() => {
                                    //@ts-ignore
                                    history.goBack();
                                }}>
                                    Назад
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={12} className={'actions-right'}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="add-edit-category"
                                        loading={isLoading}>
                                    {editCategory && Object.keys(editCategory).length > 0 ? "Обновить" : "Добавить"}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export default AddAndEditCategory;
