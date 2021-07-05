import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from 'react-router-dom';
import {Form, Input, Button, Col, Row, Typography} from 'antd';
import {IRootState} from "../../redux/store";
import {axiosAuth} from "../../axios-instances";
import {TagInterface} from "../../types/tags";
import {addTag, updateTag} from "../../redux/actions/tagsActions";

interface TagValues {
    name: string,
}

const AddAndEditTag: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [editTag, setEditTag] = useState<TagInterface | undefined>(undefined);
    const isLoading = useSelector<IRootState, boolean>((state) => state.tags.isLoading);
    const [form] = Form.useForm();
    const {Title} = Typography;
    useEffect(() => {
        if (location.state && location.state.tagId) {
            axiosAuth.get(`/api/tags/${location.state.tagId}`).then((response): void => {
                setEditTag(response.data);
            });
        }
    }, [location])
    useEffect(() => {
        if (editTag) {
            let {name} = editTag;
            form.setFieldsValue({
                name
            })
        }
    }, [editTag, form]);
    const onFinish = (values: TagValues) => {
        if (editTag) {
            dispatch(updateTag({
                id: editTag.id,
                ...values
            }))
        } else {
            dispatch(addTag(values));
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
            <Title level={3}>{editTag ? 'Редактировать тэг' : 'Добавить тэг'}</Title>
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
                                    {editTag && Object.keys(editTag).length > 0 ? "Обновить" : "Добавить"}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export default AddAndEditTag;
