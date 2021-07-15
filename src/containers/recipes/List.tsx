import React, {useEffect, useState, useCallback} from 'react';
import {Table, Space, Button, Tooltip, Typography, Modal, Row, Col, Input, Tag} from 'antd';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getRecipes, deleteRecipe} from "../../redux/actions/recipesActions";
import {EditFilled, DeleteFilled} from "@ant-design/icons";
import {debounce} from "../../functions";
import {IRootState} from "../../redux/store";
import {RecipesResponse, RecipeInterface} from "../../types/recipes";
import {Level} from "../../types/level";
import {TagInterface} from "../../types/tags";

const RecipesList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const recipes = useSelector<IRootState, RecipesResponse>((state) => state.recipes.data.recipes);
    const isLoading = useSelector<IRootState, boolean>((state) => state.ingredients.isLoading);
    const [currentRecipe, setCurrentRecipe] = useState<RecipeInterface | null>(null);
    const [currentPage, setCurrentPage] = useState<number | null>(null);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState<string | null>(null);
    const {Title} = Typography;

    useEffect(() => {
        dispatch(getRecipes({
            page: currentPage,
            search
        }));
    }, [dispatch, currentPage, search]);
    const closeModal = () => {
        setCurrentRecipe(null);
        setModal(false);
    };
    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const verifySearch = useCallback(
        debounce((search: string) => {
            setSearch(search);
        }, 500),
        []);
    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Время на приготовление',
            dataIndex: 'time_to_complete',
            key: 'time_to_complete',
        },
        {
            title: 'Сложность приготовления',
            dataIndex: 'level',
            key: 'level',
            render: (text: Level) => {
                return text ? text.name : null
            }
        },
        {
            title: 'Тэги',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: TagInterface[]) => (
                <>
                    {tags.map(tag => {
                        return (
                            <Tag color={'geekblue'} key={tag.id}>
                                {tag.name.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Лайки',
            dataIndex: 'likes',
            key: 'likes',
        },
        {
            title: '',
            key: 'action',
            width: 150,
            render: (text: any, record: RecipeInterface) => (
                <Space size="middle" className={'actions-center'}>
                    <Tooltip title={'Редактировать'}>
                        <Button type={'default'} onClick={() => {
                            history.push({
                                pathname: `/admin/recipes/edit/${record.id}`,
                            }, {
                                recipeId: record.id
                            });
                        }}>
                            <EditFilled/>
                        </Button>
                    </Tooltip>
                    <Tooltip title={'Удалить'}>
                        <Button onClick={() => {
                            setCurrentRecipe(record);
                            setModal(true);
                        }}>
                            <DeleteFilled/>
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table
                dataSource={recipes.data}
                columns={columns}
                loading={isLoading}
                title={() => (
                    <>

                        <div className={'with-filters'}>
                            <Title level={4}>Список рецептов</Title>
                            <Row gutter={15}>
                                <Col span={5}>
                                    <label className={'cm-options-label'}>Поиск</label>
                                    <Input onChange={(event) => {
                                        let targetValue = event.target.value;
                                        let val = targetValue === '' ? null : targetValue;
                                        verifySearch(val);
                                    }} allowClear
                                    />
                                </Col>
                                <Col span={19} className={'bottomRightToEnd'}>
                                    <Button type={'primary'}>
                                        <Link to={'/admin/recipes/add'}>
                                            Добавить рецепт
                                        </Link>
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                    </>
                )}
                footer={() => ''}
                pagination={{
                    position: ['topRight', 'bottomRight'],
                    current: currentPage || 1,
                    defaultPageSize: 15,
                    showSizeChanger: false,
                    total: recipes && recipes.total,
                    onChange: onPageChange
                }}
                rowKey={'id'}
                size={'middle'}
                bordered
            />
            <Modal
                title={`Удалить рецепт ${currentRecipe && currentRecipe.name}`}
                visible={modal}
                onCancel={closeModal}
                centered
                footer={[
                    <Button key="back" onClick={() => {
                        closeModal();
                    }}>
                        Отменить
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => {
                        if (currentRecipe) {
                            dispatch(deleteRecipe(currentRecipe.id));
                        }
                        closeModal();
                    }}>
                        Удалить
                    </Button>,
                ]}
            >
            </Modal>
        </>

    )
};
export default RecipesList;
