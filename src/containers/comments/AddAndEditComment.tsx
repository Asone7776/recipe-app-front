import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from 'react-router-dom';
import {Form, Input, Button, Col, Row, Typography} from 'antd';
import {IRootState} from "../../redux/store";
import {axiosAuth} from "../../axios-instances";
import {CommentInterface} from "../../types/comments";
import {UsersLookupInterface} from "../../types/users";
import {RecipesLookupInterface} from "../../types/recipes";
import {addComment, updateCategory} from "../../redux/actions/commentsActions";
import SearchAllUsers from "../../components/SearchAllUsers";
import SearchAllRecipes from "../../components/SearchAllRecipes";

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
            let {message, user_id, recipe_id} = editComment;
            form.setFieldsValue({
                message,
                user_id,
                recipe_id
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
            onValuesChange={() => {
                // console.log(form.getFieldsValue());
            }}
        >
            <Title level={3}>{editComment ? '?????????????????????????? ??????????????????????' : '???????????????? ??????????????????????'}</Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="user_id"
                        label="??????????"
                        rules={[
                            {
                                required: true,
                                message: '???????????????????? ???????????????? ????????????',
                            },
                        ]}
                    >
                        <SearchAllUsers
                            initialSearchValue={editComment && editComment.user && editComment.user.name}
                            initialValue={editComment && editComment.user && editComment.user.id}
                            onUserSelect={(user_id: number) => {
                                form.setFieldsValue({
                                    user_id
                                })
                            }}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="recipe_id"
                        label="????????????"
                        rules={[
                            {
                                required: true,
                                message: '???????????????????? ???????????????? ????????????',
                            },
                        ]}
                    >
                        <SearchAllRecipes
                            initialSearchValue={editComment && editComment.recipe && editComment.recipe.name}
                            initialValue={editComment && editComment.recipe && editComment.recipe.id}
                            onUserSelect={(recipe_id: number) => {
                                form.setFieldsValue({
                                    recipe_id
                                })
                            }}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="message"
                        label="??????????????????"
                        rules={[
                            {
                                required: true,
                                message: '???????????????????? ?????????????? ????????????????',
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
                                    ??????????
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={12} className={'actions-right'}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="add-edit-category"
                                        loading={isLoading}>
                                    {editComment && Object.keys(editComment).length > 0 ? "????????????????" : "????????????????"}
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
