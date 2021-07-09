import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from 'react-router-dom';
import {Form, Input, Button, Col, Row, Typography} from 'antd';
import {IRootState} from "../../redux/store";
import {axiosAuth} from "../../axios-instances";
import {IngredientInterface} from "../../types/ingredients";
import {addIngredient, updateIngredient} from "../../redux/actions/ingredientsActions";

interface IngredientValues {
    name: string,
    description?: string
}

const AddAndEditIngredient: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [editIngredient, setEditIngredient] = useState<IngredientInterface | undefined>(undefined);
    const isLoading = useSelector<IRootState, boolean>((state) => state.ingredients.isLoading);
    const [form] = Form.useForm();
    const {Title} = Typography;
    const {TextArea} = Input;
    useEffect(() => {
        if (location.state && location.state.ingredientId) {
            axiosAuth.get(`/api/ingredients/${location.state.ingredientId}`).then((response): void => {
                setEditIngredient(response.data);
            });
        }
    }, [location])
    useEffect(() => {
        if (editIngredient) {
            let {name, description} = editIngredient;
            form.setFieldsValue({
                name,
                description
            })
        }
    }, [editIngredient, form]);
    const onFinish = (values: IngredientValues) => {
        if (editIngredient) {
            dispatch(updateIngredient({
                id: editIngredient.id,
                ...values
            }))
        } else {
            dispatch(addIngredient(values));
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
            <Title level={3}>{editIngredient ? 'Редактировать ингредиент' : 'Добавить ингредиент'}</Title>
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
                                    {editIngredient && Object.keys(editIngredient).length > 0 ? "Обновить" : "Добавить"}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export default AddAndEditIngredient;
