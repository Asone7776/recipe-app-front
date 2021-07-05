import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from 'react-router-dom';
import {Form, Input, Button, Col, Row, Typography} from 'antd';
import {IRootState} from "../../redux/store";
import {axiosAuth} from "../../axios-instances";
import {CommentInterface} from "../../types/comments";
import {addComment, updateCategory} from "../../redux/actions/commentsActions";
import RemoteSearch from "../../components/RemoteSearch";

interface CommentValues {
    message: string,
    user_id: string,
    recipe_id: string,
}

const AddAndEditComment: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [editComment, setEditComment] = useState<CommentInterface | undefined>(undefined);
    const isLoading = useSelector<IRootState, boolean>((state) => state.comments.isLoading);
    const [form] = Form.useForm();
    const {Title} = Typography;
    const {TextArea} = Input;
    useEffect(() => {
        if (location.state && location.state.commentId) {
            axiosAuth.get(`/api/comments/${location.state.commentId}`).then((response): void => {
                setEditComment(response.data);
            });
        }
    }, [location])
    useEffect(() => {
        if (editComment) {
            let {message} = editComment;
            form.setFieldsValue({
                message
            })
        }
    }, [editComment, form]);
    const onFinish = (values: CommentValues) => {
        if (editComment) {
            dispatch(updateCategory({
                id: editComment.id,
                ...values
            }))
        } else {
            dispatch(addComment(values));
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
            <Title level={3}>{editComment ? 'Редактировать комментарий' : 'Добавить комментарий'}</Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="user_id"
                        label="Автор"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста выберите автора',
                            },
                        ]}
                    >
                        <RemoteSearch isLoading={false}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="recipe_id"
                        label="Рецепт"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста выберите рецепт',
                            },
                        ]}
                    >
                        <RemoteSearch isLoading={false}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="message"
                        label="Сообщение"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите название',
                            },
                        ]}
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
                                    {editComment && Object.keys(editComment).length > 0 ? "Обновить" : "Добавить"}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export default AddAndEditComment;
